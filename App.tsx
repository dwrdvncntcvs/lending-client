import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Route from "./src/routes";
import { Provider } from "react-redux/";
import { store } from "./src/configurations/store";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Route />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//     </View>
