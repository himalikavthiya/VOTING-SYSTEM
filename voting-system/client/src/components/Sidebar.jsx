import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import logo from "../../public/voting.png"
import Navbar from './admin-compo/Navbar';

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/dashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/conect-election",
            name:"Create-Election",
            icon:<FaUserAlt/>
        },
         {
            path:"/select-election",
            name:"Election",
            icon:<FaUserAlt/>
        },

    ]
    return (
        <>

        <div className="main-container">
           <div style={{width: isOpen ? "50px" : "270px"}} className="sidebar">
               <div className="top_section">

                   <h1 style={{display: isOpen ? "none" : "block"}} className="logo"> <img src={logo} alt="logo"/></h1>
                   <div style={{marginLeft: isOpen ? "0px" : "110px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "none" : "block"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
        </>
    );
};

export default Sidebar;