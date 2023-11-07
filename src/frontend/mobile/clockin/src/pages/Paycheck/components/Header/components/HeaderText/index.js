import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function HeaderText({ title, text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}: </Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    color: "#002538",
    fontSize: 16
  },
  text: {
    color: "#002538",
    fontSize: 16
  },
  container: {
    flexDirection: "row",
    alignItems: "start"
  },
});
