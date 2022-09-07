import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Borrower } from "../../../../models/Borrower";

type Props = {
  borrower: Borrower;
};

export default function DetailsComponent({ borrower }: Props) {
  return (
    <View style={styles.borrowerContainer}>
      <Text style={styles.name}>
        {borrower.firstName} {borrower.lastName}
      </Text>
      <Text style={styles.address}>{borrower.address}</Text>
      <Text style={styles.countryCode}>{borrower.countryCode}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 18,
    letterSpacing: 5,
    fontWeight: "bold",
  },
});
