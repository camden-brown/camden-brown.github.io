---
title: Block Scope in Go
date: 2025-06-25 12:00:00 -0700
categories: [Programming, Go]
tags: [go, scope, variables]
---

Go is block-scoped: a name is visible only within the innermost `{}` block in which it’s declared (and nested blocks inside it). Scopes you’ll use:
- Package scope (identifiers declared outside functions)
- Function bodies
- Blocks introduced by: `if`, `for`, `switch`, `select`, explicit `{ ... }`

```go
package main

// Package-scope (visible to all files in the package)
var age = 19

func sendEmail() {
    name := "Jon Snow" // function scope
    for i := 0; i < 5; i++ {
        email := "snow@winterfell.net" // loop block scope
        _ = email
    }
    _ = name
}
```

Explicit block just to create a smaller scope:

```go
func main() {
    {
        msg := "inside"
        fmt.Println(msg)
    }
    // fmt.Println(msg) // ERROR: msg out of scope
}
```

## Common Pitfall

Declaring variables inside a loop / `if` and trying to use them after the block ends.

## Assignment

1. Run the buggy version: you should get “undefined” compile errors.
2. Fix it so the function compiles and works.

Buggy (scoping issue: `username` / `domain` limited to inner `if`):

```go
func splitEmail(email string) (string, string) {
    for i, r := range email {
        if r == '@' {
            username := email[:i]
            domain := email[i+1:]
            break
        }
    }
    return username, domain // compile error: undefined
}
```

Fixed (declare in outer block so they’re in scope for the `return`):

```go
func splitEmail(email string) (string, string) {
    username, domain := "", ""
    for i, r := range email {
        if r == '@' {
            username = email[:i]
            domain = email[i+1:]
            break
        }
    }
    return username, domain
}
```

Try extending: return an error if `'@'` not found instead of empty strings.

## Summary

Declare outside the smallest block that needs to read or write the variable—no wider. Move declarations out of loops / conditionals if you need the value afterward; otherwise keep them inside for tighter scope.

*Adapted from community practices and resources such as boot.dev.*