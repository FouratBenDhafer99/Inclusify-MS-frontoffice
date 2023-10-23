import React, { useEffect } from 'react'
import { useState , useContext } from 'react'
import { useLocation } from 'react-router-dom'
import jobApi from '../../api/jobApi';
import {UserContext} from "../../index";


function ApplyForJob() {

const {state} = useLocation();  
const job = state.job;  
const [resume, setResume] = useState(null);
const [motivation, setMotivation] = useState('');
const {currentUser} = useContext(UserContext);

const handleResumeChange = (event) => {
  setResume(event.target.files[0]);
}

const handleMotivationChange = (event) => {
  setMotivation(event.target.value);
}

const handleSubmit = (event) => {
  event.preventDefault();
  const user = currentUser._id.toString();
  jobApi.applyForJob( resume , motivation,  job.id,user,0);
}
  return (
    <div className="main-content" style={{ padding: '16px' }}>
    <div className="content">
      <div className="container-fluid">
        <div className="font-xss">Titre du poste : {job.title}</div>
        <div>Description du poste : {job.description}</div>
        <div>Fourchette de salaire : {job.salaryRange}</div>
        <div>Entreprise : {job.company}</div>
        <div>Adresse : {job.address}</div>
        <div>Créé le : {job.created_at}</div>
      </div>

      <h3 className="font-xss fw-900 text-gray-500 p-4">Postuler</h3>
      <form style={{ width: '50%' }} onSubmit={handleSubmit}>
        {/* Champ pour télécharger le CV */}
        <div className="mb-3">
          <label htmlFor="resume" className="form-label">Téléchargez votre CV :</label>
          <input
            type="file"
            className="form-control"
            id="resume"
            name="resume"
            onChange={handleResumeChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="motivation" className="form-label">Motivation :</label>
          <textarea
            className="form-control"
            id="motivation"
            name="motivation"
            value={motivation}
            onChange={handleMotivationChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Soumettre la candidature</button>
      </form>
    </div>
    </div>
  )
}

export default ApplyForJob