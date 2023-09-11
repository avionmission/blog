---
layout: post
title:  "KivyMD Tutorial for Beginners: Create an Instagram Clone in Python!"
date:   2021-11-16 09:00:44 +0530
image: images\november_2021\kivymd_tut_insta_clone.png
categories: [Python, Mobile Development]
excerpt: In this tutorial series you will build an Instagram clone using Python. We will learn kivy and kivymd libraries along the way.
---
<img src="\blog\images\november_2021\kivymd_tut_insta_clone.png?raw=true">
<em>Watch the video version of this post here: [https://youtu.be/giSh7TDoCUMs][video-link] </em>

The best way to learn any framework or tool is to learn by building something. Kivy and kivymd are no different. You can use these tools to create android apps and IoS apps using Python programming language. In this tutorial, we will learn kivy and kivymd by making an Instagram Clone. So let's begin. But before that make sure you have kivy and kivymd installed. If you use PyCharm IDE you will find the "Python Packages" section down at the bottom, you go there and search for whatever packages you want to install and install them directly.

Start by creating a new project in PyCharm and create a new `.py` file named `main.py`. This is entry point of your application which will branch to other screens and pages. 

## Part 1: The Basics of KivyMD

Let's begin importing some stuff from kivymd library that we'll use:

{% highlight python %}
from kivymd.app import MDApp
from kivymd.uix.label import MDLabel
{% endhighlight %}

Then we will create a class `MainApp`, and in paranthesis `()` we write `MDApp`. By doing this you are telling python that our class `MainApp` *extends* the class `MDApp` which we imported in the beginning. 

{% highlight python %}
class MainApp(MDApp):
{% endhighlight %}

When a class *extends* another class, it inherits all the functions of the parent class. Then we will define a function within our `MainApp` class called `build`. 

{% highlight python %}
    def build(self):
        return MDLabel(text="Testing..1..2..3", halign="center")
{% endhighlight %}

We imported `MDLabel` from kivymd library earlier. `MDLabel` is a UI element which displays text. Our build function returns an `MDLabel` with text "Testing...1..2..3" and we set it's horizontal alignment attribute `halign` to center. Finally at the end of your code initialise our `MainApp()` class:

{% highlight python %}
MainApp().run()
{% endhighlight %}

Now run our `main.py` program and you should see this:

<img src="\blog\images\november_2021\kivymd_hello_world_program.png?raw=true">

This is the most basic Kivymd program that one can write. Here's the entire code:

{% highlight python %}
from kivymd.app import MDApp
from kivymd.uix.label import MDLabel


class MainApp(MDApp):
    def build(self):
        return MDLabel(text="Testing..1..2..3", halign="center")


MainApp().run()
{% endhighlight %}

Get ready guys, we are going to turn this hello-world program into Instagram. But first let's make the size of the window of our application more phone-like:

<img src="\blog\images\november_2021\kivymd_window_size.png?raw=true">

Within the `build(self)` function, add this as the first line of code:

{% highlight python %}
Window.size = [300, 600]
{% endhighlight %}

But we have not imported `Window` so add this in the beginning of your code:

{% highlight python %}
from kivy.core.window import Window
{% endhighlight %}

## Part 2: Designing Appbar, Modifying text, icon buttons and Box Layout.

Create a new file called `home_page.kv` in the your project folder. We will the write the UI of our home-page screen in `home_page.kv` using a very simple css-like syntax that comes with kivy. As you will see it makes thing a lot easier.

Add this code above the `MainApp` class in `main.py`:

{% highlight python %}
from kivymd.uix.screen import MDScreen

class HomePage(MDScreen):
{% endhighlight %}

We imported `MDScreen` from kivymd and create a class named `HomePage` which extends `MDScreen` that we just imported. Since our class is empty, it will show an error. Just write some string with in the class to remove the error, like this:

{% highlight python %}
from kivymd.uix.screen import MDScreen

class HomePage(MDScreen):
    'Home Page'
{% endhighlight %}

Now let's add stuff to `home_page.kv`:

{% highlight python %}
<HomePage>:
    MDBoxLayout:
        MDLabel:
            text: 'Instagram'
            halign: 'center'
{% endhighlight %}

Writing `<HomePage>:` tells kivy that the contents the lie ahead belong to the class `HomePage`. Everything is a widget in kivy and kivymd. We used one widget in the beginning called `MDLabel` for displaying text. Here we use another widget called `MDBoxLayout` which lays out or organises elements on the screen. We set it's padding to `5dp`. `dp` is a unit of measurement and it stands for "device independent pixels".

Within `MDBoxLayout` we add a `MDLabel` and set it's attributes like we did earlier. But earlier we were using python and now we are using the [KV language][KV-lang-doc] which is much simpler. You can checkout all the kivymd widgets and how to use them in [kivymd documentation][kivymd-doc]. It's very useful and we will refer to it all the time.

Let's add some more properties to our `MDLabel` and `MDBoxLayout`:

{% highlight python %}
<HomePage>:
    MDBoxLayout:
        padding: '5dp'
        adaptive_height: True

        MDLabel:
            text: 'Instagram'
            halign: 'center'
            valign: 'center'
            font_size: 25
{% endhighlight %}

I added vertical alignment and font size. Let's change the font size as well. Go to this [this link][tut-files] and download the `Instafont.otf`. Create a new folder in your project folder called `assets` and move `Instafont.otf` in that directory. We will now change the `font-name` attribute to 'assets/Instafont.otf' which is the address of the font file:

{% highlight python %}
<HomePage>:
    MDBoxLayout:
        padding: '5dp'
        adaptive_height: True

        MDLabel:
            text: 'Instagram'
            halign: 'center'
            valign: 'center'
            font_size: 25
            font_name: 'assets/Instafont.otf'
{% endhighlight %}

But wait! Our `main.py` still dosen't know anything about `home_page.kv`. Here is our code untill now:

{% highlight python %}
from kivymd.app import MDApp
from kivymd.uix.label import MDLabel
from kivy.core.window import Window
from kivymd.uix.screen import MDScreen


class HomePage(MDScreen):
    'Home Page'

class MainApp(MDApp):
    def build(self):
        Window.size = [300, 600]
        return MDLabel(text="Testing..1..2..3", halign="center")


MainApp().run()
{% endhighlight %}

Replace the `return MDLabel...` argument of your `build` function with this:

{% highlight python %}
return HomePage()
{% endhighlight %}

And we need to load `home_page.kv`, so just above `return HomePage()` add:

{% highlight python %}
Builder.load_file('libs/screens/home_page.kv')
{% endhighlight %}

And import `Builder` as well:

{% highlight python %}
from kivy.lang import Builder
{% endhighlight %}

Now your code should look like this:

{% highlight python %}
from kivymd.app import MDApp
from kivy.core.window import Window
from kivy.lang import Builder
from kivymd.uix.screen import MDScreen


class HomePage(MDScreen):
    'Home Page'


class MainApp(MDApp):
    def build(self):
        Window.size = [300, 600]
        Builder.load_file('libs/screens/home_page.kv')
        return HomePage()


MainApp().run()
{% endhighlight %}

Run your code and the output should look something like this:

<img src="\blog\images\november_2021\kivymd_insta_heading.png?raw=true">


Our `MDLabel` is pushed down! Don't worry we will fix that. Let's add some icons in our toolbar/appbar, edit your home_page.kv:

{% highlight python %}
<HomePage>:
    orientation: 'vertical'
    # App Bar
    MDBoxLayout:
        padding: '5dp'
        adaptive_height: True

        MDIconButton:
            icon: 'plus'

        MDLabel:
            text: 'Instagram'
            halign: 'center'
            valign: 'top'
            font_size: 25
            font_name: 'libs/assets/Instafont.otf'

        MDIconButton:
            icon: 'facebook-messenger'
{% endhighlight %}

We added two `MDIconButton` widgets and set their icon-type. Now if you run your program you can see it looks better:

<img src="\blog\images\november_2021\toolbar_done_kivymdpng.png?raw=true">

We want our toolbar on top of the screen, it will go on top after we add the add other components below it, so don't worry about it.

Before we do anything else let's move our app bar under another `MDBoxLayout` widget (we are going to add more Boxes which will contain stories tab and posts etc):

{% highlight python %}
<HomePage>:
    orientation: 'vertical'
    MDBoxLayout:
        orientation: 'vertical'
        # App Bar
        MDBoxLayout:
            padding: '5dp'
            adaptive_height: True

            MDIconButton:
                icon: 'plus'

            MDLabel:
                text: 'Instagram'
                halign: 'center'
                valign: 'top'
                font_size: 25
                font_name: 'libs/assets/Instafont.otf'

            MDIconButton:
                icon: 'facebook-messenger'
{% endhighlight %}

Below our app bar we will add a [ScrollView][scrollview-doc] which is widget in Kivy that allows us to create a scrollable list of items: 

{% highlight python %}
        # Stories
        ScrollView:

{% endhighlight %}

If you run the app, now you can see our app bar is placed at the top of the screen where it belongs:

<img src="\blog\images\november_2021\just_added_scrollview.png?raw=true">

You can learn more about [ScrollView][scrollview-doc] through the very well written [documentation of kivy][scrollview-doc]. I will leave the rest to you, [here's the rest of the code][insta-clone-app] for the instagram clone made with python using kivymd. Continue writing the program peice by peice, refer to the kivy and kivymd documentation and you'll figure it out. If you get stuck anywhere, you can [dm me][twitter-link] on [twitter][twitter-link], i will try to make a video about it. Good Luck!


[KV-lang-doc]: https://kivy.org/doc/stable/guide/lang.html
[kivymd-doc]: https://kivymd.readthedocs.io/en/latest/components/
[tut-files]: https://drive.google.com/drive/folders/1D2PsNJxqgL39xFI8w4qZGT1ALL3dnZwr?usp=sharing
[scrollview-doc]: https://kivy.org/doc/stable/api-kivy.uix.scrollview.html
[twitter-link]: https://twitter.com/avionmission
[insta-clone-app]: https://github.com/avionmission/kivymd_instagram_clone_ui
[video-link]: https://youtu.be/giSh7TDoCUM