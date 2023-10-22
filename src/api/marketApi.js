import axios from "axios";

const BASE_URL = "http://localhost:9999/marketplace-service/product";
const COMMENT_BASE_URL = "http://localhost:8093/category";


const MarketApi = {
    getAllProducts: async () => {
        const response = await axios.get(`${BASE_URL}/`);
        return response.data;
    },

    getProductById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/getById//${id}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error.response.data);
        }
    },

    // getAllProductsByUser: async (id) => {
    //     const response = await axios.get(`${BASE_URL}/getByUser/${id}`);
    //     return response.data;
    // },

    createProduct: async (productData) => {
        const response = await axios.post(`${BASE_URL}`, productData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    updateProductById: async (id, product) => {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, product);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
};


export default MarketApi;