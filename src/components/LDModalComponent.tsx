import {
  View,
  Text,
  Button,
  GestureResponderEvent,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { convertDate } from "../utils/date";
import { LoanModalData } from "../models/LoanPayment";
import { getCurrency } from "../utils/helper";

type Props = {
  onClose?: (e: GestureResponderEvent) => void;
  height?: number | string;
  loanData: LoanModalData;
};

const checkPaymentDate = (date: Date, loanDate: Date) => {
  const date1 = new Date(date);
  const date2 = new Date(loanDate);

  return date1.toDateString() !== date2.toDateString() ? true : false;
};

export default function LDModalComponent({
  onClose,
  height = "auto",
  loanData,
}: Props) {
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [late, setLate] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const input = [
    {
      shown: true,
      placeholder: "Amount of Payment",
      action: (text: string) => setAmount(text.replace(/[^0-9\.]/g, "")),
      value: amount,
    },
    {
      shown: late,
      placeholder: "Reason (Optional)",
      action: (text: string) => setReason(text),
      value: reason,
    },
  ];

  useEffect(() => {
    setLate(checkPaymentDate(date, loanData.date));
  }, []);

  const saveUpdate = () => {
    console.log("Reason: ", reason);
    console.log("Amount to pay: ", +amount);
    console.log("Date of payment: ", date);

    setDate(new Date());
    setAmount("");
    setReason("");
  };

  return (
    <View style={[styles.modalContainer, { height }]}>
      <Text>{convertDate(loanData.date)}</Text>
      <Text>
        {getCurrency(loanData.countryCode)}
        {loanData.amount}
      </Text>
      {input.map(
        ({ placeholder, action, value, shown }, i) =>
          shown && (
            <View style={styles.textContainer} key={i}>
              <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                onChangeText={action}
                value={value}
              />
            </View>
          )
      )}
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() =>
          DateTimePickerAndroid.open({
            value: date,
            onChange: (e, date) => {
              setLate(checkPaymentDate(date!, loanData.date));
              setDate(date!);
            },
            mode: "date",
          })
        }
      >
        <Text style={styles.textInput}>{convertDate(date)}</Text>
      </TouchableOpacity>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Button title="Close" onPress={onClose} />
        <Button title="Save" onPress={() => {
          saveUpdate();
        }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    display: "flex",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    shadowOffset: { width: 4, height: -4 },
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  textContainer: {
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
  },
  textInput: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
    fontSize: 20,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 5,
  },
});
