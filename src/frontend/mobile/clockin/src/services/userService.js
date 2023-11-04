import api from "../http/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getUser(userId) {
  try {
    const response = await api.get(`/employee/${userId}`, {
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

async function loginUser(userLogin) {
  const { email, password } = userLogin;
  try {
    const response = await api.post("/employee/login", {
      email,
      password,
    });
    await AsyncStorage.setItem("token_ClockIn", response.data.token).then();
    return response;
  } catch (error) {
    throw error;
  }
}

async function logoutUser() {
  try {
    const response = await api.post("/hradministrator/logout", {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("token_ClockIn")}`,
      },
    });
    await AsyncStorage.removeItem("token_ClockIn");
    return response;
  } catch (error) {
    console.error(error.response.data);
  }
}

export { getUser, loginUser, logoutUser };
