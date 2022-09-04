import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../configurations/hooks";
import {
  getLoanPayments,
  getTotalLoanPayments,
} from "../features/loanPaymentSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../routes/Stacks/HomeStack";
import { convertDate } from "../utils/date";
import { setLoadingMessage, setLoadingStatus } from "../features/loadingSlice";
import { Loading } from "../components";

type Props = NativeStackScreenProps<HomeStackParamList, "Loan Details">;

export default function LoanDetails({ route }: Props) {
  const { loanPaymentState, loadingState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      dispatch(setLoadingStatus(true));
      dispatch(setLoadingMessage("Getting Loan Payments..."));
      await dispatch(getLoanPayments(route.params.loanId));
      dispatch(setLoadingMessage("Calculating Loan Payments..."));
      await dispatch(getTotalLoanPayments(route.params.loanId));
      dispatch(setLoadingStatus(false));
    };

    getData();
  }, []);

  console.log("Loan Payment State: ", loanPaymentState.totalPayments);

  return loadingState.status ? (
    <Loading message={loadingState.message} />
  ) : (
    <View style={styles.mainContainer}>
      <FlatList
        data={loanPaymentState.loanPayments}
        style={{ display: "flex", flex: 1 }}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Text>{convertDate(item.expectedPaymentDate)}</Text>
            <Text>Amount: {item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
      <View style={styles.footerContainer}>
        <Text>Total Payment: </Text>
        <Text style={styles.amountText}>
          {loanPaymentState.totalPayments.paidLoans?.total.toFixed(2)} /{" "}
          {loanPaymentState.totalPayments.totalLoans?.total.toFixed(2)}
        </Text>
      </View>
    </View>
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
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
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
