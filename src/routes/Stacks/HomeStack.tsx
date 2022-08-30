import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { CreateBorrower, Home } from "../../screens";
import Icon from "react-native-vector-icons/Ionicons";

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
    <TouchableOpacity style={{ marginRight: 10 }} onPress={onPress}>
      <Icon name="add-circle-outline" color={"black"} size={25} />
    </TouchableOpacity>
  );
};

export default function HomeStack() {
  return (
    <Navigator>
      <Screen
        name="Home"
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
