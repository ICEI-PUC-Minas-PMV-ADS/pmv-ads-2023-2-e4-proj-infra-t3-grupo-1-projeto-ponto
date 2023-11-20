# Documentação do desenvolvimento Front-End Mobile

## Apresentação
Nosso projeto React Native foi desenvolvido com foco na simplicidade e eficiência, utilizando a plataforma Expo para acelerar e simplificar o desenvolvimento. As principais dependências incluem Axios para comunicação HTTP com o back-end, React Navigation/Native para a navegação em forma de Stack, e Async Storage para o armazenamento seguro do token no "local storage" do dispositivo. Além disso, outras dependências foram incorporadas para facilitar funcionalidades específicas, como decodificação de token, exibição de modais etc.

## Estrutura do Projeto

A estrutura de pastas do projeto é organizada para facilitar a manutenção e escalabilidade:
- src/
  - components/: Componentes reutilizáveis.
  - hooks/: Hooks personalizados para funcionalidades específicas.
  - http/: Configurações e serviços relacionados à comunicação HTTP.
  - pages/: Telas da aplicação.
  - routes/: Configuração de navegação.
  - services/: Lógica de serviços, como requisições HTTP específicas.


## GIFs de apresentação:
### Funcionalidades de Telas e CRUDs:
![trello](img/user.gif)
![trello](img/paycheck.gif)
![trello](img/timelog.gif)

### Autenticação:
![trello](img/autenticacao.gif)

## Evidências de Implementação das Funcionalidades de CRUD,
Pasta servies, onde temos as requisições CRUD ao back-end: [link](/src/frontend/mobile/clockin/src/services)

## Evidências de Implementação da Autenticação,
Hook de autenticação: [link](/src/frontend/mobile/clockin/src/hooks/useAuthentication.js) </br>
Serviço de login de usuário: [link](/src/frontend/mobile/clockin/src/services/userService.js)

## Utilização das principais dependencias
### Aplicação do react-avigation/native
A navegação no aplicativo é gerenciada pelo React Navigation/Native, conforme demonstrado no exemplo abaixo:
```
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Paychecks from "../pages/Paychecks";
import Paycheck from "../pages/Paycheck";
import TimeLogs from "../pages/TimeLogs";
import Home from "../pages/Home";
import User from "../pages/User";
import { AuthenticationProvider } from "../hooks/useAuthentication";

const Stack = createNativeStackNavigator();
export default function AppRoute() {
  return (
    <AuthenticationProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Paychecks" component={Paychecks} />
          <Stack.Screen name="Paycheck" component={Paycheck} />
          <Stack.Screen name="TimeLogs" component={TimeLogs} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthenticationProvider>
  );
}
```

### Utilização do Axios
A comunicação com a API é tratada pelo Axios, com uma instância configurada para a base da URL da API. Abaixo está um exemplo de como é feita uma requisição HTTP:
```
// Configuração da instância do Axios
const api = axios.create({
  baseURL: "http://0.0.0.0:8000",
});
```

### Utilização do AsyncStorage
Requisição HTTP com o Axios, utilizando async/await e incluindo o token armazenado no AsyncStorage nos headers da requisição:
```
// Exemplo de requisição HTTP utilizando async/await
async function getPaychecks(employeeId) {
  try {
    const response = await api.get(`/paycheck/employee/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token_ClockIn")}`,
      },
    });
    return response;
  } catch (error) {
    const errorMessage = error.response.data;
    throw errorMessage;
  }
}
```
