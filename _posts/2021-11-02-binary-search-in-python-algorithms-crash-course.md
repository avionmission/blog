---
layout: post
title:  "Algorithms Crash Course #2: Arrays, Binary Search, and Simple Search in Python"
date:   2021-11-02 09:00:44 +0530
image: images\november_2021\binary_search_in_python_thumbnail.png
---
RECAP: In the [last chapter][last-chapter] we learned how we evaluate and compare the efficiency of algorithms and represent that efficiency using something called the Big-O notation. Here are some graphs of some common runtimes and their efficiency in Big-O notation.

<img src="\blog\images\november_2021\binary_search_in_python_thumbnail.png?raw=true">

Searching and Sorting are the two biggest obsessions of computer scientists and the reason for that is not that obvious until you learn about sorting algorithms and start seeing them everywhere. Google, the biggest tech giant of our age, was able to crush its competitors because it has the best sorting algorithm that takes millions of web pages and sorts them out so that you get exactly what you were looking for on the first page, and it does that in a matter of seconds. That's not an easy problem to solve. The same goes for the algorithms of Amazon, Netflix, and all the social media sites. Let's learn searching algorithms today, pull out your python, and by that, I mean whatever software you use for coding.

### Arrays and Lists
An Array is just a series of items. It is the most common and simple data structure. Here's how you define an array in python:

{% highlight python %}
x = [56,67,78,89,92]
{% endhighlight %}

And this is how you access the first element of an array:

{% highlight python %}
print(x[0])
{% endhighlight %}

The index number of the first element of an array is 0 and for the second element, it is 1, and so on. A useful hack to know regarding arrays in python is that you can access the last element of your array like this:

{% highlight python %}
last = x[-1]
print(last)
{% endhighlight %}

Similarly, the index number of the second-last item of an array is -2 and so on. You can slice the array and create subarrays using the `:` symbol like this:

{% highlight python %}
y = x[2:4]
{% endhighlight %}

The above code slices the array `x` into a subarray that contains an element with index number 2, the third element, and the element with index number 3, and stores that subarray into another variable `y`.

But I lied to you this is not really an `array`, it's a `list`! So what's the difference between an array and a list, although they look the same. Well, python doesn't allow us to create pure arrays by default like other programming languages, instead, it provides us with a special data structure called `list`, which is basically an array with superpowers. Arrays have fixed size while lists don't, you can keep adding elements to a list. It's easier to modify the elements of a list. Arrays can store elements of only one data type while with lists you can store integers, strings, and boolean values all in the same list like this:

{% highlight python %}
list1 = ["hey", 23, 0.89, True]
{% endhighlight %}

For the sake of this tutorial, let's pretend x is a list.

## Simple Search Algorithm

If I tell you to write a program that allows the user to enter a number and search that number in the array to return its position or index number, how would do it?

Let's write a function using python that could do it:

{% highlight python %}
def SimpleSearch(arr, user_input):
	for i in range(len(arr)):
		if arr[i] == user_input:
			return i
{% endhighlight %}

Let's understand it line by line.

1. We define a function in python named `SimpleSearch` and add two parameters to it `arr` the array that we want to search through and `user_input` the number we want to search.

{% highlight python %}
def SimpleSearch(arr, user_input):
{% endhighlight %}

2. Then we use a for loop to search to search through `range(len(arr))`:

{% highlight python %}
for i in range(len(arr)):
{% endhighlight %}

Now `len()` is a function in python used to get the length of an array like this:
{% highlight python %}
print(len(arr))
{% endhighlight %}

Output:
{% highlight python %}
5
{% endhighlight %}

And `range()` is a function that changes a number into a list with the length of that number starting with `0` as the first element, like this:

{% highlight python %}
print(list(range(5)))
{% endhighlight %}

Output:
{% highlight python %}
[0,1,2,3,4]
{% endhighlight %}

3. The `for loop` runs through the entire array and checks if any element in the array `a[i]` is equal to the `user_input`. If the condition is true, the function returns the position or intext number `i` of the element:

{% highlight python %}
if arr[i] == user_input:
    return i
{% endhighlight %}

We can test this function on our array `x` :

