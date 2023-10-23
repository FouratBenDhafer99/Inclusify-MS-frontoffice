import React, { useState, useEffect } from "react";
import Rodal from "rodal";
import PostApi from "../../api/PostApi";
import "./FacebookPostModal.css";
import Postview from "./Postview";
import PostInteractions from "./PostInteractions";
import WriteComment from "./WriteComment";
import Comment from "./Comment";
import ReactOnPost from "./ReactOnPost";
import Load from "../Load";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PostViewModal({ visible, onClose, user, post }) {
  let des = post?.description || des;
  user = post?.user || user;
  let time = post?.createdAt;
  let postimage = post?.images;
  let postvideo = post?.videos;

  const [commentsNumber, setCommentsNumber] = useState(0);
  const [likesNumber, setLikesNumber] = useState(0);

  useEffect(() => {
    setCommentsNumber(post?.comments?.length);
    setLikesNumber(post?.reacts?.length);
  }, []);

  const [postDescription, setPostDescription] = useState("");
  const [postImages, setPostImages] = useState([]);
  const [postData, setPostData] = useState({});

  const [isActive, setActive] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const [postType, setPostType] = useState("Type");
  const [selectedImages, setSelectedImages] = useState([]);

  const menuClass = `${isOpen ? " show" : ""}`;
  const emojiClass = `${isActive ? " active" : ""}`;

  const [comments, setComments] = useState(post?.comments);

  const toggleActive = () => setActive(!isActive);
  const toggleOpen = () => setOpen(!isOpen);

  // const loadComments = async () => {
  //   await PostApi.getPostComments(post.id).then((res) => {
  //     // console.log(res)
  //     setComments(res);
  //   });
  // };

  useEffect(() => {
    console.log(comments);
  }, [post]);

  const navigate = useNavigate();
  //   function handleNavigateToProject() {
  //     navigate("/project/" + post.project.id);
  //   }

  return (
    <Rodal
      visible={visible}
      onClose={onClose}
      animation="slideUp"
      className="rod-cl"
      width={600}
      height={630}
      customStyles={{
        transition: "height 0.2s ease",
        top: "0px",
        bottom: "10%",
        padding: "0px",
        borderRadius: "12px",
      }}
    >
      <div
        className={`container`}
        style={{ paddingLeft: 0, paddingRight: 0, overflowY: "auto" }}
      >
        <section className="post">
          <header>{user?.firstName}'s post</header>
          <div className="card w-100  shadow-xss rounded-xxl border-0 p-4 mb-3 img-hov">
            <div className="d-flex">
              <div className="card-body p-0 d-flex">
                <figure className="avatar me-3">
                  <img
                    src={
                      user?.profileImagePath ||
                      "https://via.placeholder.com/1200x250.png"
                    }
                    alt="avater"
                    className="shadow-sm rounded-circle w50"
                    style={{ height: "50px", objectFit: "contain" }}
                  />
                </figure>
                <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                  {" "}
                  {user?.firstName} {user?.lastName}
                  <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                    {" "}
                    {time}
                  </span>
                </h4>
              </div>
              {post.project && (
                <div className="justify-content-end">
                  {/* <Button variant="primary" 
                  onClick={handleNavigateToProject}>
                    Go to project
                  </Button> */}
                </div>
              )}
            </div>

            <div className="card-body p-0 me-lg-5">
              <p className="fw-500 text-dark lh-26 font-xssss w-100 mb-2">
                {des}
              </p>
            </div>
            {postvideo ? (
              <div className="card-body p-0 mb-3 rounded-3 overflow-hidden uttam-die">
                <a href="/defaultvideo" className="video-btn">
                  <video autoPlay loop className="float-right w-100">
                    <source
                      src={`/assets/images/${postvideo}`}
                      type="video/mp4"
                    />
                  </video>
                </a>
              </div>
            ) : (
              ""
            )}
            <div className="card-body d-block p-0 mb-3">
              <div className="row ps-2 pe-2">
                {post.images
                  ? postimage.map((img) => (
                      <div key={img?.length} className="col-sm-12 p-1 w175">
                        <img src={img} className="rounded-3 w-100" alt="post" />
                      </div>
                    ))
                  : ""}
              </div>
            </div>

            <div className="card-body d-flex p-0 position-relative">
              <ReactOnPost likesNumber={likesNumber} isComment={true} />
              <a className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss">
                <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg" />
                <span className="d-none-xss">{comments?.length} Comment</span>
              </a>

              <div
                className={`pointer ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss ${menuClass}`}
                id={`dropdownMenu${post?.id}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={toggleOpen}
              >
                <i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg" />
                <span className="d-none-xs">Share</span>
              </div>
              <div className="d-flex justify-content-end p-0 ms-4">
                <div
                  className={`dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg right-0 ${menuClass}`}
                  aria-labelledby={`dropdownMenu${post?.id}`}
                >
                  <h4 className="fw-700 font-xss text-grey-900 d-flex align-items-center">
                    Share{" "}
                    <i className="feather-x ms-auto font-xssss btn-round-xs bg-greylight text-grey-900 me-2" />
                  </h4>
                  <div className="card-body p-0 d-flex">
                    <ul className="d-flex align-items-center justify-content-between mt-2">
                      <li className="me-1">
                        <span className="btn-round-lg pointer bg-facebook">
                          <i className="font-xs ti-facebook text-white" />
                        </span>
                      </li>
                      <li className="me-1">
                        <span className="btn-round-lg pointer bg-twiiter">
                          <i className="font-xs ti-twitter-alt text-white" />
                        </span>
                      </li>
                      <li className="me-1">
                        <span className="btn-round-lg pointer bg-linkedin">
                          <i className="font-xs ti-linkedin text-white" />
                        </span>
                      </li>
                      <li className="me-1">
                        <span className="btn-round-lg pointer bg-instagram">
                          <i className="font-xs ti-instagram text-white" />
                        </span>
                      </li>
                      <li>
                        <span className="btn-round-lg pointer bg-pinterest">
                          <i className="font-xs ti-pinterest text-white" />
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body p-0 d-flex">
                    <ul className="d-flex align-items-center justify-content-between mt-2">
                      <li className="me-1">
                        <span className="btn-round-lg pointer bg-tumblr">
                          <i className="font-xs ti-tumblr text-white" />
                        </span>
                      </li>
                      <li className="me-1">
                        <span className="btn-round-lg pointer bg-youtube">
                          <i className="font-xs ti-youtube text-white" />
                        </span>
                      </li>
                      <li className="me-1">
                        <span className="btn-round-lg pointer bg-flicker">
                          <i className="font-xs ti-flickr text-white" />
                        </span>
                      </li>
                      <li className="me-1">
                        <span className="btn-round-lg pointer bg-black">
                          <i className="font-xs ti-vimeo-alt text-white" />
                        </span>
                      </li>
                      <li>
                        <span className="btn-round-lg pointer bg-whatsup">
                          <i className="font-xs feather-phone text-white" />
                        </span>
                      </li>
                    </ul>
                  </div>

                  <h4 className="fw-700 font-xssss mt-4 text-grey-500 d-flex align-items-center mb-3">
                    Copy Link
                  </h4>
                  <i className="feather-copy position-absolute right-35 mt-3 font-xs text-grey-500" />
                  <input
                    type="text"
                    placeholder="https://socia.be/1rGxjoJKVF0"
                    className="bg-grey text-grey-500 font-xssss border-0 lh-32 p-2 font-xssss fw-600 rounded-3 w-100 theme-dark-bg"
                  />
                </div>
                <PostInteractions postId={post?.id} />
              </div>
            </div>

            {comments.map((comment) => (
              <div
                key={comment.id}
                className="card w-100 border-0 shadow-none right-scroll-bar pt-4 pb-4"
              >
                <Comment user={comment.userId} comment={comment}></Comment>
              </div>
            ))}
            {/* {isWriting ? (
              <div className="card w-100 border-0 shadow-none right-scroll-bar pt-4 pb-4">
                <Load />
              </div>
            ) : (
              ""
            )} */}
          </div>
        </section>
      </div>

      <div
        className={"chat-bottom"}
        style={{ position: "absolute", bottom: 0, width: "100%" }}
      >
        <WriteComment postId={post.id} />
      </div>
    </Rodal>
  );
}

export default PostViewModal;
