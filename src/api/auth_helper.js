import { UserManager } from "oidc-client";

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
