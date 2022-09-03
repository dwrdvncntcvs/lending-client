import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  BorrowerDetails,
  CreateBorrower,
  Home,
  LoanDetails,
} from "../../screens";
import Icon from "react-native-vector-icons/Ionicons";

export type HomeStackParamList = {
  Home: undefined;
  "Create Borrower": undefined;
  "Borrower Details": { borrowerId: string; title: string };
  "Loan Details": { loanId: string; title: string };
};

const { Navigator, Screen } = createNativeStackNavigator<HomeStackParamList>();

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
        options={({
          navigation,
        }: NativeStackScreenProps<HomeStackParamList>) => ({
          headerTitle: "Borrowers",
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
      <Screen
        name="Borrower Details"
        component={BorrowerDetails}
        options={({ route }) => ({
          headerTitle: route.params.title,
        })}
      />
      <Screen
        name="Loan Details"
        component={LoanDetails}
        options={({ route }) => ({
          headerTitle: route.params.title,
        })}
      />
    </Navigator>
  );
}
