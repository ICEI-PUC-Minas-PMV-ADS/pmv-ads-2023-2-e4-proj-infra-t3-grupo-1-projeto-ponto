import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "./components/Card";

export default function LastTimeLogs({ timeLogs }) {
  return (
    <View style={styles.lastTimeLogsContainer}>
      {timeLogs.map((timeLog) => {
        return <Card timeLog={timeLog} key={timeLog.id} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  lastTimeLogsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
