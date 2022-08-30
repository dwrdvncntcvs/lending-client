import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStack, ProfileStack } from "./Stacks";
import Icon from "react-native-vector-icons/Ionicons";
import SettingsStack from "./Stacks/SettingsStack";

const { Navigator, Screen } = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          const { name } = route;

          let iconName: string;

          if (name === "Home Screen")
            iconName = focused ? "home" : "home-outline";

          if (name === "Profile Screen")
            iconName = focused ? "person" : "person-outline";

          if (name === "Settings Screen")
            iconName = focused ? "settings" : "settings-outline";

          return <Icon name={iconName!} size={20} color={color} />;
        },
      })}
    >
      <Screen name="Home Screen" component={HomeStack} />
      <Screen name="Profile Screen" component={ProfileStack} />
      <Screen name="Settings Screen" component={SettingsStack} />
    </Navigator>
  );
}
