import axios from "axios";
import {getKeycloakToken} from "./auth_helper";

const url = "http://localhost:9999/skill-service/skill/";
//const url = "http://localhost:8093/skill/";

const getSkills = async (userId="") => {
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
            const response = await axios.get(url+"list/"+userId, config);
            console.log(response);
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data);
    }
}
const getSkillById = async (id) => {
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
            const response = await axios.get(url+"byId/"+id, config);
            console.log(response);
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data);
    }
}
const getSkillByUserId = async (id) => {
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
            const response = await axios.get(url+"userSkills/"+id, config);
            console.log(response);
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

const addSkill = async (skill) => {
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
            const response = await axios.post(url,skill, config);
            console.log(response);
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

const editSkill = async (skill) => {
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
            const response = await axios.put(url+skill.id,skill, config);
            console.log(response);
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data);
    }
}
const deleteSkill = async (skillId) => {
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
            const response = await axios.delete(url+skillId, config);
            console.log(response);
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data);
    }
}

export default {getSkills, getSkillById, addSkill, editSkill, deleteSkill, getSkillByUserId}