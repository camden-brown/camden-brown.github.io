---
title: If Initial Statements in Go
date: 2025-06-23 12:05:00 -0700
categories: [Programming, Go]
tags: [go, control-flow, if]
---

Go lets you prepend a short *initial statement* to an `if`. Any variables declared there exist only within the `if` (and optional `else`) block—helping keep scopes tight.

Syntax:

```go
if init; condition {
    // use values from init
}
```

## Why Use It?

1. Concise: reduce a line.
2. Scoped: avoid leaking temporary variables into the outer block.

Without an initial statement:

```go
length := getLength(email)
if length < 1 {
    fmt.Println("Email is invalid")
}
```

With an initial statement:

```go
if length := getLength(email); length < 1 {
    fmt.Println("Email is invalid")
}
// length is NOT in scope here
```

Common patterns:
- Parsing / conversion (`if v, err := strconv.Atoi(s); err != nil { ... }`)
- Map / slice lookups (`if v, ok := m[key]; ok { ... }`)
- Short-lived computed values

## Example

Original version (broader scope than needed):

```go
package main

import "fmt"

func main() {
    messageLen := 10
    maxMessageLen := 20
    fmt.Println("Trying to send a message of length:", messageLen, "and a max length of:", maxMessageLen)

    // don't touch above this line

    if messageLen <= maxMessageLen {
        fmt.Println("Message sent")
    } else {
        fmt.Println("Message not sent")
    }
}
```

Refactored to compute and confine a temporary:

```go
package main

import "fmt"

func main() {
    message := "short msg"
    maxMessageLen := 20
    fmt.Println("Trying to send a message with max length:", maxMessageLen)

    if l := len(message); l <= maxMessageLen {
        fmt.Println("Message sent (len:", l, ")")
    } else {
        fmt.Println("Message not sent (len:", l, ")")
    }

    // l is out of scope here
}
```

## Mini Exercise

Convert:

```go
if cost, err := fetchCost(id); err != nil {
    return 0, err
} else if cost == 0 {
    return 0, fmt.Errorf("zero cost")
} else {
    return cost, nil
}
```

What variables are in scope after the `if`? Answer: neither `cost` nor `err`.

## Tips

- Keep initial statements short; avoid side effects besides the needed setup.
- Don’t chain complex logic there—readability first.
- Prefer this pattern for temporary values tied only to the branch decision.

## Summary

`if` initial statements promote tighter scoping and reduce variable clutter. Use them for short-lived temps like parsed values, lookups, or quick measurements.

*Adapted from community practices and resources such as [boot.dev](https://boot.dev/)