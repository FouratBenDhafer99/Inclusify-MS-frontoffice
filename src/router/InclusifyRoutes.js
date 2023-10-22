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
const Shop = React.lazy(() => import("../pages/market/shop"));
const Product = React.lazy(() => import("../pages/market/product"));
const ProductAddForm = React.lazy(() => import("../pages/market/productAddForm"));
const SkillList = React.lazy(() => import("../pages/skill/SkillList"));
const StartQuiz = React.lazy(() => import("../pages/skill/StartQuiz"));

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
                <Route path = {"/shop"} element = {<Shop/>} />
                <Route path = {"/product/:productId"} element = {<Product />}/>
                <Route path = {"/addproduct"} element = {<ProductAddForm />}/>
                <Route path = {"/editProduct/:productId"} element = {<ProductAddForm />}/>
                <Route path={"/skills"} element={<SkillList/>}/>
                <Route path={"/skills/startQuiz/:skillId"} element={<StartQuiz/>}/>

                {/* Routes you have to be a LAWMAKER in to reach else you will be redirected to notfound */}

            </Route>
            <Route path={`*`} element={<Notfound/>}/>
        </Routes>
    );
};

export default InclusifyRoutes;
