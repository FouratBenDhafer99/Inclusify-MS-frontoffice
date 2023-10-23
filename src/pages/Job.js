import React, { Fragment, useEffect, useState } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import { useNavigate } from "react-router-dom";
import jobApi from "../api/jobApi";
import AddJobModal from "./job/AddJobModal";
import UpdateJobModal from "./job/UpdateJobModal";
import DeleteModal from "./job/DeleteModal";
import {UserContext} from "../index";
import { useContext } from 'react';
import { all } from "axios";


const Job =()=> {

    const [jobList, setJobList] = useState([])
    const [filteredJobs, setFilteredJobs] = useState([])
    const navigate = useNavigate();
    const {currentUser} = useContext(UserContext);

    //const userId = currentUser._id.toString();
    console.log("current user =",currentUser);

    useEffect(() => {
        async function fetchJobs() {
            const allJob = await jobApi.getAllJobs();
            console.log(allJob);
            setJobList(allJob);
            setQuery("");
            setFilteredJobs(allJob);
            console.log("filtredList =",filteredJobs);
          }
      
          fetchJobs().then(() => {
            console.log("all jobs fetched");
            console.log("query =",query);
            console.log("filtredList =",filteredJobs);
          });
    }, [])

    
  const [query, setQuery] = useState("");
  useEffect(() => {
    const search = (term) => {
        
        if (term === "") {
            setFilteredJobs(jobList);  
          return;
        }

        const filtered = jobList.filter((job) => {
          return job.title.toLowerCase().includes(term.toLowerCase());
        });
    
        setFilteredJobs(filtered);
        console.log("Updated Job List:", filteredJobs);
      }
        search(query);
    }, [query, jobList, filteredJobs]);

    const handleClick = (job) => {
        console.log("job clicked", job);
        navigate("/jobs/jobdetails", { state: { job } });
        };

    const handleDelete = (id) => {
        console.log("job deleted", id);
        jobApi.deleteJob(id);
        }    

 
        return (
            <Fragment> 
                
                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0" style={{maxWidth: "100%"}}>
                            <div className="row">
                                <div className="col-xl-10 chat-left scroll-bar">
                                    
                                    <Pagetitle setQuery={setQuery}  title="Jobs" />
                                     
                                     <AddJobModal/> 
                                     {/* <button onClick={()=>navigate("/jobs/myoffers")} className="btn btn-sm btn-primary rounded-xl font-xss text-white m-2" variant="primary" >My Offers</button> */}
                                    {filteredJobs.map((value , index) => (
                                       
                                    <div key={index} className="card d-block w-100 border-0 mb-3 shadow-xss bg-white rounded-3 pe-4 pt-4 pb-4"  style={{paddingLeft: "120px"}}>
                                         {console.log(value)}
                                        <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i>
                                        <h4 className="font-xss fw-700 text-grey-900 mb-3 pe-4">{value.title} <span className="font-xssss fw-500 text-grey-500 ms-4">({value.date})</span> </h4>
                                        <h5 className="font-xssss mb-2 text-grey-500 fw-600"><span className="text-grey-900 font-xssss text-dark">Location : </span> {value.address}</h5>
                                        <h5 className="font-xssss mb-2 text-grey-500 fw-600"><span className="text-grey-900 font-xssss text-dark">Company : </span>{value.company}</h5>
                                        <h5 className="font-xssss text-grey-500 fw-600 mb-3"><span className="text-grey-900 font-xssss text-dark">Salary : </span> {value.salaryRange}</h5>
                                       {currentUser?._id===value.user?<div> <UpdateJobModal job={value}/><DeleteModal job={value}/> </div>:<button style={{border:0}} onClick={()=>handleClick(filteredJobs[index])} className="position-absolute bottom-15 mb-3 right-15 rounded-xl font-xss text-white"><i className="btn-round-sm bg-primary-gradiant text-white font-sm feather-chevron-right"></i></button>}
                                    </div>

                                    ))}

                                    
                                </div>

                                

                            </div>
                        </div>
                    </div>
                </div>

                {/* <Popupchat /> */}
                <Appfooter /> 
            </Fragment>
        );
    }


export default Job;