---
layout: post
title:  "Coding a GPT from Scratch (PART 1: Neural Networks)"
date:   2026-09-20 07:00:44 +0530
image: images\2026\ch1_nn.jpg
categories: [AI]
--- 

Aims of "Coding a GPT from Scratch" Series:
1. Joy of programming (how do you make a talking machine??)
2. Demystifying LLMs
3. Getting good at Python and Pytorch
4. Learning Math concepts as abstractions to be used


<iframe width="100%" height="400" src="https://www.youtube.com/embed/iFepeIP7ok4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I think a good starting point for coding a GPT-like language model from scratch is to learn **pytorch basics** and fundamentals of **neural networks**. So that's all will do in the first part before actually starting with the implementaion of our language model.

Pytorch is a python library that allows us to create and manipulate "Tensors" which are array-like objects.

Tensors are special and different from plain n-dimensional arrays for two reasons:

1. They can use GPUs for faster computations.
2. Pytorch keeps track of the operations performed on tensors during model training, which we'll see when we get into the code.

<img src="\blog\images\2026\tensors_eg.jpg">

How is a tensor library relevant to what we are trying to do here? Which is essentially to build a talking machine of sorts. An algorithm that takes in natural language as input and spits out words that make sense.

You see, computers don't really understand words they understand and process numbers. So you have to convert or *'encode'* those words into numbers that can be processed by our algorithm. 

When you give a prompt to chatgpt each word or token is encoded into numbers called *word vectors*. Your prompt goes through the model as a sequence of vectors, the model performs some operations on it, mainly matrix multiplications, to get the desired output which is another sequence of *word vectors*. 

Our job is to create a “model” that knows the right operations to perform to get the desired output. By model we mean an algorithm that **learns from data**. The more data you train the model on the more its performance improves.

<img src="\blog\images\2026\words_to_tensors.jpg">

# Neural Networks

Neural Network is one such *learning algorithm*. 

A Neural network is often represented by a graph that looks like this:

<img src="\blog\images\2026\fully_connected_nn.jpg">

Just by looking at this graph you can guess the workings of a neural networks.

The first layer of nodes have input values which are passed to the next layer of nodes. Each node is a computation performed on the values passed to it, the results of which are passed to the next layer of nodes. Which are then finally combined to get the output. That's why it's called a **"Computational Graph"** and the nodes in a neural network are called **Neurons** (*Note that the output dosent necessarily have to be a single value.*)

These inner layers apart from the input and output are called "hidden layers".

Let's take a simpler network, with just one hidden layer, to zoom in on the neurons and see what computation each neuron perform on the input.

<img src="\blog\images\2026\simple-network.jpg">

Each neuron is actually just a linear transformation. Multiply by a number (called weight), add another number (called bias).

The input `x` is fixed, the outputs `y` is what the model needs to predict. The changeable parameters are the values of Ws and Bs (the weights and biases)

Traning the neural network means tuning the values of the weights and bias until the model gets accurate outputs. "Learning" means the model the "learns" the values of weights and biases that describe the relationship between input and output with some accuracy.

That's why another name for neural networks, a more informative name, is "Universal Function Approximator". It approximates the function that describes the relationship between x and y.

But notice that this model only works if x and y have a linear relationship. Look what happens when we add these three linear equations and plot the graph between x and y. We will always get a straight line no matter what parameters we set:

<img src = "\blog\images\2026\simple_network_plot.jpg">

Adding a bunch of linear equations will only give you a linear equation. What if the relationship between x and y is non linear?

This is where we use some special functions called activation functions, one of which is ReLU. ReLU has a very simple formula:

```
f(x) = max(x, 0)
``` 

It returns the input if it's positive else zero.

See what happens when I apply ReLu function to each of the same three linear equations and graph them:
<img src = "\blog\images\2026\plot_with_activation.jpg">

Notice the three bends that we get this time. You can imagine for the right values of the parameters and by increasing the number of neurons, we can approximate any function between x and y, not matter how complex.

Now you should be starting to see why neural networks are called "Universal Functions Approximators".

The Activation Function,  helps us add non-linearity to our network.

So each neuron in a neural network is linear transformation inside an activation function. That's all it is no matter how complex the network, a single neuron is actually very simple.

