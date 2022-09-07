import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Card, Loading } from "../../components";
import { useAppDispatch, useAppSelector } from "../../configurations/hooks";
import { getBorrowers } from "../../features/borrowerSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { HomeStackParamList } from "../../routes/Stacks/HomeStack";
import { setLoadingMessage, setLoadingStatus } from "../../features/loadingSlice";

type Prop = NativeStackScreenProps<HomeStackParamList, "Home">;

export default function Home({ navigation }: Prop) {
  const { borrowerState, loadingState } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      dispatch(setLoadingStatus(true));
      dispatch(setLoadingMessage("Getting Borrowers..."));
      await dispatch(getBorrowers());
      dispatch(setLoadingStatus(false));
    };

    getData();
  }, []);

  return loadingState.status ? (
    <Loading message={loadingState.message} />
  ) : (
    <FlatList
      style={styles.mainContainer}
      data={borrowerState.borrowers}
      renderItem={({ item, index }) => (
        <View
          style={{
            marginHorizontal: 12,
            marginTop: index === 0 ? 12 : 6,
            marginBottom: index === borrowerState.borrowers.length ? 12 : 6,
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
