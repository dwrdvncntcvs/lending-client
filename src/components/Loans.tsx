import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Loan } from "../models/Loan";

interface Props {
  loans: Loan[];
}

export default function Loans({ loans }: Props) {
  return (
    <FlatList
      data={loans}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.loanContainer}>
          <View
            style={{
              width: "100%",
              height: 20,
              backgroundColor: item.status === "active" ? "green" : "yellow",
              position: "absolute",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          ></View>
          <Text style={styles.id}>{item.id}</Text>

          <View style={styles.loanContent}>
            <Text>Status: {item.status}</Text>
            <Text>Amount: {item.amount}</Text>
            <Text>Interest Rate: {item.interestRatePerMonth}</Text>
            <Text>Number of Payments: {item.numberOfPayments}</Text>
            <Text>Receivable: {item.receivable}</Text>
            <Text>Term in Months: {item.termInMonths}</Text>
            <Text>Term Payment: {item.termPayment}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loanContainer: {
    display: "flex",
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 30,
    shadowOffset: { width: -2, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: "relative",
  },
  id: {
    position: "absolute",
    top: 30,
    right: 10,
  },
  loanContent: {
    display: "flex",
    padding: 10,
  },
});

const getColorBaseOnStatus = (status: string) => {
  let color;

  if (status.toUpperCase() === "PENDING") color = "yellow";

  return color;
};
