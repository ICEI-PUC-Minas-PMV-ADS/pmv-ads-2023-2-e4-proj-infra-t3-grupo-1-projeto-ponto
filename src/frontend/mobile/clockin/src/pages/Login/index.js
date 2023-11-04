import { Image, StyleSheet, SafeAreaView } from "react-native";
import LoginForm from "./components/LoginForm";
import Logo1 from "../../../assets/clockin-logo1.png";
import Logo2 from "../../../assets/clockin-logo2.png";

export default function Login() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={Logo1} />
      <LoginForm />
      <Image source={Logo2} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fea222",
    flex: 1,
    gap: 50,
  },
});
