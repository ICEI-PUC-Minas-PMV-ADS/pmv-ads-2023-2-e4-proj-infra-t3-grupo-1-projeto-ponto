import { api } from "../http/api";

async function registerEmployee(user) {
  const {
    fullName,
    email,
    password,
    rePassword,
    birthDate,
    hireDate,
    cpf,
    dailyWorkingHours,
    hrAdministratorId,
    positionId,
    departamentId,
  } = user;
  try {
    const response = await api.post(
      "/employee",
      {
        fullName,
        email,
        password,
        rePassword,
        birthDate,
        hireDate,
        cpf,
        dailyWorkingHours,
        hrAdministratorId,
        positionId,
        departamentId,
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

async function getEmployee(employeeId) {
  try {
    const response = await api.get(`/employee/${employeeId}`, {
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

async function getEmployees(userId) {
  try {
    const response = await api.get(`employee/hradministrator/${userId}`, {
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

async function putEmployee(user) {
  const {
    id,
    email,
    fullName,
    birthDate,
    hireDate,
    cpf,
    dailyWorkingHours,
    positionId,
    departamentId,
  } = user;
  try {
    const response = await api.put(
      `/employee/${id}`,
      {
        email,
        fullName,
        birthDate,
        hireDate,
        cpf,
        dailyWorkingHours,
        positionId,
        departamentId,
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

async function deleteEmployee(userId) {
  try {
    const response = await api.delete(`/employee/${userId}`, {
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
  registerEmployee,
  getEmployee,
  getEmployees,
  putEmployee,
  deleteEmployee,
};
