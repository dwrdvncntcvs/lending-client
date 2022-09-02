import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../configurations/hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../routes/Stacks/HomeStack";
import borrowerSplice, { BorrowerState } from "../features/borrowerSplice";
import { Borrower } from "../models/Borrower";

type Props = NativeStackScreenProps<HomeStackParamList, "Borrower Details">;

const getBorrowerFromArr = (borrowers: BorrowerState, borrowerId: string) => {
  return borrowers.borrowers.filter(
    (value) => value.borrower.id === borrowerId
  )[0];
};

export default function BorrowerDetails({ route }: Props) {
  const borrowers = useAppSelector((state) => state.borrower);

  const [borrower, setBorrower] = useState<Borrower | null>(
    getBorrowerFromArr(borrowers, route.params.borrowerId).borrower
  );

  useEffect(() => {
    return () => {
      setBorrower(null);
    };
  }, []);

  return !borrower ? (
    <View>
      <Text>No Borrowers</Text>
    </View>
  ) : (
    <View>
      <Text>
        {borrower!.firstName} {borrower!.lastName}
      </Text>
      <Text>{borrower!.address}</Text>
      <Text>{borrower!.countryCode}</Text>
    </View>
  );
}
