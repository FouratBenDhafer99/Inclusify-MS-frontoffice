import React, {Fragment, useContext, useEffect, useState} from "react";
import Header from "../../components/Header";
import Leftnav from "../../components/Leftnav";
import skillAPI from "../../api/skillAPI";
import {useNavigate, useParams} from "react-router-dom";
import quizAPI from "../../api/quizAPI";
import Load from "../../components/Load";
import {UserContext} from "../../index";

const PlayQuiz = () => {

    const [quiz, setQuiz] = useState(null)
    const [answers, setAnswers] = useState([])

    const params = useParams()
    const {currentUser} = useContext(UserContext);
    const fn = async () => {
        if (currentUser)
            await quizAPI.generateQuizFromSkill(params.skillId, currentUser._id).then(res => {
                console.log(res)
                setQuiz(res)
            })
    }

    useEffect(() => {
        fn()
    }, [currentUser])


    const handleAnswersChange = (event) => {
        const {name, checked} = event.target
        console.log({name, checked})
        setAnswers((prevState) => ({
            ...prevState,
            [name]: checked
        }))
    }

    const navigate = useNavigate()
    const handleFormSubmit = async () => {
        console.log(answers)
        await quizAPI.submitQuiz(quiz.id, answers).then(res => {
            console.log(res)
            navigate(`/skills/resultQuiz/${quiz.id}`)
        })
    }

    if (quiz == null)
        return <Load/>

    return (
        <Fragment>
            <Header/><Leftnav/>
            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12 cart-wrapper mb-4">
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <div
                                            className="card p-md-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden">
                                            <div className="bg-pattern-div"></div>
                                            <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">
                                                Quiz
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                                {quiz.questions.map(question => (
                                    <div className="row" key={question.id}>
                                        <div className="col-xl-7 offset-xl-1 col-lg-6">
                                            <div className="checkout-payment card border-0 mb-3 bg-greyblue p-lg-5 p-4">
                                                <p className="mb-4 mont-font fw-600 font-md ">
                                                    {question.description}
                                                </p>
                                                {
                                                    question.answers.map((answer, index) => (
                                                        <div className="payment-group mb-3" key={answer.id}>
                                                            <div className="payment-radio">
                                                                <input type="checkbox" className="col-sm-2"
                                                                       name={answer.id} onChange={handleAnswersChange}/>
                                                                <label
                                                                    className="payment-label fw-600 font-xsss text-grey-900 ms-2">{answer.text}</label>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="card shadow-none border-0">
                                    <button onClick={() => handleFormSubmit()}
                                            className="w-100 p-3 mt-3 font-xsss text-center text-white bg-current rounded-3 text-uppercase fw-600 ls-3 border-0">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default PlayQuiz