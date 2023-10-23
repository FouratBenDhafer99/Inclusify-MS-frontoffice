import React, { Fragment } from 'react'
import Header from '../../components/Header';
import Leftnav from '../../components/Leftnav';
import Rightchat from '../../components/Rightchat';
import { Outlet } from 'react-router-dom';

function Commun() {
   
  return (
   
    <Fragment> 
    <Header/>
    <Leftnav/>
        <div className="main-content bg-white ">
    <Outlet/>
    </div>
    
    </Fragment>
  )
}

export default Commun