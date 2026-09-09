---
layout: post
title:  "Maths for Neural Networks"
date:   2026-07-07 07:00:44 +0530
image: images/2026/Math_for_AI_cover.jpg
categories: [AI]
---

Functions, Linear Equations, Derivatives and Matrices. Thats all you need to get started.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/MCwRulsuzfM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I'm working on a series of videos where we will code a gpt-like language model from scratch using python and pytorch. I was working on the first video which is about Neural networks, the deep learning algorithm behind most of the modern advances in AI.

While explaining how a neural network works i noticed i keep going on tangents about certain maths concepts, mainly:
1. Functions
2. Linear Equations
3. Derivatives
4. Matrix Multiplactions

Most people get bogged down by Math prerequisites when getting into AI, but these four concepts are all you need to get started with Machine Learning and Deep Learning Algorithms.

Let's talk about them today.

## 1.  Functions

Say you've got a set of values X and a set of values Y. A function is a mapping between X and Y such that each element of X is mapped to only one element of Y.

| X | Y |
|---|---|
| -3 | 9 |
| -2 | 4 |
| -1 | 1 |
| 0 | 0 |
| 1 | 1 |
| 2 | 4 |
| 3 | 9 |

<video src="{{site.baseurl}}/images/2026/videos/Clip1_FunctionMapping.mp4" controls muted playsinline style="width:100%;border-radius:8px;margin:8px 0 16px"></video>

This mapping can be described the equations such as y = x^2 and be plotted in a graph with x,y plane.

<video src="{{site.baseurl}}/images/2026/videos/Clip2_FunctionTableEquationGraph.mp4" controls muted playsinline style="width:100%;border-radius:8px;margin:8px 0 16px"></video>

X is the input and Y the output. Ofcourse there can be multiple inputs and thus multiple X values.  

## 2. Linear Equations

Two important families of functions are Linear and Non-linear. 

Linear functions are called "linear" because they look line straight lines and are described by the equation `y = mx + b` Why this equation?

Say I randomly draw straight a line on graph. To recreate this exact line you need two pieces of information
1. How above or below the origin the line is, i.e where does the line cut the y-axis.
2. And the angle it makes with the X axis, which tells you how steep the line is.

Look at how a y = mx graph looks like when m=1, x grows by a certain amount y grows by the same amount:

<video src="{{site.baseurl}}/images/2026/videos/Clip3_LinearFunction.mp4" controls muted playsinline style="width:100%;border-radius:8px;margin:8px 0 16px"></video>

Now see what happens when we increase `m`, notice how the line gets steeper. So the number you multiply by tells you how steep the line is.

<video src="{{site.baseurl}}/images/2026/videos/Clip4_ChangingSlope.mp4" controls muted playsinline style="width:100%;border-radius:8px;margin:8px 0 16px"></video> 

`m` is called the slope of the line. It tells you the rate of change, i.e for some change in x how much does y change.

Now observe what happens when we add a number `b`. Starting with b = 1, let's slowly increase the value of `b`. `b` is called the `bias` and it tells where the line cuts the y axis.

## 3. Derivatives

The thing about linear functions is that it has constant rate of change. Look at this non-linear function `y = x^2`, we can see that it has different slopes at different parts of the curve:

So at one part an increase in x is producing a small increase in y, at another part of the function the same amount of increase in x produces a much greater increase in y because the slope is steeper at those parts.

The key question is what is rate of change at particular point on the function. The answer is: it's the tangent at that point. But how did we reach that conclusion? Before I answer that, we should ask what a tangent is.

For a circle it's simple, it's the line that passes through only one point in the circle. But look this function, i drew a tangent at this point and it passed through more than one point. So that definition of a tangent starts to fall apart for non-linear functions. We need a better definition for a tangent. 

<video src="{{site.baseurl}}/images/2026/videos/Clip6_TangentNonlinear.mp4" controls muted playsinline style="width:100%;border-radius:8px;margin:8px 0 16px"></video>

