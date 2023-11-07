import React from "react";
import { StyleSheet, View } from "react-native";
import HeaderText from "./components/HeaderText";

export default function Header({
  name,
  startDate,
  endDate,
  departament,
  position,
}) {
  return (
    <View style={styles.container}>
      <HeaderText title={"Nome"} text={name} />
      <HeaderText title={"Data"} text={`${startDate} a ${endDate}`} />
      <HeaderText title={"Departamento"} text={departament} />
      <HeaderText title={"Cargo"} text={position} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    width: "95%",
    gap: 4,
    paddingVertical: 15,
  }
})


