import { View, Text, StyleSheet } from "react-native";
import React from "react";

type Props = {
  message?: string;
};

export default function Loading({ message }: Props) {
  return (
    <View style={styles.mainContainer}>
      <Text>Loading please wait...</Text>
      {message!.length > 0 && <Text>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
