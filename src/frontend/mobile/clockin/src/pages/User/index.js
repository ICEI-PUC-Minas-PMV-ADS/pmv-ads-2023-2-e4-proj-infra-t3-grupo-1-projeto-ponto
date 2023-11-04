import { React, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Navbar from "../../components/Navbar";
import Info from "./components/Info";
import { FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function User() {
  const route = useRoute();
  const user = route.params.user

  return (
    <ScrollView>
      <Navbar title={"Perfil"} />
      <View style={styles.userContainer}>
        <FontAwesome name="user-circle" style={styles.userIcon} />
        <Text style={styles.userText}>{user.fullName}</Text>
      </View>
      <View>
        <Info title={"E-mail"} info={user.email} />
        <Info title={"Departamento"} info={user.departament} />
        <Info title={"Cargo"} info={user.position} />
        <Info title={"Data de contratação"} info={user.hireDate} />
        <Info
          title={"Jornada de trabalho diária:"}
          info={`${user.dailyWorkingHours}Hrs`}
        />
        <Info title={"CPF"} info={user.cpf} />
        <Info
          title={"Data de aniversário"}
          info={user.birthDate}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userIcon: {
    fontSize: 45,
    color: "#002538",
  },
  userText: {
    color: "#002538",
    fontSize: 15,
    fontWeight: "700",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
