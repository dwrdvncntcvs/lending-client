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
import { Loans } from "../components";
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
    <View
      style={[
        styles.mainContainer,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Text>Loading please wait...</Text>
      <Text>{loadingState.message}</Text>
    </View>
  ) : (
    <View style={styles.mainContainer}>
      <View style={styles.borrowerContainer}>
        <Text style={styles.name}>
          {borrowerState.borrower.firstName} {borrowerState.borrower.lastName}
        </Text>
        <Text style={styles.address}>{borrowerState.borrower.address}</Text>
        <Text style={styles.countryCode}>
          {borrowerState.borrower.countryCode}
        </Text>
      </View>
      <Text style={styles.loans}>Loans</Text>

      {loanState.loans.length < 1 ? (
        <View
          style={[
            styles.mainContainer,
            { justifyContent: "flex-start", alignItems: "center" },
          ]}
        >
          <Text>No Loans Found</Text>
        </View>
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
