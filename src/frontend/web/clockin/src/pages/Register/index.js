import { useState } from "react";
import { registerUser } from "../../services/userService";
import ButtonSubmitForm from "../../components/ButtonSubmitForm";
import InputForm from "../../components/InputForm";

import styles from "./index.module.css";

function RegisterHRForm() {
  const [fullName, setFullName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const hRAdministrator = {
        fullName: fullName,
        email: email,
        password: password,
        rePassword: rePassword,
        cnpj: cnpj,
      };
      const response = await registerUser(hRAdministrator);
      console.log(response);
      setFullName("");
      setCnpj("");
      setEmail("");
      setPassword("");
      setRePassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.containerRegistro}>
      <div className={styles.contentRegistro}>
        <div className={styles.formRegistro}>
          <h2>Crie sua conta</h2>
          <form onSubmit={handleSubmit}>
            <InputForm
              value={fullName}
              changeValue={(name) => setFullName(name)}
              required={false}
              type={"text"}
              placeholder={"Digite aqui o nome da sua empresa"}
              label={"Nome"}
            />
            <InputForm
              value={cnpj}
              changeValue={(name) => setCnpj(name)}
              required={false}
              type={"text"}
              placeholder={"Digite aqui o CNPJ da sua empresa"}
              label={"CNPJ"}
            />
            <InputForm
              value={email}
              changeValue={(name) => setEmail(name)}
              required={false}
              type={"email"}
              placeholder={"Digite aqui o e-mail da sua empresa"}
              label={"Email"}
            />
            <InputForm
              value={password}
              changeValue={(name) => setPassword(name)}
              required={false}
              type={"password"}
              placeholder={"Digite aqui a sua senha de login"}
              label={"Senha"}
            />
            <InputForm
              value={rePassword}
              changeValue={(name) => setRePassword(name)}
              required={false}
              type={"password"}
              placeholder={"Digite aqui novamente a sua senha de login"}
              label={"Confirme sua senha"}
            />

            <ButtonSubmitForm textButton={"Enviar"} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterHRForm;
