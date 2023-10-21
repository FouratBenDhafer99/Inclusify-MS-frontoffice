import axios from "axios";

const BASE_URL = "http://localhost:3000/api/posts";
const COMMENT_BASE_URL = "http://localhost:3000/api/comment";

const PostApi = {
    getAllPosts: async () => {
        const response = await axios.get(`${BASE_URL}/`);
        return response.data;
    },

    getAllPostsByUser: async (id) => {
        const response = await axios.get(`${BASE_URL}/${id}/getByUser/`);
        return response.data;
    },

    createPost: async (postData) => {
        const response = await axios.post(`${BASE_URL}/`, postData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
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
            const response = await axios.post(`${BASE_URL}/react`, {postId, userId, reactType});
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    createPostComment: async (postId, userId, comment) => {
        try {
            const response = await axios.post(`${COMMENT_BASE_URL}`, {postId, userId, comment});
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    getPostComments: async (postId) => {
        try {
            const response = await axios.get(`${COMMENT_BASE_URL}/${postId}/getByPost`);
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