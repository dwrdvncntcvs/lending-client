import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../configurations/hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../routes/Stacks/HomeStack";
import { getBorrowerById } from "../features/borrowerSlice";
import { getLoansRequest } from "../features/loanSlice";
import {
  BorrowerDetailsComponent,
  Loading,
  Loans,
  NotFound,
} from "../components";
import { setLoadingMessage, setLoadingStatus } from "../features/loadingSlice";

type Props = NativeStackScreenProps<HomeStackParamList, "Borrower Details">;

export default function BorrowerDetails({ route, navigation }: Props) {
  const { borrowerState, loanState, loadingState } = useAppSelector(
    (state) => state
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      dispatch(setLoadingStatus(true));
      dispatch(setLoadingMessage("Getting Borrower Details..."));
      await dispatch(getBorrowerById(route.params.borrowerId));
      dispatch(setLoadingMessage("Getting Loan Details..."));
      await dispatch(getLoansRequest(route.params.borrowerId));
      dispatch(setLoadingStatus(false));
    };

    getData();
  }, []);

  return loadingState.status ? (
    <Loading message={loadingState.message} />
  ) : (
    <View style={styles.mainContainer}>
      <BorrowerDetailsComponent borrower={borrowerState.borrower} />
      <Text style={styles.loans}>Loans</Text>

      {loanState.loans.length < 1 ? (
        <NotFound message="No Loans Found" />
      ) : (
        <FlatList
          data={loanState.loans}
          renderItem={({ item }) => (
            <Loans
              loan={item}
              countryCode={borrowerState.borrower.countryCode!}
              onPress={() =>
                navigation.navigate("Loan Details", {
                  loanId: item.id!,
                  title: `${borrowerState.borrower.firstName!}'s Payments`,
                })
              }
            />
          )}
        />
      )}
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
  borrowerContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 15,
    borderRadius: 5,
    shadowOffset: { width: -2, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: "relative",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
  },
  address: {
    fontSize: 18,
  },
  countryCode: {
    // position: "absolute",
    // bottom: 10,
    // right: 20,
    fontSize: 18,
    letterSpacing: 5,
    fontWeight: "bold",
  },
  loans: {
    fontSize: 30,
    marginHorizontal: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
