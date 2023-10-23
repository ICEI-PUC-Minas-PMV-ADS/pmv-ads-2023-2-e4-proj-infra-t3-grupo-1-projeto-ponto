import { useState } from "react";
import ButtonSubmitForm from "../../components/ButtonSubmitForm";
import InputForm from "../../components/InputForm";
import { Link, } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";

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
    <div>
      <h2>Login do RH</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <InputForm
            value={email}
            changeValue={(name) => setEmail(name)}
            required={false}
            type={"email"}
            placeholder={"Digite aqui o email da sua empresa"}
            label={"Email"}
          />
          <InputForm
            value={password}
            changeValue={(name) => setPassword(name)}
            required={false}
            type={"password"}
            placeholder={"Digite aqui sua senha de login"}
            label={"Senha"}
          />
          <ButtonSubmitForm textButton={"Login"} />
        </form>
      </div>
      <Link to="/rh/registrar">Criar conta</Link>
    </div>
  );
}
