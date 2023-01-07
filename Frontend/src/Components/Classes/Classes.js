import React, { useState, useEffect } from 'react'
import "./Classes.css"
import { RiDeleteBin5Line } from "react-icons/ri"
import { MdEdit } from "react-icons/md"
import { GiCommercialAirplane } from "react-icons/gi"
import { GiBlackBook } from 'react-icons/gi';
import PopUp from '../PopUp/PopUp';
import axios from "axios";
import profile from "../Images/Bashar.jpg";



const Classes = ({ setReloadClass, deleteClass, reloadClass }) => {

    const [popUp, setPopUp] = useState(false);


    return (
        <div>
            <PopUp trigger={popUp} setTrigger={setPopUp}>
                <section className="heading">
                    <h2>
                        <GiBlackBook />   Delete
                    </h2>
                    <p>Are you sure you want to delete ?</p>
                    {/* {success && <p className="succeed-msg">Class Added Successfully</p>}
                    {errorMessage && <p className="error-msg">Something went wrong</p>} */}
                </section>
                <section className="form">
                    <form >
                        <div className="form-group">
                            <input type="submit" className="btn btn-block" value="Add" />
                        </div>
                    </form>
                </section>

            </PopUp>

            {/* <ul class="cards">
                <li>
                    <a href="" class="card">
                        <img src="https://i.imgur.com/oYiTqum.jpg" class="card__image" alt="" />
                        <div class="card__overlay">
                            <div class="card__header">
                                <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                <img class="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" />
                                <div class="card__header-text">
                                    <h3 class="card__title">Ali</h3>
                                    <span class="card__status">Active</span>
                                </div>
                            </div>
                            <p class="card__description"> ali.shamas111225@gmail.com</p>
                        </div>
                    </a>
                </li>
              </ul> */}
            <div className='ta2seem_Cards'>
                <div className='bodyCard'>
                    <div class="card">
                        <div class="imgBx">
                            <img src={profile}></img>
                        </div>
                        <div class="content">
                            <div class="details">
                                <h2>Bashar Francis <br /><span>Active <span class="dot"></span>
                                </span></h2>
                                <div class="data">
                                    <h3>bashar.francis@gmail.com</h3>
                                </div>
                                <div class="actionBtn">
                                    <button><MdEdit /></button>
                                    <button> <GiCommercialAirplane /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Classes
