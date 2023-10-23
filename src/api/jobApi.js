import axios from "axios";
// import { OAuth2Client } from "google-auth-library";

import { getKeycloakToken } from "./auth_helper";
const url = "http://localhost:9999/job-service/job/all";
const baseUrl = "http://localhost:9999/job-service/";

const getAllJobs = async (user) => {
  console.log(user);
  try {
    const response = await getKeycloakToken();
    if (response) {
      console.log(response);
      const authToken = response.access_token;
      console.log(authToken);
      const config = {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response3 = await axios.get(url, config);
      console.log(response3.data);

      return response3.data;
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx.
      console.log("Response Data:", error.response.data);
      console.log("Status Code:", error.response.status);
      console.log("Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received (e.g., the server is down or there is no internet connection).
      console.log("No Response Received. Request Details:", error.request);
    } else {
      console.log(error);
      // Something happened in setting up the request that triggered the error.
      console.log("Request Setup Error:", error.message);
    }
    console.log("Error Config:", error.config);
  }
};

const getJobsByUser = async (userId) => {
    try {
        const response = await getKeycloakToken();
        if (response) {
            console.log(response);
            const authToken = response.access_token;
            console.log(authToken);
            const config = {
                headers: {
                    // "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            };

            const response3 = await axios.get(baseUrl+"job/byUser/"+userId, config);
            console.log(response3.data);

            return response3.data;
        }
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx.
            console.log("Response Data:", error.response.data);
            console.log("Status Code:", error.response.status);
            console.log("Headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received (e.g., the server is down or there is no internet connection).
            console.log("No Response Received. Request Details:", error.request);
        } else {
            console.log(error);
            // Something happened in setting up the request that triggered the error.
            console.log("Request Setup Error:", error.message);
        }
        console.log("Error Config:", error.config);
    }
};
const applyForJob= async(cvFile , motivation , jobId , user , applicationStatus)=>{
    try {
        const response = await getKeycloakToken();
        if (response) {
          console.log(response);
          const authToken = response.access_token;
          console.log(authToken);
          const config = {
            headers: {
                "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${authToken}`,
              
            },
          };
          const data = {
             cvFile:cvFile,
            motivation:motivation,
            jobId:jobId,
            user:user,
            applicationStatus:applicationStatus
          }
    const responseData = await axios.post(baseUrl+"jobApplication" ,data,config);
    return responseData.data;
    }}
    catch (error) {
        if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx.
        console.log("Response Data:", error.response.data);
        console.log("Status Code:", error.response.status);
        console.log("Headers:", error.response.headers);
        } else if (error.request) {
        // The request was made but no response was received (e.g., the server is down or there is no internet connection).
        console.log("No Response Received. Request Details:", error.request);
        } else {
        console.log(error);
        // Something happened in setting up the request that triggered the error.
        console.log("Request Setup Error:", error.message);
        }
        console.log("Error Config:", error.config);
    }


        //console.log(user);

    }

    const AddJob = async (jobData) => {
        try {
            const response = await getKeycloakToken();
            if (response) {
              console.log(response);
              const authToken = response.access_token;
              console.log(authToken);
              const config = {
                headers: {
                  // "Content-Type": "application/json",
                  Authorization: `Bearer ${authToken}`,
                },
              };
                const data = {
                    title:jobData.title,
                    description:jobData.description,
                    type:jobData.type,
                    salaryRange:jobData.salaryRange,
                    address:jobData.address,
                    company:jobData.company,
                    user:jobData.user
                }
            const responseData = await axios.post(baseUrl+"job" ,data,config);

            return responseData.data;
            }
        }
        catch (error) {
            if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx.
            console.log("Response Data:", error.response.data);
            console.log("Status Code:", error.response.status);
            console.log("Headers:", error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received (e.g., the server is down or there is no internet connection).
            console.log("No Response Received. Request Details:", error.request);
            } else {
            console.log(error);
            // Something happened in setting up the request that triggered the error.
            console.log("Request Setup Error:", error.message);
            }
            console.log("Error Config:", error.config);
        }
    }
    const getMyOffers = async (user) => {
        try {
            const response = await getKeycloakToken();
            if (response) {
              console.log(response);
              const authToken = response.access_token;
              console.log(authToken);
              const config = {
                headers: {
                  // "Content-Type": "application/json",
                  Authorization: `Bearer ${authToken}`,
                },
              };
            const responseData = await axios.post(`baseUrl+"job"/${user}`,config);

            return responseData.data;
            }
        }
        catch (error) {
            if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx.
            console.log("Response Data:", error.response.data);
            console.log("Status Code:", error.response.status);
            console.log("Headers:", error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received (e.g., the server is down or there is no internet connection).
            console.log("No Response Received. Request Details:", error.request);
            } else {
            console.log(error);
            // Something happened in setting up the request that triggered the error.
            console.log("Request Setup Error:", error.message);
            }
            console.log("Error Config:", error.config);
        }
    }

    const UpdateJob = async (NewData) => {
        try {
            const response = await getKeycloakToken();
            if (response) {
              console.log(response);
              const authToken = response.access_token;
              console.log(authToken);
              const config = {
                headers: {
                  // "Content-Type": "application/json",
                  Authorization: `Bearer ${authToken}`,
                },
              };
                const data = {
                    title:NewData.nwtitle,
                    description:NewData.nwDescription,
                    type:NewData.nwType,
                    salaryRange:NewData.nwSalaryRange,
                    address:NewData.nwAddress,
                    company:NewData.nwCompany,
                    user:NewData.user,
                    
                }
                const id = NewData.id;
            const responseData = await axios.put(`${baseUrl}/job/${id}` ,data,config);

            return responseData.data;
            }
        }
        catch (error) {
            if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx.
            console.log("Response Data:", error.response.data);
            console.log("Status Code:", error.response.status);
            console.log("Headers:", error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received (e.g., the server is down or there is no internet connection).
            console.log("No Response Received. Request Details:", error.request);
            } else {
            console.log(error);
            // Something happened in setting up the request that triggered the error.
            console.log("Request Setup Error:", error.message);
            }
            console.log("Error Config:", error.config);
        }
    }

export default {
  getAllJobs,applyForJob,AddJob,getMyOffers,UpdateJob,getJobsByUser
};
