import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/tabs";
import { Home, Restaurant, OrderDelivery, Test, Recipe, ImagePickerTest, Login, Signup, Admin_Create } from "./screens";
import { View } from "react-native";

const MainStack = createStackNavigator();
const Stack = createStackNavigator();
const AdminStack = createStackNavigator();
const AuthStack = createStackNavigator();
// const isAdmin = true

function HomeStackScreen() {
  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
        cardStack: {gesturesEnabled: false}
      }}
    //initialRouteName={"Login"}
    >

      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen name="Restaurant" component={Tabs} />
      <Stack.Screen name="OrderDelivery" component={Tabs} />
      <Stack.Screen name="Test" component={Tabs} />
      <Stack.Screen name="Recipe" component={Recipe} />
      <Stack.Screen name="ImagePickerTest" component={ImagePickerTest} />
    </Stack.Navigator>
  )

}

function AdminScreenNavigation() {
  return (

    <AdminStack.Navigator
      screenOptions={{
        headerShown: false, 
        cardStack: {gesturesEnabled: false}
      }}
    >
      <AdminStack.Screen name="Admin_Create" component={Admin_Create} options={{ tabBarVisible: false }} />
    </AdminStack.Navigator>

  )
}

function AuthScreenNavigation() {
  return (

    <AuthStack.Navigator
      screenOptions={{
        headerShown: false, 
        cardStack: {gesturesEnabled: false}
      }}
    >
      <AuthStack.Screen name="Signup" options={{ gestureEnabled: false, cardStack: {gesturesEnabled: false}}} component={Signup} />
      <AuthStack.Screen name="Login" options={{ gestureEnabled: false, cardStack: {gesturesEnabled: false} }} component={Login} />
    </AuthStack.Navigator>

  )
}

function ConditionalNaviation() {
  // if (isAdmin == false) {
  //   return AdminScreenNavigation()
  // }
  // else {
  //   return AuthScreenNavigation()
  // }
}
const App = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Login"
      >
        
        <MainStack.Screen options={{ headerShown: false, gestureEnabled: false, cardStack: {gesturesEnabled: false}}} name="AuthStack" component={AuthScreenNavigation} />
        <MainStack.Screen options={{ headerShown: false, gestureEnabled: false, cardStack: {gesturesEnabled: false}}} name="Stack" component={HomeStackScreen} />
        <MainStack.Screen options={{ headerShown: false, gestureEnabled: false, cardStack: {gesturesEnabled: false}}} name="AdminStack" component={AdminScreenNavigation} />

      </MainStack.Navigator>
    </NavigationContainer>
  )
}

export default App