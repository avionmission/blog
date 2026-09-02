---
layout: post
title:  "Coding a GPT from Scratch (PART 1: Neural Networks)"
date:   2026-08-31 07:00:44 +0530
image: images\2026\ch1_nn.jpg
categories: [AI]
--- 

Aims of "Coding a GPT from Scratch Series":
1. Joy of programming (how do you make a talking machine??)
2. Demystifying LLMs
3. Getting good at Python and Pytorch
4. Learning Math concepts as abstractions to be used


<img src="\blog\images\2026\ch1_nn.jpg?raw=true">

I think a good starting point for coding a GPT-like language model from scratch is to learn pytorch basics and deep learning fundamentals. So that's what all will do in the first part.

What is Pytorch? Pytorch is a python library that allows us to create and manipulate "Tensors" which are array-like objects. They are a generalisation of vectors and matrices. So a single value (a scalar) is a 0-D tensor, vectors are 1-D tensors, matrices are 2-D tensors and so on. You can tell the dimensions of a tensor by how many indices you need to access a single element of a tensor.

What makes pytorch tensors special and different from plain n-dimensional arrays is that it can use GPU to speed up computation and it keeps a track of the operations performed on tensors during model training, which we'll see when we get into the code. 

<img src="\blog\images\2026\tensors_eg.jpg">

How is it relevant to what we are trying to do here, which is essentially to build a talking machine of sorts, an algorithm that takes in natural language as input and spits out words that sound like they make sense.

Computers don't really understand words they understand and process numbers. So you have to convert or 'encode' those words into numbers that can be processed by our algorithm. When you give a prompt to chatgpt each word or token is encoded into numbers called word vectors. It goes through an algorithm performing some operations, mainly matrix multiplications, to get the desired output. 

Our job is to create a “model” that knows the right operations to perform to get the desired output. By model we mean an algorithm that learns from data. The more data you train the model on the more its performance improves.

<img src="\blog\images\2026\words_to_tensors.jpg">

# Neural Networks

Neural Networks is one such algorithm. Let’s get an example dataset before I explain how a neural network works.

```python
from sklearn.datasets import fetch_california_housing
import torch
import pandas as pd

data = fetch_california_housing(as_frame=True).frame

data.head()
```

This is a textbook example of a machine learning problem but a neural network can also be applied to it. Each row in this dataset gives you information about the houses in a particular area or block in California. If we get information about a new block (one that is not present in our dataset) can we predict its median house price with some accuracy?

Observe that we have 8 input columns, the last column `MedHouseVal` is the target that we have to predict. How do we use a Neural Network to create a model that can make this prediction?

Now look at this graph for a Neural Network:

<img src="\blog\images\2026\fully_connected_nn.jpg">

Data goes in the input nodes. Then the input is passed to these inner nodes which are called the “hidden layer” which are all combined to finally obtain the output which in our example is the Median house price of that area.

So each node is a computation, let's take a simpler network to zoom in on the nodes and what computation is each node performing exactly.

<img src="\blog\images\2026\simple-network.jpg">

Suppose we have one input x and one output y. Each node is actually just a linear transformation. Multiply by a number (called weight), add another number (called bias). Scaling and offset.

The input x, we know. Output y is what we have to obtain. But what are the values of weights `w1`, `w2` and biases `b1`,`b2` ? Initially they get random values so our prediction `y` will be way off. As we train the model on your dataset, the values of these weights and biases will change such that we get more and more accurate outputs. We’ll discuss the process by which we change these values in a minute but first i have to address what is missing in this model.

This model only works if x and y have a linear relationship. Look what happens when we add these linear equations and plot the graph. We will always get a straight line no matter what the coefficients are:

<img src = "\blog\images\2026\simple_network_plot.jpg">

Adding a bunch of linear equations will only give you a linear equation. Each neuron in a neural network is a linear transformation.

So how will our model learn when there is a non-linear relationship between input and output like in our example between x and y. This is where we use some special functions called activation functions, one of which is ReLU. ReLU has a very simple formula:

```
f(x) = max(x, 0)
``` 

Now see what happens when I apply ReLu function to each of the same three neurons and graph them:
<img src = "\blog\images\2026\plot_with_activation.jpg">

Notice the three bends that we get this time. So you can imagine for the right values of the coefficients and by increasing the number of neurons or using a different activation function, we can approximate any curved function between x and y.

This is why another name for neural networks is “Universal Function Approximator”. So now we add the missing piece in our simple network. The Activation Function, which helps us add non-linearity to our network. Each neuron in a is just the input multiplied by a number called weight, added to a number called bias and the whole thing goes inside an activation function like ReLU.

I’ll show you another example, here the actual relationship between x and y was x = x^3 + x^4, shown by the blue curve. I trained a neural network on a dataset of x and y values  which is represented by the red line:

<img src="\blog\images\2026\function_approximation.jpg">

Watch how the network starts as a straight line and slowly curves as the weights and bias values change till it takes the shape which approximates the curve that describes the actual relationship between x and y.

