import { React, useState } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import Navbar from "../../components/Navbar";
import { useRoute } from "@react-navigation/native";
import Header from "./components/Header";
import Resume from "./components/Resume";
import Detail from "./components/Detail";

export default function Paycheck() {
  const route = useRoute();
  const [paycheck, setPaycheck] = useState(route.params.paycheck);
  const [user, setUser] = useState(route.params.user);
  const startDate = new Date(paycheck.startDate);
  const endDate = new Date(paycheck.endDate);

  const standardHours = paycheck.standardHours;
  const baseSalary = paycheck.baseSalary.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  const overtimeHours = paycheck.overtimeHours;
  const overtimeHourlyRate = paycheck.overtimeHourlyRate.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }
  );
  const daysWorked = paycheck.daysWorked;
  const totalHours = paycheck.totalHours;

  const inss = paycheck.inssValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  const irrf = paycheck.irrfValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  const fgts = paycheck.fgtsValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  const totalSalary = paycheck.totalSalary.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

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

  const grossSalary = (
    paycheck.baseSalary + paycheck.overtimeHourlyRate
  ).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  const deductions = (paycheck.irrfValue + paycheck.inssValue).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }
  );

  return (
    <ScrollView>
      <Navbar title={"Contracheque"} />
      <View style={styles.containers}>
        <Header
          name={user.fullName}
          departament={user.departament}
          position={user.position}
          startDate={formattedStartDate}
          endDate={formattedEndDate}
        />
        <Resume grossSalary={grossSalary} deductions={deductions} totalSalary={totalSalary}/>
        <Detail paycheck={paycheck}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containers: {    
    width: "700",
    alignItems: "center"
  },
});
