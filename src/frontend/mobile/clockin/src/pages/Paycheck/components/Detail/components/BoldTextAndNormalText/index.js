import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BoldTextAndNormalText({ title, text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}: </Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection: "row"
  },
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
