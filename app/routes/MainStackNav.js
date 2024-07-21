import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../components/MainScreen";
import ChooseScreen from "../components/ChooseScreen";
import SecondScreen from "../components/SecondScreen";
const MainStackNav = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="ChooseScreen">
      <Stack.Screen
        name="ChooseScreen"
        component={ChooseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SecondScreen"
        component={SecondScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNav;
