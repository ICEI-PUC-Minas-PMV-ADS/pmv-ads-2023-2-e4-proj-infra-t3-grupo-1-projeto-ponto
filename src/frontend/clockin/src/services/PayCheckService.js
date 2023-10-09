import api from "../http/api";

async function postPaycheck(employeeId, startDate, endDate) {
  try {
    const response = await api.post(
      `/paycheck/${employeeId}/startDate=${startDate}&&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token_ClockIn")}`,
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

async function getPaychecks(employeeId) {
  try {
    const response = await api.get(`/paycheck/employee/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token_ClockIn")}`,
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
        Authorization: `Bearer ${localStorage.getItem("token_ClockIn")}`,
      },
    });
    return response;
  } catch (error) {
    const errorMessage = error.response.data;
    throw errorMessage;
  }
}

async function putPaycheck(employeeId, paycheckId, startDate, endDate) {
  try {
    const response = await api.put(
      `/paycheck/${employeeId}/${paycheckId}?startDate=${startDate}&&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token_ClockIn")}`,
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

async function deletePaycheck(paycheckId) {
  try {
    const response = await api.delete(`/paycheck/${paycheckId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token_ClockIn")}`,
      },
    });
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

export { postPaycheck, getPaycheck, getPaychecks, putPaycheck, deletePaycheck };
