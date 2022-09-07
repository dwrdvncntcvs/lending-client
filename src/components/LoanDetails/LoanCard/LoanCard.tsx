import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import { convertDate } from "../../../utils/date";
import { LoanPayment } from "../../../models/LoanPayment";
import { getCurrency } from "../../../utils/helper";
import { Borrower } from "../../../models/Borrower";

type Props = {
  loanPayment: LoanPayment;
  borrower: Borrower;
  onPress: (e: GestureResponderEvent) => void;
};

export default function LoanCard({
  loanPayment,
  borrower,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Text>{convertDate(loanPayment.expectedPaymentDate)}</Text>
      <Text>
        Amount: {getCurrency(borrower.countryCode!)}
        {loanPayment.amount.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    padding: 10,
    margin: 5,
    marginHorizontal: 10,
    backgroundColor: "white",
    shadowOffset: { width: -2, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 5,
    position: "relative",
  },
});
