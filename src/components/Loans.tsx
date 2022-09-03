import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Loan } from "../models/Loan";
import { convertDate } from "../utils/date";
import { getCurrency } from "../utils/helper";

interface Props {
  loans: Loan[];
  countryCode: string;
}

export default function Loans({ loans, countryCode }: Props) {
  return (
    <FlatList
      data={loans}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.loanContainer}>
          <View
            style={[
              styles.statusBar,
              {
                backgroundColor:
                  item.status === "active" ? "#5CB85C" : "#efac4e",
              },
            ]}
          >
            <Text style={styles.id}>ID: {item.id}</Text>
          </View>

          <View style={styles.loanContent}>
            <Text style={styles.date}>
              {convertDate(item.paymentStartDate!)} -{" "}
              {convertDate(item.paymentEndDate!)}
            </Text>
            <Text style={styles.amount}>
              {getCurrency(countryCode)}
              {item.amount}
            </Text>
            <Text
              style={{
                fontStyle: "italic",
                alignSelf: "flex-end",
                color: "gray",
              }}
            >
              This loan is{" "}
              <Text style={styles.subText}>
                {item.numberOfPayments} {getTermPayment(item.termPayment!)}
              </Text>{" "}
              to pay with{" "}
              <Text style={styles.subText}>
                {item.interestRatePerMonth}% interest.
              </Text>
            </Text>
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
    fontSize: 18,
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
