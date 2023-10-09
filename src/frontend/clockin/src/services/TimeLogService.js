import api from "../http/api";

async function postTimeLog(departament) {
  const { timestamp, employeeId, logTypeValue, justificationId } = departament;
  try {
    const response = await api.post(
      "/timelog/hradministrator",
      {
        timestamp,
        employeeId,
        logTypeValue,
        justificationId,
        createdByHR: true,
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

async function getTimeLog(timeLogId) {
  try {
    const response = await api.get(`/timelog/${timeLogId}`, {
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

async function getTimeLogsByEmployeeId(employeeId) {
  try {
    const response = await api.get(`/timelog/employee/${employeeId}`, {
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

async function getTimeLogsByEmployeeIdRange(employeeId, startDate, endDate) {
  try {
    const response = await api.get(
      `/timelog/employee/${employeeId}/range?startDate=${startDate}&&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token_ClockIn")}`,
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
        Authorization: `Bearer ${localStorage.getItem("token_ClockIn")}`,
      },
    });
    return response;
  } catch (error) {
    const errorMessage = error.response.data;
    throw errorMessage;
  }
}

async function putTimeLogs(departament, id) {
  const { timestamp, justificationId, logType } = departament;
  try {
    const response = await api.put(
      `/timelog/${id}`,
      {
        timestamp,
        justificationId,
        logType,
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

async function deleteTimeLog(id) {
  try {
    const response = await api.delete(`/timelog/${id}`, {
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

export {
  getLogTypes,
  getTimeLog,
  getTimeLogsByEmployeeId,
  getTimeLogsByEmployeeIdRange,
  postTimeLog,
  putTimeLogs,
  deleteTimeLog,
};
