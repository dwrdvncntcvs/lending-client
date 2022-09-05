import {
  View,
  Text,
  Button,
  GestureResponderEvent,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { convertDate } from "../utils/date";

type Props = {
  onClose?: (e: GestureResponderEvent) => void;
  height?: number | string;
};

export default function LDModalComponent({ onClose, height = "auto" }: Props) {
  const [reason, setReason] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const input = [
    {
      placeholder: "Reason (Optional)",
      action: (text: string) => setReason(text),
      value: reason,
    },
  ];

  return (
    <View style={[styles.modalContainer, { height }]}>
      {input.map(({ placeholder, action, value }, i) => (
        <View style={styles.textContainer} key={i}>
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            onChangeText={action}
            value={value}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.textContainer}
        onPress={() =>
          DateTimePickerAndroid.open({
            value: date,
            onChange: (e, date) => setDate(date!),
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
        <Button title="Save" onPress={onClose} />
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
