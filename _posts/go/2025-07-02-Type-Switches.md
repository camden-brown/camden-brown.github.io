---
title: Type Switches in Go
date: 2025-07-02 12:05:00 -0700
categories: [Programming, Go]
tags: [go, interfaces, type-switch, runtime]
---

A type switch is syntactic sugar over multiple type assertions. It inspects the dynamic type held by an interface and chooses a branch.

```go
func printType(x interface{}) {
    switch v := x.(type) {
    case int:
        fmt.Printf("int %v\n", v)
    case string:
        fmt.Printf("string %q\n", v)
    default:
        fmt.Printf("other %T\n", v)
    }
}
```

Pattern:

```go
switch id := expr.(type) {
case T1:
    // id has type T1
case T2:
    // id has type T2
default:
    // fallback
}
```

Key points:
- The `.(type)` form is only valid in a `switch`.
- The identifier after `switch` (here `id`) is the asserted value inside each case.
- Cases list types (concrete or interface), not values.

## When to Use
- Branching on a small set of concrete implementations behind an interface.
- Logging / debugging dynamic types.
Avoid overuse—prefer polymorphism (add a method) when behavior belongs on the type.

## Assignment

Re‑implement `getExpenseReport` using a single type switch (replacing chained assertions). Rules:
1. If `expense` is an `email`, return its `toAddress` and `cost()`.
2. If `expense` is an `sms`, return its `toPhoneNumber` and `cost()`.
3. Otherwise return `""` and `0.0`.

Solution:

```go
package main

func getExpenseReport(e expense) (string, float64) {
    switch v := e.(type) {
    case email:
        return v.toAddress, v.cost()
    case sms:
        return v.toPhoneNumber, v.cost()
    default:
        return "", 0.0
    }
}

// don't touch below this line

type expense interface {
    cost() float64
}

type email struct {
    isSubscribed bool
    body         string
    toAddress    string
}

type sms struct {
    isSubscribed  bool
    body          string
    toPhoneNumber string
}

type invalid struct{}

func (e email) cost() float64 {
    if !e.isSubscribed {
        return float64(len(e.body)) * 0.05
    }
    return float64(len(e.body)) * 0.01
}

func (s sms) cost() float64 {
    if !s.isSubscribed {
        return float64(len(s.body)) * 0.10
    }
    return float64(len(s.body)) * 0.03
}

func (i invalid) cost() float64 { return 0.0 }
```

Try: Add a new `push` type and extend the switch.

## Summary
Type switches compactly dispatch on dynamic types inside interfaces. Use them sparingly; favor interface methods for extensible behavior.

*Adapted from community practices and resources such as boot.dev.*