---
layout: post
title:  "Notes on Android Dev - Lecture 1 - Why/What/How Android"
date:   2022-01-08 09:00:44 +0530
image: \images\january_2022\notes_on_lecture_one_android.jpg
categories: [App Development]
---
These are my notes on Lecture 1 of CS194A about the fundamentals of Android development taught by [Rahul Pandey][rahul-twitter]. 

I have not actually taken the course since I'm not in Stanford but I'm following the course on [youtube][lecture-link]. I've written the points that are worth remembering in the notes along with some of the problems I encountered while working with the code and how I fixed it, I hope it helps the learners out there!

<img src="\blog\images\january_2022\notes_on_lecture_one_android.jpg?raw=true">
You can watch the full lecture on youtube: [https://www.youtube.com/watch?v=xZEaFcn5WrE][lecture-link]

# Android Dev - Lecture 1 - Why/What/How Android

# Goals of CS194A

- Practical, hands-on experience of Building Android Apps
- Develop a portfolio of apps to show off to your friends, clients etc.
- Provide resources to learn more.
- Topics not covered: Unit testing, App architectures (MVC, MVVP etc), Game development and more
- Tip from Rahul: It’s easy to get into a rabbit hole when you get stuck at something. But if you wish to accelerate your learning, you must leverage communities. One way to do that is if you find yourself stuck at something for more than half an hour, you should write down what you’re trying to solve and post that in your community forum (for me it's [reddit][my-reddit]).

# The World of Android

- Why did they get rid of the desert naming for Android versions? (Kitkat, Lolipop, Marshmallow, Nougat, Oreo, Pie, Q...?)
- In 2014, with the release of Android 5.0 Lollipop, two major changes were introduced:
    1. Material Design which is a framework for designing UI (color schemes, animations, iconography etc.) that promotes consistent look and feel throughout all android apps.
    2. ART (Android Runtime System) replaced Dalvik as the new “application runtime environment”. An application-runtime-environment is the environment, i.e the hardware and software infrastructure, in which a program or application is executed. ART improved the system by adding features like garbage collection and AOT (ahead of time) compilation.
- Why you should care about Android Dev: Huge and growing user-base, many job opportunities now and in the future.
- If your app is just a mobile version of your website, it makes more sense to make your app using cross-platform tools like Flutter or React. But if your requries a close integration with the hardware and use of APIs or you want premium quality then Native Android is the way to go. Also big companies can often afford to have a separate Android team.

# Build an App

*Disclaimer: If you are very new to App Development and have no experience with Kotlin and Android Studio, you won’t understand most of this section and that’s okay. The next lecture is an “Introduction to Kotlin”. For now just try to understand the broad stroke of building an app in Android Studio instead of worrying about the details of what all the code means.*

Let’s dive right into android studio and build a simple app. Create a new project in android studio by clicking on File > New > New Project >  Empty Activity.

In `activity_main.xml`, add this code to create the UI for our simple app: 

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView4"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:text="Number Guessing Game"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textView3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:text="Press the button which contains the larger number"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/textView4" />

    <Button
        android:id="@+id/btnLeft"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:text="5"
        android:textSize="36sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/textView3"/>

    <Button
        android:id="@+id/btnRight"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="16dp"
        android:text="3"
        android:textSize="36sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toBottomOf="@id/textView3"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

Here’s the empty (with some boilerplate code) `MainActivity.kt` file which we will work with:

```kotlin
package com.avionmission.biggernumberwwcode

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btnLeft

    }
}
```

Rahul makes the following import to access the `btnLeft` from the UI:

```kotlin
import kotlinx.android.synthetic.main.activity_main.*
```

But when I try to do it, Android Studio throws an error and does not recognise `kotlinx` , to solve this I opened the `build.gradle(:app)` under Gradle Scripts in the Project folder, where I had to replace this part of the code:

```kotlin
plugins {
    id 'com.android.application'
    id 'kotlin-android'
}
```

With this:

```kotlin
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'kotlin-android-extensions'
}
```

Adding `id 'kotlin-android-extension` and the click on “Sync Now”.

Next step is to access the buttons in your `activity_main.xml` from your `MainActivity.kt` with the help of `kotlinx` :

```kotlin
package com.avionmission.biggernumberwwcode

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
				
				btnLeft.setOnClickListener {
					// 1. Compare the numbers in the boxes
					// 2. Pick new random numbers
				}
	}
}
```

Now we write some code for what happens when the left button is clicked:

```kotlin
btnLeft.setOnClickListener {
            // 1. Compare the numbers in the boxes
            val leftNum : Int = btnLeft.text.toString().toInt()
            val rightNum : Int = btnRight.text.toString().toInt()
            if (leftNum > rightNum) {
                // Correct
                // Change Background Color
                backgroundView.setBackgroundColor(Color.GREEN)
                // Show a toast
                Toast.makeText(this,"Correct", Toast.LENGTH_SHORT).show()
            } else {
                // Change Background Color
                backgroundView.setBackgroundColor(Color.RED)
                // Show a toast
                Toast.makeText(this,"Wrong!", Toast.LENGTH_SHORT).show()
            }
            // 2. Pick new random numbers
        }
```

You can run your app on the emulator and test it. We’ll finish building this app in the coming lectures. Next lecture is an Intro to Kotlin language.

[rahul-twitter]: https://twitter.com/rpandey1234
[lecture-link]: https://www.youtube.com/watch?v=xZEaFcn5WrE
[my-reddit]: https://www.reddit.com/user/avismission