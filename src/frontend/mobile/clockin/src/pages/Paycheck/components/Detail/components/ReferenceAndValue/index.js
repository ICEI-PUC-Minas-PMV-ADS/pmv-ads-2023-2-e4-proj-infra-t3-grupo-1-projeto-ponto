import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function ReferenceAndValue({ title, value1, value2 }) {
  return (
    <View>
      <Text style={styles.title}>{title}: </Text>
      <Text style={styles.text}>{value1}</Text>
      <Text style={styles.text}>{value2}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    color: "#002538",
    fontSize: 14,
  },
  text: {
    color: "#002538",
    fontSize: 14,
  },
});