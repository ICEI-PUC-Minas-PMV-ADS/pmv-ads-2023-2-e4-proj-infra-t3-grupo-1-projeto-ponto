import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import Logo from "../../../assets/clockin-logo3.png";
import CardButton from "./components/CardButton";
import FormTimelog from "./components/FormTimelog";
import { useNavigation, useRoute } from "@react-navigation/native";
import Navbar from "../../components/Navbar";
import { getUser } from "../../services/userService";
import { getTimeLogsByEmployeeId } from "../../services/timelogService.js";
import LastTimeLogs from "./components/LastTimeLogs";

export default function Home() {
  const [user, setUser] = useState({ fullName: "" });
  const [timeLogs, setTimeLogs] = useState([]);

  const route = useRoute();
  const navigaion = useNavigation();

  useEffect(() => {
    async function fetchData(userId) {
      try {
        const responseUser = await getUser(userId);
        setUser(responseUser.data);
        const responseTimeLogs = await getTimeLogsByEmployeeId(userId);
        if(Array.isArray(responseTimeLogs.data)){
          setTimeLogs(responseTimeLogs.data);
        }else{
          throw Error(responseTimeLogs.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData(route.params.userId);
  }, [route.params.userId]);

  const navigateToPage = (page) => {
      return navigaion.navigate(page, { user });
  };

  return (
    <ScrollView>
      <Navbar
        title={`Olá ${user.fullName.split(" ")[0]}`}
        home={true}
        pageName={"User"}
        navigateToPage={navigateToPage}
      />
      <View style={styles.container}>
        <View style={styles.lastTimeLogsContainer}>
          <Text style={styles.text}>Últimos registros:</Text>
          {timeLogs.length > 0 ? (
            <LastTimeLogs timeLogs={timeLogs.slice(0,3)} />
          ) : <Text style={styles.text2}>Nenhum registor de ponto foi encontrado</Text>}
        </View>
        <FormTimelog
          timeLogs={timeLogs}
          setTimeLogs={setTimeLogs}
          employeeId={route.params.userId}
        />
        <CardButton
          text={"Visualizar meus regisitros de ponto"}
          pageName={"TimeLogs"}
          navigateToPage={navigateToPage}
        />
        <CardButton
          text={"Visualizar meus contracheques"}
          pageName={"Paychecks"}
          navigateToPage={navigateToPage}
        />
        <Image source={Logo} style={styles.logo} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 30,
  },
  text: {
    color: "#002538",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
  },
  lastTimeLogsContainer: {
    width: "90%",
    paddingTop: 20,
  },
  text2: {
    color: "#002538",
    textAlign: "center",
  },
});
