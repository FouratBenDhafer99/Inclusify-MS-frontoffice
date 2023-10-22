import Header from "../../components/Header";
import Leftnav from "../../components/Leftnav";
import Pagetitle from "../../components/Pagetitle";
import React, {Fragment, useEffect, useState} from "react";
import skillAPI from "../../api/skillAPI";
import questionsAPI from "../../api/questionsAPI";

const AdminQuestionList=()=>{

    const [questions, setQuestions]= useState([])
    const fn = async ()=>{
        await questionsAPI.getQuestions().then(res=>{
            console.log(res)
            setQuestions(res)
        })
    }

    useEffect(()=>{
        fn()
    }, [])

    const handleDeleteQuestion =async (questionId)=>{
        await questionsAPI.deleteQuestion(questionId).then(res=>{
                setQuestions((prevState=>{
                    const prevData= prevState
                    const updatedSkills = prevData.filter(q => q.id !== questionId);
                    return updatedSkills
                }))
            }
        )
    }

    return(
        <Fragment>
            <Header/><Leftnav/>
            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <Pagetitle title="Questions"/>
                            <div className="text-right"><a href="/admin/skills/questions/add" className="btn btn-success text-white">Add question</a></div>
                            <div className="table-content table-responsive">
                                <table className="table table-hover text-center">
                                    <thead className="bg-greyblue rounded-3">
                                    <tr>
                                        <th className="border-0 p-4 col-5">Question</th>
                                        <th className="border-0 p-4 col-5">Skill</th>
                                        <th className="border-0 p-4 col-7">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {questions?.map(question=>(
                                        <tr key={question.id}>
                                            <td className="product-headline  wide-column text-grey-900 fw-600 font-xsss">{question.description}</td>
                                            <td className="product-headline  wide-column text-grey-900 fw-600 font-xsss">{question.skill.name}</td>
                                            <td className="product-remove">
                                                <button className="btn " onClick={()=>handleDeleteQuestion(question.id)}><i className="ti-trash font-xs text-danger"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
 }

 export default AdminQuestionList