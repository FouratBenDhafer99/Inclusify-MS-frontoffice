import axios from "axios";
import {
    getKeycloakToken
} from "./auth_helper";

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
        console.log(error);
    }
};


const join =async (eventId, email)=>{
  try {
      console.log(eventId);
      console.log(email);
      const keycloackRes = await getKeycloakToken();
      if (keycloackRes) {
          const authToken = keycloackRes.access_token;
          //console.log(authToken);
          const config = {
              headers: {
                  "Authorization": `Bearer ${authToken}`,
              },
          };
          const response = await axios.post(url+"/"+eventId+"/join?userEmail="+email,config);
          console.log(response);
          return response.data;
      }
  } catch (error) {
      console.log(error.response.data);
  }
}

const getById = async (id) => {
  try {
    console.log("ID** : "+ id);
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
          const response = await axios.get(url+"/"+id, config);
          console.log(response);
          return response.data;
      }
  } catch (error) {
      console.log(error.response.data);
  }
}

  const addEvent = async (event) => {
  try {
    const keycloakRes = await getKeycloakToken(); // Assuming this function retrieves the token
    if (keycloakRes) {
      const authToken = keycloakRes.access_token;
      const formData = new FormData(); // Create a FormData object

      // Append the event data to the FormData
      console.log("Event: "+ event);
      formData.append("name", event.name);
      formData.append("description", event.description);
      formData.append("date", event.date);
      formData.append("location", event.location);
      formData.append("organizer", event.organizer);
      formData.append("status", event.status);
      formData.append("capacity", event.capacity);
      formData.append("registrationDeadline", event.registrationDeadline);

      // Append the image file to the FormData
      formData.append("imageFile", event.imageFile);

      const config = {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data", // Correct the content type
        },
      };

      //const response = await axios.post(url, formData, config); // Use formData here
      const response = await axios.post(url, event, config);

      console.log(response);
      return response.data;
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

const deleteEvent = async (eventId) => {
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
          const response = await axios.delete(url+"/"+eventId, config);
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
    addEvent,
    getById,
    deleteEvent
};
