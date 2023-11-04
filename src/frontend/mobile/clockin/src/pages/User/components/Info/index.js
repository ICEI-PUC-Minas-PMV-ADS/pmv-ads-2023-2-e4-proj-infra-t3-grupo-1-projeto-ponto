import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Info({ title, info }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 3,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
  },
  title: {
    fontSize: 15,
    fontWeight: "400",
    color: "#002538",
  },
  info: {
    fontSize: 13,
    fontWeight: "300",
    color: "#002538",
  },
});
