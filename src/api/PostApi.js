import axios from "axios";
import { getKeycloakToken } from "./auth_helper";

const BASE_URL = "http://localhost:9999/feed-service/posts/new/";
const COMMENT_BASE_URL = "http://localhost:3000/api/comment";

const PostApi = {
  getAllPosts: async () => {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  },

  getAllPostsByUser: async (id) => {
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
      const res = await axios.get(`${BASE_URL}/byUser/${id}`, config);
      return res.data;
    }
  },

  createPost: async (postData) => {
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
      const response = await axios.post(BASE_URL, postData, config);
      return response.data;
    }
  },

  getPostsByHashtag: async (hashtagName) => {
    const response = await axios.get(`${BASE_URL}/${hashtagName}`);
    return response.data;
  },

  getPostsByHashtagLookAlike: async (hashtagName) => {
    const response = await axios.get(`${BASE_URL}/lookAlike/${hashtagName}`);
    return response.data;
  },

  createPostReact: async (postId, userId, reactType) => {
    try {
      const response = await axios.post(`${BASE_URL}/react`, {
        postId,
        userId,
        reactType,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  createPostComment: async (postId, userId, comment) => {
    try {
      const response = await axios.post(`${COMMENT_BASE_URL}`, {
        postId,
        userId,
        comment,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  getPostComments: async (postId) => {
    try {
      const response = await axios.get(
        `${COMMENT_BASE_URL}/${postId}/getByPost`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  getPostsByProject: async (id) => {
    const response = await axios.get(`${BASE_URL}/getPostsByProject/${id}`);
    return response.data;
  },
};

export default PostApi;
