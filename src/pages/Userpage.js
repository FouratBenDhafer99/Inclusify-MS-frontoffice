import React, { Fragment, useEffect, useState, useContext } from "react";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";

import Profiledetail from "../components/Profiledetail";
import ProfilecardThree from "../components/ProfilecardThree";
import Createpost from "../components/PostComponents/Createpost";
import Postview from "../components/PostComponents/Postview";
import Load from "../components/Load";
import Layout from "../components/Layout";
import userApi from "../api/userApi";
import { Tab } from "react-bootstrap";
import { UserContext } from "../index";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostApi from "../api/PostApi";
import feedApi from "../api/feedApi";
import skillAPI from "../api/skillAPI";
import jobApi from "../api/jobApi";
import UpdateJobModal from "./job/UpdateJobModal";
import evenementApi from "../api/evenementApi";
import marketApi from "../api/marketApi";

const Userpage = () => {
  const { currentUser } = useContext(UserContext);
  //The user for this page
  const [user, setUser] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [tabKey, setTabKey] = useState("posts");
  const [isLoading, setIsLoading] = useState(true);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [isSkillsLoading, setIsSkillsLoading] = useState(true);
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  const [isEventsLoading, setIsEventsLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  const handleTabKeyChange = (newTab) => setTabKey(newTab);

  //Fetch the user from the backend on load
  const params = useParams();

  async function fetchUser() {
    if (!(params.userId === currentUser?._id))
      await userApi.getById(params.userId).then((res) => {
        //console.log(res)
        if (res) setUser(res);
      });
    else {
      setUser(currentUser);
      setIsCurrentUser(true);
    }
    setIsLoading(false);
  }

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    setIsPostsLoading(true);
    console.log(user);
    if (user)
      await feedApi
        .getAllPostsByUser(user._id)
        .then((res) => {
          setPosts(res);
          setIsPostsLoading(false);
          console.log(res);
        })
        .catch((e) => console.info(e));
  };

  const [skills, setSkills] = useState([]);

  const getSkills = async () => {
    setIsSkillsLoading(true);
    console.log(user);
    if (user)
      await skillAPI
        .getSkillByUserId(user._id)
        .then((res) => {
          setSkills(res);
          setIsSkillsLoading(false);
          console.log(res);
        })
        .catch((e) => console.info(e));
  };

  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    setIsJobsLoading(true);
    console.log(user);
    if (user)
      await jobApi
        .getJobsByUser(user._id)
        .then((res) => {
          setJobs(res);
          setIsJobsLoading(false);
          console.log(res);
        })
        .catch((e) => console.info(e));
  };

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setIsProductsLoading(true);
    console.log(user);
    if (user)
      await marketApi
        .getProductsByUser(user._id)
        .then((res) => {
          setProducts(res);
          setIsProductsLoading(false);
          console.log(res);
        })
        .catch((e) => console.info(e));
  };
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    setIsEventsLoading(true);
    console.log(user);
    if (user)
      await evenementApi
        .getEventsByUser(user._id)
        .then((res) => {
          setEvents(res);
          setIsEventsLoading(false);
          console.log(res);
        })
        .catch((e) => console.info(e));
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
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return months[date.getMonth()];
  };
  const location = useLocation();
  useEffect(() => {
    //setIsLoading(true)
    fetchUser();
  }, [currentUser, location.key]);

  useEffect(() => {
    //setIsLoading(true)
    console.log(user);
    getPosts();
    getSkills();
    getJobs();
    getEvents();
    getProducts();
  }, [user]);

  const navigate = useNavigate();
  const handleClick = (job) => {
    console.log("job clicked", job);
    navigate("/jobs/jobdetails", { state: { job } });
  };
  return (
    <Fragment>
      <Layout />
      <div className="main-content">
        <div className="middle-sidebar-bottom">
          {isLoading ? (
            <Load />
          ) : (
            <div className="middle-sidebar-left pe-0">
              <div className="row">
                <div className="col-xl-12 mb-3">
                  <ProfilecardThree
                    user={user}
                    isCurrentUser={isCurrentUser}
                    activeTab={tabKey}
                    handleTabKeyChange={handleTabKeyChange}
                  />
                </div>
                <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                  <Profiledetail user={user} isCurrentUser={isCurrentUser} />
                </div>
                <div className="col-xl-8 col-xxl-9 col-lg-8">
                  {isCurrentUser ? <Createpost user={user} /> : null}

                  <Tab.Container activeKey={tabKey} className="mb-3 w-100">
                    <Tab.Content>
                      <Tab.Pane eventKey="posts" title={"Posts"}>
                        {isPostsLoading ? (
                          <Load />
                        ) : posts.length > 0 ? (
                          posts.map((post, i) => (
                            <div key={post.id}>
                              <Postview user={post.user} post={post} />
                            </div>
                          ))
                        ) : (
                          "No posts yet"
                        )}
                      </Tab.Pane>
                      <Tab.Pane eventKey="skills" title={"Skills"}>
                        {isSkillsLoading ? (
                          <Load />
                        ) : skills.length > 0 ? (
                          skills.map((skill, i) => (
                            <div key={skill.id}>
                              <div
                                key={skill.id}
                                className="col-md-4 col-sm-6 pe-2 ps-2"
                              >
                                <div
                                  className={
                                    "card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 bg-gold-gradiant"
                                  }
                                >
                                  <div className="card-body d-block w-100 p-4 text-center">
                                    <div className="clearfix"></div>
                                    <h4 className="fw-700 font-xss mb-0">
                                      {skill.name}{" "}
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          "No skills yet"
                        )}
                      </Tab.Pane>
                      <Tab.Pane eventKey="jobs" title={"Jobs"}>
                        {isJobsLoading ? (
                          <Load />
                        ) : jobs.length > 0 ? (
                          jobs.map((value, index) => (
                            <div
                              key={index}
                              className="card d-block w-100 border-0 mb-3 shadow-xss bg-white rounded-3 pe-4 pt-4 pb-4"
                              style={{ paddingLeft: "120px" }}
                            >
                              <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i>
                              <h4 className="font-xss fw-700 text-grey-900 mb-3 pe-4">
                                {value.title}
                                <span className="font-xssss fw-500 text-grey-500 ms-4">
                                  ({value.date})
                                </span>
                              </h4>
                              <h5 className="font-xssss mb-2 text-grey-500 fw-600">
                                <span className="text-grey-900 font-xssss text-dark">
                                  Location :{" "}
                                </span>{" "}
                                {value.address}
                              </h5>
                              <h5 className="font-xssss mb-2 text-grey-500 fw-600">
                                <span className="text-grey-900 font-xssss text-dark">
                                  Company :{" "}
                                </span>
                                {value.company}
                              </h5>
                              <h5 className="font-xssss text-grey-500 fw-600 mb-3">
                                <span className="text-grey-900 font-xssss text-dark">
                                  Salary :{" "}
                                </span>{" "}
                                {value.salaryRange}
                              </h5>
                              {currentUser?._id === value.user ? (
                                <UpdateJobModal job={value} />
                              ) : (
                                <button
                                  style={{ border: 0 }}
                                  onClick={() => handleClick(jobs[index])}
                                  className="position-absolute bottom-15 mb-3 right-15 rounded-xl font-xss text-white"
                                >
                                  <i className="btn-round-sm bg-primary-gradiant text-white font-sm feather-chevron-right"></i>
                                </button>
                              )}
                            </div>
                          ))
                        ) : (
                          "No posted jobs yet"
                        )}
                      </Tab.Pane>

                      <Tab.Pane eventKey="events" title={"events"}>
                        {isEventsLoading ? (
                          <Load />
                        ) : events.length > 0 ? (
                          events.map((value, index) => (
                            <div
                              key={index}
                              className="col-lg-4 col-md-6 pe-2 ps-2"
                            >
                              <div className="card p-3 bg-white w-100 hover-card border-0 shadow-xss rounded-xxl border-0 mb-3 overflow-hidden ">
                                <div className="card-image w-100">
                                  <img
                                    src={`http://localhost:8091${value.image}`}
                                    alt="event"
                                    className="w-100 rounded-3"
                                  />
                                </div>
                                <div className="card-body d-flex ps-0 pe-0 pb-0">
                                  <div className="bg-greylight me-3 p-3 border-light-md rounded-xxl theme-dark-bg">
                                    <h4 className="fw-700 font-lg ls-3 text-grey-900 mb-0">
                                      <span className="ls-3 d-block font-xsss text-grey-500 fw-500">
                                        {getAbbreviatedMonthName(
                                          value.date
                                        ).toUpperCase()}
                                      </span>
                                      {this.formatEventDate(value.date)}
                                    </h4>
                                  </div>
                                  <h2 className="fw-700 lh-3 font-xss">
                                    {value.name}
                                    <span className="d-flex font-xssss fw-500 mt-2 lh-3 text-grey-500">
                                      {" "}
                                      <i className="ti-location-pin me-1"></i>
                                      {value.location}{" "}
                                    </span>
                                    <span className="d-flex font-xssss fw-500 mt-2 lh-3 text-grey-500">
                                      DDL:{" "}
                                      {formatEventDate(
                                        value.registrationDeadline
                                      )}{" "}
                                      {getAbbreviatedMonthName(
                                        value.registrationDeadline
                                      ).toUpperCase()}
                                    </span>
                                  </h2>
                                </div>
                                <div className="card-body p-0">
                                  <b>Organizer</b>: {value.organizer}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          "No posted events yet"
                        )}
                      </Tab.Pane>
                      <Tab.Pane eventKey="products" title={"Products"}>
                        {isProductsLoading ? (
                          <Load />
                        ) : products.length > 0 ? (
                          products.map((value, index) => (
                            <div key={index} className="col-lg-4 col-md-6">
                              <div className="card w-100 border-0 mt-4">
                                <div
                                  className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2"
                                  href={`/product/${value.id}`}
                                >
                                  <a href={`/product/${value.id}`}>
                                    {" "}
                                    <img
                                      width="350"
                                      style={{ objectFit: "cover" }}
                                      height="350"
                                      src={`${value.image}`}
                                      alt="product"
                                      className="w-100 mt-0 mb-0 p-5"
                                    />
                                  </a>
                                </div>
                                <div className="card-body w-100 p-0 text-center">
                                  <h2 className="mt-2 mb-1">
                                    <a
                                      href="/singleproduct"
                                      className="text-black fw-700 font-xsss lh-26"
                                    >
                                      {value.name}
                                    </a>
                                  </h2>
                                  <h6 className="font-xsss fw-600 text-grey-500 ls-2">
                                    ${value.price}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          "No products yet"
                        )}
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Popupchat />
      <Appfooter />
    </Fragment>
  );
};

export default Userpage;
