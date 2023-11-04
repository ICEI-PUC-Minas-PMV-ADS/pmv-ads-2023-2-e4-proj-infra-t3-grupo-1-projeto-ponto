import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function CardButton({ text, navigateToPage, pageName }) {
  const navigation = useNavigation();

  return (
    <View style={styles.cardButton}>
      <TouchableOpacity
        onPress={() => navigateToPage(pageName)}
        style={styles.button}
      >
        <Text style={styles.textbutton}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardButton: {
    backgroundColor: "#E4E4E4",
    borderRadius: 10,
    alignItems: "center",
    height: 120,
    width: "90%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  button: {
    backgroundColor: "#002538",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 7,
  },

  textbutton: {
    color: "#FA983B",
    fontWeight: "700",
    fontSize: 15,
  },
});
