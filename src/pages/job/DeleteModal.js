import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import jobApi from '../../api/jobApi';



function DeleteModal({job}) {


    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = (id) => {
    jobApi.DeleteJob(id);
    console.log(id);
    handleClose();
  };

  return (
    <>
    <Button className='btn btn-sm btn-danger rounded-xl font-xss text-white m-2' variant="danger" onClick={handleShow}>
    <i className=" feather-trash"></i>    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this offer ? </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={()=>handleDelete(job.id)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default DeleteModal