import { React, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Card({ timeLog }) {
  const date =
    timeLog.timestamp.slice(8, 10) + "/" + timeLog.timestamp.slice(5, 7);
  const time = timeLog.timestamp.slice(11, 16);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.timeLogContainer}>
        <View style={styles.timeLog}>
          {timeLog.logTypeValue === 0 ? (
            <Ionicons name="enter-outline" style={styles.iconEntryOrExit} />
          ) : (
            <Ionicons name="exit-outline" style={styles.iconEntryOrExit} />
          )}
          <View style={styles.timeAndLogTypeContainer}>
            <Text style={styles.timeText}>{time}</Text>
            <Text style={styles.logTypeText}>{timeLog.logTypeText}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
  },
  timeLogContainer: {
    backgroundColor: "#E4E4E4",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    width: 100,
  },
  timeLog: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  timeAndLogTypeContainer:{
    alignItems: "center"
  },
  iconEntryOrExit: {
    fontSize: 20,
    color: "#002538",
  },
  logTypeText: {
    color: "#002538",
    fontSize: 14,
  },
  timeText: {
    color: "#002538",
    fontWeight: "700",
  },
  dateText: {
    fontSize: 11,
    color: "#002538",
  },
});
