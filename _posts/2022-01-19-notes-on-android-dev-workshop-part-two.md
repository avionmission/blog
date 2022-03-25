---
layout: post
title:  "Notes on Android Dev - Lecture 2 - Intro to Kotlin"
date:   2022-01-19 09:00:44 +0530
image: \images\january_2022\notes_on_lecture_two_android.jpg
categories: [App Development]
---
These are my notes on Lecture 2 of CS194A by [Rahul Pandey][rahul-twitter] about the fundamental features of Kotlin language including Immutability, Type Inference and Nullability. 

I have not actually taken the course since I'm not in Stanford but I'm following the course on [youtube][lecture-link]. Below are my main takeaways and learnings from the lecture.

<img src="\blog\images\january_2022\notes_on_lecture_two_android.jpg?raw=true">
You can watch the full lecture on youtube: [https://www.youtube.com/watch?v=YKfBrDfRcPU][lecture-link]

# Android Dev - Lecture 2 - Intro to Kotlin

- The fundamental principle in programming is DRY (Don’t Repeat Yourself). The more lines of code you write the more bugs will arise.
- A “ternary statement” allows you to assign one value to the variable if a condition is true, and another value if the condition is false. Here’s an example (from the BiggerNumber game code) of how it works in kotlin:
    
    ```kotlin
    val isAnswerCorrect:Boolean = if (isLeftButtonSelected) leftNum > rightNum else rightNum > leftNum
    ```
    
- Here’s the complete code for the simple app that we didn’t finish in the last lecture: [BiggerNumberWWCode](https://github.com/rpandey1234/BiggerNumberWWCode)
- In Android Studio, creat a File > New > New Project > Empty Activity. This will create a project which does not create an android app but allows us to work with just Kotlin code.

### Hello World

No need of boilerplate code like we have in Java:

```kotlin
fun main() {
	println("Hello World")
}
```

### Type Inference

The proper way to declare a variable in Kotlin is this:

```kotlin
val first: String = "Niel Armstrong"
```

But you can just write this `val first = "Niel Armstrong"` and Kotlin automatically infers the *Type* of that variable.

### Arrays in Kotlin

- Arrays in Kotlin are called Lists, here’s how you create a list in Kotlin:
    
    ```kotlin
    val myList = listOf(23,45,67)
    ```
    
- Three ways to print the last element of a list:
    
    ```kotlin
    // Method 1
    println(myList.get(mylist.size - 1))
    // Method 2
    println(myList[myList.size - 1])
    // Method 3
    println(myList.last)
    ```
    

### Immutability

- Immutable are objects or variables whose value cannot be changed once assigned. Kotlin gives us two keywords for declaring variables, `var` and `val`. You can write `var x = 23` or `val x = 23`. The difference is that when you use `val` , you create immutable variables i.e they have fixed, unchangeable values.
- Immutability is useful for safety. It also makes you program more reilient to unexpected output or even crashes.
- Using the `listOf()` method creates, read-only (or immutable) lists. To create lists whose contents can be modified, we use `mutableListOf()` method:
    
    ```kotlin
    val myList2 = mutableListOf(56,78,32)
    ```
    
- **Notice the contradiction in the above code?**

### Nullability

- Tony Hoare is credited with the invention of “NULL” and called it his “billion-dollar mistake”.
- NULL is a place-holder for an object that doesn’t exist yet.
- In Kotlin you can use the `?` operator to handle null values, for example if :
    
    ```kotlin
    var a: String = "abc" // Regular initialization means non-null by default
    a = null // compilation error
    
    var b: String? = "abc" // can be set to null
    b = null // ok
    print(b)
    ```
    

### “when” statement in Kotlin

- `when` expression is the equivalent of `switch` in other languages like C++ and Java. Example:
    
    ```kotlin
    var grade = when(score) {
    				in 90..100 -> "A"
    				in 80..89 -> "B"
    				in 70..79 -> "C"
            else -> "D"
    }
    ```
    
- In the above code, `..` operator is used to create ranges of value. Writing `i in 90..100` is equivalent to `1 <= i && i <= 4` .

[rahul-twitter]: https://twitter.com/rpandey1234
[lecture-link]: https://www.youtube.com/watch?v=YKfBrDfRcPU
[my-reddit]: https://www.reddit.com/user/avismission