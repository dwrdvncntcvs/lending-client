import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStack, ProfileStack } from "./Stacks";


const { Navigator, Screen } = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={HomeStack} />
      {/* <Screen name="Profile" component={ProfileStack} /> */}
    </Navigator>
  );
}
