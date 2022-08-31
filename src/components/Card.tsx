import { ReactPropTypes } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Borrower } from "../models/Borrower";
import { convertDate } from "../utils/date";
import { getCurrency } from "../utils/helper";

interface CardProps {
  borrower: Borrower;
}

export default function Card({ borrower }: CardProps) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => console.log(borrower.borrower.id)}
    >
      <Text style={styles.date}>
        {convertDate(borrower.loan.paymentStartDate)} -{" "}
        {convertDate(borrower.loan.paymentEndDate)}
      </Text>
      <Text style={styles.name}>
        {borrower.borrower.firstName} {borrower.borrower.lastName}
      </Text>
      <Text style={styles.value}>
        {getCurrency(borrower.borrower.countryCode)} {borrower.loan.amount}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    position: "relative",
    zIndex: -1,
    shadowOffset: { width: -2, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "white",
  },

  date: {
    display: "flex",
    flex: 1,
    fontSize: 18,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: "gray",
  },
  value: {
    fontSize: 50,
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginTop: 10,
    color: "gray",
  },
});
