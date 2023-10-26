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
        location.pathname !== "/rh/login" &&
        location.pathname !== "/rh/registrar"
      ) {
        console.log("sessão expirada!");
        navigate("/rh/login");
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
    navigate("/rh/login");
    setAuthenticated(false);
  };
  return { authenticated, userId, setUserId, login, logout, isTokenValid };
};

export default useAuthentication;