Learning basically meanings changing the weight and bias values in the neurons until our function approximates the actual ground truth of the relationship between the input and output.

What is the process of changing the weight and bias values, in other words what is the learning process? 

Suppose we have a dataset which has thousands of x and y values. Here’s how the learning process (called gradient descent) works:
- We go through each row in the data. This is called **Forward Pass**: Pass the input “x” through the network and you'll get a predicted value of y, let's call it `y_pred`. We need a function that tells us how wrong our model is, called the **loss function**. One of these functions is the Mean Squared Error `(y - y_pred)^2`. Why the square? Why not simply `y - y_pred`? Because firstly, squaring ensures you always get positive value so we focus on trying to get the loss value as close to zero as possible, and it imposes a larger penalty when the model is wrong.
- We use this loss function to adjust our weights. By calculating the **derivative** of a weight w.r.t the loss function. You can think of a derivative as a function that tells you how much L changes for a small change in w.
- We continue the process for each row until all the rows are processed, i.e the entire dataset is processed. This is one epoch, when we train the model on the entire dataset once. Model training often requires many epochs.

## Applying a Neural Network to the Housing Dataset

Back to the housing dataset. We got 8 input columns and 1 target column. Let’s separate them, split them into training and testing sets using helper functions from the `sklearn` library:

```python
from sklearn.model_selection import train_test_split

X = data.drop(columns=["MedHouseVal"]).values
y = data["MedHouseVal"].values

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
    )
```
We also need to scale the inputs. What is scaling? Let’s say you are predicting a person’s monthly expenditure based on his age and salary, now salary is in the range of 1000s while age is in the range of 20 to 60. So numerically salary has higher value so your model can start to give more weight to salary than age. Even though age is also an important predictor of a person’s expenditure. So it will be helpful to represent salary in a range of 0 to 1, 1 being 100,000 and age also in a range of 0 to 1, 1 being 100 years.

```python
# Scaling
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
```

The last thing we need to do before implementing our Neural Network is to convert these into Tensors:

```python
# Convert them into pytorch tensors
X_train = torch.tensor(X_train, dtype=torch.float32)
X_test = torch.tensor(X_test, dtype=torch.float32)
y_train = torch.tensor(y_train, dtype=torch.float32).reshape(-1,1)
y_test = torch.tensor(y_test, dtype=torch.float32).reshape(-1,1)
```

You can think of `.reshape(-1,1)` as turning [y₁, y₂, y₃, ...] into [[y₁], [y₂], [y₃], ...]

There are easier ways to implement a neural network using pytorch’s utility functions and classes but we are doing it in a more manual way because I want you to see the inner workings of a neural network.

We’ll start by designing the network:

```python
# Design the network

input_dim = X_train.shape[1]

W1 = torch.randn(input_dim, 12, requires_grad=True)
b1 = torch.zeros(12, requires_grad=True)

W2 = torch.randn(12, 6, requires_grad=True)
b2 = torch.zeros(6, requires_grad=True)

W3 = torch.randn(6, 1, requires_grad=True)
b3 = torch.zeros(1, requires_grad=True)
```

So the network looks something like this:
<img src = "\blog\images\2026\housing_nn.jpg">

The `requires_grad` parameter tells pytorch to track the operations on each tensor, which helps to calculate gradients later.

Now we define our activation function and the loss function:
```python
# ReLu
def relu(x):
  return torch.maximum(x, torch.tensor(0.0))
# Mean square error
def loss_fn(y_pred, y_true):
  return ((y_pred - y_true)**2).mean()
```

The Forward pass function:
```python
# Forward pass
def forward(x):
  x = relu(x @ W1 + b1)
  x = relu(x @ W2 + b2)
  x = x @ W3 + b3
  return x
```

We’ll define hyperparameters:
```python
LR = 0.01 # learning rate
epochs = 5000
```

Finally here’s the training loop:
```python
for epoch  in range(epochs):
  # Clear old gradients/derivatives
  for x in [W1, b1, W2, b2, W3, b3]:
      x.grad = None

  y_pred = forward(X_train)
  loss = loss_fn(y_pred, y_train)

  loss.backward()

  # Update the weights
  with torch.no_grad():
    for x in [W1, b1, W2, b2, W3, b3]:
      x -= LR * x.grad

  if (epoch+1) % 500 == 0:
    print(f"Epoch: {epoch+1}, Loss: {loss.item()}, RMSE:{loss.item()**0.5}")

```
`loss.backward()` computes the derivative of the loss function with respect to every weight and bias in the network and stores those derivatives in each parameter’s `.grad` attribute.

<img src = "\blog\images\2026\housing_eval.jpg">

You can observe how the loss reduces in every epoch. The RMSE tells us how wrong our model is in the actual units of the data, so it can be interpreted that our model roughly makes an error of 69K when predicting the house prices. The performance can be improved a lot if use pytorch utilities, better optimizer and tune the hyper parameters. But the point of this exercise was to show the inner workings of a Neural Network.

**In the next part we will use this knowledge of neural networks in working with text data and make some progress in implementing a GPT-like language model!**




 
