import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./PrivateRoutes";
import Settings from "../pages/Settings";
import Register from "../pages/Register";
import Notfound from "../pages/Notfound";
import Demo from "../demo/Demo";
import Forgot from "../pages/Forgot";
import Event from "../pages/Event/Event";
import FormAdd from "../pages/adminEvent/FormAdd";
import Job from "../pages/Job";
import Auth from "./Auth";

const Home = React.lazy(() => import("../pages/Home"));
const Shop = React.lazy(() => import("../pages/market/shop"));
const Product = React.lazy(() => import("../pages/market/product"));
const ProductAddForm = React.lazy(() => import("../pages/market/productAddForm"));
const SkillList = React.lazy(() => import("../pages/skill/SkillList"));
const StartQuiz = React.lazy(() => import("../pages/skill/StartQuiz"));
const JobDetails = React.lazy(() => import("../pages/job/ApplyForJob"));
const Commun = React.lazy(() => import("../pages/job/Commun"));
const Myoffers = React.lazy(() => import("../pages/job/MyOffers"));
const PlayQuiz = React.lazy(() => import("../pages/skill/PlayQuiz"));
const ResultQuiz = React.lazy(() => import("../pages/skill/ResultQuiz"));
const AdminSkillList = React.lazy(() => import("../pages/adminSkill/AdminSkillList"));
const AdminSkillAdd = React.lazy(() => import("../pages/adminSkill/AdminSkillAdd"));
const AdminQuestionList = React.lazy(() => import("../pages/adminSkill/AdminQuestionList"));
const AdminQuestionAdd = React.lazy(() => import("../pages/adminSkill/AdminQuestionAdd"));

/**
 *
 *  All routes are declared here
 */
const InclusifyRoutes = () => {
    return (
        <Routes>
            <Route path={`/`} element={<Demo/>}/>
            <Route path={`/login`} element={<Login/>}/>
            <Route path={`/register`} element={<Register/>}/>
            <Route path={`/verifyToken/:token`} element={<Forgot/>}/>

            {/* Routes you have to be logged in to reach else you will be redirected to Login */}
            <Route
                element={
                    <ProtectedRoute isAuth={Auth.getToken()} redirectPath={"/login"}/>
                }
            >
                {/* Add your private routes here */}

                <Route path={`/defaultsettings`} element={<Settings/>}/>
                <Route path={"/home"} element={<Home/>}/>
                
                <Route path={"/admin/event"} >
                    <Route index exact element={<Event/>}/>
                    <Route exact path={`/admin/event/add`} element={<FormAdd/>}/>
                </Route>

                <Route path = {"/shop"} element = {<Shop/>} />
                <Route path = {"/product/:productId"} element = {<Product />}/>
                <Route path = {"/addproduct"} element = {<ProductAddForm />}/>
                <Route path = {"/editProduct/:productId"} element = {<ProductAddForm />}/>

                <Route path={`/skills`}>
                    <Route index exact element={<SkillList/>}/>
                    <Route exact path={"/skills/startQuiz/:skillId"} element={<StartQuiz/>}/>
                    <Route exact path={"/skills/playQuiz/:skillId"} element={<PlayQuiz/>}/>
                    <Route exact path={"/skills/resultQuiz/:quizId"} element={<ResultQuiz/>}/>
                </Route>

                <Route path={`/admin/skills`}>
                    <Route index exact element={<AdminSkillList/>}/>
                    <Route exact path={`/admin/skills/add`} element={<AdminSkillAdd/>}/>
                    <Route exact path={`/admin/skills/edit/:skillId`} element={<AdminSkillAdd/>}/>
                    <Route exact path={`/admin/skills/questions/`} element={<AdminQuestionList/>}/>
                    <Route exact path={`/admin/skills/questions/add`} element={<AdminQuestionAdd/>}/>
                </Route>

                <Route path={"/jobs"} element={<Commun />} >
                    <Route path={`/jobs/list`} element={<Job />}/>
                    <Route path={"/jobs/jobdetails"} element={<JobDetails />} />
                    <Route path={"/jobs/myoffers"} element={<Myoffers />} />
                </Route>


            </Route>
            <Route path={`*`} element={<Notfound/>}/>
        </Routes>

        //</Routes>
        
    );
};

export default InclusifyRoutes;
