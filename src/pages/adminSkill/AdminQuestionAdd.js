import Header from "../../components/Header";
import Leftnav from "../../components/Leftnav";
import Pagetitle from "../../components/Pagetitle";
import Load from "../../components/Load";
import React, {Fragment, useEffect, useState} from "react";
import skillAPI from "../../api/skillAPI";
import questionsAPI from "../../api/questionsAPI";
import {useNavigate} from "react-router-dom";

const AdminQuestionAdd = () => {

    const [questionDescription, setQuestionDescription] = useState("");
    const [error, setError] = useState("");
    const [answers, setAnswers] = useState([]);
    const [answersChecked, setAnswersChecked] = useState([]);

    const [skills, setSkills]= useState([])
    const [skill, setSkill]= useState()
    const fn = async ()=>{
        await skillAPI.getSkills().then(res=>{
            console.log(res)
            setSkills(res)
            setSkill(res[0].skill.id)
        })
    }

    useEffect(()=>{
        fn()
    }, [])

    const handleDescChange=(event)=>setQuestionDescription(event.target.value)
    const handleSkillChange=(event)=> {
        console.log(event.target.value)
        setSkill(event.target.value)
    }
    const handleAnswerChange=(e, index)=>{
        setAnswers(prevState => {
            const data=prevState
            data[index]= e.target.value
            console.log(data)
            return data
        })
    }
    const handleAnswerCheckChange=(e, index)=>{
        setAnswersChecked(prevState => {
            const data=prevState
            data[index]= e.target.checked
            console.log(data)
            return data
        })
    }
    const handleAnswerRemove = (index) => {
        setAnswers(prevState => {
            const prevData= prevState
            const updatedData = prevData.filter((answer,i )=> i !== index);
            return updatedData
        })
        setAnswersChecked(prevState => {
            const prevData= prevState
            const updatedData = prevData.filter((answer,i )=> i !== index);
            return updatedData
        })
    }

    const handleAddAnswer = () => {
        setError("")
        if(answers.length==6)
            setError("Can't have more than 6 answers")
        else{
            setAnswers(prevState => {
                return [...prevState, ""]
            })
            setAnswersChecked(prevState => {
                return [...prevState, false]
            })
            console.log(answers)
        }
    }


    const navigate= useNavigate()
    const handleSubmit=async ()=>{
        setError("")
        if(questionDescription==="")
            setError("Give thee question")
        else if(answers.length<2)
            setError("There should be at least 2 answers")
        else if(!answers.every(a=> a!==""))
            setError("Fill the answers")
        else if(answersChecked.every(a=> a===false))
            setError("There should be at least 1 correct answer")
        else {
            const ans= []
            for (let i=0; i<answers.length; i++ )
                ans.push({text: answers[i], isCorrect: answersChecked[i]})

            const question= {
                description: questionDescription,
                skill:{id: skill},
                answers: ans
            }
            console.log(question)
            await questionsAPI.addQuestion(question).then(res=>navigate("/admin/skills/questions"))
        }
    }

    return (
        <Fragment>
            <Header/><Leftnav/>
            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <Pagetitle title={"Add Question"}/>
                            <div className="col-lg-7 mb-3">
                                <div className="form-gorup">
                                    <label className="mont-font fw-600 font-xssss">
                                        The Question</label>
                                    <input type="text" name="desc" value={questionDescription} placeholder="Question"
                                        onChange={handleDescChange}
                                           className="form-control"/>
                                </div>
                                <div className="form-gorup">
                                    <label className="mont-font fw-600 font-xssss">
                                        Skill</label>
                                    {skills?.map(skill=>(
                                        <div key={skill.id}>{skill.name}</div>
                                    ))}
                                    <select name="desc" value={skill} placeholder="Question"
                                        onChange={handleSkillChange}
                                           className="form-control">
                                        {skills?.map(item=>(
                                            <option key={item.skill.id} value={item.skill.id}>{item.skill.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-gorup w-75">
                                    <label className="mont-font fw-600 font-xssss">
                                        Answers</label>
                                    <button className="btn btn-primary" onClick={handleAddAnswer}>Add answer</button>
                                    {answers.map((answer, index)=>(
                                        <div className="row" key={index}>
                                            <input type="text" name="skillName" value={answer.value}
                                                   placeholder="Answer"
                                                onChange={(e)=>handleAnswerChange(e, index)}
                                                   className="form-control col"/>
                                            <input type="checkbox" onChange={(e)=>handleAnswerCheckChange(e, index)}
                                                   className="col-2"/>
                                            <button className="btn col-1" onClick={()=>handleAnswerRemove(index)}>
                                                <i className="ti-trash font-xs text-danger"></i>
                                            </button>
                                        </div>

                                    ))}
                                </div>
                                <div className="card shadow-none border-0">
                                    <p className="text-danger">{error}</p>
                                    <button
                                        onClick={handleSubmit}
                                        className="border-0 w-100 p-3 mt-3 font-xsss text-center text-white bg-current rounded-3 text-uppercase fw-600 ls-3">
                                        Save question
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

export default AdminQuestionAdd