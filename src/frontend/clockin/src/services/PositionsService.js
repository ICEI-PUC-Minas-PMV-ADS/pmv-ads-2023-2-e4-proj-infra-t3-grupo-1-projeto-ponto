import api from "../http/api";

async function postPositions(position) {
  const { name, hrAdministratorId, hrValue } = position;
  try {
    const response = await api.post(
      "/position",
      {
        name,
        hrValue,
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

async function getPositions(userId) {
  try {
    const response = await api.get(`/position/hradministrator/${userId}`, {
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

async function getPosition(id) {
  try {
    const response = await api.get(`/position/${id}`, {
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

async function putPosition(position, id) {
  const { name, hrValue } = position;
  try {
    const response = await api.put(
      `/position/${id}`,
      {
        name,
        hrValue,
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

async function deletePosition(id) {
  try {
    const response = await api.delete(`/position/${id}`, {
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
  postPositions,
  getPositions,
  getPosition,
  putPosition,
  deletePosition,
};
