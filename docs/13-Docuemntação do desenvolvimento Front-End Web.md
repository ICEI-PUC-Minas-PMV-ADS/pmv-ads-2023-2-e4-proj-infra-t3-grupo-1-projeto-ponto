# Documentação do desenvolvimento Front-End Web

## Apresentação
Desenvolvido com a tecnologia avança do React JS, nosso projeto representa a convergência entre funcionalidade e elegância no desenvolvimento web moderno. Utilizando ferramentas poderosas como React Router Dom, CSS Module e Axios, nossa solução em React oferece uma experiência de usuário excepcional, combinando navegação fluida, design modular e interações dinâmicas. É uma demonstração do potencial do React no desenvolvimento web moderno.

## Estrutura do Projeto

A estrutura de pastas do projeto é organizada para facilitar a manutenção e escalabilidade:
- src/
  - components/: Componentes reutilizáveis.
  - hooks/: Hooks personalizados para funcionalidades específicas.
  - http/: Configurações e serviços relacionados à comunicação HTTP.
  - pages/: Telas da aplicação.
  - routes/: Configuração de navegação.
  - services/: Lógica de serviços, como requisições HTTP específicas.
 
## Vídeos de Apresentação:
### Funcionalidades de Telas e CRUDs:



https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t3-grupo-1-projeto-ponto/assets/23140047/67d60c09-97c0-428d-9265-b37eea3bb2f8




https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t3-grupo-1-projeto-ponto/assets/23140047/25c646e2-318e-4e2f-abfa-3899094fe9ec




https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t3-grupo-1-projeto-ponto/assets/23140047/361ecc1d-bd9f-48d1-9df0-d7085162a8b2




https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t3-grupo-1-projeto-ponto/assets/23140047/7791983c-09c7-4e3f-a3fb-ed0ea856bbf8




https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t3-grupo-1-projeto-ponto/assets/23140047/3f3cfec8-e106-4450-bc9c-da3e315f796f




https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t3-grupo-1-projeto-ponto/assets/23140047/d13a314d-99b7-4c7f-8e14-7ac58a73ec94




https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t3-grupo-1-projeto-ponto/assets/23140047/ce30cca4-c98c-45ad-85e2-16b8572b580d


### Autenticação:



https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e4-proj-infra-t3-grupo-1-projeto-ponto/assets/23140047/421979db-2852-49cf-abaa-5857502d77cc


## Evidências de Implementação das Funcionalidades de CRUD,
Pasta servies, onde temos as requisições CRUD ao back-end: [link](/src/frontend/web/clockin/src/services)

## Evidências de Implementação da Autenticação,
Hook de autenticação: [link](/src/frontend/web/clockin/src/hooks/useAuthentication.js) </br>
Serviço de login de usuário: [link](/src/frontend/web/clockin/src/services/userService.js)

## Utilização das principais dependências
### Routes
A biblioteca React Router foi utilizada para facilitar a navegação entre diferentes componentes da aplicação.
```
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/User";
import Employees from "./pages/Employees";
import Employee from "./pages/Employee";
import TimeLogs from "./pages/TimeLogs";
import Paychecks from "./pages/Paychecks";
import Paycheck from "./pages/Paycheck";
import Departaments from "./pages/Departaments";
import Justifications from "./pages/Justifications";
import Positions from "./pages/Positions";
import NavBar from "./components/NavBar";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/rh/registrar" element={<Register />} />
        <Route element={<NavBar/>}>
          <Route path="/rh/:userId/*" element={<User />} />
          <Route path="/rh/:userId/colaboradores" element={<Employees />} />
          <Route
            path="/rh/:userId/colaboradores/:employeeId"
            element={<Employee />}
          />
          <Route
            path="/rh/:userId/colaboradores/:employeeId/registros"
            element={<TimeLogs />}
          />
          <Route
            path="/rh/:userId/colaboradores/:employeeId/contracheques"
            element={<Paychecks />}
          />
          <Route
            path="/rh/:userId/colaboradores/:employeeId/contracheques/:paycheckId"
            element={<Paycheck />}
          />
          <Route path="/rh/:userId/departamentos" element={<Departaments />} />
          <Route
            path="/rh/:userId/justificativas"
            element={<Justifications />}
          />
          <Route path="/rh/:userId/cargos" element={<Positions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### Axios
A biblioteca do Axios foi utilizada para fazer requisições HTTP.
```
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export default api;
```

### Autenticação (via token JWT)
O token JWT (JSON Web Token) foi utilizado para autenticação e autorização.
```
import { useState, useEffect, useCallback } from "react";
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from "../services/userService";

const useAuthentication = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isTokenValid = useCallback(() => {
    const token = localStorage.getItem("token_ClockIn");

    const invalidToken = () => {
      setAuthenticated(false);
      localStorage.removeItem("token_ClockIn");
      setUserId("");
      if (
        location.pathname !== "/" &&
        location.pathname !== "/rh/registrar"
      ) {
        console.log("sessão expirada!");
        navigate("/");
      }
      if (location.pathname !== "/rh/registrar") {
      }
    };

    if (token) {
      try {
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime && decoded.role === "manager") {
          const decoded = jwt_decode(token);
          setUserId(decoded.id);
          setAuthenticated(true);
        } else {
          invalidToken();
        }
      } catch (error) {
        invalidToken();
      }
    } else {
      invalidToken();
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    isTokenValid();
  }, [isTokenValid]);

  const login = async (userLogin) => {
    try {
      const response = await loginUser(userLogin);
      const token = response.data.token;
      const decodedToken = jwt_decode(token);
      localStorage.setItem("token_ClockIn", token);
      setUserId(decodedToken.id);
      setAuthenticated(true);
      navigate(`/rh/${decodedToken.id}`);
    } catch (erros) {
      console.error(erros);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token_ClockIn");
    await logoutUser();
    setUserId("");
    navigate("/");
    setAuthenticated(false);
  };
  return { authenticated, userId, setUserId, login, logout, isTokenValid };
};

export default useAuthentication;
```
