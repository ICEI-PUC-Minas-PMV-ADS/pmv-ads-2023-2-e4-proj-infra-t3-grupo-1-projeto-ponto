import React from "react";
import { Text, StyleSheet, View } from "react-native";
import BoldTextAndNormalText from "./components/BoldTextAndNormalText";
import DescriptionColum from "./components/DescriptionColum";
import ReferenceAndValue from "./components/ReferenceAndValue";

export default function Detail({ paycheck }) {
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

  return (
    <View style={styles.resumeContainer}>
      <Text style={styles.title}>Detalhamento:</Text>
      <View style={styles.card}>
        <BoldTextAndNormalText title={"Dias trabalhados"} text={daysWorked} />
        <BoldTextAndNormalText
          title={"Totais de horas trabalhadas"}
          text={totalHours}
        />
      <Text style={styles.subTitle}>Proventos</Text>
      <View style={styles.earnings}>
        <DescriptionColum
          text1={"Descrição"}
          text2={"Salário base:"}
          text3={"Hora extra:"}
        />
        <ReferenceAndValue
          title={"Referência"}
          value1={standardHours}
          value2={overtimeHours}
        />
        <ReferenceAndValue
          title={"Valor"}
          value1={baseSalary}
          value2={overtimeHourlyRate}
        />
      </View>
      <Text style={styles.subTitle}>Descontos</Text>
      <View style={styles.discounts}>
        <DescriptionColum text1={"Descrição"} text2={"INSS:"} text3={"IRRF:"} />
        <ReferenceAndValue title={"Valor"} value1={inss} value2={irrf} />
      </View>
      <View>
        <BoldTextAndNormalText title={"FGTS"} text={fgts} />
        <BoldTextAndNormalText title={"Salário líquido"} text={totalSalary} />
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resumeContainer: {
    width: "95%",    
  },
  card:{
    backgroundColor: "#E4E4E4",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10
  },
  title: {
    paddingVertical: 10,
    color: "#FA983B",
    fontSize: 20,
    fontWeight: "700",
  },

  subTitle: {
    color: "#FA983B",
    fontSize: 16,
    fontWeight: "700",
  },
  earnings:{
    flexDirection: "row",
    gap: 33
  },
  discounts:{
    flexDirection: "row",
    gap: 50
  }
});
