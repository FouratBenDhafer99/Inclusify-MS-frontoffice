import { useContext, useEffect, Fragment, useState } from "react";
import Header from "../../components/Header";
import Leftnav from "../../components/Leftnav";
import Appfooter from "../../components/Appfooter";
import evenementApi from "../../api/evenementApi";
import { UserContext } from "../../index";
import { useParams, useNavigate  } from "react-router-dom";



function DetailsEvent(props) {
  const { currentUser } = useContext(UserContext);
  const [event, setEvent] = useState(null);
  const [userEmail] = useState(currentUser ? currentUser.email : "");
  const { eventId } = useParams();

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("event Id : " + eventId);
        const response = await evenementApi.getById(eventId);
        setEvent(response);
      } catch (error) {
        console.error("Error fetching event details: ", error);
      }
    };

    fetchData(); 
  }, []);

  const handleDeleteClick = async () => {
    try {
      console.log("event Id : " + eventId);
      await evenementApi.deleteEvent(eventId);
      navigate('/admin/event');
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };
  
  

  // Function to handle the edit button click
  const handleEditClick = () => {
    // You can implement the edit logic here
    // For example, navigate to an edit page with the event ID
  };

  return (
    <div>
      <Header />
      <Leftnav />
      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <div className="col-lg-6 pe-0 ps-0">
                <div className="card w-100 border-0 bg-white">
                  <div className="card-body ms-3 me-3 p-4">
                    {event ? (
                      <Fragment>
                        <img
                          src={`http://localhost:8091${event.image}`}
                          alt="Event"
                          className="w-100 rounded-3"
                        />
                      </Fragment>
                    ) : (
                      // Handle the case where event data is still loading
                      <p>Loading event details...</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 pe-0 ps-0">
                <div className="card w-100 border-0 bg-white">
                  <div className="card-body ms-3 me-3 p-4">
                    {event ? (
                      <Fragment>
                        <h2 className="fw-700 text-grey-900 font-md">
                          {event.name}
                        </h2>
                        <p className="text-grey-500 font-xssss fw-500 mb-3">
                          {event.description}
                        </p>
                        <p className="fw-600 text-grey-900 font-xssss mb-2">
                          Date: {event.date}
                        </p>
                        <p className="fw-600 text-grey-900 font-xssss mb-2">
                          Location: {event.location}
                        </p>
                        <p className="fw-600 text-grey-900 font-xssss mb-2">
                          Registration Deadline: {event.registrationDeadline}
                        </p>
                        <p className="fw-600 text-grey-900 font-xssss mb-2">
                          Organizer: {event.organizer}
                        </p>
                        <p className="fw-600 text-grey-900 font-xssss mb-2">
                          Capacity: {event.capacity}
                        </p>
                        <button
                          onClick={handleEditClick}
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDeleteClick}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </Fragment>
                    ) : (
                      // Handle the case where event data is still loading
                      <p>Loading event details...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Appfooter />
    </div>
  );
}

export default DetailsEvent;
