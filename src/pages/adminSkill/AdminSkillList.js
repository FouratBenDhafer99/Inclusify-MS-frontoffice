import React, {Fragment, useContext, useEffect, useState} from "react";
import Header from "../../components/Header";
import Leftnav from "../../components/Leftnav";
import skillAPI from "../../api/skillAPI";
import Pagetitle from "../../components/Pagetitle";

const AdminSkillList = () => {

    const [skills, setSkills]= useState([])
    const fn = async ()=>{
        await skillAPI.getSkills().then(res=>{
            console.log(res)
            setSkills(res)
        })
    }

    useEffect(()=>{
        fn()
    }, [])

    const handleDeleteSkill =async (skillId)=>{
        console.log(skillId)

        await skillAPI.deleteSkill(skillId).then(res=>{
            setSkills((prevState=>{
                const prevData= prevState
                const updatedSkills = prevData.filter(skill => skill.skill.id !== skillId);
                return updatedSkills
            }))
            }
        )
    }

    return (
        <Fragment>
            <Header/><Leftnav/>
            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <Pagetitle title="Skills"/>
                            <div className="text-right"><a href="/admin/skills/add" className="btn btn-success text-white">Add skill</a></div>
                            <div className="table-content table-responsive">
                                <table className="table table-hover text-center">
                                    <thead className="bg-greyblue rounded-3">
                                    <tr>
                                        <th className="border-0 p-4 col-5">Name</th>
                                        <th className="border-0 p-4 col-7">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {skills?.map(item=>(
                                        <tr key={item.skill.id}>
                                            <td className="product-headline  wide-column text-grey-900 fw-600 font-xsss">{item.skill.name}</td>
                                            <td className="product-remove">
                                                <a href={"/admin/skills/edit/"+item.skill.id}><i className="ti-pencil font-xs text-warning m-lg-3"></i></a>
                                                <button className="btn " onClick={()=>handleDeleteSkill(item.skill.id)}><i className="ti-trash font-xs text-danger"></i></button>
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

export default AdminSkillList