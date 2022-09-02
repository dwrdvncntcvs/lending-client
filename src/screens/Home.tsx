import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Card } from "../components";
import { useAppDispatch, useAppSelector } from "../configurations/hooks";
import { getBorrowers } from "../features/borrowerSplice";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { HomeStackParamList } from "../routes/Stacks/HomeStack";

type Prop = NativeStackScreenProps<HomeStackParamList, "Home">;

export default function Home({ navigation }: Prop) {
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
          <Card
            borrower={item}
            onPress={() =>
              navigation.navigate("Borrower Details", {
                borrowerId: item.id!,
                title: `${item.firstName}'s Details`,
              })
            }
          />
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
