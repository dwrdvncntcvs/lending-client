import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import { Loan } from "../../../../models/Loan";
import { convertDate } from "../../../../utils/date";
import { getCurrency } from "../../../../utils/helper";

interface Props {
  loan: Loan;
  countryCode: string;
  onPress: (e: GestureResponderEvent) => void;
}

export default function Loans({ loan, countryCode, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.loanContainer} onPress={onPress}>
      <View
        style={[
          styles.statusBar,
          {
            backgroundColor: loan.status === "active" ? "#5CB85C" : "#efac4e",
          },
        ]}
      >
        <Text style={styles.id}>ID: {loan.id}</Text>
      </View>

      <View style={styles.loanContent}>
        <Text style={styles.amount}>
          {getCurrency(countryCode)}
          {loan.amount}
        </Text>
        <View style={styles.footerContent}>
          <Text style={styles.date}>
            {convertDate(loan.paymentStartDate!)} -{" "}
            {convertDate(loan.paymentEndDate!)}
          </Text>
          <Text style={{ fontStyle: "italic" }}>
            This loan is{" "}
            <Text style={styles.subText}>
              {loan.numberOfPayments} {getTermPayment(loan.termPayment!)}
            </Text>{" "}
            to pay with{" "}
            <Text style={styles.subText}>
              {loan.interestRatePerMonth}% interest.
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loanContainer: {
    display: "flex",
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 25,
    shadowOffset: { width: -2, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: "relative",
  },
  statusBar: {
    width: "100%",
    height: 25,
    position: "absolute",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "column",
  },
  id: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
  loanContent: {
    display: "flex",
    padding: 10,
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
  },
  footerContent: {
    alignSelf: "flex-end",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 50,
    marginVertical: 10,
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "gray",
    elevation: 5,
  },
  subText: {
    fontWeight: "bold",
    color: "#3171e0",
  },
});

const getTermPayment = (termPayment: string) => {
  let value: string;

  if (termPayment === "monthly") value = "months";

  if (termPayment === "biweekly") value = "weeks";

  return value!;
};
