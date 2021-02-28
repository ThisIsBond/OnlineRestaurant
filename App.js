import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/tabs";
import { Home, Restaurant, OrderDelivery, Test, Recipe, ImagePickerTest, Login, Signup, Admin_Create } from "./screens";
import { View } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const isAdmin = true

function HomeStackScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      //initialRouteName={"Login"}
      >
        <Stack.Screen name="Signup" component={Signup} options={{ tabBarLabel: 'Home' }} />
        <Stack.Screen name="Login" component={Login} options={{ tabBarLabel: 'Home' }} />
        <Stack.Screen name="Home" component={Tabs} options={{ tabBarLabel: 'Home' }} />
        <Stack.Screen name="Restaurant" component={Tabs} options={{ tabBarLabel: 'Home' }} />
        <Stack.Screen name="OrderDelivery" component={Tabs} options={{ tabBarLabel: 'Home' }} />
        <Stack.Screen name="Test" component={Tabs} options={{ tabBarLabel: 'Home' }} />
        <Stack.Screen name="Recipe" component={Recipe} options={{ tabBarLabel: 'Home' }} />
        <Stack.Screen name="ImagePickerTest" component={ImagePickerTest} options={{ tabBarLabel: 'Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function AuthScreenNavigation() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Admin_Create" component={Admin_Create} options={{ tabBarLabel: 'Home' }}/>
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

function ConditionalNaviation() {
  if (isAdmin == false) {
    return AuthScreenNavigation()
  }
  else {
    return HomeStackScreen()
  }
}
const App = () => {
  return (
     ConditionalNaviation() 
)
}

export default App