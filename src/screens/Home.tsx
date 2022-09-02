import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "../components";
import axios from "axios";
import { Borrower } from "../models/Borrower";
import { useAppDispatch, useAppSelector } from "../configurations/hooks";
import { getBorrowers } from "../features/borrowerSplice";

export default function Home() {
  const state = useAppSelector((state) => state.borrower);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("Entering Home page....");
    dispatch(getBorrowers());
  }, []);

  return (
    <FlatList
      style={styles.mainContainer}
      data={state.borrowers}
      renderItem={({ item, index }) => (
        <View
          style={{
            marginHorizontal: 15,
            marginTop: index === 0 ? 15 : 7,
            marginBottom: index === state.borrowers.length ? 15 : 8,
          }}
        >
          <Card borrower={item} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
  },
});
