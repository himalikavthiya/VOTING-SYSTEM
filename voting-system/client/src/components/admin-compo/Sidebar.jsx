import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaUsers,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
} from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import logo from "../../../public/voting-logo.jpg"

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [Toggel, setToggel] = useState()

    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/create-election",
            name: "Create Election",
            icon: <IoCreate />
        },
        {
            path: "/election-party",
            name: "Create Election Party",
            icon: <FaUsers />

        },
        {
            path: "/party-connection",
            name: "Party Connection",
            icon: <FaUserAlt />
        },
        {
            path: "/user",
            name: "User",
            icon: <FaUserPen />
        },

    ]
    return (
        <>

            <div className="main-container">
                <div style={{ width: isOpen ? "5%" : "20%", position: "fixed", zIndex: "1" }} className="sidebar">
                    <div className="top_section">

                        <h1 style={{ display: isOpen ? "none" : "block" }} className="logo"> <img src={logo} alt="logo" /></h1>
                        <div style={{ marginLeft: isOpen ? "0px" : "11rem" }} className="bars">
                            <FaBars onClick={() => {
                                setToggel(!Toggel)
                                setIsOpen(!isOpen)
                            }} />
                        </div>
                    </div>
                    <div>
                    </div>
                    {
                        menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className="sidebar-link" activeclassName="active">
                                <div className="icon">{item.icon}</div>
                                <div style={{ display: isOpen ? "none" : "block" }} className="text-link">{item.name}</div>
                            </NavLink>
                        ))
                    }
                </div>
                <main className={Toggel ? "toggle" : ""}>{children}</main>
            </div>
        </>
    );
};

export default Sidebar;