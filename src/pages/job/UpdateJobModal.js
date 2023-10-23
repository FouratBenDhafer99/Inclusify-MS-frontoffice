import React from 'react'
import { Modal , Button} from 'react-bootstrap';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import jobApi from '../../api/jobApi';
import {UserContext} from "../../index";
import { useContext } from 'react';

function UpdateJobModal({job}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(false);


    //data

    const [nwtitle, setNwTitle] = useState(job.title);
    const [nwdescription, setNwDescription] = useState(job.description);
    const [nwType, setNwType] = useState(job.type);
    const [nwSalaryRange, setNwSalaryRange] = useState(job.salaryRange);
    const [nwAddress, setNwAddress] = useState(job.address);
    const [nwCompany, setNwCompany] = useState(job.company);

    const {currentUser} = useContext(UserContext);

  const handleSubmit = (event) => {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // setValidated(true);
    const user = currentUser._id.toString();
    const id = job.id;
    
    console.log(nwAddress,nwCompany,nwSalaryRange,nwType,nwdescription,nwtitle,user,id);
    jobApi.UpdateJob({nwtitle,nwdescription,nwType,nwSalaryRange,nwAddress,nwCompany,user,id});
    console.log();
  };

  return (
    <>
    <Button className="btn btn-sm btn-primary rounded-xl font-xss text-white m-2" variant="primary" onClick={handleShow}>
        Update   
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header className='bg-blue-gradiant' closeButton>
        <Modal.Title className='  text-white font-xss'>Add new Offer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form  onSubmit={handleSubmit}>
        <Form.Group  controlId="validationCustom01">
          <Form.Label>Title :</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Job title"
            onChange={(e) => {setNwTitle(e.target.value)}}
            defaultValue={job.title}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId="validationCustom02">
          <Form.Label>Description :</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Description"
            onChange={(e) => {setNwDescription(e.target.value)}}
            defaultValue={job.description}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId="validationCustom02">
          <Form.Label>Type :</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Type"
            onChange={(e) => {setNwType(e.target.value)}}
            defaultValue={job.type}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId="validationCustom02">
          <Form.Label>Salary Range :</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Salary Range"
            onChange={(e) => {setNwSalaryRange(e.target.value)}}
            defaultValue={job.salaryRange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId="validationCustom02">
          <Form.Label>Address :</Form.Label>
          <Form.Control
            required
            type="text"
             placeholder="Address"
            onChange={(e) => {setNwAddress(e.target.value)}}
            defaultValue={job.address}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId="validationCustom02">
          <Form.Label>Company :</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Company"
            onChange={(e) => {setNwCompany(e.target.value)}}
            defaultValue={job.company}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        </Form>

        

      </Modal.Body>
      <Modal.Footer>
        <Button className='btn btn-sm rounded-xl font-xss text-white bg-blue-gradiant' variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className='btn btn-sm rounded-xl font-xss text-white bg-blue-gradiant' variant="primary" onClick={()=>handleSubmit()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default UpdateJobModal