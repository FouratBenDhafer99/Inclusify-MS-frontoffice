import axios from "axios";

//const url = "http://localhost:9999/skill-service/skills";
const url = "http://localhost:8093/skill/";


const getSkillById = async (id) => {
    try {
        const response = await axios.get(url);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
    }
}

const addSkill = async () => {
    try {
        const response = await axios.post(url, {name: "Java"});
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
    }
}

export default {getSkillById, addSkill}