import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./PrivateRoutes";
import Settings from "../pages/Settings";
import Register from "../pages/Register";
import Notfound from "../pages/Notfound";
import Demo from "../demo/Demo";
import Forgot from "../pages/Forgot";
import Event from "../pages/Event";

const Home = React.lazy(() => import("../pages/Home"));
const SkillList = React.lazy(() => import("../pages/skill/SkillList"));
const StartQuiz = React.lazy(() => import("../pages/skill/StartQuiz"));
const PlayQuiz = React.lazy(() => import("../pages/skill/PlayQuiz"));
const ResultQuiz = React.lazy(() => import("../pages/skill/ResultQuiz"));

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
                    <ProtectedRoute isAuth={true} redirectPath={"/login"}/>
                }
            >
                {/* Add your private routes here */}

                <Route path={`/defaultsettings`} element={<Settings/>}/>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/event"} element={<Event/>}/>
                <Route path={`/skills`}>
                    <Route index exact element={<SkillList/>}/>
                    <Route exact path={"/skills/startQuiz/:skillId"} element={<StartQuiz/>}/>
                    <Route exact path={"/skills/playQuiz/:skillId"} element={<PlayQuiz/>}/>
                    <Route exact path={"/skills/resultQuiz/:quizId"} element={<ResultQuiz/>}/>
                </Route>


            </Route>
            <Route path={`*`} element={<Notfound/>}/>
        </Routes>
    );
};

export default InclusifyRoutes;
