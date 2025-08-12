---
title: First-Class & Higher-Order Functions in Go
date: 2025-06-24 12:00:00 -0700
categories: [Programming, Go]
tags: [go, functions, higher-order, defer, closures]
---

Go treats functions as first-class values: you can assign them to variables, pass them as arguments, and return them from other functions. A function that takes or returns another function is a higher-order function.

## Passing Functions

```go
func add(x, y int) int { return x + y }
func mul(x, y int) int { return x * y }

// aggregate applies arithmetic(a,b) first, then combines result with c
func aggregate(a, b, c int, arithmetic func(int, int) int) int {
    return arithmetic(arithmetic(a, b), c)
}

func main() {
    fmt.Println(aggregate(2, 3, 4, add)) // 9
    fmt.Println(aggregate(2, 3, 4, mul)) // 24
}
```

## Currying (Emulation)

Currying style: return a function that captures some arguments.

```go
func multiply(x, y int) int { return x * y }
func add(x, y int) int { return x + y }

func selfMath(mathFunc func(int, int) int) func(int) int {
    return func(x int) int {
        return mathFunc(x, x)
    }
}

func main() {
    square := selfMath(multiply)
    double := selfMath(add)
    fmt.Println(square(5)) // 25
    fmt.Println(double(5)) // 10
}
```

## Defer

`defer` schedules a call to run just before the surrounding function returns. Arguments evaluate immediately; execution is delayed.

```go
// CopyFile copies a file from srcName to dstName.
func CopyFile(dstName, srcName string) (written int64, err error) {
    src, err := os.Open(srcName)
    if err != nil {
        return
    }
    defer src.Close()

    dst, err := os.Create(dstName)
    if err != nil {
        return
    }
    defer dst.Close()

    return io.Copy(dst, src)
}
```

Typical uses: closing files, unlocking mutexes, rolling back transactions, flushing buffers.

## Closures

A closure captures (encloses) variables from its surrounding scope.

```go
func concatter() func(string) string {
    doc := ""
    return func(word string) string {
        doc += word + " "
        return doc
    }
}

func main() {
    acc := concatter()
    acc("Mr.")
    acc("and")
    acc("Mrs.")
    acc("Dursley")
    acc("of")
    acc("number")
    acc("four,")
    acc("Privet")
    fmt.Println(acc("Drive"))
    // Mr. and Mrs. Dursley of number four, Privet Drive
}
```

Each call to `concatter()` creates a new independent `doc`.

## Anonymous Functions

Anonymous (inline) functions are handy for one-off behavior or quick closures.

```go
// doMath maps f over nums.
func doMath(f func(int) int, nums []int) []int {
    results := make([]int, 0, len(nums))
    for _, n := range nums {
        results = append(results, f(n))
    }
    return results
}

func main() {
    nums := []int{1, 2, 3, 4, 5}
    doubled := doMath(func(x int) int { return x + x }, nums)
    fmt.Println(doubled) // [2 4 6 8 10]
}
```

## Patterns & Tips

- Prefer small, named functions for reusable logic; anonymous ones for localized transformations.
- Avoid capturing loop variables unintentionally (use local copies inside loops).
- Use `func() { ... }()` immediately-invoked functions sparingly for scoping side effects.

## Mini Exercise

Write a `memoize` higher-order function:

```go
// memoize takes f(int) int and returns a cached version.
func memoize(f func(int) int) func(int) int {
    // your code
}
```

Hint: use a `map[int]int` closed over by the returned function.

## Summary

Go's first-class functions enable higher-order utilities, closures for stateful behavior, and concise inline logic with anonymous functions. Combine them with `defer` for robust resource management.

*Adapted from community practices and