import React from 'react'
import { Modal , Button} from 'react-bootstrap';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import jobApi from '../../api/jobApi';
import {UserContext} from "../../index";
import { useContext } from 'react';




function AddJobModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(false);


    //data

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [salaryRange, setSalaryRange] = useState("");
    const [address, setAddress] = useState("");
    const [company, setCompany] = useState("");

    const {currentUser} = useContext(UserContext);

  const handleSubmit = (event) => {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // setValidated(true);
    const user = currentUser._id.toString();
    jobApi.AddJob({title,description,type,salaryRange,address,company,user});
    console.log(title,description,type,salaryRange,address,company,user);
    handleClose();
  };


  return (
    <>
    <Button className="btn btn-sm btn-primary rounded-xl font-xss text-white m-2" variant="primary" onClick={handleShow}>
        Add new Offer
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
            onChange={(e) => {setTitle(e.target.value)}}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId="validationCustom02">
          <Form.Label>Description :</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Description"
            onChange={(e) => {setDescription(e.target.value)}}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId="validationCustom02">
          <Form.Label>Type :</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Type"
            onChange={(e) => {setType(e.target.value)}}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId="validationCustom02">
          <Form.Label>Salary Range :</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Salary Range"
            onChange={(e) => {setSalaryRange(e.target.value)}}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId="validationCustom02">
          <Form.Label>Address :</Form.Label>
          <Form.Control
            required
            type="text"
        placeholder="Address"
        onChange={(e) => {setAddress(e.target.value)}}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId="validationCustom02">
          <Form.Label>Company :</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Company"
            onChange={(e) => {setCompany(e.target.value)}}
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

export default AddJobModal