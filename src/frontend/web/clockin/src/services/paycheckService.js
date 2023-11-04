import api from "../http/api";

async function postPaycheck(paycheck) {
  const { employeeId, startDate, endDate } = paycheck;
  try {
    const response = await api.post(
      `/paycheck/${employeeId}`,
      {
        startDate,
        endDate,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token_ClockIn")}`,
        },
      }
    );
    console.log(response);

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

async function putPaycheck(paycheck) {
  const {
    startDate,
    endDate,
    paycheckId,
    standardHours,
    overtimeHours,
    daysWorked,
    employeeId,
  } = paycheck;
  try {
    console.log(paycheck);
    const response = await api.put(
      `/paycheck/${employeeId}/${paycheckId}`,
      {
        startDate,
        endDate,
        standardHours,
        overtimeHours,
        daysWorked,
      },
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