{% highlight python %}
print(SimpleSearch(x,89))
{% endhighlight %}

Our algorithm searches through the array and returns the position of the item with a value of 89:

{% highlight python %}
3
{% endhighlight %}

Can you tell me the efficiency of this algorithm in [Big-O notation][last-chapter]? I'll give you a hint: Simple search is also called Linear Search. Its [time complexity][last-chapter] is O(n). But why? Recall that [time complexity][last-chapter] is simply the number of steps an algorithm requires. If we have `n` items in our array then our Simple Search function could find the searched item in 1 step if it's lucky and the searched item is the first item. But the worst-case scenario is that it will take `n` steps for the algorithm to search the item and remember [Big-O][last-chapter] always expresses the worst-case scenario of an algorithm.

So Linear Search or Simple search is not a very efficient algorithm. It may work fine for small lists but when an array contains a huge number of items we need a lot faster searching algorithm.

## Binary Search Algorithm

Luckily we have a fast searching algorithm and it's called Binary Search, but there is one condition for using it. The items in the array need to be sorted. Sorting algorithms will be covered in the next chapter. If you haven't noticed, the array that we have been using in this tutorial is already sorted in ascending order.

Before we implement it in python, let me explain how binary search works. Here is an example: I will think of a random number between 1 and 20. How many attempts would it take you to read my mind? Worst case 20, best case 1. That's because you are using a simple search: you go through every number from 1 to 20 to check if it's the number I have in mind. But if in addition to telling you that you have guessed the wrong number, I also tell you whether your guess is too high or too low, things get easy. Your first guess should be 10, if say too high, you only have to guess between 1 to 10. Then you guess 5, if I say too low, you only have to guess between 5 to 10 and so on. It's probably going to take you 5 attempts in a worst-case scenario. This is how Binary Search works it keeps splitting the array into halves until it finds the searched item.

Let's look at the implementation of the Binary Search Algorithm in python and then we will understand it line by line:

{% highlight python %}
def binary_search(arr, item):
	low = 0
	high = len(arr) - 1

	while low <= high:
		mid = int((low + high)/2)
		guess = arr[mid]
		if guess == item:
			return mid
		if guess > item:
			high = mid - 1
		else:
			low = mid+1
	return None
{% endhighlight%}

1. We define a function, name it `binary search`, and add two parameters to it `arr` the array we have to search through and `item`, the item that we are looking for.

{% highlight python %}
def binary_search(arr, item):
{% endhighlight %}

2. Then we define a variable `low` and set its value to `0` which is the index of the first element of an array. Another variable `high` which equals `len(arr) - 1` which is the index of the last element of the array.

{% highlight python %}
low = 0
high = len(arr) - 1
{% endhighlight %}

3. Then we use a `while` loop which will run until it returns the index of the item that is searched. Within the `while` loop we define a new variable `mid`, which is the midpoint between `high` and `low`.

{% highlight python %}
while low <= high:
	mid = int((low + high)/2)
{% endhighlight %}

We use `int` function to turn decimal numbers into whole numbers because you can't have an index number of 2.5, for example, so `int()` turns 2.5 into 2. Is `mid` the correct index number? We'll see, we define a variable `guess` which equals the element in our array with index `mid`:

{% highlight python %}
guess = arr[mid]
{% endhighlight %}

4. We use `if-else` statements to check if our guess is correct, high, or low. And adjust the values of `low` and `high` accordingly.

{% highlight python %}
if guess == item:
    return mid
if guess > item:
    high = mid - 1
else:
    low = mid + 1
{% endhighlight %}

Now if we test our function `binary_search` we can see that it correctly finds the position of any item that we search in the array.

The binary search algorithm has a time complexity of `O(log n)` which is very fast compared to `O(n)` if you recall the last chapter. But it only works if the data it is searching through is sorted, otherwise, we will have to go with the slow linear search algorithm. In the next chapter two important algorithm paradigms: `Divide & Conquer` and `Recursions`. Which will prepare us for sorting algorithms. See you next time.


[last-chapter]: https://avionmission.github.io/blog/time-complexity-simply-explained-algorithms-crash-course/




