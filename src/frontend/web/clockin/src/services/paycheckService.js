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
console.log(response)

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
  const { employeeId, paycheckId, startDate, endDate } = paycheck;
  console.log(paycheck);

  try {
    const response = await api.put(
      `/paycheck/${employeeId}/${paycheckId}`,
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
