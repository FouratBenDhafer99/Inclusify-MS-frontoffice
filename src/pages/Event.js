import React, { Component, Fragment } from "react";
import Header from '../components/Header';
import Leftnav from '../components/Leftnav';
import Rightchat from '../components/Rightchat';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import axios from 'axios';
import evenementApi from "../api/evenementApi";



class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            userEmail: "ayachioumaima2000@gmail.com",
            showPopup: false,
            popupMessage: "",
            searchQuery: "",
        };
    }

    togglePopup = (message = "") => {
        this.setState((prevState) => ({
            showPopup: !prevState.showPopup,
            popupMessage: message,
        }));
    }

    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    async componentDidMount() {
        
        try {
            const response = await evenementApi.getAllEvents(); //await axios.get('http://localhost:8091/event');
            console.log("aaaa"+response.data);
            this.setState({ events: response.data });
        } catch (error) {
            console.error('Error fetching events: ', error);
        }
    }


    showAutoDismissPopup = (message) => {
        this.setState({ showPopup: true, popupMessage: message });
    
        // Automatically hide the popup after 10 seconds
        setTimeout(() => {
            this.hidePopup();
        }, 1000);
    }
    
    hidePopup = () => {
        this.setState({ showPopup: false, popupMessage: "" });
    }
    
    
    handleJoinClick = async (eventId, event) => {
        if (event.attendeeEmails && event.attendeeEmails.includes(this.state.userEmail)) {
            alert("You have already attended this event.");
            return;
        }
    
        const joinedEvents = new Set(this.state.joinedEvents);
        joinedEvents.add(eventId);
    
        this.setState({ joinedEvents });
    
        try {
            const response = await axios.post(`http://localhost:8091/event/${eventId}/join?userEmail=${this.state.userEmail}`);
            console.log("Joined event successfully" + response);
            // Show the popup after joining with a success message
            this.togglePopup("You have successfully joined the event.");
        } catch (error) {
            console.error('Error joining event: ', error);
            // Show the popup with an error message
            this.togglePopup("An error occurred while joining the event.");
        }
    }
    
    handleCategoryChange = (categoryId) => {
        const updatedCategories = this.state.categories.map((category) => {
            if (category.id === categoryId) {
                return { ...category, checked: !category.checked };
            }
            return category;
        });
        this.setState({ categories: updatedCategories });
    };
    

    formatEventDate(dateString) {
        const date = new Date(dateString);
        return date.getDate();
    }

    getAbbreviatedMonthName(dateString) {
        const date = new Date(dateString);
        if (isNaN(date)) {
            return "N/A";
        }
        const months = [
            "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
        ];
        return months[date.getMonth()];
    }

    handleSearch = (query) => {
        this.setState({ searchQuery: query });
    };
    

    render() {
        const { events } = this.state;
        console.log(events);
        const { showPopup, popupMessage } = this.state;
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
                                <button type="button" className="btn-close" onClick={this.hidePopup}></button>
                            </div>
                            <div className="modal-body">
                                <p>{popupMessage}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.hidePopup}>Close</button>
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
                                                value={this.state.searchQuery}
                                                onChange={(e) => this.handleSearch(e.target.value)}
                                            />
                                        </div>
                                    </form>
                                    <a href="/" className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3"><i className="feather-filter font-xss text-grey-500"></i></a>
                                    </h2>
                                </div>    

                                {events?.filter((event) => event.name.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
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
                                                            {this.getAbbreviatedMonthName(value.date).toUpperCase()}
                                                        </span>
                                                        {this.formatEventDate(value.date)}
                                                    </h4>
                                                </div>
                                                <h2 className="fw-700 lh-3 font-xss">{value.name}
                                                    <span className="d-flex font-xssss fw-500 mt-2 lh-3 text-grey-500"> <i className="ti-location-pin me-1"></i>{value.location} </span>
                                                    <span className="d-flex font-xssss fw-500 mt-2 lh-3 text-grey-500">
                                                        DDL: {this.formatEventDate(value.registrationDeadline)} {this.getAbbreviatedMonthName(value.registrationDeadline).toUpperCase()}
                                                    </span>
                                                </h2>
                                            </div>
                                            <div className="card-body p-0">
                                                <b>Organizer</b>:  {value.organizer}
                                                <button
                                                    onClick={() => this.handleJoinClick(value.id, value)}
                                                    disabled={value.attendeeEmails && value.attendeeEmails.includes(this.state.userEmail)}
                                                    className="font-xsssss fw-700 ps-3 pe-3 lh-32 float-right mt-4 text-uppercase rounded-3 ls-2 bg-success d-inline-block text-white me-1"
                                                >
                                                    JOIN
                                                </button>
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
}

export default Event;
