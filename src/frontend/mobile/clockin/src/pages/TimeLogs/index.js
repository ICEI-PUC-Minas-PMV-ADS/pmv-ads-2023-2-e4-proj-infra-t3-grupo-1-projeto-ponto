import { React, useState, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView, FlatList } from "react-native";
import { getTimeLogsByEmployeeId } from "../../services/timelogService.js";
import { useRoute } from "@react-navigation/native";
import Navbar from "../../components/Navbar";
import TimeLog from "./components/TimeLog/index.js";
export default function TimeLogs() {
  const route = useRoute()
  const timeLogs = route.params.timeLogs
  return (
    <>
    {timeLogs.length > 0 ? (
      <FlatList
      data={timeLogs}
      renderItem={({ item }) => (
        <TimeLog timeLog={item}/> 
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={()=> <Navbar title={"Meus registros"} filter={true} />}
      />
      ) : (
        <Text style={styles.text}>Nenhum registo de ponto encontrado</Text>
      )}
    </>      
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#002538",
    textAlign: "center",
  },
  timeLog: {
    alignItems: "center",
  },
});
