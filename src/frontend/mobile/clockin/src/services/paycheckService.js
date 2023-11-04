import api from "../http/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

async function getPaycheck(paycheckId) {
  try {
    const response = await api.get(`/paycheck/${paycheckId}`, {
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

export {  getPaycheck, getPaychecks };
