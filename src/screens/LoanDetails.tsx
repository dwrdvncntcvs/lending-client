import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../configurations/hooks";
import {
  getLoanPayments,
  getTotalLoanPayments,
} from "../features/loanPaymentSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../routes/Stacks/HomeStack";
import { setLoadingMessage, setLoadingStatus } from "../features/loadingSlice";
import { Loading, LoanDetailsCard, LoanDetailsFooter } from "../components";

type Props = NativeStackScreenProps<HomeStackParamList, "Loan Details">;

export default function LoanDetails({ route }: Props) {
  const { borrowerState, loanPaymentState, loadingState } = useAppSelector(
    (state) => state
  );
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
          <LoanDetailsCard
            borrower={borrowerState.borrower}
            loanPayment={item}
          />
        )}
      />
      <LoanDetailsFooter
        borrower={borrowerState.borrower}
        totalPayment={loanPaymentState.totalPayments}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
});
