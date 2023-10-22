import axios from "axios";
// import { OAuth2Client } from "google-auth-library";

import { getKeycloakToken } from "./auth_helper";
const url = "http://localhost:9999/feed-service/posts";

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
    const response = await getKeycloakToken();
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

export default {
  getAllPosts,
};
