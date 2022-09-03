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
import { getBorrowerById } from "../features/borrowerSplice";
import { getLoanRequest } from "../features/loanSplice";
import { Loans } from "../components";

type Props = NativeStackScreenProps<HomeStackParamList, "Borrower Details">;

export default function BorrowerDetails({ route }: Props) {
  const [loading, setLoading] = useState({ status: false, msg: "" });

  const { borrower, loan } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      setLoading((prev) => ({ ...prev, status: true }));
      setLoading((prev) => ({ ...prev, msg: "Getting Borrower Details..." }));
      await dispatch(getBorrowerById(route.params.borrowerId));
      setLoading((prev) => ({ ...prev, msg: "Getting Loan Details..." }));
      await dispatch(getLoanRequest(route.params.borrowerId));
      setLoading((prev) => ({ ...prev, status: false }));
    };

    getData();
  }, []);

  return loading.status ? (
    <View
      style={[
        styles.mainContainer,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Text>Loading please wait...</Text>
      <Text>{loading.msg}</Text>
    </View>
  ) : (
    <View style={styles.mainContainer}>
      <View style={styles.borrowerContainer}>
        <Text style={styles.name}>
          {borrower.borrower.firstName} {borrower.borrower.lastName}
        </Text>
        <Text style={styles.address}>{borrower.borrower.address}</Text>
        <Text style={styles.countryCode}>{borrower.borrower.countryCode}</Text>
      </View>
      <Text style={styles.loans}>Loans</Text>
      {loan.loans.length < 1 ? (
        <View
          style={[
            styles.mainContainer,
            { justifyContent: "flex-start", alignItems: "center" },
          ]}
        >
          <Text>No Loans Found</Text>
        </View>
      ) : (
        <Loans
          loans={loan.loans}
          countryCode={borrower.borrower.countryCode!}
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
    fontSize: 25,
  },
  countryCode: {
    position: "absolute",
    bottom: 10,
    right: 20,
    fontSize: 18,
    letterSpacing: 10,
    fontWeight: "bold",
  },
  loans: {
    fontSize: 30,
    marginHorizontal: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
