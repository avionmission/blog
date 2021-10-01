---
layout: post
title:  "How to Convert Your .py Python Program into a .apk Android App (that doesn't crash!) | Kivymd, Buildozer Tutorial"
date:   2021-08-27 09:00:44 +0530
image: https://avionmission.github.io/assets/img/portfolio/cabin.png
categories: [Python, App Development]
---
You created an android app with python using Kivy or Kivymd, but it is still in .py format. How do you convert it into an installable .apk file that dose'nt crash for reasons you can't figure out and do it as quickly as possible? Don't worry, I got you covered. Read on.

<img src="https://avionmission.github.io/assets/img/portfolio/cabin.png">

I created a [simple rock-paper-scissor app][project1] with python using the kivy and [kivymd][kivymd-docs] packages (you can check out it's code [here][project1-code]). And then I went on a frustating journey of trying to convert it into an installable android app that doesn't crash as soon as you open it. I did it. In this post I'll simplify the process for you and how to make sure your app dose not crash.

If you have no experience with Kivy or Kivymd, you can get started with this [tutorial][tutorial-link] which teaches you to create a simple application in 9 minutes.
But even though the apps that you create using python and kivymd look great and have material design. They are still in `.py` format. So how do you convert your python programs into installable `.apk` files?

This is where the [buildozer][buildozer-doc] and [Google Collab][colab-link] comes in. Buildozer is a tool for packaging mobiles application easily. It automates the entire build process and downloads the prerequisites like python-for-android, Android SDK, NDK, etc. And Google Colaboratory, or “Colab” for short, allows you to write and execute any python code through the browser. It requires no setup to use and provides free access to computing resources including GPUs from Google.

Here is a simple step-by-step process for converting `.py` to `.apk`

## STEP 1: Use these pre-written commands
Open this [colab notebook][notebook-link], and you will find some prewritten commands. But don't execute any command yet! Come back here after checking it out and wait for my commands ;-)

<img src="images\october_2021\colab-buildozer-ss.png">

Start executing the commands one by one until you reach this command, don't execute it yet.

<img src="images\october_2021\colab-buildozer-ss2.png">

## STEP 2: Import your .py file (and assets you used in your app)
After you import your .py file, rename it to `main.py` otherwise buildozer won't recognize which python program it has to work on.

<img src="images\october_2021\colab-buildozer-ss3.png">

## STEP 3: Run the "!buildozer" init command

When you run the `!buildozer init` command, it will generate a `buildozer.spec` file, open it by double clicking on it. You can edit the contents of this file to change the package name of your app, application name, app icon, splash screen image, your baby's diapers and much more. Skim through it, see what changes you can make. But don't execute the `!buildozer -v android debug` command yet!! 

<img src="images\october_2021\colab-buildozer-ss4.png">

## STEP 4: Making sure your app doesn't crash!!
I did all this and then I executed the next command, which is `!buildozer -v android debug`. It generated a .apk file, I happily transfered it to my phone and installed. But when I opened it, it crash. I tried debugging my app, I ventured into the deep forests of Stackoverflow and Quora discussions of people who were having similar problems, but nothing worked. It took me two days to figure it out. Here's how I solved the problem.

In the contents of `buildozer.spec` file there is a requirements section. And along with `python3`,`kivy` and `kivymd` you have to add `pillow` to the requirements. Okay, now, What the hell is `pillow`!? I don't remember using any package named "pillow" in my code. Well, turns out, pillow or PIL (Python Image Library) is python package which kivymd depends on for stuff. So this is how the requirements section of your `buildozer.spec` should look like (bottom image):

<img src="images\october_2021\colab-buildozer-ss5.png">

Don't forget to save your `buildozer.spec` file after making changes.

## STEP 5: Execute "!buildozer -v android debug"
Run the `!buildozer -v android debug` and wait. It will probably take more than 15 minutes. It will ask you for confirmation by entering "y" one or two times in the middle of the process, so look out for that.

<img src =  "images\october_2021\colab-buildozer-ss6.png">

Once it's done all the processing, you'll see a new folder has appeared on the left hand side by the name `bin`. Inside the `bin` you will find a `.apk` file, transfer it in your phone. Install it, test it, and hopefully it doesn't crash. Your welcome.


[kivymd-docs]: https://kivymd.readthedocs.io/en/latest/getting-started/
[buildozer-docs]: https://buildozer.readthedocs.io/en/latest/specifications.html
[project1]: https://github.com/avionmission/rockpaperscissor-gui
[project1-code]: https://github.com/avionmission/rockpaperscissor-gui/blob/main/main.py
[tutorial-link]: https://www.youtube.com/watch?v=3Q7ytIEacBc
[buildozer-doc]: https://buildozer.readthedocs.io/en/latest/index.html
[colab-link]: https://colab.research.google.com/?utm_source=scs-index
[notebook-link]: https://colab.research.google.com/gist/kaustubhgupta/0d06ea84760f65888a2488bac9922c25/kivyapp-to-apk.ipynb