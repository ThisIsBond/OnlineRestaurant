import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/tabs";
import { Home, Restaurant, OrderDelivery } from "./screens";

const Stack = createStackNavigator();

const App = () => {
  return(
  <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={"Restaurant"}
      >
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Restaurant" component={Tabs}/>
        <Stack.Screen name="OrderDelivery" component={Tabs} />
      </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App