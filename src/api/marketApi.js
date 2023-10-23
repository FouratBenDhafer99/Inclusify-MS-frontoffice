import axios from "axios";
import {
    getKeycloakToken
} from "./auth_helper";

const BASE_URL = "http://localhost:9999/marketplace-service/product";
const CATEGORY_BASE_URL = "http://localhost:9999/marketplace-service/category";


const MarketApi = {
    getAllProducts: async () => {
        const response = await getKeycloakToken();
        if (response) {
            console.log(response);
            const authToken = response.access_token;
            console.log(authToken);
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const response1 = await axios.get(`${BASE_URL}/`, config);
            return response1.data;
        }
    },

    getAllCategories: async () => {
        const response = await getKeycloakToken();
        if (response) {
            console.log(response);
            const authToken = response.access_token;
            console.log(authToken);
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const response1 = await axios.get(`${CATEGORY_BASE_URL}/`, config);
            console.log('====================================');
            console.log(response1.data);
            console.log('====================================');
            return response1.data;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await getKeycloakToken();
            if (response) {
                console.log(response);
                const authToken = response.access_token;
                console.log(authToken);
                const config = {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                };
                const response1 = await axios.get(`${BASE_URL}/getById/${id}`, config);
                console.log(response1.data);
                return response1.data;
            }
        } catch (error) {
            console.log(error.response.data);
        }
    },

    // getAllProductsByUser: async (id) => {
    //     const response = await axios.get(`${BASE_URL}/getByUser/${id}`);
    //     return response.data;
    // },

    createProduct : async (product) => {
        try {
            const keycloackRes = await getKeycloakToken();
            if (keycloackRes) {
                const authToken = keycloackRes.access_token;
                //console.log(authToken);
                const config = {
                    headers: {
                        //"Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                };
                console.log('====================================');
                console.log(product);
                console.log('====================================');
                const response = await axios.post(`${BASE_URL}`, product, config);
                console.log(response);
                return response;
            }
        } catch (error) {
            console.log(error.response.data);
        }
    },

 updateProductById : async (product,id) => {
        try {
            const keycloackRes = await getKeycloakToken();
            if (keycloackRes) {
                const authToken = keycloackRes.access_token;
                //console.log(authToken);
                const config = {
                    headers: {
                        // "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                };
                const response = await axios.put(`${BASE_URL}/` + id, product, config);
                console.log(response);
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
        }
    },

 deleteProductById: async (productId) => {
        try {
            const keycloackRes = await getKeycloakToken();
            if (keycloackRes) {
                const authToken = keycloackRes.access_token;
                //console.log(authToken);
                const config = {
                    headers: {
                        // "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                };
                const response = await axios.delete(`${BASE_URL}/` + productId, config);
                console.log(response);
                return response.data;
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }
};


export default MarketApi;