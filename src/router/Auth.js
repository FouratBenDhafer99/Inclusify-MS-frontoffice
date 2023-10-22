import userApi from "../api/userApi";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Load from "../components/Load";
import { UserContext } from "../index";

const getToken = () => {
  return localStorage.getItem("token");
};

const setToken = (value) => {
  localStorage.setItem("token", value);
};

const removeToken = () => {
  localStorage.removeItem("token");
};

/**
 * Get the token from LocalStorage and return the connected user
 */
const toUpdateCurrentUser = async () => {
  let token = getToken();
  if (token) {
    let userId = JSON.parse(atob(token.split(".")[1])).id;

    try {
      return await userApi.getById(userId);
    } catch (e) {
      console.log(e);
    }
  }
};

export const Logout = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    setIsLoading(true);
    // if (getToken()) {
    //   if (currentUser?.role === "ADMIN" || currentUser?.role === "MODERATOR")
    //     console.log("http://localhost:4000/logout");
    //   //window.location.replace('http://localhost:4000/logout');
    // }
    removeToken();
    console.log(currentUser?.role === "ADMIN");
    console.log(currentUser);
    setIsLoading(false);
    //window.location.href = "/login";
  };

  useEffect(() => {
    logout();
  }, []);

  if (isLoading) return <Load />;

  return <Navigate to="/login" />;
};

export default { getToken, toUpdateCurrentUser };
