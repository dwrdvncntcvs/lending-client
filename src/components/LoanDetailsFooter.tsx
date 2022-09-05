import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Borrower } from "../models/Borrower";
import { getCurrency } from "../utils/helper";
import { TotalPayment } from "../models/LoanPayment";

type Props = {
  borrower: Borrower;
  totalPayment: TotalPayment;
};

export default function LoanDetailsFooter({ borrower, totalPayment }: Props) {
  return (
    <View style={styles.footerContainer}>
      <Text>Total Payment: </Text>
      <Text style={styles.amountText}>
        {getCurrency(borrower.countryCode!)}
        {totalPayment.paidLoans?.total.toFixed(2)} /{" "}
        {getCurrency(borrower.countryCode!)}
        {totalPayment.totalLoans?.total.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    display: "flex",
    flex: 0.075,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  amountText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
