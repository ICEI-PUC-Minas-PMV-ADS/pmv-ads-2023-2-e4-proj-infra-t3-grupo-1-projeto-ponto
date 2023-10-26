import api from "../http/api";

async function registerUser(user) {
  const { fullName, email, password, rePassword, cnpj } = user;
  try {
    const response = await api.post("/hradministrator", {
      fullName,
      email,
      password,
      rePassword,
      cnpj,
    });
    console.log(response);
  } catch (error) {
    const errorMessage = error.response.data;
    if (errorMessage.errors) {
      console.error(errorMessage.errors);
    } else {
      console.error(errorMessage);
    }
  }
}

async function getUser(userId) {
  try {
    const response = await api.get(`/hradministrator/${userId}`, {
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

async function putUser(user) {
  const { id, fullName, email, cnpj } = user;
  try {
    const response = await api.put(
      `/hradministrator/${id}`,
      {
        fullName,
        email,
        cnpj,
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

async function deleteUser(userId) {
  try {
    const response = await api.delete(`/hradministrator/${userId}`, {
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

async function loginUser(userLogin) {
  const { email, password } = userLogin;
  try {
    const response = await api.post("/hradministrator/login", {
      email,
      password,
    });
    localStorage.setItem("token_ClockIn", response.data.token);
    return response;
  } catch (error) {
    const errorMessage = error.response.data;
    if (errorMessage.errors) {
      throw errorMessage.errors;
    } else {
      throw errorMessage;
    }
  }
}

async function logoutUser() {
  try {
    const response = await api.post("/hradministrator/logout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token_ClockIn")}`,
      },
    });
    localStorage.removeItem("token_ClockIn");
    return response;
  } catch (error) {
    console.error(error.response.data);
  }
}

export { registerUser, getUser, putUser, deleteUser, loginUser, logoutUser };
