---
layout: post
title:  "RecyclerView Explained Step-by-Step: Android Development 101"
date:   2022-02-14 09:00:44 +0530
image: \images\march_2022\RecyclerView_explained.jpg
categories: [Mobile Development]
---
In this tutorial series, we will learn about all the essential and fundamental tools and concepts that you should know as an android developer. Today's topic is RecyclerView.

Almost every app that you use displays a scrollable list of items, be it connectivity apps like Instagram, WhatsApp and Twitter or utility apps like Todoist, Pocket and Notion. 

The most efficient tool to display a scrollable list of items in Android Programming is the `RecyclerView`. 

<img src="\blog\images\march_2022\RecyclerView_explained.jpg">

# Fundamentals of UI in Android
Views are the fundamental building-blocks of user interface components in Android. You must have come across different Views such `TextView`, `EditText` and `ContraintLayout` which is a `ViewGroup`. ViewGroups are views which can contain other views. `RecyclerView` is one such `ViewGroup` which can contain a list of `Views`.

# Why Use RecyclerView? - RecyclerView vs ListView
Let's say that you have 100 items in your data-set that you want to display as a scrollable list, but only 5 items can be visible to the user on the screen at a time, owing to the constrains of the screen size. If we a use a ListView, 100 View Objects will be created to contain these 100 items. This is expensive as far as efficiency is concerned. RecyclerView makes the process much more efficient by creating only 5 view-objects (since that is the number of items visible on the screen at a time) and *recycles* the views with updated data to contain the rest of the items using things like `ViewHolder`, `Adapter` and `LayoutManager` (more about these in a second). Let's jump right into Android Studio to see how it actually works by coding an app that display a list of your twitter contacts. The app that we will code in this tutorial will look like this:

<img src="\blog\images\march_2022\final_recycler_view.gif">

## Step 1: Plan your Layout
Create a new project -> empty activity in Android Studio. We will start by editing the Activity Layout `activity_main.xml` which by default contains a `ConstraintLayout` with a `TextView`. But we don't need them because we want the entire layout to contain a `RecyclerView`. So remove the `TextView` and replace the `ConstraintLayout` with a `RecyclerView`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.recyclerview.widget.RecyclerView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/ContactList"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">



</androidx.recyclerview.widget.RecyclerView>
```

Next we need to design how each element in the list is going to look like and behave. For that, we will define a new layout file `item_view.xml` in the `res/layout` folder:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="horizontal"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="16dp"
    android:gravity="center_vertical"
    android:id="@+id/container">

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <TextView
            android:id="@+id/contactName"
            style="@style/TextAppearance.AppCompat.Headline"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="textView" />

        <TextView
            android:id="@+id/contactNumber"
            style="@style/TextAppearance.AppCompat.Body1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="0000000000" />
    </LinearLayout>

    <View android:layout_weight="1" android:layout_width="wrap_content" android:layout_height="0dp"/>

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="right"
        android:text="CALL" />

</LinearLayout>
```

This is how our design looks like:

<img src = "\blog\images\march_2022\item_view_recycler_view.jpg">

## Step 2: Edit Gradle Files
In `Gradle Scripts/build.gradle` add this under `dependencies` :
```json
implementation 'androidx.recyclerview:recyclerview:1.2.1'
```
And under `plugins`, add `id 'kotlin-android-extensions'`

Click `Sync Now`, once that's done we will be able to use kotlin-extensions and recyclerview in our project.

## Step 3: Creating the Adapter Class
In android, an Adapter is the bridge between UI components and data source that helps us to fill data in UI components, also called `data binding`. In RecyclerView, the `Adapter` creates `ViewHolder` objects which are wrappers around Views that contain layouts for each individual item in the list. So let's create a `ViewHolder` class in our Adapter class. Create a new  Kotlin class called `MyAdapter` in your project sub-folder where `MainActivity.kt` exists, and add this code:

```kotlin
package com.avionmission.rvpractice3

import androidx.recyclerview.widget.RecyclerView

class MyAdapter {
    inner class MyViewHolder(itemView: View): RecyclerView.ViewHolder() {
        var contactName = itemView.findViewById<TextView>(R.id.contactName)
        var contactNumber = itemView.findViewById<TextView>(R.id.contactNumber)
    }
}
```
In `MyViewHolder` class, we added some references to the Views in our `item_view.xml` layout file, that we will use later.

Now, we will make `MyAdapter()` class inherit `RecyclerView.Adapter` and pass the `MyViewHolder()` class to it:
```kotlin
class MyAdapter(): RecyclerView.Adapter<MyAdapter.MyViewHolder>(){
```
This will throw an error in android studio, click on the red bulb that appears when you hover over `class MyAdapter()` and you will see the option to `Implement Members`, click on it and you will see the following options:

