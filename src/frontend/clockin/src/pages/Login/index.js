import { useState } from "react";
import { loginUser } from "../../services/UserService";
import ButtonSubmitRegisterForm from "../../components/ButtonSubmitRegisterForm";
import InputForm from "../../components/InputForm";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useUser } from "../../context/User";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUserId} = useUser()
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userLogin = {
      email: email,
      password: password,
    };
    try{
      const response = await loginUser(userLogin);
      const token = response.data.token
      const decodedToken = jwt_decode(token)
      setEmail("");
      setPassword("");
      setUserId(decodedToken.id)
      navigate(`/rh/${decodedToken.id}`);
    }catch(erros){
      alert(erros)
    }

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
          <ButtonSubmitRegisterForm textButton={"Login"} />
        </form>
      </div>
      <Link to="/rh/registrar">Criar conta</Link>
    </div>
  );
}
