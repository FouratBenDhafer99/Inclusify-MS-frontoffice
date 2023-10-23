import React from 'react';


const Profiledetail = ({user, isCurrentUser}) => {
    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
            <div className="card-body d-block p-4">
                <h4 className="fw-700 mb-3 font-xsss text-grey-900">About</h4>
            </div>
            <div className="card-body d-flex pt-0">
                <i className="feather-calendar text-grey-500 me-3 font-lg"></i>
                <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                    {user?.dateOfBirth}
                </h4>
            </div>
            <div className="card-body d-flex pt-0">
                <i className="feather-phone text-grey-500 me-3 font-lg"></i>
                <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                    {user?.phoneNumber??"Not avaible"}
                </h4>
            </div>
                <div className="card-body d-flex pt-0">
                    <i className="feather-user text-grey-500 me-3 font-lg"></i>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                        {user?.gender}
                    </h4>
                </div>
        </div>
    );
}

export default Profiledetail;