import React, {useRef, useState} from "react";
import ReactOnPost from "./ReactOnPost";


const Comment = ({user, comment}) => {

    const [isCommentActive, setCommentActive] = useState(false);
    const emojiClass = `${isCommentActive ? " active" : ""}`;


    const toggleActive = () => {
        setCommentActive(!isCommentActive);
    };
    return (
        <div
            style={{
                // border: "1px solid",
                padding: "10px",
                borderRadius: "12px",
                // backgroundColor: "rgba(255,255,255,0.2)"
            }}
        className={"bg-greylight"}>
            {/*<div className="card-body  pe-4 d-block ps-5">*/}
            {/*    <figure className="avatar position-absolute left-0 ms-2 mt-1">*/}
            {/*        <img src="/assets/images/user.png" alt="image"*/}
            {/*             className="shadow-sm rounded-circle w35"/>*/}
            {/*    </figure>*/}
            {/*    <div className="chat p-3 bg-greylight rounded-xxl d-block text-left theme-dark-bg">*/}
            {/*        <h4 className="fw-700 text-grey-900 font-xss mt-0 mb-1">*/}
            {/*            FirstName LastName*/}
            {/*            <a href="#" className="ms-auto">*/}
            {/*                <i className="ti-more-alt float-right text-grey-800 font-xsss"/>*/}
            {/*            </a>*/}
            {/*        </h4>*/}
            {/*        <p className="fw-500 text-grey-500 lh-20 font-xssss w-100 mt-2 mb-0">*/}
            {/*            Text comment.*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*</div>*/}


            <div className="card-body p-0 d-flex h-75">
                <figure className="avatar me-3">
                    <img
                        src={user?.profileImagePath || 'https://via.placeholder.com/1200x250.png'}
                        alt="avater"
                        className="shadow-sm rounded-circle w40"
                        style={{height: "40px", objectFit: "contain"}}
                    />
                </figure>
                <div className={"d-flex flex-column "}>
                    <h4 className="d-flex fw-700 text-grey-900 font-xssss mt-1"> {user?.firstName} {user?.lastName}
                        <span className="ms-2 font-xssss fw-500 text-grey-700"> {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                    </h4>
                    {comment.commentContent}
                </div>
            </div>


        </div>
    )
}

export default Comment