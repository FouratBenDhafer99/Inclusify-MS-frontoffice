import React, { Fragment, useState, useContext } from 'react';
import { UserContext } from '../../index';
import evenementApi from '../../api/evenementApi';
import Header from '../../components/Header';
import Leftnav from '../../components/Leftnav';
import Pagetitle from '../../components/Pagetitle';

const FormAdd = () => {
  const { handleAddEvent } = useContext(UserContext);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '', 
    date: '',
    location: '',
    organizer: '',
    status: '', 
    capacity: '', 
    registrationDeadline: '',
    image: '',
  });

  const addEvent = async () => {
    try {
      const addedEvent = await evenementApi.addEvent(newEvent);

      console.log('Event added:', addedEvent);

      setNewEvent({
        name: '',
        date: '',
        location: '',
        registrationDeadline: '',
      });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <Fragment>
      <Header />
      <Leftnav />
      <div className="main-content">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <Pagetitle title="Add Event" />
              <div className="col-lg-7 mb-3">
                <div className="form-gorup">
                  <label className="mont-font fw-600 font-xssss">Event Name</label>
                  <input
                    type="text"
                    name="event-name"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="form-gorup">
                  <label className="mont-font fw-600 font-xssss">Event Description</label>
                  <input
                    type="text"
                    name="event-description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="form-gorup">
                    <label className="mont-font fw-600 font-xssss">Date</label>
                    <input
                        type="date" // Change the input type to "date"
                        name="event-date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="form-control"
                    />
                    </div>
                <div className="form-gorup">
                    <label className="mont-font fw-600 font-xssss">Registration Deadline</label>
                    <input
                        type="date" // Change the input type to "date"
                        name="event-registration-deadline"
                        value={newEvent.registrationDeadline}
                        onChange={(e) => setNewEvent({ ...newEvent, registrationDeadline: e.target.value })}
                        className="form-control"
                    />
                    </div>

                <div className="form-gorup">
                  <label className="mont-font fw-600 font-xssss">Location</label>
                  <input
                    type="text"
                    name="event-location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="form-gorup">
                  <label className="mont-font fw-600 font-xssss">Organizer</label>
                  <input
                    type="text"
                    name="organizer"
                    value={newEvent.organizer}
                    onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="form-gorup">
                  <label className="mont-font fw-600 font-xssss">Status</label>
                  <input
                    type="text"
                    name="status"
                    value={newEvent.status}
                    onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="form-gorup">
                  <label className="mont-font fw-600 font-xssss">Capacity</label>
                  <input
                    type="text"
                    name="event-capacity"
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="form-gorup">
                    <label className="mont-font fw-600 font-xssss">Image</label>
                    <input
                        type="file" 
                        name="event-image"
                        onChange={(e) => setNewEvent({ ...newEvent, image: e.target.files[0] })} 
                        className="form-control"
                    />
                </div>
                <div className="card shadow-none border-0">
                  <button
                    onClick={addEvent}
                    className="border-0 w-100 p-3 mt-3 font-xsss text-center text-white bg-current rounded-3 text-uppercase fw-600 ls-3">
                    Save Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FormAdd;
