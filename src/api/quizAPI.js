import  {getKeycloakToken} from "./auth_helper";
import axios from "axios";

const url = "http://localhost:9999/skill-service/quiz/";
const generateQuizFromSkill = async (skillId, userID) => {
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
            const response = await axios.post(url+"generateQuizBySkill/"+skillId+"/"+userID, null,config);
            console.log(response);
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

const getQuizById = async (quizId) => {
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
            const response = await axios.get(url+"byId/"+quizId,config);
            console.log(response);
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

const submitQuiz =async (quizId, quizAnswers)=>{
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
            const response = await axios.post(url+"submitQuiz/"+quizId, {data:quizAnswers},config);
            console.log(response);
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

export default {generateQuizFromSkill, submitQuiz, getQuizById}