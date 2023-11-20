import api from "../http/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function postTimeLog(timeLog) {
  const { timestamp, employeeId, logTypeValue } = timeLog;
  try {
    const response = await api.post(
      "/timelog/employee",
      {
        timestamp,
        employeeId,
        logTypeValue,
        createdByHR: false,
      },
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem(
            "token_ClockIn"
          )}`,
        },
      }
    );
    return response;
  } catch (error) {
    const errorMessage = error.response.data;
    if (errorMessage.errors) {
      console.error(errorMessage.errors);
    } else {
      console.error(errorMessage);
    }
  }
}

async function getTimeLog(timeLogId) {
  try {
    const response = await api.get(`/timelog/${timeLogId}`, {
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
async function getTimeLogsByEmployeeId(employeeId) {
  try {
    const response = await api.get(`/timelog/employee/${employeeId}`, {
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
async function getTimeLogsByEmployeeIdRange(employeeId, startDate, endDate) {
  try {
    const response = await api.get(
      `/timelog/employee/${employeeId}/range?startDate=${startDate}&&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem(
            "token_ClockIn"
          )}`,
        },
      }
    );
    return response;
  } catch (error) {
    const errorMessage = error.response.data;
    throw errorMessage;
  }
}

async function getLogTypes() {
  try {
    const response = await api.get(`/timelog/logTypes`, {
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

export { getLogTypes, getTimeLog, getTimeLogsByEmployeeIdRange, postTimeLog, getTimeLogsByEmployeeId };
