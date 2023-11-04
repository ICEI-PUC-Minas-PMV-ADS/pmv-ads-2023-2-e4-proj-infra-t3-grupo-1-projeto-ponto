import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function InputForm({
  value,
  changeValue,
  placeholder,
  type,
  isPassowrdInput = false,
  autoCapitalize = "none",
}) {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      placeholderTextColor="#002538"
      onChangeText={changeValue}
      keyboardType={type}
      secureTextEntry={isPassowrdInput}
      style={styles.input}
      autoCapitalize={autoCapitalize}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#002538",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    width: "80%",
    padding: 10,
  },
});
