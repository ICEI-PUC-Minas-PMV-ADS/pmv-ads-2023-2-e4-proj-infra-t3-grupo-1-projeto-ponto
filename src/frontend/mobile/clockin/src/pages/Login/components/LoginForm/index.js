import { React, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import InputForm from "../InputForm";
import { loginUser } from "../../../../services/userService.js";
import { useAuthentication } from "../../../../hooks/useAuthentication";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthentication();

  const handleSubmitForm = () => {
    const dataIsValid = validateForm(email, password);
    if (!dataIsValid) {
      alert("Email ou senha invalidos!");
    } else {
      const userLogin = {
        email: email,
        password: password,
      };
        login(userLogin);
        setEmail("");
        setPassword("");
    }
  };

  function validateForm(email, password) {
    const validateEmptyInput =
      email.trim().length || password.trim().length !== 0;
    const validateAt = validateEmptyInput
      ? email.includes("@") && email.includes(".com")
      : false;

    isValid = validateEmptyInput && validateAt === true;
    return isValid;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <InputForm
          changeValue={setEmail}
          placeholder={"Email"}
          value={email}
          type={"email-address"}
        />
        <InputForm
          changeValue={setPassword}
          placeholder={"Senha"}
          value={password}
          type={"default"}
          isPassowrdInput={true}
        />
      </View>
      <TouchableOpacity style={styles.buttonLogin} onPress={handleSubmitForm}>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    gap: 58,
  },
  inputs: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  buttonLogin: {
    borderColor: "#002538",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "#002538",
    width: "80%",
    padding: 6,
  },
  textButton: {
    color: "#fea222",
    fontWeight: "700",
    textAlign: "center",
  },
});
