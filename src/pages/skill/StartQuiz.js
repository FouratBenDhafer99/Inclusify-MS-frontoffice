import React, {Fragment} from "react";
import Header from "../../components/Header";
import Leftnav from "../../components/Leftnav";

const StartQuiz = () => {

    return (
        <Fragment>
            <Header/>
            <Leftnav/>

            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card w-100 border-0 shadow-none p-5 rounded-xxl bg-lightblue2 mb-3">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <img src="/assets/images/quizImage.jpg" alt="banner"
                                                 className="w-100"/>
                                        </div>
                                        <div className="col-lg-6 ps-lg-5">
                                            <h2 className="display1-size d-block mb-2 text-grey-900 fw-700">$skill->name</h2>
                                            <p className="font-xssss fw-500 text-grey-500 lh-26">
                                                You are about to start a quiz for <b>$skill</b>. <br/>
                                                <i>Good luck!</i>
                                            </p>
                                            <a href="route('skill.play_quiz', $skill->id)"
                                               className="btn w200 border-0 bg-primary-gradiant p-3 text-white fw-600 rounded-3 d-inline-block font-xssss">
                                                Start the quiz
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default StartQuiz