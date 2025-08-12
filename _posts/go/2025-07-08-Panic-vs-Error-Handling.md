---
title: Panic vs. Error Values in Go
date: 2025-07-08 09:00:00 -0700
categories: [Programming, Go]
tags: [go, errors, panic, recover]
---

In a prior post we covered Go's `error` interface and explicit propagation. This article contrasts ordinary error handling with the `panic` / `recover` mechanism, clarifies when (and when not) to use each, and offers a short exercise.

## Preferred Path: Returning `error` Values

Treat errors as ordinary return values you pass up the call stack with added context:

```go
func enrichUser(userID string) (User, error) {
    user, err := getUser(userID)
    if err != nil {
        // %w wraps the original error so callers can unwrap / inspect
        return User{}, fmt.Errorf("failed to get user %q: %w", userID, err)
    }
    return user, nil
}
```

Guidelines:
1. Return `(T, error)` for operations that can fail.
2. On failure: return zero value(s) for other results plus a non‑`nil` error.
3. Add context with `fmt.Errorf("...: %w", err)` so logs show a causal chain.
4. Inspect or classify with `errors.Is` / `errors.As` when needed.

## The `panic` Mechanism

`panic` forcibly unwinds the stack. Each deferred function on the way out runs; if none call `recover`, the goroutine crashes (often terminating the whole program) with a stack trace.

```go
func enrichUser(userID string) User {
    user, err := getUser(userID)
    if err != nil {
        panic(err)
    }
    return user
}

func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("recovered from panic:", r)
        }
    }()

    // Panics inside enrichUser; defer/recover intercepts it.
    enrichUser("123")
}
```

Why not write code this way?
- Control flow becomes implicit and harder to reason about.
- Resource cleanup beyond simple defers can be skipped unintentionally.
- Testing failure paths is harder (you must expect panics).
- Libraries that panic instead of returning errors constrain caller behavior.

## When (Rarely) to Use `panic`

Acceptable scenarios are narrow:
- Programmer errors / violated internal invariants (e.g. impossible code path).
- Corrupted process state where continuing risks further damage.
- During package `init` when failing early is clearer than partial initialization.
- In test code to abort immediately (though `t.Fatalf` is usually clearer).
- At goroutine boundaries you fully control, where a `recover` converts panic into a logged error and preserves server availability.

Even then, prefer returning errors if recovery is plausible.

## `recover`

`recover()` only works inside a deferred function in the same goroutine as the panic. Typical pattern at a concurrency boundary:

```go
func safeWorker(fn func() error) (err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("worker panic: %v", r)
        }
    }()
    return fn()
}
```

Use this sparingly—primarily to keep a long‑running server alive while still surfacing the problem.

## `log.Fatal` vs `panic`

`log.Fatal` prints a message (including any prefix flags) then calls `os.Exit(1)`—no deferred functions run. Use it for top‑level, unrecoverable startup failures (e.g. cannot parse mandatory config, cannot bind listener). Use `panic` only when an invariant *inside* the program’s logic is violated and you want a stack trace plus deferred cleanup.

Decision sketch:
- Can the caller reasonably handle or retry? Return `error`.
- Is the state irreparably broken but we want defers to run and a stack trace? `panic`.
- Is it an early, fatal, external startup failure? `log.Fatal` (or return error from `main` in Go 1.22+ and let runtime print it).

## Mini Exercise

Rewrite the panic-based version below to return an error instead:

```go
func loadProfile(id string) *Profile {
    p, err := dbFetch(id)
    if err != nil {
        panic(err)
    }
    return p
}
```

Target signature:

```go
func loadProfile(id string) (*Profile, error)
```

Answer (hover or mentally check): return `nil, fmt.Errorf("fetch profile %q: %w", id, err)` on failure; propagate normally.

## Summary

Prefer explicit error returns: they are testable, composable, and clear. Reserve `panic` for truly exceptional, non-recoverable invariants. Keep `recover` localized to well-defined boundaries. Most Go mastery is disciplined, contextual error wrapping—panic is the uncommon escape hatch.

*Further reading: Go blog on defer/panic/recover & standard library

*Adapted from community practices and resources such as [boot.dev](https://boot.dev/).* 