Taking the example of `f(x) = x^2` again. Take any point x_1 on the curve, let's say we increase x_1 by a certain amount say `h` to reach x_2. What's the rate of change between these two points? It's:


$$
\frac{y_2-y_1}{x_2-x_1}
=> \frac{f(x+h)-f(x)}{h}
$$

Let's say we reduce the interval `h`, until it becomes really close to zero. In Maths we call it a Limit:

<video src="{{site.baseurl}}/images/2026/videos/Clip7_SecantApproachingTangent.mp4" controls muted playsinline style="width:100%;border-radius:8px;margin:8px 0 16px"></video>

$$
\lim_{h \to 0} \frac{f(x+h)-f(x)}{h}
$$

Putting $f(x) = x^2$ in the equation we get:

$$
\lim_{h \to 0} \frac{(x+h)^2-x^2}{h}
$$

$$
= \lim_{h \to 0} \frac{x^2+2xh+h^2-x^2}{h}
$$

$$
= \lim_{h \to 0} \frac{2xh+h^2}{h}
$$

$$
= \lim_{h \to 0} (2x+h)
$$

$$
= 2x
$$

So the derivative of $f(x) = x^2$ is 2x. Which mean for a very small change in x at any point, the change is y is 2x times that change. This explains why the slope is lower when x is small and higher when x is large, when we are in the positive quadrant.

Derivative is also just rate of change but at very very small changes, almost instantaneous rate of change.

## 4. Matrix Multiplication

For illustrations purpose i'm taking examples of function where the output y depends only one input x.

This does not have to be the case. If y depends on two variables the graph have to be plotted on 3 dimensions, with 3 axes and so on for higher dimensions.

Ofcourse we cant visualise higher dimensions because we live in a three-dimensional world. But we can surely calculate in higher dimensions which is useful for implementing AI algorithms. When implementing our language model we will be dealing with vectors as big as 700 dimensions.

<video src="{{site.baseurl}}/images/2026/videos/Clip8_MultipleInputs.mp4" controls muted playsinline style="width:100%;border-radius:8px;margin:8px 0 16px"></video>

When dealing with equations of multiple variables we have a useful construct we can use called "Matrix" which is essentially a grid of numbers.

Say we have these three linear equations:

$$
\begin{aligned}
6x - 5y + 2z &= 3 \\
2x + y - 4z &= 5 \\
3x - 3y + z &= -1
\end{aligned}
$$

<video src="{{site.baseurl}}/images/2026/videos/Clip9_SystemOfLinearEquations.mp4" controls muted playsinline style="width:100%;border-radius:8px;margin:8px 0 16px"></video>

These equations can be represented as matrices in this way:

$$
\begin{bmatrix}
6 & -5 & 2 \\
2 & 1 & -4 \\
3 & -3 & 1
\end{bmatrix}
\begin{bmatrix}
x \\
y \\
z
\end{bmatrix}
=
\begin{bmatrix}
3 \\
5 \\
-1
\end{bmatrix}
$$

<video src="{{site.baseurl}}/images/2026/videos/Clip10_Matrix.mp4" controls muted playsinline style="width:100%;border-radius:8px;margin:8px 0 16px"></video>

Beacause matrix multiplication between two matrices works by multiplying rows of the first matrix by columns of the second matrix, we can store all the coefficients in one matrix and all the variables another matrix and all the outputs in another matrix.

You can see how this is helpful when programming, we can represent thousands of such linear equations using just three arrays.

The dimensions of a matrix is m x n, where m is the number of rows and n is the number of column. When a `m x n` matrix is multiplied by a `n x p` matrix we get a `m x p` matrix. So for matrix multiplication the inner dimensions have to match.

Ofcourse I have merely scratched the surface when it comes to these mathematical concepts but it's enough to get us started with Deep Learning Algorithms.

**In the next post, we will use these maths concepts to implement an Neural Network from scratch to understand how it works.**
