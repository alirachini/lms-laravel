import React, { useState, useEffect } from 'react'
import {Grid} from "@mui/material";
import ClassCardItem from "./ClassCardItem";
import {FaPlusSquare} from "react-icons/fa";
import {SiGoogleclassroom} from "react-icons/si";
import "./ClassesCard.css";
import { CgAddR } from 'react-icons/cg';
import { GoSearch } from 'react-icons/go';
import Button from "@mui/material/Button";
import Navbar from "../../Navbar/Navbar";


// import SectionCardItem from "../Sections/SectionCardItem";

const ClassesCard = ({
                         fetchClasses,
                         classes,
                         showAddClassFormPopup,
                         showEditClassFormPopup,
                         showDeleteClassFormPopup,
                         showViewClassFormPopup,
                     }) => {
    useEffect(() => {
        fetchClasses();
    }, []);
    const [searchrterm, setSearchTerm] = useState("");
    // console.log(classes)

    return (
        <div className="dash-side">
            <Navbar />
            <div className='show-contacts'>
            <h1 className='ClassH2'>Classes</h1>
                <div className='title_and_search'>
                    <h2 className='addclassh2'>Add New Class <CgAddR className='iconAdd'  onClick={showAddClassFormPopup}/></h2>
                    <div className='searchclassh2'>
                        <div class="se">
                            <div class="search-box">
                                <button class="btn-search"><GoSearch /></button>
                                <input type="text" class="input-search" placeholder="Type to Search..."
                                    pattern=".*\S.*"
                                    onChange={(e) => {
                                        setSearchTerm((e.target.value))
                                    }} />
                            </div>
                        </div>

                    </div>
                </div>
            
                {/* <Button
                    variant="contained"
                    className="btn add-btn"
                    onClick={showAddClassFormPopup}
                    color="success"
                >
                    <FaPlusSquare/>
                </Button> */}
            </div>
            <div className="tablecenterr">
                <div className="card-wrapper">
                    {classes.filter((item => {
                        if (searchrterm === "") {
                            return item;
                        } else if (item.ClassName.toLowerCase().includes(searchrterm.toLowerCase())) {
                            return item;
                        }
                    })).map((item, index) => (
                        <ClassCardItem
                            key={item.id}
                            id={index + 1}
                            ClassName={item.ClassName}
                            singleClass={item}
                            showEditClassFormPopup={showEditClassFormPopup}
                            showDeleteClassFormPopup={showDeleteClassFormPopup}
                            showViewClassFormPopup={showViewClassFormPopup}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;
