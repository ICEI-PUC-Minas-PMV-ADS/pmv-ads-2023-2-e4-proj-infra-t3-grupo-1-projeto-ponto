import { useRoute } from "@react-navigation/native";
import { React, useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, FlatList } from "react-native";
import Navbar from "../../components/Navbar";
import CardPaycheck from "./components/CardPaycheck";
import { getPaychecks } from "../../services/paycheckService";

export default function Paychecks() {
  const [paychecks, setPaychecks] = useState([]);
  const route = useRoute();

  useEffect(() => {
    async function fetchData(userId) {
      try {
        const response = await getPaychecks(userId);
        setPaychecks(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData(route.params.user.id);
  }, [route.params.user.id]);

  return (
    <>
      {paychecks.length > 0 ? (
        <FlatList
          data={paychecks}
          renderItem={({ item }) => (
            <CardPaycheck paycheck={item} routeParams={route.params.user} />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => <Navbar title={"Contracheques"} />}
        />
      ) : (
        <Text style={styles.text}>Nenhum contracheque encontrado</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    alignContent: "center",
  },
  cards: {
    alignItems: "center",
    marginTop: 20,
    gap: 20,
  },
  text: {
    color: "#002538",
    textAlign: "center",
  },
});
