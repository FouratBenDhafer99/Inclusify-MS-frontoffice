import Header from "../../components/Header";
import Leftnav from "../../components/Leftnav";
import Pagetitle from "../../components/Pagetitle";
import React, {Fragment, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import skillAPI from "../../api/skillAPI";
import Load from "../../components/Load";

const AdminSkillAdd = () => {

    const [skill, setSkill]= useState({})
    const [skillName, setSkillName]=useState("");
    const [skillNameError, setSkillNameError]=useState("");
    const [isLoading, setIsLoading]=useState(false)

    const params = useParams()
    const fn = async ()=>{
        await skillAPI.getSkillById(params.skillId).then(res=>{
            console.log(res)
            setSkill(res)
            setSkillName(skill.name)
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        setIsLoading(true)
        if (params.skillId)
            fn()
        else setIsLoading(false)
    }, [])
    const handleSkillNameChange=(event)=>setSkillName(event.target.value)

    const navigate= useNavigate()
    const handleSubmit=async ()=>{
        setSkillNameError("")
        if (skillName==="")
            setSkillNameError("Give the skill a name")
        else {
            if (skill?.id)
            await skillAPI.editSkill({id:skill.id, name: skillName}).then(res=>navigate("/admin/skills"));
            else
            await skillAPI.addSkill({name: skillName}).then(res=>navigate("/admin/skills"));
        }
    }

    return(
        <Fragment>
            <Header/><Leftnav/>
            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <Pagetitle title={params.skillId?"Edit Skill":"Add Skill"}/>
                            {isLoading?<Load/>:
                                <div className="col-lg-6 mb-3">
                                    <div className="form-gorup">
                                        <label className="mont-font fw-600 font-xssss">
                                            {params.skillId&&"New"} Skill
                                            Name</label>
                                        <input type="text" name="skillName" value={skillName} placeholder="Skill name"
                                               onChange={handleSkillNameChange}
                                               className="form-control"/>
                                        <p className="text-danger">{skillNameError}</p>
                                    </div>
                                    <div className="card shadow-none border-0">
                                        <button onClick={handleSubmit}
                                                className="border-0 w-100 p-3 mt-3 font-xsss text-center text-white bg-current rounded-3 text-uppercase fw-600 ls-3">
                                            Save skill</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminSkillAdd