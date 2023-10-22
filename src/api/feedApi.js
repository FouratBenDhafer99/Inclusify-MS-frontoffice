import axios from "axios";
// import { OAuth2Client } from "google-auth-library";
import { getUser } from "./auth_helper";

const url = "http://localhost:9999/feed-service/posts";
const keycloakUrl =
  "http://localhost:8181/realms/inclusify-ms-realm/protocol/openid-connect/token";

// const _callApi = (token) => {
//   const headers = {
//     Accept: "application/json",
//     Authorization: "Bearer " + token,
//   };

//   return axios.get("http://localhost:9999/feed-service/posts");
// };

// export const callApi = () => {
//   return getUser().then((user) => {
//     console.log(user);
//     if (user && user.access_token) {
//       return _callApi(user.access_token).catch((error) => {
//         throw error;
//       });
//     } else {
//       throw new Error("User is not logged in");
//     }
//   });
// };

const getAllPosts = async (user) => {
  console.log(user);
  try {
    const response = await getKeycloakToken(url);
    if (response) {
      console.log(response);
      const authToken = response.access_token;
      console.log(authToken);
      const config = {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response3 = await axios.get(url, config);
      console.log(response3.data);
      // const response2 = await axios.get(url + "/test", config);
      // console.log(response2.data);
      return response3.data;
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

export default {
  getKeycloakToken,
  getAllPosts,
};
