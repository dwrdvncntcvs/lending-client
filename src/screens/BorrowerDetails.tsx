import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../configurations/hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../routes/Stacks/HomeStack";
import { getBorrowerById } from "../features/borrowerSplice";
import { getLoanRequest } from "../features/loanSplice";

type Props = NativeStackScreenProps<HomeStackParamList, "Borrower Details">;

export default function BorrowerDetails({ route }: Props) {
  const { borrower, loan } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(getBorrowerById(route.params.borrowerId));
      await dispatch(getLoanRequest(route.params.borrowerId));
    };

    getData();
  }, []);

  console.log("Loans: ", loan.loans);

  return (
    <View>
      <Text>Borrower's Details:</Text>

      <Text>
        Name: {borrower.borrower.firstName} {borrower.borrower.lastName}
      </Text>
      <Text>Address: {borrower.borrower.address}</Text>
      <Text>Country Code: {borrower.borrower.countryCode}</Text>

      <FlatList
        data={loan.loans}
        renderItem={({ item }) => (
          <View>
            <Text>Loan Details: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Amount: {item.amount}</Text>
            <Text>Interest Rate: {item.interestRatePerMonth}</Text>
            <Text>Number of Payments: {item.numberOfPayments}</Text>
            <Text>Receivable: {item.receivable}</Text>
            <Text>Term in Months: {item.termInMonths}</Text>
            <Text>Term Payment: {item.termPayment}</Text>
          </View>
        )}
      />
    </View>
  );
}
