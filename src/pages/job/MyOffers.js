import React from 'react'
import { Fragment, useEffect, useState } from "react";


import Pagetitle from '../../components/Pagetitle';
import Appfooter from '../../components/Appfooter';
//import { useNavigate } from "react-router-dom";
import jobApi from "../../api/jobApi";
import UpdateJobModal from "./UpdateJobModal";
import {UserContext} from "../../index";
import { useContext } from 'react';


function MyOffers() {

    const [jobList, setJobList] = useState([])
    const [filteredJobs, setFilteredJobs] = useState([])
    const {currentUser} = useContext(UserContext);
    


    useEffect(() => {
        async function fetchJobs() {
            console.log("current user =",currentUser);
            const user = currentUser._id.toString();
            const allJob = await jobApi.getMyOffers(user);
            console.log(allJob);
            setJobList(allJob);
            setFilteredJobs(allJob);
          }
      
          fetchJobs().then(() => {
            console.log("all jobs fetched");
            console.log("filtredList =",filteredJobs);
          });
    }, [])

    const [query, setQuery] = useState("");

  return (
    
        <Fragment> 
                
                <div className="main-content ">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0" style={{maxWidth: "100%"}}>
                            <div className="row">
                                <div className="col-xl-10 chat-left scroll-bar">
                                    
                                    {/* /<Pagetitle setQuery={setQuery}  title="Jobs" /> */}
                                     
                                     <UpdateJobModal/> 
                                    {filteredJobs.map((value , index) => (

                                    <div key={index} className="card d-block w-100 border-0 mb-3 shadow-xss bg-white rounded-3 pe-4 pt-4 pb-4"  style={{paddingLeft: "120px"}}>
                                        <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i>
                                        <h4 className="font-xss fw-700 text-grey-900 mb-3 pe-4">{value.title} <span className="font-xssss fw-500 text-grey-500 ms-4">({value.date})</span> </h4>
                                        <h5 className="font-xssss mb-2 text-grey-500 fw-600"><span className="text-grey-900 font-xssss text-dark">Location : </span> {value.address}</h5>
                                        <h5 className="font-xssss mb-2 text-grey-500 fw-600"><span className="text-grey-900 font-xssss text-dark">Company : </span>{value.company}</h5>
                                        <h5 className="font-xssss text-grey-500 fw-600 mb-3"><span className="text-grey-900 font-xssss text-dark">Salary : </span> {value.salaryRange}</h5>
                                        {/* <button style={{border:0}} onClick={()=>handleClick(filteredJobs[index])} className="position-absolute bottom-15 mb-3 right-15 rounded-xl font-xss text-white"><i className="btn-round-sm bg-primary-gradiant text-white font-sm feather-chevron-right"></i></button> */}
                                    </div>

                                    ))}

                                    
                                </div>

                                

                            </div>
                        </div>
                    </div>
                </div>
                <Appfooter /> 
            </Fragment>

  )
}

export default MyOffers ;