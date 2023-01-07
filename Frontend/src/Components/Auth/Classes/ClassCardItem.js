import React from "react";
import "./ClassesCard.css";

import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import {FaEdit, FaTrashAlt} from "react-icons/fa";

const ClassCardItem = ({
                           id,
                           ClassName,
                           singleClass,
                           showEditClassFormPopup,
                           showDeleteClassFormPopup,
                           showViewClassFormPopup,
                       }) => {

    // console.log(ClassName)

    return (
       
    
        <div className="container-cards">
            <div className="box">
                <span className="spa1"></span>
                <span className="span2"></span>
                <span className="span3"></span>
                <span className="span4"></span>
                <div className="contentcard">
                <h2>Class Name</h2>
                <div className="name_card" style={{cursor: "pointer"}}
                     onClick={() => showViewClassFormPopup(ClassName)}>{ClassName}</div>
                <div className="button_cardclass">
                    <Button variant="contained"
                            onClick={() => showEditClassFormPopup(singleClass)}
                            >
                        <FaEdit/>
                    </Button>
                    <Button  variant="contained"
                            onClick={() => showDeleteClassFormPopup(singleClass)}
                          >
                        <FaTrashAlt/>
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCardItem;
