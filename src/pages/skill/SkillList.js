import React, {Fragment, useEffect, useState} from "react";
import Header from '../../components/Header';
import Leftnav from '../../components/Leftnav';
import Rightchat from '../../components/Rightchat';
import Pagetitle from '../../components/Pagetitle';
import Appfooter from '../../components/Appfooter';
import Popupchat from '../../components/Popupchat';
import skillAPI from "../../api/skillAPI";
import {Link} from "react-router-dom";

const SkillList = () => {

    const [skills, setSkills]= useState([])

    const fn = async ()=>{
        await skillAPI.getSkills("userId").then(res=>{
            console.log(res)
            setSkills(res)
        })
    }

    useEffect(()=>{
        fn()
    }, [])

    return (
        <Fragment>
            <Header/>
            <Leftnav/>
            <Rightchat/>

            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">

                                <Pagetitle title="Skills"/>

                                <div className="row ps-2 pe-1">
                                    {skills.map((value, index) => (

                                        <div key={index} className="col-md-4 col-sm-6 pe-2 ps-2">
                                            <div
                                                className={"card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3 "+(value.done?"bg-gold-gradiant":"")}>
                                                <div className="card-body d-block w-100 p-4 text-center">
                                                    <div className="clearfix"></div>
                                                    <h4 className="fw-700 font-xss mt-3 mb-0">{value.skill.name} </h4>
                                                    {value.done?
                                                        <a className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl font-xsssss fw-700 ls-lg text-white">
                                                            You have this skill</a>:
                                                        <a href={"/skills/startQuiz/"+value.skill.id}
                                                           className="mt-4 p-0 btn p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white">Play quiz</a>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    ))}


                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Popupchat/>
            <Appfooter/>
        </Fragment>
    );
}

export default SkillList;