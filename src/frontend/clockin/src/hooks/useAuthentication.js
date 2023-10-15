import { useState, useEffect, useCallback } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from "../services/UserService";

const useAuthentication = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const isTokenValid = useCallback(() => {
    const token = localStorage.getItem("token_ClockIn");

    const invalidToken = () => {
      console.log("lopp");
      setAuthenticated(false);
      localStorage.removeItem("token_ClockIn");
      setUserId("");
      navigate("/rh/login");
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
  }, [navigate]);

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
