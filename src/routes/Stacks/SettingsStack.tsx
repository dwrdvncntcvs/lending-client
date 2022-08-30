import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Settings } from "../../screens";

const { Navigator, Screen } = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Navigator>
      <Screen name="Settings" component={Settings} />
    </Navigator>
  );
}
