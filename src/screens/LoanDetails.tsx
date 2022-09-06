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
import { PaymentData } from "../models/LoanPayment";
import { setModalStatus } from "../features/modalSlice";

type Props = NativeStackScreenProps<HomeStackParamList, "Loan Details">;

export default function LoanDetails({ route }: Props) {
  const [data, setData] = useState<PaymentData>({
    id: "",
    actualPaymentDate: new Date(),
    actualAmountReceived: 0,
    countryCode: "",
  });

  const { borrowerState, loanPaymentState,loanState, loadingState, modalState } =
    useAppSelector((state) => state);
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

    console.log("LOAN ID: ", route.params.loanId);

    getData();
  }, [loanState.loans]);

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
                actualAmountReceived: item.amount,
                actualPaymentDate: item.expectedPaymentDate,
                countryCode: borrowerState.borrower.countryCode!,
              });
              dispatch(setModalStatus(true));
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
        visible={modalState.status}
        onRequestClose={() => dispatch(setModalStatus(false))}
        transparent={true}
      >
        <View
          style={[
            styles.mainContainer,
            { backgroundColor: "rgba(0, 0, 0, .1)" },
          ]}
        >
          <LDModalComponent paymentData={data} loanId={route.params.loanId} />
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
