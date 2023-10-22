import React, { useEffect, useState, useContext } from "react";
import PostInteractions from "./PostInteractions";
import CreatePostModal from "./CreatePostModal";

import ReactOnPost from "./ReactOnPost";
// import {UserContext} from '../../index';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import PostApi from "../../api/PostApi";
import feedApi from "../../api/feedApi";
//import ViewPostModal from "./ViewPostModal";
const ViewPostModal = React.lazy(() => import("./ViewPostModal"));

const Postview = ({
  user,
  time,
  des,
  postimage,
  postvideo,
  id,
  post,
  openComments,
  closeModal,
}) => {
  des = post?.description || des;
  user = post?.user || user;
  time = post?.createdAt;
  postimage = post?.images[0] || postimage;
  // const {currentUser, setCurrentUser} = useContext(UserContext);

  const [commentsNumber, setCommentsNumber] = useState(0);
  const [likesNumber, setLikesNumber] = useState(0);

  const [isOpen, setOpen] = useState(false);

  const [isActive, setActive] = useState(false);

  // Post view modal
  const [visible, setVisible] = useState(false);

  const toggleOpen = () => setOpen(!isOpen);
  const toggleActive = () => setActive(!isActive);

  const menuClass = `${isOpen ? " show" : ""}`;
  const emojiClass = `${isActive ? " active" : ""}`;

  useEffect(() => {
    setCommentsNumber(post?.comments.length);
    setLikesNumber(post?.reacts.length);
  }, []);

  // const loadComments= async ()=>{
  //     await PostApi.getPostComments(post._id).then((res)=>{
  //         // console.log(res)
  //         setCommentsNumber(res.length)
  //     })
  // }

  useEffect(() => {
    // loadComments()
  }, [post]);

  // show or hide PostViewModal
  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };

  const styles = `.img-hov img {
              padding-left: 6%;
              padding-right: 6%;
              width: 50px;
              aspect-ratio: 2/3;
              object-fit: contain;
              transition: 0.2s ease;
            }
            
            .img-hov img:hover {
              transform: scale(1.5);
              cursor: pointer;
            }
            
            .img-dont-hov img:hover {
                transform: none;
                cursor: default;
            }
            `;

  const [height, setHeight] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = postimage;
    img.addEventListener("load", handleImageLoad);
    return () => {
      img.removeEventListener("load", handleImageLoad);
    };
  }, [postimage]);

  const handleImageLoad = (event) => {
    setHeight(event.target.height);
  };

  const [tab, setTab] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModalOpen = (newState) => setModalOpen(newState);
  const handleTabChange = (newState) => setTab(newState);

  const TabOne = [];
  let counter = 1;
  post?.images.map((key, value) => {
    // console.log('key: '+key+" , value: "+value);
    TabOne.push({ image: `0${counter}`, bigImage: key });
    counter++;
  });
  // console.log(TabOne)

  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3 img-hov">
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
      {postvideo ? (
        <div className="card-body p-0 mb-3 rounded-3 overflow-hidden uttam-die">
          <a href="/defaultvideo" className="video-btn">
            <video autoPlay loop className="float-right w-100">
              <source src={`/assets/images/${postvideo}`} type="video/mp4" />
            </video>
          </a>
        </div>
      ) : (
        ""
      )}
      <div className="card-body p-0 me-lg-5">
        <p className="fw-500 text-dark lh-26 font-xssss w-100 mb-2">{des}</p>
      </div>

      {postimage ? (
        <div className="card-body d-block pt-0 pb-2 img-dont-hov">
          <div className="row ps-3 pe-3">
            {TabOne.map((value, index) => (
              <div className="col-6 mb-1 p-1" key={index}>
                {isModalOpen && (
                  <Lightbox
                    mainSrc={TabOne[tab].bigImage}
                    imageTitle={TabOne[tab].image}
                    nextSrc={
                      TabOne[(tab + TabOne.length + 1) % TabOne.length].image
                    }
                    prevSrc={
                      TabOne[(tab + TabOne.length - 1) % TabOne.length].image
                    }
                    onCloseRequest={() => toggleModalOpen(false)}
                    onMovePrevRequest={() =>
                      handleTabChange((tab + TabOne.length - 1) % TabOne.length)
                    }
                    onMoveNextRequest={() =>
                      handleTabChange((tab + TabOne.length + 1) % TabOne.length)
                    }
                  />
                )}

                <div
                  onClick={() => {
                    toggleModalOpen(true);
                    handleTabChange(index);
                  }}
                >
                  <a>
                    <img
                      src={`${value.bigImage}`}
                      alt="Portfolio"
                      className="img-fluid rounded-3 w-100"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="card-body d-flex p-0">
        {/* <ReactOnPost likesNumber={post?.reacts?.length} postId={post?._id} userId={currentUser?._id}
                             reacts={post?.reacts}/> */}
        <a
          className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss com-a"
          onClick={show}
        >
          <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg" />
          <span className="d-none-xss">{commentsNumber} Comment</span>
        </a>

        <div
          className={`pointer ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss ${menuClass}`}
          id={`dropdownMenu${id}`}
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
            aria-labelledby={`dropdownMenu${id}`}
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
          <PostInteractions />
        </div>
      </div>
      {show ? (
        <ViewPostModal
          show={show}
          visible={visible}
          onClose={hide}
          user={user}
          post={post}
          className="model-c"
        />
      ) : null}

      <style>{styles}</style>
    </div>
  );
};

export default Postview;
