---
title: Error Interfaces in Go
date: 2025-07-08 12:00:00 -0700
categories: [Programming, Go]
tags: [go, interfaces, programming]
---
i, err := strconv.Atoi("42b")
This post provides a concise technical overview of Go's error handling model and a short exercise.

## The `error` Interface

Any type that implements the single method below satisfies the built‑in `error` interface:

```go
type error interface { Error() string }
```

Errors are ordinary values. They travel explicitly in the final return position of a function that can fail.

## Conventions

1. Last return value is `error` when a function can fail.
2. `nil` error indicates success; non‑`nil` indicates failure.
3. On failure, return zero values for all other results.

## Standard Library Example: `strconv.Atoi`

Signature:

```go
func Atoi(s string) (int, error)
```

Usage pattern:

```go
i, err := strconv.Atoi("42b")
if err != nil {
	// handle (log, wrap, propagate, etc.)
	return
}
// use i
```

If parsing fails, the returned error value’s `Error()` string supplies context (e.g. `parsing "42b": invalid syntax`).

## Custom Error Types

Implementing a domain‑specific error:

```go
type userError struct { name string }

func (e userError) Error() string { return fmt.Sprintf("%s has a problem with their account", e.name) }
```

Use case:

```go
func sendSMS(msg, userName string) error {
	if !canSendToUser(userName) {
		return userError{name: userName}
	}
	return nil
}
```

You can discriminate by type with a type assertion or `errors.As`, or wrap errors using `fmt.Errorf("...: %w", err)`.

## Exercise: `sendSMSToCouple`

Goal: send two SMS messages sequentially. Abort on first failure. Return aggregate cost on success.

Requirements:
1. Call `sendSMS(msgToCustomer)`; on error return `0, err`.
2. Call `sendSMS(msgToSpouse)`; on error return `0, err`.
3. On success, return sum of individual costs and `nil`.

Reference implementation:

```go
package main

import "fmt"

func sendSMSToCouple(msgToCustomer, msgToSpouse string) (int, error) {
	customerCost, err := sendSMS(msgToCustomer)
	if err != nil {
		return 0, err
	}
	spouseCost, err := sendSMS(msgToSpouse)
	if err != nil {
		return 0, err
	}
	return customerCost + spouseCost, nil
}

// supporting function
func sendSMS(message string) (int, error) {
	const maxTextLen = 25
	const costPerChar = 2
	if len(message) > maxTextLen {
		return 0, fmt.Errorf("can't send texts over %d characters", maxTextLen)
	}
	return costPerChar * len(message), nil
}
```

Key properties illustrated:
- Explicit propagation (no hidden control flow).
- Immediate failure handling.
- Consistent zero‑value returns on error.

## Summary

Go’s approach keeps error handling explicit, composable, and testable. Mastery consists primarily of disciplined propagation, wrapping for context, and consistent zero‑value returns.

*Adapted from community practices and resources such as [boot.dev](https://boot.dev/).* 