---
layout: post
title:  "Algorithms Crash Course #1: Time Complexity & Big-O Notation Simply Explained"
date:   2021-10-16 09:00:44 +0530
image: images\october_2021\time_complexity_and_Big_O_notation_thumbnail.png
---
Welcome to the first chapter of Crash Course Algorithms. Today we will learn about Time complexity and Big-O notation.

<img src="\blog\images\october_2021\time_complexity_and_Big_O_notation_thumbnail.png?raw=true">
<em>Watch the video version of this post here: [https://www.youtube.com/watch?v=mBULc33aC_c&t=212s][video-link] </em>

A lot of people who are selling courses teaching data structures and algorithms or teaching on youtube approach it like a giant homework assignment, a 3-6 month interview preparation, a huge chore that you are done with as soon as you can solve the 450 most common algorithm problems that appear in interviews. They are fine if that's why you're learning algorithms. Learning data structures and algorithms will make you a better programmer and problem solver regardless of what your motivation for learning it is.

But in Crash Course Algorithms we'll learn about algorithms because it's fun and it changes the way you think and the way you see the world. Today I will give you a simple explanation of `Time Complexity` and `Big-O notation`. The first concepts that you come across when getting started with Algorithms. 

An algorithm is just a series of steps or a recipe used to perform a task or solve a problem. You use an algorithm every time you make a google search, transfer files from your computer, access an ATM, or book a cinema ticket. Not only computers but you use algorithms too, all the time. So just about any piece of code can be called an algorithm but we focus on the most useful, widely used, and effective algorithms that help us solve common problems in computer science. `Time complexity` is how we compare which algorithms are better or worse. How? Let's understand with a simple example.

## TIME COMPLEXITY

Let's say I told you and a robot to draw 16 squares on a piece of paper with a pencil. The robot could draw each box individually, let's call it `algorithm-1`. But you being the smart one, draw four vertical lines on top of four horizontal lines and you'll have drawn 16 squares, let's call it `algorithm-2`. You would assume that you will finish the task in less time since you are using the more efficient algorithm. But what if the robot's hand draws very very fast like Sonny from the movie "I, Robot", it will beat your ass no matter how fast your algorithm is: 

<img src="\blog\images\october_2021\sonny_drawing.gif?raw=true">

But it doesn't mean that `algorithm-1` is better. So it would be wrong to judge or compare the efficiency of two algorithms by the number of seconds they take to complete the task. Some computers are faster than others, some programming languages are fasters than others, compilers are faster than interpreters. 

Hence, we don't use nanoseconds or milliseconds to measure the efficiency of algorithms instead we measure the numbers of steps or number of operations an algorithm requires. The robot's algorithm took 16 operations or steps to draw 16 boxes while you did it in 8 steps. If we increase the input size from 16 squares to 400 squares, the robot will do it in 400 steps while you can do it in 40 steps by drawing 20 vertical lines on top of 20 horizontal lines. As we increase the input size, the time complexity of the first algorithm increases linearly and for the second algorithm, it increases according to the function `t = 2√n`.

<img src="\blog\images\october_2021\algorithm_graphs.png?raw=true">

But there is an even faster algorithm to divide the piece of paper into 16 squares! (provided that instead of using a pencil you were allowed to use anything you wish to create the lines). What you have to do is fold the paper in half and you will have 2 two squares, fold that into half and you will have 4 squares, fold that into half and you will have 16 squares. So `algorithm-3` did it in 3 steps while algorithm-2 required 4 steps. And if you had to divide the square into 65,536 smaller squares, `algorithm-1` would take 65,536 steps, `algorithm-2` would take 512 steps while `algorithm-3` will take only 16 steps! 

To represent or write the time complexity of an algorithm in a short way, we use something called Big-O Notation.

## Big-O Notation

In algorithm-1 the number of steps required to complete the task increases "linearly" with an increase in the input size `n`. In Big-O notation, we simply write that as `O(n)`. The second algorithm takes `2√n` steps, so we can write its time complexity as `O(2√n)`. Similarly, the time complexity of the third algorithm can be written as `O(log n)`. If you are from a non-maths background and don't know what log (logarithms) are, refer to [mathsisfun.com/algebra/logarithms][logarithms-explained]. It's that simple, you just write a big O and next to it the expression for time complexity in round brackets.

For now, just know that the graph of `log n` looks like this:

<img src="\blog\images\october_2021\log_n.png?raw=true">

As you can see, the time taken increases very slowly as the input size gets bigger.

In the next chapter, we will get our hands dirty with some python programming and learn your first algorithm, Binary Search. It is a simple, mind-blowing, and mind-blowingly-effective algorithm. You will also use your knowledge of Time complexity and Big-O notation in the next chapter and forever for the rest of your life (as long as you are working with algorithms).

[logarithms-explained]: https://www.mathsisfun.com/algebra/logarithms
[video-link]: https://www.youtube.com/watch?v=mBULc33aC_c&t=212s