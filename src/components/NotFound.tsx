import { View, Text, StyleSheet } from "react-native";
import React from "react";

type Props = {
  message: string;
};

export default function NotFound({ message }: Props) {
  return (
    <View
      style={[
        styles.mainContainer,
        { justifyContent: "flex-start", alignItems: "center" },
      ]}
    >
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
