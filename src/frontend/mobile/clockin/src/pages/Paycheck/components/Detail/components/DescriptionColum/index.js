import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function DescriptionColum({ text1, text2, text3 }) {
  return (
    <View>
      <Text style={styles.title}>{text1}</Text>
      <Text style={styles.title}>{text2}</Text>
      <Text style={styles.title}>{text3}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    color: "#002538",
    fontSize: 14,
  },
});
