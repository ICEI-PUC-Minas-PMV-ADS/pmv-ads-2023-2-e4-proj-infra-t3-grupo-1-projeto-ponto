import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState();
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  const { userId, setUserId } = context;

  useEffect(() => {
    const token = localStorage.getItem("token_ClockIn");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUserId(decoded.id);
      } catch (error) {
        // Lidar com erros de decodificação ou token inválido, se necessário
        console.error("Erro ao decodificar o token:", error.message);
      }
    }
  }, [setUserId]);

  return { userId, setUserId };
};
