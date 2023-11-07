import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function TimeLog({ timeLog }) {
  const date =
    timeLog.timestamp.substring(8, 10) +
    "/" +
    timeLog.timestamp.substring(5, 7) +
    "/" +
    timeLog.timestamp.substring(2, 4);

  const time = timeLog.timestamp.substring(11, 16);

  return (
    <View style={styles.container}>
      <View style={styles.logType}>
        {timeLog.logTypeValue === 0 ? (
          <Ionicons name="enter-outline" style={styles.iconEntryOrExit}/>
        ) : (
          <Ionicons name="exit-outline" style={styles.iconEntryOrExit} />
        )}
        <Text>{timeLog.logTypeText}</Text>
      </View>
      <Text>Dia: {date}</Text>
      <Text>Hora: {time}</Text>
      {timeLog.isEdited === true && (
        <View>
          <View style={styles.isEdited}>
            <Ionicons name="alert-circle-outline" style={styles.iconIsEdited}/>
            <Text>Editado ou Criado pelo RH</Text>
          </View>
          <Text>Justificativa: {timeLog.justification}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: "90%",
    marginHorizontal: 20,
    marginVertical: 10
  },
  logType: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  isEdited: {
    flexDirection: "row",
    alignItems: "center",
    gap:5
  },
  iconEntryOrExit:{
    fontSize: 20
  },
  iconIsEdited:{
    fontSize: 15,
    color: "#fea222",
  }
});
