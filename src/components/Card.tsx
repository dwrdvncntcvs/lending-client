import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  View,
} from "react-native";
import { Borrower } from "../models/Borrower";

interface CardProps {
  borrower: Borrower;
  onPress: (e: GestureResponderEvent) => void;
}

export default function Card({ borrower, onPress }: CardProps) {
  console.log(borrower);

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Text style={styles.name}>
        {borrower.firstName} {borrower.lastName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 20,
    position: "relative",
    zIndex: -1,
    shadowOffset: { width: -2, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "white",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 20,
  },
});
