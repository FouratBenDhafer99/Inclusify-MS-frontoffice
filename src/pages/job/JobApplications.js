import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router';
import jobApi from '../../api/jobApi';
import { useState } from 'react';


function JobApplications({job}) {
    const location = useLocation();

    const jobDetails = location.state.job;
    const [jobApplications, setJobApplications] = useState([]);
    //const id = job.id;

    useEffect(() => {
        console.log("job details =",jobDetails);
        console.log("job id =",jobDetails.id);
        jobApi.getJobApplications(jobDetails.id).then((res) => {
            console.log("job applications =",res);
            setJobApplications(res);
        })
        

    }
    , [])
  return (
    <div className='p-4'>
               <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Resume</th>
          <th>Motivation</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {jobApplications?jobApplications.map((app,index)=>(<tr
         key={index}>
          <td>{app.cvPath}</td>
          <td>{app.motivation}</td>
          <td>{app.applicationStatus}</td>
        </tr>)):<div className='w-100 font-xss text-white bg-blue-gradiant p-4'><h3>no Applications yet</h3></div>}
      </tbody>
    </Table>
                

    </div>
  )
}

export default JobApplications