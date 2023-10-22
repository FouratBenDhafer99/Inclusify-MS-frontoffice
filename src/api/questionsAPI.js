import {getKeycloakToken} from "./auth_helper";
import axios from "axios";

const url = "http://localhost:9999/skill-service/question/";

const getQuestions = async () => {
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
            const response = await axios.get(url+"list", config);
            console.log(response);
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data);
    }
}
export default {getQuestions}