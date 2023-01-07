import React from 'react'
import "./Navbar.css";
import Logo from '../Images/logo2.png';
import { GrClose } from 'react-icons/gr';
import { MdDashboard } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';
import { GiBlackBook } from 'react-icons/gi';
import { GiNotebook } from 'react-icons/gi';
import { FaUserGraduate } from 'react-icons/fa';
import { TbReportAnalytics } from 'react-icons/tb';
import { BsNewspaper } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { Link, NavLink } from "react-router-dom";



function Navbar() {
    return (
        <div className='bodySide'>

            <div className='containerSide'>
                <aside className='asideSide'>
                    <div className='top'>
                        <div className='logo'>
                            <img className='logoSide' src={Logo}></img>
                            <h2 className='logoname'>L M S</h2>
                        </div>
                        <div className='close' id='close-btn'>
                            <GrClose />
                        </div>
                    </div>

                    <div className='sidebar'>
                    <NavLink to="/reports" className={({ isActive }) => (isActive ? "active" : "")} >
                            <span className='iconSide'><MdDashboard /></span>
                            <h3>Dashboard</h3>
                            </NavLink>
                    </div>

                    <div className='sidebar'>

                        <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")} >
                            <span className='iconSide'><BsFillPeopleFill /></span>
                            <h3>Admins</h3>
                        </NavLink>
                    </div>

                    <div className='sidebar'>
                        <NavLink to="/classes" className={({ isActive }) => (isActive ? "active" : "")} >
                            <span className='iconSide'><GiBlackBook /></span>
                            <h3>Classes</h3>
                        </NavLink>
                    </div>

                    <div className='sidebar'>
                        <NavLink to="/sections" className={({ isActive }) => (isActive ? "active" : "")} >
                            <span className='iconSide'><GiNotebook /></span>
                            <h3>Sections</h3>
                        </NavLink>
                    </div>

                    <div className='sidebar'>
                        <NavLink to="/students" className={({ isActive }) => (isActive ? "active" : "")} >
                            <span className='iconSide'><FaUserGraduate /></span>
                            <h3>Students</h3>
                        </NavLink>
                    </div>

                    <div className='sidebar'>
                        <a href='#'>
                            <span className='iconSide'><TbReportAnalytics /></span>
                            <h3>Attendance</h3>
                        </a>
                    </div>

                    {/* <div className='sidebar'>
                        <a href='#'>
                            <span className='iconSide'><BsNewspaper /></span>
                            <h3>Reports</h3>
                        </a>
                    </div> */}

                    <div className='sidebar'>
                        <Link to="/login">
                            <span className='iconSide'><FiLogOut /></span>
                            <h3>Log Out</h3>
                        </Link>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Navbar