<img src="\blog\images\march_2022\member_functions_myadapter.jpg">

Select all, and click OK.

This automatically generate three functions:
```kotlin
class MyAdapter(): RecyclerView.Adapter<MyAdapter.MyViewHolder>(){
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        TODO("Not yet implemented")
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        TODO("Not yet implemented")
    }

    override fun getItemCount(): Int {
        TODO("Not yet implemented")
    }

    inner class MyViewHolder(itemView: View): RecyclerView.ViewHolder() {
        var contactName = itemView.findViewById<TextView>(R.id.contactName)
        var contactNumber = itemView.findViewById<TextView>(R.id.contactNumber)
    }
}
```

## Step 4: Creating a Data Class

`Data Class` is a class that only contains data and does not perform any operation. The advantage of using the `data` keyword is that kotlin provides us many functionalities for data classes.

In the `MainActivity.kt` we will create a `Data Class`, we will name it `Contact`, so add this just above the `class MainActivity` and below the imports:

```kotlin
data class Contact(val title:String, val number:Int)
```

In `MyAdapter.kt` we will change the parameter of `MyAdapter` to take in the Data Class we created:

```kotlin
class MyAdapter(val contacts: List<Contact>): RecyclerView.Adapter<MyAdapter.MyViewHolder>(){
```

## Step 5: Building the Adapter Class

Let's start adding code to the three member functions of the adapter class one by one, starting with `onCreateViewHolder()`. As the name suggests, this function is called when a ViewHolder is created. Once a ViewHolder is created, it needs to hold a View, and we will derive that view from the `item_view.xml` that we created earlier in Step 1.  To do that we will use `LayoutInflater`, which converts xml code into java/kotlin objects which can be rendered on screen. 

Here's how `onCreateViewHolder()` should look like:
```kotlin
override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        val view = inflater.inflate(R.layout.item_view, parent, false)
        return MyViewHolder(view)
    }
```

But how will the data that will be filled in the Views reach the adapter? For that we will add a List called `contacts` in the parameters of our `MyAdapter()` class:

```kotlin
class MyAdapter(val contacts: List<Contact>): RecyclerView.Adapter<MyAdapter.MyViewHolder>(){
```

The next member function that we will edit is the `getItemCount()`, which simply returns the number of items in the list `contacts`.:
```kotlin
    override fun getItemCount(): Int {
        return contacts.size
    }
```

That leaves us with only one member-function to deal with, which is `onBindViewHolder()`, which `binds` the data i.e fill the data in the UI components:

```kotlin
    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        holder.contactName.text = contacts[position].title
        holder.contactNumber.text = contacts[position].number.toString()
    }
```

## Step 6: Implementing the Adapter in MainActivity

Now we need data to pass to the adapter, so create a list of contacts in `MainActivity()`:
```kotlin
val myContacts= mutableListOf<Contact>()
```

Then add items to this list, enough items to make it scrollable, which will be in the form of the Contact data class we created earlier:
```kotlin
        myContacts.add(Contact("Elon Musk", 1234567890))
        myContacts.add(Contact("Jeff Bezos", 1234567890))
        myContacts.add(Contact("Bill Gates", 1234567890))
        myContacts.add(Contact("Warren Buffett", 1234567890))
        myContacts.add(Contact("Larry Page", 1234567890))
        myContacts.add(Contact("Sergey Brin", 1234567890))
        myContacts.add(Contact("Larry Ellison", 1234567890))
        myContacts.add(Contact("Steve Ballmer", 1234567890))
        myContacts.add(Contact("Ratan Tata", 1234567890))
        myContacts.add(Contact("Mukesh Ambani", 1234567890))
        myContacts.add(Contact("Gautam Adani", 1234567890))
        myContacts.add(Contact("Michael Bloomberg", 1234567890))
        myContacts.add(Contact("Mark Zuckerberg", 1234567890))
        myContacts.add(Contact("Zhong Shanshan", 1234567890))
        myContacts.add(Contact("Charles Koch", 1234567890))
```

Open `activity_main.xml` and you will notice we had set the id of our parent element `RecyclerView` to be `contactList`. We will reference our recycler view `contactList` and set it's adapter and `LayoutManager`:

```kotlin
        ContactList.adapter = MyAdapter(myContacts)
        ContactList.layoutManager = LinearLayoutManager(this)
```

`layoutManager` is responsible for measuring and positioning item views within a RecyclerView, it lays out the items in a grid.

Run your app in the emulator and you should see this:
<img src="\blog\images\march_2022\final_recycler_view.gif">

# Conclusion
This process would have been easier if we simply used a `ListView`, but it is much more efficient to use `RecyclerView` when dealing with large amount of data. We learned how to code the layout files, Adapter and ViewHolder classes, and use `Data Class` to store data. You can ask any questions or doubts you may have in the comments.