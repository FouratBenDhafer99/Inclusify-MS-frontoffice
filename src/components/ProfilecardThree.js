import React, {useContext, useState} from 'react';
import {UserContext} from "../index";
import {useNavigate} from "react-router-dom";


const ProfilecardThree = ({user, isCurrentUser, handleTabKeyChange, activeTab}) => {

    const [isOpen, setOpen] = useState(false)
    const toggleOpen = () => setOpen(!isOpen);
    const openClass = `${isOpen ? " show" : ""}`;

    // todo delete these two later
    // const userData = useSelector(state => state.ProfileReducer)
    //const me = useContext(UserContext)//useSelector(state => state.connectedUserReducer)
    const {currentUser} = useContext(UserContext);

    const navigate = useNavigate();

    const handleParentTabKeyChange = (newTab) => handleTabKeyChange(newTab)

    return (
        <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
            <div className="card-body h250 p-0 rounded-xxl overflow-hidden m-3">
                {user?.accountSettings?.bannerImage ?
                    <img
                        src={user.accountSettings.bannerImage} alt="avater" className=""
                        onError={({currentTarget}) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "/assets/images/Logo Minassa1.png"
                        }}
                    /> :
                    <img
                        src="/assets/images/Logo Minassa1.png" alt="banner"
                    />
                }

            </div>
            <div className="card-body p-0 position-relative">
                <figure className="avatar position-absolute h100 w100 z-index-1" style={{top: '-40px', left: '30px'}}>
                    <img
                        src={user?.profileImagePath} alt="avater"
                        onError={({currentTarget}) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "https://via.placeholder.com/1200x250.png"
                        }}
                        className="float-right p-1 bg-white rounded-circle w-100 h-100"/>
                </figure>
                <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">{user?.firstName} {user?.lastName}
                    {user?.role === "LAWMAKER" ?
                        <><img src="/assets/images/Lawmaker.png" alt="avater" className="ml-3"/></> : null
                    }
                    {isCurrentUser || (user?.accountSettings && user?.accountSettings.showEmail) ?
                        <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">{user?.email}</span> : null
                    }
                </h4>
                <div
                    className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">

                    <span id="dropdownMenu4" onClick={toggleOpen}
                          className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700 pointer"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i
                        className="ti-more font-md tetx-dark"/></span>
                    <div className={`dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg ${openClass}`}
                         aria-labelledby="dropdownMenu4">
                        <div className="card-body p-0 d-flex">
                            <i className="feather-bookmark text-grey-500 me-3 font-lg"/>
                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">Block user<span
                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">They will never see you again.</span>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
                <ul className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4" id="pills-tab"
                    role="tablist">
                    <li className="active list-inline-item me-5">
                        <a onClick={() => handleParentTabKeyChange("posts")} href="#!"
                           className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${activeTab === "posts" ? "active" : ""}`}
                           data-toggle="tab">Posts</a>
                    </li>
                    <li className="list-inline-item me-5">
                        <a onClick={() => handleParentTabKeyChange("skills")} href="#!"
                           className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${activeTab === "skills" ? "active" : ""}`}
                           data-toggle="tab">Skills</a>
                    </li>
                    <li className="list-inline-item me-5">
                        <a onClick={() => handleParentTabKeyChange("jobs")} href="#!"
                           className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${activeTab === "jobs" ? "active" : ""}`}
                           data-toggle="tab">Jobs</a>
                    </li>
                    <li className="list-inline-item me-5">
                        <a onClick={() => handleParentTabKeyChange("events")} href="#!"
                           className={`fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${activeTab === "jobs" ? "active" : ""}`}
                           data-toggle="tab">Events</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ProfilecardThree;