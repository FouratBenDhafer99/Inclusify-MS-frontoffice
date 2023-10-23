import React, {Fragment, useEffect, useState} from "react";
import Header from "../../components/Header";
import Leftnav from "../../components/Leftnav";
import {useParams} from "react-router-dom";
import quizAPI from "../../api/quizAPI";
import Load from "../../components/Load";

const ResultQuiz = ()=>{

    const [quiz, setQuiz]= useState(null)

    const params = useParams()
    const fn = async ()=>{
        await quizAPI.getQuizById(params.quizId).then(res=>{
            console.log(res)
            setQuiz(res)
        })
    }

    useEffect(()=>{
        fn()
    }, [])

    if (quiz==null)
        return <Load/>

    return(
        <Fragment>
            <Header/><Leftnav/>
            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card w-100 border-0 shadow-none p-5 rounded-xxl bg-lightblue2 mb-3">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <img
                                                src={`/assets/images/quiz_${quiz.successful?'success.jpg':'lose.png'}`}
                                                alt="banner" className="w-100"/>
                                        </div>
                                        <div className="col-lg-6 ps-lg-5">
                                            <h2 className="display1-size d-block mb-2 text-grey-900 fw-700">{quiz.skill.name}</h2>
                                            <p className="font-xssss fw-500 text-grey-500 lh-26">
                                                {quiz.successful?'You passed the quiz! Congratulation!'
                                                    :'Unfortunately you did succeed this time. Review some stuff and try again!'}
                                            </p>
                                            <div className="col pe-2 ps-2">
                                                <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3"
                                                     style={{background: quiz.successful?'#e2f6e9':'#fff0e9'}}>
                                                    <div className="card-body d-flex p-0">
                                                        <i className={`btn-round-lg d-inline-block me-3 font-md text-white ${quiz.successful?'bg-success feather-check ':'bg-danger feather-x'} `}></i>
                                                        <h4 className={`font-xl fw-700 ${quiz.successful?'text-success ':'text-danger'}`}>
                                                            <span
                                                                className="fw-500 mt-0 d-block text-grey-500 font-xssss">Your score is:</span>
                                                            {quiz.score}%
                                                        </h4>
                                                    </div>
                                                </div>
                                                <a href="/skills"
                                                   className="btn w200 border-0 bg-primary-gradiant p-3 text-white fw-600 rounded-3 d-inline-block font-xssss">Go
                                                    back to skills</a>
                                            </div>
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

export default ResultQuiz;