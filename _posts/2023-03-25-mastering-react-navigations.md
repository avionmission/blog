---
layout: post
title:  "Mastering Navigation Menus in React Native: 3 Types You Must Know [With Examples]"
date:   2023-03-25 09:00:44 +0530
image: \images\2023\mastering-navigation-react-native.png
categories: [React Native]
---
Designing a mobile app navigation menu can make a big impact on the user experience. A clear and intuitive navigation menu can help users easily find the information and features they need, while a confusing or cluttered menu can lead to frustration and user drop-off.

In this post, we'll learn how to build different types of navigation menu that enhances the user experience, and how to build each one of them using  React Native and `react-navigations` library. 

Let's start with a simple navigation from one screen to another.

## 1. Simple Navigation (using Stack Navigator)
<img src="\blog\images\2023\StackNavigator.gif">

[React Navigation](https://github.com/react-navigation/react-navigation) is a popular library used for implementing navigation in React Native apps. It provides a flexible and easy-to-use API for managing the navigation hierarchy between screens in your app.

"The Stack Navigator" allows users to move between screens by pushing and popping them onto a stack. When a new screen is pushed onto the stack, it appears on top of the previous screen. When a screen is popped from the stack, it is removed from the navigation hierarchy and the previous screen is displayed.

Let's use the Stack Navigator to create a navigation flow between two screens in a React Native app. We will define two screens, Screen1 and Screen2, and used the Stack Navigator to allow users to move between them.

### Step 1: Set Up a New React Native Project

First, create a new React Native project using the following command (this is the command i prefer to use):

```bash
npx create-expo-app NavigationExamples
```


This will create a new project called NavigationExample in your current directory.

### Step 2: Install Dependencies.
Next, navigate to the project directory and install the required dependencies using the following commands:

    cd NavigationExample 
    npm install @react-navigation/native 
    npm install @react-navigation/native-stack
    npm install react-native-screens react-native-safe-area-context

### Step 3: Define your Screens
In order to navigate between screens, we need to create two screen components, so let's screate two javascript files `Screen1.js` and `Screen2.js` in `\screens` directory:

**Screen1.js** :
```javascript
import {StyleSheet, View, Text, Button } from  'react-native'
import  React  from  'react'

const  Screen1 = ({navigation}) => {
	return (
	<View  style={styles.container}>
	<Text>Screen1</Text>
	<Button  title="Go to Screen 2"  onPress={() =>  navigation.navigate('Screen2')}/>
	</View>
	)
} 

const  styles = StyleSheet.create({
	container: {
	flex:  1,
	backgroundColor:  '#fff',
	alignItems:  'center',
	justifyContent:  'center',
	},
});

export  default  Screen1;
```
**Screen2.js**
```javascript
import {StyleSheet, View, Text, Button } from  'react-native'
import  React  from  'react'

const  Screen2 = ({navigation}) => {
	return (
	<View  style={styles.container}>
	<Text>Screen1</Text>
	<Button  title="Go to Screen 1"  onPress={() =>  navigation.navigate('Screen1')}/>
	</View>
	)
} 

const  styles = StyleSheet.create({
	container: {
	flex:  1,
	backgroundColor:  '#fff',
	alignItems:  'center',
	justifyContent:  'center',
	},
});

export  default  Screen2;
```
You'll notice we are passing the prop `navigation` to both `Screen1` and `Screen2` . React Navigation provides the `navigation` prop to screens. It contains methods and properties that allow us to navigate to other screens, customize the header, and pass parameters between screens. In the code example provided, we passed the `navigation` prop to the `Screen1` component so that we could use the `navigation.navigate` method to move to the `Screen2` component when the button is pressed.

### Step 4: Create a Stack Navigator 
To enable navigation between the screens, we need to create a Stack Navigator. A Stack Navigator is a type of navigator that allows users to move between screens by pushing and popping them on a stack.
**App.js**
```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Screen1" component={Screen1}/>
        <Stack.Screen name="Screen2" component={Screen2}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```
In the above code, we import the createStackNavigator function from React Navigation and use it to create a Stack Navigator. We then define two screens using the Stack.Screen component, giving each screen a unique name and component.

You can run the app using the command `npx expo start` and it should work perfectly.

## 2. Navigation Drawer in React Native
<img src="\blog\images\2023\DrawerNavigation.gif">

A classic type of menu that slides in from the left or right side of the screen when users tap on a menu icon. This type of menu is useful for apps with a large number of sections or features.
### Step 1: Install Dependencies 
To use a navigation drawer, we need to install the `@react-navigation/drawer` package. Run the following command to install it:
```bash
npm install @react-navigation/drawer
```
### Step 2: Define Your Screens
We will use the same two screens as before but remove the buttons on each screen.
### Step 3: Setting up Drawer Navigator
We will import `createDrawerNavigator` from `@react-navigation/drawer` and used it to create the drawer navigator:

**App.js**
```javascript
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';

export default function App() {

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='Screen1' component={Screen1}/>
        <Drawer.Screen name='Screen2' component={Screen2}/>  
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```
If you are getting any errors, it is possible you're missing some dependencies of React Navigation which you can install by running:
```bash
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

## 3. Bottom Navigation Bar
<img src="\blog\images\2023\TabNavigation.gif">

A modern type of menu typically appears at the bottom of the screen and displays multiple tabs that users can switch between. This type of menu is ideal for apps with distinct sections or workflows.

Let's start by installing dependencies:
```bash
npm install @react-navigations/bottom-tabs
```
To implement a bottom navigation bar in React Native, we will define a `createBottomTabNavigator()` object and use to handle navigation like this:

**App.js**
```javascript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import {Ionicons} from '@expo/vector-icons'

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Screen1' component={Screen1}/>
        <Tab.Screen name='Screen2' component={Screen2}/>  
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

```
When you run the app,  you will notice that we have a bottom navigation bar which we can use to switch between `Screen1` and `Screen2`,  but we have not se icons for those options. We can do that using `screenOptions` property of `Tab.Navigator` in this way: 

First you need to import:
```javascript
import {Ionicons} from  '@expo/vector-icons'
```
And then,

```javascript
<Tab.Navigator
  screenOptions={({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
      let iconName;

      if (route.name === 'Screen1') {
        iconName = focused ? 'home' : 'home-outline'
      } else if (route.name === 'Screen2') {
        iconName = focused ? 'settings' : 'settings-outline'
      }

      return <Ionicons name={iconName} size={size} color={color}/>
    },
  })}
  >
  <Tab.Screen name='Screen1' component={Screen1}/>
  <Tab.Screen name='Screen2' component={Screen2}/>  
</Tab.Navigator>
```
The `route` parameter is passed to the `screenOptions` function to determine which screen is currently active. The `focused`, `color`, and `size` parameters are used to style the icon based on its state.

The `if` statements are used to determine which icon to display based on the name of the route. If the route name is `Screen1`, the `home` icon is displayed if the tab is focused and the `home-outline` icon is displayed if the tab is not focused. If the route name is `Screen2`, the `settings` icon is displayed if the tab is focused and the `settings-outline` icon is displayed if the tab is not focused.

Finally, the `Ionicons` component is used to render the selected icon with the appropriate size and color.

With this knowledge, you'll be able to create navigation menus that are flexible, easy to use, and intuitive for your users. We hope that this article has provided you with the tools you need to create great navigation menus for your React Native apps.

If you have any questions or comments about this article, please leave them in the comment section below. And don't forget to [follow me on twitter](https://twitter.com/avionmission) for more tips and tutorials on React Native development. Happy coding!
