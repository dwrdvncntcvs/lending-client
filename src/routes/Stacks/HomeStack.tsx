import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { CreateBorrower, Home } from "../../screens";

const { Navigator, Screen } = createNativeStackNavigator();

type RootHomeProp = {
  Home: undefined;
  "Create Borrower": undefined;
};

interface Props {
  onPress: (e: GestureResponderEvent) => void;
}

const AddBorrowerButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Add New Borrower</Text>
    </TouchableOpacity>
  );
};

export default function HomeStack() {
  return (
    <Navigator>
      <Screen
        name="Home Screen"
        component={Home}
        options={({ navigation }: NativeStackScreenProps<RootHomeProp>) => ({
          headerRight: () => {
            return (
              <AddBorrowerButton
                onPress={() => navigation.navigate("Create Borrower")}
              />
            );
          },
        })}
      />
      <Screen name="Create Borrower" component={CreateBorrower} />
    </Navigator>
  );
}
