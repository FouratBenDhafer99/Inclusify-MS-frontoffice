import axios from "axios";

import { getKeycloakToken } from "./auth_helper";
const url = "http://localhost:9999/event-service/event";


    
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
      if (error.response) {
        console.log("Response Data:", error.response.data);
        console.log("Status Code:", error.response.status);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        console.log("No Response Received. Request Details:", error.request);
      } else {
        console.log(error);
        console.log("Request Setup Error:", error.message);
      }
      console.log("Error Config:", error.config);
    }
};

export default {
    getAllEvents,
};
