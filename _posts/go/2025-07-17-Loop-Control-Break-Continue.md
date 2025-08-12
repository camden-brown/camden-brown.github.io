---
title: Loop Control with break and continue in Go
date: 2025-07-17 12:00:00 -0700
categories: [Programming, Go]
tags: [go, loops, control-flow]
---

`continue` and `break` let you alter loop control flow precisely.

## `continue`

Skips the rest of the current iteration and advances to the next:

```go
for i := 0; i < 10; i++ {
    if i%2 == 0 {
        continue // skip even numbers
    }
    fmt.Println(i)
}
// 1
// 3
// 5
// 7
// 9
```

Great for guard clauses that quickly exclude cases.

## `break`

Terminates the loop entirely:

```go
for i := 0; i < 10; i++ {
    if i == 5 {
        break
    }
    fmt.Println(i)
}
// 0
// 1
// 2
// 3
// 4
```

## Assignment: Print Primes

Print all primes up to and including `max`.

Key ideas:
- Start at 2 (1 is not prime)
- Handle 2 explicitly (only even prime)
- Skip even numbers > 2
- Only test odd divisors up to `i*i <= n`

Pseudocode:

```
for n in 2..max:
  if n == 2 -> prime
  if n even -> continue
  check odd divisors up to sqrt(n)
  if none divide -> prime
```

Solution:

```go
package main

import "fmt"

func printPrimes(max int) {
    for n := 2; n <= max; n++ {
        if n == 2 { // only even prime
            fmt.Println(n)
            continue
        }
        if n%2 == 0 { // skip other evens
            continue
        }
        isPrime := true
        for i := 3; i*i <= n; i += 2 { // test odd divisors
            if n%i == 0 {
                isPrime = false
                break
            }
        }
        if isPrime {
            fmt.Println(n)
        }
    }
}

// don't edit below this line
func test(max int) {
    fmt.Printf("Primes up to %v:\n", max)
    printPrimes(max)
    fmt.Println("===============================================================")
}

func main() {
    test(10)
    test(20)
    test(30)
}
```

Try modifying it to return a `[]int` so you can unit test without relying on stdout.

## Summary

Use `continue` to skip uninteresting iterations early; use `break` to stop once further work is pointless. Combined thoughtfully they yield clean, efficient loops.

*Adapted from community practices and resources such as boot.dev.*