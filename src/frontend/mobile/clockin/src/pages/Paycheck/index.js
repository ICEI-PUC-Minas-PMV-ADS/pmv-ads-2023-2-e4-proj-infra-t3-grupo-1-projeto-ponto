import { React, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import Navbar from "../../components/Navbar";
import { useRoute } from "@react-navigation/native";

export default function Paycheck() {
  const route = useRoute();
  const [paycheck, setPaycheck] = useState(route.params.paycheck);
  const [user, setUser] = useState(route.params.user);
  const startDate = new Date(paycheck.startDate);
  const endDate = new Date(paycheck.endDate);

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
    <View>
      <View>
        <Navbar title={"Contracheque"} />
        <Text>
          Data: {formattedStartDate} até {formattedEndDate}
        </Text>
        <Text>Nome: {user.fullName}</Text>
        <Text>Departamento: {user.departament}</Text>
        <Text>Cargo: {user.position}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#002538",
    flex: 0,
  },
});
