---
layout: post
title:  "Golang Crash Course (The language of DevOps and Cloud)"
date:   2022-01-13 09:00:44 +0530
image: \images\january_2022\golang_crash_course_thumbnail.jpg
---
All the popular open-source DevOps tools are written in Go including Kubernetes, Prometheus, Grafana, Terraform, Vault, Hugo, CockroachDB, etc. In this post, I will explain the fundamentals of Golang. Which is not just print statements and if statements and for loops, we will go over that stuff quickly and then we will get to the real meat of Golang: Concurrency, goroutines and channels which I will try to explain to you in the simplest possible way. Let’s begin.

<img src="\blog\images\january_2022\golang_crash_course_thumbnail.jpg?raw=true">

## Hello World of Golang

The Hello-World! program of Golang looks like this:

```python
package main

import "fmt"

func main() {
	fmt.Println("Testing..1..2..3")
}
```

Here’s the breakdown of the above code and a bit about the quirks of Go syntax and convention:

1. Writing `package main` tells the Go compiler that this package should be compiled as an executable and not a shared library. Is a package the same thing as a program in Go? Not exactly. A complete program is made by linking a single, unimported package called "main package" with all the other packages (or shared libraries) that it imports.
2. `fmt` (Format Package) allows us to format basic strings, values etc. and I/O operations like printing values and collect user input from the console or write into a file.
3. The main function in the main package is the entry point for the application. And the documentation outlines that the main function in the main package should take no arguments and return no values.
4. Lastly we use the `Println` funcion from the `fmt` package that we imported earlier that we use for print text in the console. For printing formatted text, you can use `Printf` instead of `Println.`

## Variables

Here’s how you work with variables in Golang:

1. You can define a variable with `var` keyword and Go will infer it’s value, which is string in the following case:
    
    ```go
    var a = "Golang knows I'm a string"
    ```
    
2. But, if you want, you can define the declare the data type of a variable like this:
    
    ```go
    var b int
    ```
    
3. Since we have not assigned any value to variable `b` , Go will automatically set it to *zero-value*. The zero-value for `int` is 0.
4. Using the `:=` operator is a shortcut for declaring and initialising values in Go. For example `var c string = "Anonymous"` can be written as simply:
    
    ```go
    c := "Anonymous"
    ```
    

## For Loops and If Statements

For loops and if statements in Golang work just like they do in C/C++ except that you don’t need paranthesis around conditions. Here’s an example.

```go
package main

import "fmt"

func main() {
	for i := 0; i <= 10; i++ {
		if i%2 == 0 {
			fmt.Println(i)
		} else {
			fmt.Println("N/A")
		}
	}
}
```

## Data Structures: Arrays and Maps

**1. Arrays**

Defining arrays in Golang is similar to how we defined variables, the only thing extra would be to declare the size of the array:

```go
var a [5]int
```

If you print the elements of the array:

```go
fmt.Println("List A: ", a)
```

The result you get will be [0,0,0,0,0] which is the default values of an empty array in Golang.

We can use loops to work with arrays, for example we can set the value of our array to [0,1,2,3,4]:

```go
for i := 0; i < 5; i++ {
		a[i] = i * 2
	}
```

**2. Maps**

A Map is a data structure which, unlike an array, does not have an order or index positions. Instead Maps have keys and values. Dictionaries are Maps where words are the keys and their meanings are the values. A phone book is a Map where contact-names are keys and contact-numbers are values. In fact maps are called dicts or dictionaries in Python.

Here’s how to define a Map in Golang: 

```go
m := make(map[string]int)
```

You can add entries in the map in this way:

```go
m["Item1"] = 56
m["Item2"] = 67
```

## Goroutines

A `goroutine` is the smallest unit of execution in Golang. Even the main function is a goroutine but we can create other goroutines that work along side the main goroutine. This is called concurrency or concurrent execution, which is different from “parallelism”.

Although the dictionary meaning of concurrency and parallelism are the same, in computer science they are different. Parallelism is running two task at the same time, for example with multi-core processors. While in concurrency, multiple tasks can start, and complete in overlapping time periods without needing to be run at the same instance, e.g. multitasking on a single core machine. Goroutines allow us to implement concurrency in our programs.

We can use goroutines by using the `go` keyword. Try the following program:

```go
package main

import (
		"fmt"
		"time"
)

func count_nums() {
	var i int
	for i = 0; i<10; i++ {
		time.Sleep(10 * time.Millisecond)
		fmt.Print(i, " ")
	}
}

fun main() {
	go count_nums() // just add "go" before a function to run it concurrently
	count_nums()
}
```

If I had not used the `go` keyword before the first `count_nums()` in main function, the program would execute the first `count_nums()` and then finish and then execute the second `count_nums()`. But instead when you execute this program, both `count_num()` functions get executed at the same time, concurrently.

### Channels

What’s even cooler is that these concurrently running segments of code or `goroutines` can exchange messages with each other using something called `channels` .

We can declare a variable as a channel by adding `chan` before the type of that variable, like this:

```go
ch chan int
```

But we need to “make” or create a channel before we can use it, using the `make` keyword which we also used to create Maps.

```go
ch := make(chan int)
```

We can send or recieve data using a channel using the `<-` (the channel operator):

```go
ch <- 101
```

Here’s an example program to demonstrate how channels actually work:

```go
package main

import "fmt"

func SendDataToChannel(ch chan int, value int) {
	ch <- value // sending data through the channel
}

func main() {
	var v int
	ch := make(chan int) // creating a channel

	go SendDataToChannel(ch, 101) // sending data via a go routine

	v = <-ch // recieve data from the channel

	fmt.Println(v)
}
```

When many different values are sent through the same channel, we can use the for loop and [range](https://gobyexample.com/range) function to iterate over all the values sent through a channel.

## What’s Next?

I hope this tutorial made you familiar with the fundamentals of Golang. To learn more about Golang and master all it’s concepts, you can refer to resources like [GobyExample.com](http://gobyexample.com) and the [official documentation of Golang](https://go.dev/doc/).