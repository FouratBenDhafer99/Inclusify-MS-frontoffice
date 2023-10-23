import React, { useContext, useEffect, Fragment, useState } from "react";
import Header from '../../components/Header';
import Leftnav from '../../components/Leftnav';
import Rightchat from '../../components/Rightchat';
import Appfooter from '../../components/Appfooter';
import Popupchat from '../../components/Popupchat';
import evenementApi from "../../api/evenementApi";
import { UserContext } from "../../index";
import { Link } from 'react-router-dom';

function Event() {
  const { currentUser } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [userEmail, setUserEmail] = useState(currentUser ? currentUser.email : "");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        console.log("Here the Current User: " + currentUser?._id);
        console.log("Here the Current User: " + currentUser?.email);
        const events = await evenementApi.getAllEvents();
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    }
    fetchEvents();
  }, [currentUser]);

  const togglePopup = (message = "") => {
    setShowPopup(!showPopup);
    setPopupMessage(message);
  };

  const handleJoinClick = async (eventId, event) => {
    if (event.attendeeEmails && event.attendeeEmails.includes(userEmail)) {
      alert("You have already attended this event.");
      return;
    }

    console.log("event Id" + eventId);

    try {
      const response = await evenementApi.join(eventId,currentUser?.email);
      console.log("Joined event successfully", response);
      togglePopup("You have successfully joined the event.");
    } catch (error) {
      console.error('Error joining event: ', error);
      togglePopup("An error occurred while joining the event.");
    }
  };

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  const getAbbreviatedMonthName = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "N/A";
    }
    const months = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    return months[date.getMonth()];
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Fragment>
      <Header />
      <Leftnav />
      <Rightchat />

      <div className="modal" style={{ display: showPopup ? "block" : "none" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Event Joined</h5>
              <button type="button" className="btn-close" onClick={() => togglePopup()}></button>
            </div>
            <div className="modal-body">
              <p>{popupMessage}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => togglePopup()}>Close</button>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center">Events
                  <form action="#" className="pt-0 pb-0 ms-auto">
                    <div className="search-form-2 ms-2">
                      <i className="ti-search font-xss"></i>
                      <input
                        type="text"
                        className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                        placeholder="Search here."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                  </form>
                  <a href="/" className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3"><i className="feather-filter font-xss text-grey-500"></i></a>
                </h2>
              </div>

              {events
                .filter((event) => event.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((value, index) => (
                  <div key={index} className="col-lg-4 col-md-6 pe-2 ps-2">
                    <div className="card p-3 bg-white w-100 hover-card border-0 shadow-xss rounded-xxl border-0 mb-3 overflow-hidden ">
                      <div className="card-image w-100">
                        <img src={`http://localhost:8091${value.image}`} alt="event" className="w-100 rounded-3" />
                      </div>
                      <div className="card-body d-flex ps-0 pe-0 pb-0">
                        <div className="bg-greylight me-3 p-3 border-light-md rounded-xxl theme-dark-bg">
                          <h4 className="fw-700 font-lg ls-3 text-grey-900 mb-0">
                            <span className="ls-3 d-block font-xsss text-grey-500 fw-500">
                              {getAbbreviatedMonthName(value.date).toUpperCase()}
                            </span>
                            {formatEventDate(value.date)}
                          </h4>
                        </div>
                        <h2 className="fw-700 lh-3 font-xss">{value.name}
                          <span className="d-flex font-xssss fw-500 mt-2 lh-3 text-grey-500"> <i className="ti-location-pin me-1"></i>{value.location} </span>
                          <span className="d-flex font-xssss fw-500 mt-2 lh-3 text-grey-500">
                            DDL: {formatEventDate(value.registrationDeadline)} {getAbbreviatedMonthName(value.registrationDeadline).toUpperCase()}
                          </span>
                        </h2>
                      </div>
                      <div className="card-body p-0">
                        <b>Organizer</b>:  {value.organizer}
                        <button
                          onClick={() => handleJoinClick(value.id, value)}
                          disabled={value.attendeeEmails && value.attendeeEmails.includes(userEmail)}
                          className="font-xsssss fw-700 ps-3 pe-3 lh-32 float-right mt-4 text-uppercase rounded-3 ls-2 bg-success d-inline-block text-white me-1"
                        >
                          JOIN
                        </button><br></br>
                        <Link to={`/admin/event/${value.id}`}>See Event</Link>

                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Popupchat />
      <Appfooter />
    </Fragment>
  );
}

export default Event;
