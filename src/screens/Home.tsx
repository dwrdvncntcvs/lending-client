import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "../components";
import axios from "axios";
import { Borrower } from "../models/Borrower";


export default function Home() {
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);

  useEffect(() => {
    const getBorrowers = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "https://7b20-136-158-31-155.ngrok.io/borrowers",
          responseType: "json",
        });
        const data = response.data;

        setBorrowers(data);
      } catch (err) {
        console.log(err);
      }
    };

    getBorrowers();
  }, []);

  return (
    <FlatList
      style={styles.mainContainer}
      data={borrowers}
      renderItem={({ item }) => (
        <View style={{ marginHorizontal: 15, marginTop: 8, marginBottom: 8 }}>
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
