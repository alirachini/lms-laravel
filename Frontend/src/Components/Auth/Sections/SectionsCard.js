import React, { useEffect, useState } from "react";
import { SiGoogleclassroom } from "react-icons/si";
import "./SectionsCard.css";
import Button from "@mui/material/Button";
import { FaPlusSquare } from "react-icons/fa";
import SectionCardItem from "./SectionCardItem";
import Navbar from "../../Navbar/Navbar";
import { CgAddR } from 'react-icons/cg';
import { GoSearch } from 'react-icons/go';

const SectionsCard = ({
    sections,
    showAddSectionFormPopup,
    showEditSectionFormPopup,
    showDeleteSectionFormPopup,
    showViewSectionFormPopup,
}) => {
    console.log(sections);
    
    const [searchrterm, setSearchTerm] = useState("");
    return (
        <div className="dash-side">
        <Navbar />
        <div className='show-contacts'>
            <h1 className='ClassH2'>Sections</h1>
                <div className='title_and_search'>
                    <h2 className='addclassh2'>Add New Section <CgAddR className='iconAdd' onClick={showAddSectionFormPopup}/></h2>
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
        </div>
            {/* <div className="header">
                <h2>
                    <span className="icon">
                        <SiGoogleclassroom />
                    </span>
                    Sections Management
                </h2>
                <Button
                    variant="contained"
                    className="btn add-btn"
                    onClick={showAddSectionFormPopup}
                    color="success"
                >
                    <FaPlusSquare />
                </Button>
            </div> */}
            <div className="tablecenterr">
                <div className="card-wrapper">
                    {sections.filter((item => {
                        if (searchrterm === "") {
                            return item;
                        } else if (item.SectionName.toLowerCase().includes(searchrterm.toLowerCase())) {
                            return item;
                        }
                    })).map((item) =>
                        <SectionCardItem
                            key={item.id}
                            SectionName={item.SectionName}
                            singleSection={item}
                            ClassName={item.classes.ClassName}
                            showDeleteSectionFormPopup={showDeleteSectionFormPopup}
                            showEditSectionFormPopup={showEditSectionFormPopup}
                            showViewSectionFormPopup={showViewSectionFormPopup}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SectionsCard;
