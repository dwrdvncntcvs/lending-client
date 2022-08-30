import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Profile } from "../../screens";

const { Navigator, Screen } = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Navigator>
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}
