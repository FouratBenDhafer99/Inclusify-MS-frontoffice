import React, { Fragment, useState } from "react";
// import Rodal from 'rodal';
import "reactjs-popup/dist/index.css";
import "rodal/lib/rodal.css";
import PostInteractions from "./PostInteractions";
import CreatePostModal from "./CreatePostModal";

const Createpost = ({ user, projectId }) => {
  const [visible, setVisible] = useState(false);
  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };

  return (
    <Fragment>
      <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
        <div className="card-body p-0">
          <a
            href="#"
            onClick={show}
            className="font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center"
          >
            <i className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight" />
            Create Post
          </a>
        </div>
        <div className="card-body p-0 mt-3 position-relative">
          <figure className="avatar position-absolute ps-2 mt-1 top-5 h30 w30">
            <img
              src={
                user?.profileImagePath ||
                "https://via.placeholder.com/1200x250.png"
              }
              alt="avater"
              className="shadow-sm rounded-circle h40 w40"
              style={{ height: "40px", objectFit: "contain" }}
            />
          </figure>
          <textarea
            name="message"
            className="h100 bor-0 w-100 rounded-xxl font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
            cols="30"
            rows="10"
            placeholder="What's on your mind?"
            style={{ padding: "0.5rem", paddingLeft: "4rem" }}
            // value={postDescription}
            // value={}
            // onChange={handleInputChange}
          />
        </div>
        <div className="card-body d-flex p-0 mt-0">
          <a
            href="#video"
            className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
          >
            <i className="font-md text-danger feather-video me-2" />
            <span className="d-none-xs">Live Video</span>
          </a>
          <a
            href="#photo"
            className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
          >
            <i className="font-md text-success feather-image me-2" />
            <span className="d-none-xs">Photo/Video</span>
          </a>
          <a
            href="#activity"
            className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
          >
            <i className="font-md text-warning feather-camera me-2" />
            <span className="d-none-xs">Feeling/Activity</span>
          </a>
          {/*<PostInteractions/>*/}
        </div>
      </div>
      <CreatePostModal
        projectId={projectId}
        show={show}
        visible={visible}
        onClose={hide}
        user={user}
      />
    </Fragment>
  );
};

export default Createpost;
