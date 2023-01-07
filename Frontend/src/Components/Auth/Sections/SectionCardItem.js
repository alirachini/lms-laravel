import React, {useState} from 'react';
import './SectionsCard.css'
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import Button from "@mui/material/Button";

const SectionCardItem = ({
                             ClassName,
                             SectionName,
                             singleSection,
                             showEditSectionFormPopup,
                             showDeleteSectionFormPopup,
                             showViewSectionFormPopup,
                         }) => {
                            console.log(ClassName);

    return (
        <div className="section_cards">
            <div className="box">
            <h1 className='sectionh1'>Section Name</h1>
                <div className="section_name" style={{cursor: "pointer"}}>{SectionName}</div>
                <div className="class_name" style={{color:"gray",fontSize:"0.8rem"}}>{ClassName}</div>
                <div className="button_cardsection">
                    <Button className="edit point" variant="contained"
                            onClick={() => showEditSectionFormPopup(singleSection)}>
                        <FaEdit />
                    </Button>
                    <Button className="trash point" variant="contained" 
                            onClick={() => showDeleteSectionFormPopup(singleSection)}>
                        <FaTrashAlt />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SectionCardItem;
