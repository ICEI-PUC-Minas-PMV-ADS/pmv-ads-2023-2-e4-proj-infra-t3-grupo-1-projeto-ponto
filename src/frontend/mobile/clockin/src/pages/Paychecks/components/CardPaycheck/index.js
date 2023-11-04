import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CardPaycheck({ paycheck, routeParams }) {
  const navigation = useNavigation();
  const startDate = new Date(paycheck.startDate);
  const endDate = new Date(paycheck.endDate);

  const monthName = startDate.toLocaleString("default", { month: "long" });
  const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  
  const formattedStartDate = startDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "UTC",
  });
  const formattedEndDate = endDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "UTC",
  });

  return (
    <View style={styles.continer}>
      <Text style={styles.month}>{formattedMonth}</Text>
      <View style={styles.buttonAndDays}>
        <Text style={styles.days}>
          {formattedStartDate} até {formattedEndDate}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Paycheck", { paycheck, user: routeParams })
          }
        >
          <Text style={styles.textButton}>Visualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    borderRadius: 10,
    backgroundColor: "#E4E4E4",
    width: "90%",
    height: 110,
    padding: 20,
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginVertical: 10
  },
  buttonAndDays: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#002538",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  textButton: {
    color: "#FA983B",
    fontSize: 15,
    fontWeight: "700",
  },
  month: {
    fontSize: 20,
    fontWeight: "700",
    color: "#002538",
  },
  days: {
    fontSize: 15,
    fontWeight: "500",
    color: "#002538",
  },
});
