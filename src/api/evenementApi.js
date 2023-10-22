import axios from "axios";
import {
    getKeycloakToken
} from "./auth_helper";

const url = "http://localhost:9999/event-service/event";
const gatewayUrl = 'http://localhost:9999';  

const getAllEvents = async (user) => {
    console.log(user);
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
  
        const response3 = await axios.get(url, config);
        console.log(response3.data);
        return response3.data;
      }
    } catch (error) {
        console.log(error);
    }
};


const join = async (user) => {
    console.log(user);
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
        
        console.log(config);
        const response3 = await axios.post(`http://localhost:9999/event-service/event/1/join?userEmail=ayachioumaima2000@gmail.com`, config);
        //await axios.post(url+"/1/join?userEmail=ayachioumaima2000@gmail.com", config);
        console.log(response3.data);
        return response3.data;
      }
    } catch (error) {
      console.log("Error Config:", error.config);
    }
};
    
export default {
    getAllEvents,
    join
};
