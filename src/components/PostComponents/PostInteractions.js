import React, { useState } from "react";
import { Fragment } from "react";
import feedApi from "../../api/feedApi";
import { async } from "q";

const PostInteractions = (postId) => {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!isOpen);
  const menuClass = `${isOpen ? " show" : ""}`;

  const handleDeletePost = async () => {
    console.log("aaaaaaaaaaaaaa");
    console.log(postId.postId);
    const res = await feedApi.deletePost(postId.postId);
    console.log(res);
    if (res.status === 403) {
      alert("You want to delete a post ? it's forbidden! ");
    } else {
      alert("Your request has been, refresh the page to see the changes");
    }
  };

  return (
    <Fragment>
      <div
        className={`ms-auto pointer ${menuClass}`}
        id="dropdownMenu4"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={toggleOpen}
      >
        <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss" />
      </div>
      <div
        className={`dropdown-menu p-4 right-0 rounded-xxl border-0 shadow-lg ${menuClass}`}
        aria-labelledby="dropdownMenu4"
      >
        <div className="card-body p-0 d-flex">
          <i className="feather-bookmark text-grey-500 me-3 font-lg" />
          <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4 pointer">
            Save Link{" "}
            <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
              Add this to your saved items
            </span>
          </h4>
        </div>
        <div className="card-body p-0 d-flex mt-2" onClick={handleDeletePost}>
          <i className="feather-trash text-grey-500 me-3 font-lg" />
          <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4 pointer">
            Delete Post{" "}
            <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
              Only super user can do it
            </span>
          </h4>
        </div>
        <div className="card-body p-0 d-flex mt-2">
          <i className="feather-alert-octagon text-grey-500 me-3 font-lg" />
          <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4 pointer">
            Hide all from Group{" "}
            <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
              Save to your saved items
            </span>
          </h4>
        </div>
        <div className="card-body p-0 d-flex mt-2">
          <i className="feather-lock text-grey-500 me-3 font-lg" />
          <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4 pointer">
            Unfollow Group{" "}
            <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
              Save to your saved items
            </span>
          </h4>
        </div>
      </div>
    </Fragment>
  );
};

export default PostInteractions;
