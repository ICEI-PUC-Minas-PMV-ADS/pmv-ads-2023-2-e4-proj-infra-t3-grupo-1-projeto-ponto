import {
  useState,
  useContext,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { loginUser, logoutUser } from "../services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const AuthenticationContext = createContext();
const AuthenticationProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    <AuthenticationContext.Provider
      value={{ authenticated, setAuthenticated, userId, setUserId }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  const { authenticated, setAuthenticated, userId, setUserId } = context;

  const navigation = useNavigation();
  const route = useRoute();

  const isTokenValid = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token_ClockIn");

      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (
          decodedToken.exp > currentTime &&
          decodedToken.role === "employee"
        ) {
          setUserId(decodedToken.id);
          setAuthenticated(true);

          if (route.name === "Login") {
            navigation.navigate("Home", { userId: decodedToken.id });
          }
        } else {
          handleInvalidToken();
        }
      } else {
        handleInvalidToken();
      }
    } catch (error) {
      handleInvalidToken();
    }
  }, [handleInvalidToken]);

  const handleInvalidToken = useCallback(async () => {
    setAuthenticated(false);
    await AsyncStorage.removeItem("token_ClockIn");
    setUserId("");

    if (route.name !== "Login") {
      alert("Sessão expirada!");
      navigation.navigate("Login");
    }
  }, [navigation, route.name]);

  useEffect(() => {
    isTokenValid();
  }, [isTokenValid]);

  const login = async (userLogin) => {
    try {
      const response = await loginUser(userLogin);
      const token = response.data.token;
      console.log(token);
      const decodedToken = jwtDecode(token);
      await AsyncStorage.setItem("token_ClockIn", token);
      setUserId(decodedToken.id);
      setAuthenticated(true);
      navigation.navigate("Home", { userId: decodedToken.id });
    } catch (erros) {
      alert("Usuario ou senha invalidos");
      console.error(erros);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token_ClockIn");
    await logoutUser();
    setUserId("");
    navigation.navigate("Login");
    setAuthenticated(false);
  };
  return { authenticated, userId, login, logout, isTokenValid };
};

export { useAuthentication, AuthenticationProvider };