I’ll show you another example, here the actual relationship between x and y was `y = x^3 + x^4`, shown by the red curve. I trained a neural network on a dataset of x and y values  which is represented by the blue line:
`
<img src="\blog\images\2026\function_approximation.jpg">

Watch how the network starts as a straight line and slowly curves as the weights and bias values change till it takes the shape which approximates the curve that describes the actual relationship between x and y.

## Backpropgation

But what is the process of changing the weight and bias values? In other words what is the learning process itself? So far we have only seen the structure of a neural network, let's take a look at it's working.

Here are the exact steps to make the network learn:

1. First we need a dataset that contains input values with correspoding output values. Initially the weights and biases are given random values so our prediction `y` will be far from the correct outputs.
2. Pass each row of the input through the network to get a prediction. This is called **Forward Pass**. Let's call the predicted value of y `predicted_y`.
3. Calculate the error. You can do that by subtracting the actual y by `predicted_y`. This value will tell us how bad the network did. The function that tells us how bad the network did is called the **loss function**  A better loss function would be the square of the difference between actual y and `predicted_y`. Because firstly, squaring ensures you always get positive value so we can focus on trying to get the loss value as close to zero as possible, and secondly it imposes a larger penalty when the model is wrong.
4. We use this loss value to adjust our weights. By calculating the **derivative** of the loss function w.r.t to each weight and bias. A `derivative` or `gradient`, written as `dy/dx` is a function that tells you how much y changes for a very small change in x. In our case we need to compute dL/dw. So if the derivative is a positive value it means increasing the w, also increases L. If the derivative is a negative value it means increasing w leads to a decrease in L. **So we can simply use this formula to adjust each weight after a forward pass:**
```
w_new = w_old - d(w_old)/dL
```
We can change the pace of the adjustment by multiplying a fraction such as 0.01 to the gradient. This helps to adjust the weight slowly and ensure the learning process is stable. This number is called the learning rate.
5. We continue this process for each row until all the rows are processed, i.e the entire dataset is processed. This is one epoch. We usually train our model for many epochs.

## Applying a Neural Network to the Housing Dataset

Let's take an example dataset and train neural network on it using the Pytorch's deep learning utilities.

```python
from sklearn.datasets import fetch_california_housing
import torch
import pandas as pd

data = fetch_california_housing(as_frame=True).frame

data.head()
```

This is a textbook example of a machine learning problem but a neural network can also be applied to it. Each row in this dataset gives you information about the houses in a particular area or block in California. 

The problem statement is this: If you get information about a new block (one that is not present in our dataset) can we predict its median house price with some accuracy?

Observe that we have 8 input columns, the last column MedHouseVal is the target that we have to predict. Let’s split the data into training and testing sets using helper functions from the `sklearn` library:

```python
from sklearn.model_selection import train_test_split

X = data.drop(columns=["MedHouseVal"]).values
y = data["MedHouseVal"].values

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
    )
```
We also need to scale the inputs. All the input values need to be brought to the same scale, so large numbers don't destabelize the learning process. We'll use another helper function for that.

```python
# Scaling
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
```

The last thing we need to do before implementing our Neural Network is to convert these arrays into Tensors:

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

# Hidden Layer 1
W1 = torch.randn(8, 12, requires_grad=True)
b1 = torch.zeros(12, requires_grad=True)

# Hidden Layer 2
W2 = torch.randn(12, 6, requires_grad=True)
b2 = torch.zeros(6, requires_grad=True)

# Output layer
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
`loss.backward()` computes the derivative of the loss function with respect to every weight and bias in the network and stores those derivatives in each parameter’s `.grad` attribute of the tensor.

<img src = "\blog\images\2026\housing_eval.jpg">

You can observe how the loss reduces in every epoch. The RMSE tells us how wrong our model is in the actual units of the data, so it can be interpreted that our model roughly makes an error of 69K when predicting the house prices. As far as regression models got its not bad, it sure sounds bad.

The performance can be improved a lot if you use pytorch utilities, better optimizer and tune the hyper-parameters such as the learning rate. But the point of this exercise was to show the inner workings of a Neural Network.

**In the next part we will use this knowledge of neural networks in working with text data and make some progress in implementing our language model!** 
