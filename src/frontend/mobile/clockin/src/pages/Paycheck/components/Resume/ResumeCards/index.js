import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ResumeCards({
  title,
  value,
  blue = false,
  green = false,
  yellow = false,
}) {
  const borderStyle = blue
    ? styles.blueBorder
    : green
    ? styles.greenBorder
    : yellow
    ? styles.yellowBorder
    : null;

  return (
    <View style={[styles.container, borderStyle]}>
      <Text style={styles.title}>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E4E4E4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 118,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    borderLeftColor: "#002538",
    borderLeftWidth: 3,
  },
  title: {
    fontWeight: "700",
  },
  blueBorder: {
    borderLeftColor: "#155BBD",
  },
  greenBorder: {
    borderLeftColor: "#3F9D94",
  },
  yellowBorder: {
    borderLeftColor: "#D04B1C",
  },
});
