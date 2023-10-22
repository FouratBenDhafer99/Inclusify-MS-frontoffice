import { UserManager } from "oidc-client";
import axios from "axios";

const settings = {
  authority: "http://localhost:9999/login/oauth2/code/keycloak",
  client_id: "ms-auth",
  redirect_uri: "http://localhost:9999/login/oauth2/code/keycloak",
  response_type: "code",
  scope: "openid",
};

const userManager = new UserManager(settings);

export const getUser = () => {
  return userManager.getUser();
};
export const login = () => {
  return userManager.signinRedirect();
};
export const logout = () => {
  return userManager.signoutRedirect();
};

const keycloakUrl =
    "http://localhost:8181/realms/inclusify-ms-realm/protocol/openid-connect/token";
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

export default {getKeycloakToken}