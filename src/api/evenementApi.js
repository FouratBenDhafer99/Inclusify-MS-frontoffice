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

const getEventsByUser = async (user) => {
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

            const response3 = await axios.get(url+"/userEvent/"+user, config);
            console.log(response3.data);
            return response3.data;
        }
    } catch (error) {
        console.log(error);
    }
};

const join =async (eventId)=>{
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
          const response = await axios.post(url+"/"+eventId+"/join?userEmail=ayachioumaima2000@gmail.com",config);
          console.log(response);
          return response.data;
      }
  } catch (error) {
      console.log(error.response.data);
  }
}
    
export default {
    getAllEvents,
    join,
    getEventsByUser
};
