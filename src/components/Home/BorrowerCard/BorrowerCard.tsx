import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  View,
} from "react-native";
import { Borrower } from "../../../models/Borrower";
import { LoanCount } from "../../../models/Loan";

interface BorrowerProps {
  borrower: Borrower & LoanCount;
  onPress: (e: GestureResponderEvent) => void;
}

export default function BorrowerCard({ borrower, onPress }: BorrowerProps) {
  console.log(borrower);

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Text style={styles.name}>
        {borrower.firstName} {borrower.lastName}
      </Text>
      {borrower.loanCount! > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{borrower.loanCount}</Text>
        </View>
      )}
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
    justifyContent: "space-between",
    zIndex: -1,
    shadowOffset: { width: -2, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "white",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  badge: {
    display: "flex",
    backgroundColor: "gray",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
  },
});
