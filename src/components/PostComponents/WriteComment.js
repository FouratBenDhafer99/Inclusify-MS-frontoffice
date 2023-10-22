import React, { useState, useContext } from "react";
import PostApi from "../../api/PostApi";
// import {UserContext} from "../../index";
import { Button } from "react-bootstrap";
import email from "../../pages/Email";
import Load from "../Load";

const WriteComment = ({ user, postId, socket }) => {
  // const {currentUser, setCurrentUser} = useContext(UserContext);
  const [commentContent, setCommentContent] = useState("");
  const handleInputChange = async (event) => {
    let comment = event.target.value;
    setCommentContent(comment);
  };
  const handleOnSubmit = async (event) => {
    //console.log(currentUser);
    console.log(postId);
    console.log(commentContent);
    setCommentContent("");
    console.log(commentContent);
    let comment = {
      postId: postId,
      comment: commentContent,
      //userId: currentUser._id,
    };
  };

  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3">
      <div className="card-body p-0">
        <div className="card-body p-0 mt-3 position-relative">
          <figure className="avatar position-absolute ps-2 mt-1 top-5 h30 w30">
            <img
              // src={currentUser?.profileImagePath || 'https://via.placeholder.com/1200x250.png'}
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
            value={commentContent}
            onChange={handleInputChange}
          />
          <Button variant="primary" onClick={handleOnSubmit}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WriteComment;
