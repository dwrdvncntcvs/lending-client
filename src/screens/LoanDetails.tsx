import { View, FlatList, StyleSheet, Modal, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../configurations/hooks";
import {
  getLoanPayments,
  getTotalLoanPayments,
} from "../features/loanPaymentSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../routes/Stacks/HomeStack";
import { setLoadingMessage, setLoadingStatus } from "../features/loadingSlice";
import {
  LDModalComponent,
  Loading,
  LoanDetailsCard,
  LoanDetailsFooter,
} from "../components";
import { LoanModalData } from "../models/LoanPayment";

type Props = NativeStackScreenProps<HomeStackParamList, "Loan Details">;

export default function LoanDetails({ route }: Props) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<LoanModalData>({
    id: "",
    date: new Date(),
    amount: 0,
    countryCode: "",
  });

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
            onPress={() => {
              setData({
                id: item.id,
                amount: item.amount,
                date: item.expectedPaymentDate,
                countryCode: borrowerState.borrower.countryCode!,
              });
              setShow((prev) => !prev);
            }}
          />
        )}
      />
      <LoanDetailsFooter
        borrower={borrowerState.borrower}
        totalPayment={loanPaymentState.totalPayments}
      />
      <Modal
        animationType="slide"
        visible={show}
        onRequestClose={() => setShow((prev) => !prev)}
        transparent={true}
      >
        <View
          style={[
            styles.mainContainer,
            { backgroundColor: "rgba(0, 0, 0, .1)" },
          ]}
        >
          <LDModalComponent
            loanData={data}
            onClose={() => setShow((prev) => !prev)}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    position: "relative",
  },
});
