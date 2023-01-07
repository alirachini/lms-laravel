import React, { useState, useEffect } from 'react'
import "./Admin.css"
import { RiDeleteBin5Line } from "react-icons/ri"
import { MdEdit } from "react-icons/md"
import { GiCommercialAirplane } from "react-icons/gi"
import { GiBlackBook } from 'react-icons/gi';
import PopUp from '../PopUp/PopUp';
import axios from "axios";
import profile from "../Images/Bashar.jpg";
import { MdOutlineAirplanemodeInactive } from "react-icons/md"


function Admin(props) {

    const [popUp, setPopUp] = useState(false);
    console.log(props.email)
    return (
        <div className='card_lkbeer'>
            <div className='ta2seem_Cards'>
                <div className='bodyCard'>
                    <div class="card">
                        <div class="imgBx">
                            <img src={`http://localhost:8000/pictures/${props.picture}`}></img>
                        </div>
                        <div class="content">
                            <div class="details">

                                {props.active === 1 ?
                                    <h2>{props.username} <br />
                                        <span>Active <span class="dot"></span></span></h2> :

                                    <h2>{props.username} <br />
                                        <span>InActive <span class="dotred"></span></span></h2>}

                                <div class="data">
                                    <h3>{props.email}</h3>
                                </div>
                                <div class="actionBtn">



                                    <button className='edit point' onClick={() => {
                                        props.setAdminID(props.id);
                                        props.setPopup1(true);
                                        props.setUsername(props.username);
                                        props.setEmail(props.email);
                                        props.setPhone(props.phone);
                                        props.setPicture(props.picture);
                                    }}>
                                        <MdEdit /></button>

                                    {props.active === 0 ?
                                        <button className='trash point' onClick={() => {
                                            props.setPopup(true);
                                            props.setAdminID(props.id);
                                            props.setActive(props.active);
                                            props.setPassword(props.password);

                                        }}>

                                            <MdOutlineAirplanemodeInactive /></button> :
                                        <button onClick={() => {
                                            props.setPopup(true);
                                            props.setAdminID(props.id);
                                            props.setActive(props.active);
                                        }}>
                                            <GiCommercialAirplane /></button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    )
}

export default Admin
