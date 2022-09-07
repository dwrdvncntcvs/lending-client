import { View, Text, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";

export default function MainContainer({ children }: PropsWithChildren) {
  return <View style={styles.mainContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
