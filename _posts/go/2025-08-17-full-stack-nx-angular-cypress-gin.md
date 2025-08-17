---
title: Angular + Gin Monorepo with Nx
date: 2025-08-17 09:00:00 -0700
categories: [engineering, nx]
tags: [nx, angular, cypress, vite, gin, golang, monorepo]
---

A short, practical guide to bootstrap a full‑stack monorepo with Nx: Angular (Vite), Cypress E2E, and a Gin (Go) backend. Minimal commands, sane layout.

## Overview

We’ll create an Nx workspace that contains:

- Angular SPA (Vite powered)
- Cypress E2E app
- Gin backend (Go)

You’ll run the SPA, hit the API, and run Cypress—all from one repo.

## Prerequisites

- Node (via nvm recommended)
- npm (or pnpm/yarn)
- Go 1.22+
- Nx (use `npx nx` or install globally)

## Create an Nx workspace (or use an existing one)

```bash
npx create-nx-workspace@latest
# Choose: Empty / Integrated repo
```

If you already have one, make sure you’re on a recent Nx: `npm i -D nx@latest`.

## Add Angular SPA

```bash
npx nx g @nx/angular:application dripen-spa \
  --style=scss \
  --e2eTestRunner=cypress \
  --unitTestRunner=vitest
```

This creates `apps/dripen-spa` and `apps/dripen-spa-e2e`.
Dev server: `npx nx serve dripen-spa` → http://localhost:4200

## Add Gin backend (Go)

We’ll use a simple layout with the entrypoint at `cmd/dripen-core-api`.

1. Create folders and a minimal server

```bash
mkdir -p apps/dripen-core-api/cmd/dripen-core-api
```

Create `apps/dripen-core-api/cmd/dripen-core-api/main.go`:

```go
package main

import (
  "log"
  "net/http"
  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()

  r.GET("/health", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"status": "ok"})
  })

  log.Println("Starting dripen-core-api on :8080")
  if err := r.Run(":8080"); err != nil {
    log.Fatal(err)
  }
}
```

2. Initialize Go and deps

```bash
cd apps/dripen-core-api
go mod init <your-module-path>        # e.g. github.com/you/repo/apps/dripen-core-api
go get github.com/gin-gonic/gin@latest
go mod tidy
cd ../../..
```

3. (Optional) Go workspaces at repo root

```bash
go work use ./apps/dripen-core-api
```

4. Wire Nx targets with run-commands — `apps/dripen-core-api/project.json`:

```json
{
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "name": "dripen-core-api",
  "projectType": "application",
  "sourceRoot": "apps/dripen-core-api",
  "targets": {
    "serve": {
      "executor": "nx:run-commands",
      "options": { "command": "go run ./apps/dripen-core-api/cmd/dripen-core-api" }
    },
    "build": {
      "executor": "nx:run-commands",
      "outputs": ["{workspaceRoot}/dist/apps/dripen-core-api"],
      "options": {
        "command": "mkdir -p dist/apps/dripen-core-api && go build -o dist/apps/dripen-core-api/dripen-core-api ./apps/dripen-core-api/cmd/dripen-core-api"
      }
    },
    "test": {
      "executor": "nx:run-commands",
      "options": { "command": "go test ./apps/dripen-core-api/..." }
    }
  },
  "tags": ["type:api", "lang:go"]
}
```

From the Nx root:

```bash
npx nx run dripen-core-api:serve      # http://localhost:8080/health
npx nx run dripen-core-api:build      # dist/apps/dripen-core-api/dripen-core-api
```

## Wire the SPA to the API

Create a simple Angular service (for example, `apps/dripen-spa/src/app/api.service.ts`):

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:8080';
  private http = inject(HttpClient);

  health(): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.baseUrl}/health`);
  }
}
```

Make sure HttpClient is provided (e.g., in `apps/dripen-spa/src/app/app.config.ts`):

```ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...other providers
    provideHttpClient(),
  ],
};
```

Use the service in a component and render the value on init.

## E2E with Cypress

A default Cypress project is created as `apps/dripen-spa-e2e`. You can add a spec to validate the API integration via the SPA.

Example `apps/dripen-spa-e2e/src/e2e/api.cy.ts`:

```ts
describe('API via SPA', () => {
  it('shows backend health', () => {
    cy.visit('/');
    cy.contains(/ok/i);
  });
});
```

Run dev + Cypress:

```bash
npx nx serve dripen-spa
npx nx run dripen-spa-e2e:e2e
```

## Nx Tips

- Affected: `npx nx affected -t build,test,lint`
- Project graph: `npx nx graph`
- Nx caches build/test results across runs

That’s it—a lean, scalable full‑stack monorepo with Nx, Angular, Cypress, and Gin.
