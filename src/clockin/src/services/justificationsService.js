import { api } from "../http/api";

async function postJustification(justification) {
  const { name, description, hrAdministratorId } = justification;
  try {
    const response = await api.post(
      "/justification",
      {
        name,
        description,
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

async function getJustifications(userId) {
  try {
    const response = await api.get(`/justification/hradministrator/${userId}`, {
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

async function getJustification(id) {
  try {
    const response = await api.get(`/justification/${id}`, {
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

async function putJustification(justification) {
  const { name, description, id } = justification;
  try {
    const response = await api.put(
      `/justification/${id}`,
      {
        name,
        description,
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

async function deleteJustification(id) {
  try {
    const response = await api.delete(`/justification/${id}`, {
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
  postJustification,
  getJustification,
  getJustifications,
  putJustification,
  deleteJustification,
};
