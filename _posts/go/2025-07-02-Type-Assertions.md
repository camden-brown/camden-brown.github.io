---
title: Type Assertions in Go
date: 2025-07-02 12:00:00 -0700
categories: [Programming, Go]
tags: [go, interfaces, type-assertion, runtime]
---

Type assertions let you access the concrete value stored inside an interface. Pattern:

```go
v, ok := x.(T)
```

- `x` is an interface value
- `T` is the target concrete type (or another interface)
- `v` is the underlying value if the assertion succeeds
- `ok` is `true` if `x`'s dynamic type is (or implements) `T`; otherwise `false`
- If you omit `ok` and it fails, the program panics

## Basic Example

```go
type shape interface {
    area() float64
}

type circle struct {
    radius float64
}

func (c circle) area() float64 { return math.Pi * c.radius * c.radius }

func describe(s shape) {
    c, ok := s.(circle)
    if !ok {
        log.Println("not a circle")
        return
    }
    fmt.Println("circle radius:", c.radius)
}
```

## Assertion vs. Panic

```go
c := s.(circle) // panics at runtime if s isn't a circle
```

Prefer the two‑value form unless you are certain about the dynamic type.

## Type Switch (Alternative)

When you need to branch on multiple possible concrete types:

```go
switch v := e.(type) {
case email:
    fmt.Println("email to", v.toAddress)
case sms:
    fmt.Println("sms to", v.toPhoneNumber)
default:
    fmt.Println("unknown expense type")
}
```

A type switch is syntactic sugar over a chain of assertions.

## Assignment

Implement `getExpenseReport(e expense) (string, float64)`:

Rules:
1. If `e` is an `email`, return its `toAddress` and `cost()`.
2. If `e` is an `sms`, return its `toPhoneNumber` and `cost()`.
3. Otherwise return `""` and `0.0`.

Starter (without implementation):

```go
func getExpenseReport(e expense) (string, float64) {
    // your code here using type assertions
}
```

Solution (using sequential assertions):

```go
package main

func getExpenseReport(e expense) (string, float64) {
    if em, ok := e.(email); ok {
        return em.toAddress, em.cost()
    }
    if s, ok := e.(sms); ok {
        return s.toPhoneNumber, s.cost()
    }
    return "", 0.0
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

Alternative using a type switch:

```go
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
```

## When to Use Which

- Single