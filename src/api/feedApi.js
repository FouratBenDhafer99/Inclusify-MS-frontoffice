import axios from "axios";
// import { OAuth2Client } from "google-auth-library";

import { getKeycloakToken } from "./auth_helper";
const url = "http://localhost:9999/feed-service/posts";
const commentUrl = "http://localhost:9999/feed-service/comments";

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

const createPost = async (postData) => {
  const response = await getKeycloakToken();
  if (response) {
    console.log(response);
    const authToken = response.access_token;
    console.log(authToken);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const response1 = await axios.post(url + "/new", postData, config);
    return response1.data;
  }
};

const createPostComment = async (postId, comment, userId) => {
  const response = await getKeycloakToken();
  try {
    if (response) {
      console.log(response);
      const authToken = response.access_token;
      console.log(authToken);
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const postData = {
        comment,
        userId,
      };
      const response1 = await axios.post(
        commentUrl + `/${postId}`,
        postData,
        config
      );
      return response1.data;
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

const getAllPostsByUser = async (id) => {
  const response = await getKeycloakToken();
  if (response) {
    console.log(response);
    const authToken = response.access_token;
    console.log(authToken);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const res = await axios.get(`${url}/byUser/${id}`, config);
    return res.data;
  }
};
const deletePost = async (postId) => {
  const response = await getKeycloakToken();
  try {
    if (response) {
      console.log(response);
      const authToken = response.access_token;
      console.log(authToken);
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response1 = await axios.delete(url + `/${postId}`, config);
      return response1.data;
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx.
      console.log("Response Data:", error.response.data);
      console.log("Status Code:", error.response.status);
      console.log("Headers:", error.response.headers);
      return error.response;
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
  createPost,
  createPostComment,
  getAllPostsByUser,
  deletePost,
};
