import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ResumeCards from "./ResumeCards";

export default function Resume({ grossSalary, deductions, totalSalary }) {
  return (
    <View style={styles.resumeContainer}>
      <Text style={styles.title}>Resumo:</Text>
      <View style={styles.resumeCardsContainer}>
        <ResumeCards title={"Bruto"} value={grossSalary} blue={false} green={true} yellow={false}/>
        <ResumeCards title={"Descontos"} value={deductions} blue={false} green={false} yellow={true}/>
        <ResumeCards title={"Líquido"} value={totalSalary} blue={true} green={false} yellow={false}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resumeContainer: {
    width: "95%",
  },
  resumeCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  title: {
    color: "#FA983B",
    fontSize: 20,
    fontWeight: "700",
  },
});
