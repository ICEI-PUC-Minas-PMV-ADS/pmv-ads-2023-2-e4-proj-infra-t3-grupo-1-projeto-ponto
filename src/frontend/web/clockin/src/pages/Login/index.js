import { useState } from "react";
import ButtonSubmitForm from "../../components/ButtonSubmitForm";
import InputForm from "../../components/InputForm";
import { Link } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";

import styles from "./index.module.css";
import logoLogin from "../../img/ClockLogin.png"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthentication();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userLogin = {
      email: email,
      password: password,
    };
    login(userLogin);
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.imgBox}>
        <img src={logoLogin} alt="Logo do projeto" title="ClockIn" />
      </div>
      <div className={styles.contentBox}>
        <div className={styles.formBox}>
          <h2>Bem-Vindo(a)!</h2>
          <p>Por favor, faça o login ou crie sua conta.</p>
          <form onSubmit={handleSubmit}>
            <InputForm
              value={email}
              changeValue={(name) => setEmail(name)}
              required={false}
              type={"email"}
              placeholder={"E-mail"}
              //label={"Email"} Essa linha foi ocultada para seguir o estilo de design do Bruno (Anderson)
              data_cy="input-email"
            />
            <InputForm
              value={password}
              changeValue={(name) => setPassword(name)}
              required={false}
              type={"password"}
              placeholder={"Senha"}
              //label={"Senha"} Essa linha foi ocultada para seguir o estilo de design do Bruno (Anderson)
              data_cy="input-password"
            />
            <ButtonSubmitForm textButton={"Entrar"} />
            <div className={styles.inputBox}>
              <p>É novo por aqui? <Link to="/rh/registrar">Crie uma conta</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
