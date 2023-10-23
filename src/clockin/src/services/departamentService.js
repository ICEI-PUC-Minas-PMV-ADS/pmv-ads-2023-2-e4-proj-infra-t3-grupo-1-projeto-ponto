import { api } from "../http/api";

async function postDepartament(departament) {
  const { name, hrAdministratorId } = departament;
  try {
    const response = await api.post(
      "/departament",
      {
        name,
        hrAdministratorId,
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

async function getDepartaments(userId) {
  try {
    const response = await api.get(`/departament/hradministrator/${userId}`, {
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

async function getDepartament(id) {
  try {
    const response = await api.get(`/departament/${id}`, {
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

async function putDepartament(name, id) {
  try {
    const response = await api.put(
      `/departament/${id}`,
      {
        name,
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

async function deleteDepartament(id) {
  try {
    const response = await api.delete(`/departament/${id}`, {
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
  postDepartament,
  getDepartaments,
  getDepartament,
  deleteDepartament,
  putDepartament,
};
