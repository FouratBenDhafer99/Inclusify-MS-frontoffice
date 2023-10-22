import axios from "axios";
// import { OAuth2Client } from "google-auth-library";

const url = "http://localhost:9999/nodejs-service/users";
const keycloakUrl =
  "http://localhost:8181/realms/inclusify-ms-realm/protocol/openid-connect/token";
const keycloakAdminUrl =
  "http://localhost:8181/realms/master/protocol/openid-connect/token/";

const keycloakUserUrl =
  "http://localhost:8181/admin/realms/inclusify-ms-realm/users";

const createUser = async (user) => {
  console.log(user);
  try {
    const response = await getKeycloakToken();
    if (response) {
      // Creating user in keycloak
      console.log(response);
      const authToken = response.access_token;
      const config = {
        headers: {
          //"Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        enabled: true,
        username: user.username,
      };

      const config2 = {
        headers: {
          //"Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response2 = await axios.post(keycloakUserUrl, data, config2);
      console.log(response2.data);

      // Creating user in our database
      const response3 = await axios.post(url, user);
      console.log(response3.status);

      if (response2.status < 250 && response3.status < 250) {
        return "All good";
      }
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx.
      console.log("Response Data:", error.response.data);
      console.log("Status Code:", error.response.status);
      console.log("Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received (e.g., the server is down or there is no internet connection).
      console.log("No Response Received. Request Details:", error.request);
    } else {
      console.log(error);
      // Something happened in setting up the request that triggered the error.
      console.log("Request Setup Error:", error.message);
    }
    console.log("Error Config:", error.config);
  }
};

const getKeycloakToken = async () => {
  const data = new URLSearchParams();
  data.append("username", "youssefalmia");
  data.append("password", "admin123");
  data.append("grant_type", "password");
  data.append("client_id", "ms-auth");
  data.append("client_secret", "Pcw1mk7ICYFcV1gr2zz7UQrDbRYbBEY0");
  data.append("scope", "openid");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const response = await axios.post(keycloakUrl, data, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx.
      console.log("Response Data:", error.response.data);
      console.log("Status Code:", error.response.status);
      console.log("Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received (e.g., the server is down or there is no internet connection).
      console.log("No Response Received. Request Details:", error.request);
    } else {
      // Something happened in setting up the request that triggered the error.
      console.log("Request Setup Error:", error.message);
    }
    console.log("Error Config:", error.config);
  }
};

const verifyUser = async (token) => {
  try {
    const response = await axios.put(`${url}+${token}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const verifyEmailExist = async (email) => {
  try {
    const response = await axios.post(url + `/checkEmail`, email);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const resetPassword = async (email) => {
  try {
    const response = await axios.post(url + "/reset-password", { email });
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const verifyResetPassword = async (token, password) => {
  try {
    const response = await axios.post(url + `/resetPassword/${token}`, {
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const login = async (email, password) => {
  try {
    const response = await getKeycloakToken();
    if (response) {
      const authToken = response.access_token;
      console.log(authToken);
      const config2 = {
        headers: {
          //"Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response1 = await axios.post(
        url + "/login",
        { email, password },
        config2
      );
      return response1.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const forgetPassword = async (email) => {
  try {
    const response = await axios.post(url + "/forgetPassword", { email });
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const findUser = async (page, limit) => {
  try {
    const response = await axios.get(url + `?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const getUserByName = async (name) => {
  try {
    const response = await axios.get(url + `/byName/${name}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const edit = async () => {
  try {
    const response = await axios.put(
      url + `/editProfile/640dd7aa9b097bacf1214c21`,
      { firstName: "Salem" }
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const updateUserById = async (id, user) => {
  console.log(user);
  try {
    const response = await axios.put(url + "/editProfile/" + id, user);
    return response.data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

const getById = async (id) => {
  const response = await getKeycloakToken();
  if (response) {
    const authToken = response.access_token;
    const config2 = {
      headers: {
        //"Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const response = await axios.get(url + `/byId/${id}`, config2);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

const getByEmail = async (email) => {
  try {
    const response = await axios.get(url + `/getByEmail/${email}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data.error);
  }
};

const generateStreamKey = async (id) => {
  try {
    const response = await axios.put(url + "/generateStreamKey/" + id);
    return response.data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

const setIsLiveStreaming = async (id, value) => {
  try {
    const response = await axios.put(url + "/setIsLiveStreaming/" + id, {
      isLiveStreaming: value,
    });
    return response.data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

const getUsersById = async (ids) => {
  try {
    const response = await axios.post(url + "/getUsersById/", ids);
    return response.data;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUsersById,
  getUserByName,
  edit,
  createUser,
  findUser,
  login,
  resetPassword,
  getById,
  forgetPassword,
  verifyResetPassword,
  getKeycloakToken,
  // verifyGoogle,
  getByEmail,
  verifyUser,
  verifyEmailExist,
  generateStreamKey,
  setIsLiveStreaming,
};
