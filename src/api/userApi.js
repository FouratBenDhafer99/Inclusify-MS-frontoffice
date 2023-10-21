import axios from "axios";
// import { OAuth2Client } from "google-auth-library";

const url = "http://localhost:9999/nojejs-service";
const keycloakUrl =
  "http://localhost:8181/master/inclusify-ms-realm/protocol/openid-connect/token";

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
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const keycloakData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        enabled: true,
        username: user.username,
      };
      const response2 = await axios.get(keycloakUserUrl, keycloakData, config);
      console.log(response2.data);

      // Creating user in our database
      const response3 = await axios.post(url + "/register", user);
      console.log(response3.data);
    }
  } catch (error) {
    console.log(error);
  }
};

const getKeycloakToken = async () => {
  const data = new URLSearchParams();
  data.append("username", "admin");
  data.append("password", "admin123");
  data.append("grant_type", "password");
  data.append("client_id", "admin-cli");
  // data.append("client_secret", "prloMH0NZEbr8aNYR3UZBfUCrsT2T56p");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios.post(keycloakUrl, data, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(error);
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
    const response = await axios.post(url + "/login", { email, password });
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
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
  try {
    const response = await axios.get(url + `/byId/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
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

// const verifyGoogle = async (client_id, jwtToken) => {
//   try {
//     const client = new OAuth2Client(client_id);
//     // Call the verifyIdToken to
//     // varify and decode it
//     const ticket = await client.verifyIdToken({
//       idToken: jwtToken,
//       audience: client_id,
//     });
//     // Get the JSON with all the user info
//     const payload = ticket.getPayload();
//     // This is a JSON object that contains
//     // all the user info
//     return payload;
//   } catch (error) {
//     console.log(error.response.data.message);
//   }
// };

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
  // verifyGoogle,
  getByEmail,
  verifyUser,
  verifyEmailExist,
  generateStreamKey,
  setIsLiveStreaming,
};
