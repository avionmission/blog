---
layout: post
title:  "Ultimate Syntax CheatSheet for Kotlin, Python, Java and C++"
date:   2021-09-16 19:39:44 +0530
image: images\jackofalltrades.png
categories: [Coding]
---

*Disclaimer: This is a work in progress. But it is being updated regularly.*

<img src="https://github.com/avionmission/blog/blob/main/images/jackofalltrades.png?raw=true">

This is a cheatsheet to make things easy for people who are coding in multiple languages in different projects at the same time, for whatever reasons.

## 1. Printing Stuff

#### Python
{% highlight python %}
print("some stuff")
{% endhighlight %}

#### Java
{% highlight java %}
public static void main(String[] args){
    System.out.println("Some Stuff");
}
{% endhighlight %}

#### Kotlin
{% highlight kotlin %}
fun main(){
    println("Some Stuff")
}
{% endhighlight %}

#### C++
{% highlight cpp %}
#include <iostream>
using namespace std;

int main(){
    cout << "Some Stuff";
    return 0;
}
{% endhighlight %}

From this point on I'll be skipping the formalities of these programming languages like importing iostream in C++ or declaring main function in Kotlin.

## 2. Taking Input (and variables)

#### Python
{% highlight python %}
x = input("Enter a value: ")
{% endhighlight %}

#### Java
{% highlight java %}
import java.util.Scanner
.
.
.
Scanner sc = new Scanner(System.in);
int a = sc.nextInt() // inputing integers
String str = sc.nextLine(); // inputing string values
.
.
.
{% endhighlight %}

#### Kotlin
{% highlight kotlin %}
import java.util.Scanner
.
.
val text_input = Scanner(System.'in') 
var age = read.nextInt()
{% endhighlight %}
`val` is different from `var` in Kotlin. The difference is that `val` is a constant variable and can't be assigned multiple values, it is immutable. `var` is mutable and can be assigned multiple values.

As you might have noticed, Kotlin borrows the `Scanner` function from it's parent programming language Java.

#### C++
{% highlight cpp %}
int x;
cin >> x;
{% endhighlight %}

## 3. Arrays and the For loop

#### Python
{% highlight python %}
list1 = [1, 3, 4, 5]

for i in list:
    print(i)
{% endhighlight %}
One dimensional Arrays are called lists in Python.

#### Java
{% highlight java %}
int first_array[] = new int[6] // declaring a 1-D array with 6 elements

// initializing the array using a for loop
for (int i=0; i<6; i++){
    a[i] = 0; // this assigns every element in the array a zero value
}
{% endhighlight %}

#### Kotlin
{% highlight kotlin %}
val integers = intArrayOf(1,2,3,4) 

for (i in integers){
    println(i)
}
{% endhighlight %}

#### C++
{% highlight cpp %}
string fang[4] = {"Facebook", "Amazon", "Netflix", "Google"}
for (int i = 0; i<4; i++){
    cout << fang[i] << "\n";
}
{% endhighlight %}

## 4. Multidimensional Arrays

#### Python
{% highlight python %}
arr = [ [0,9,7,6],
        [1,2,3,4],
        [3,5,7,9]
        ]
for i in range(len(a)):
    for j in range(len(a[i])):
        print(a[i][j], end = " ")
    print() // line break
{% endhighlight %}

#### Java
{% highlight java %}
int[][] marr = new int[4][3];
{% endhighlight %}

We can take the input for the values of the array using Scaner. Or do something like this:

{% highlight java %}
{% raw %}
int [][] marr = {{1,2}, {3,4}, {5,6}};
{% endraw %}
{% endhighlight %}

#### Kotlin
{% highlight kotlin %}
val marr =  arrayOf(
    arrayOf(1,2),
    arrayOf(3,4),
    arrayOf(5,6)
)
{% endhighlight %}

Here's another way to declare and intialise multidimensional arrays in Kotlin:

{% highlight kotlin %}
var m =  Array(6,{i -> Array(5, {j -> 0})}) // a 6x5 Int array intialise all to 0
{% endhighlight %}

#### C++
{% highlight cpp %}
{% raw %}
int x[3][4] = {{0,1,2,3}, {4,5,6,7}, {8,9,10,11}};
{% endraw %}
{% endhighlight %}