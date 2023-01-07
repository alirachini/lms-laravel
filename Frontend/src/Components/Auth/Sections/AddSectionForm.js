import React, {useEffect, useState} from 'react';
import axios from "axios";
import SectionClassFilter from "../Classes/SectionClassFilter";
import {TbSection} from "react-icons/tb";
import { GiNotebook } from 'react-icons/gi';
import {Button} from "@mui/material";


const AddSectionForm = ({
                            setReloadSection,
                            reloadSection,
                            setSelectedSectionClass,
                            selectedSectionClass,
                            classes,
                            fetchClasses
                        }) => {

    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({
        SectionName: "",
    })
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    let canSubmit = false;
    const {SectionName} = formData;


    const onChange = (a) => {
        setFormData((prevState) => ({
            ...prevState,
            [a.target.name]: a.target.value,
        }));
    };

    const AddNewSection = async (sectionData) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/section/add`, sectionData);
            if (response.data) {
                const {data: message} = response;
                return message;
            }
        } catch (err) {
            setErrorMessage(err.response.data)
            throw new Error();
        }
    }

    const validate = (values) => {
        canSubmit = false;
        const errorMessage = {};
        if (values.SectionName === "") {
            errorMessage.SectionName = "Section name should not be empty"
        } else {
            errorMessage.SectionName = "";
        }
        if (errorMessage.SectionName === "") {
            canSubmit = true
        }
        return errorMessage;
    }

    // on Submit

    const onSubmit = async (a) => {
        a.preventDefault();
        setErrors(validate(formData));
        if (canSubmit) {
            try {
                const data = new FormData();
                data.append("SectionName", SectionName);
                data.append("class_id", selectedSectionClass);
                const message = await AddNewSection(data);
                setSuccess(message);
                setReloadSection(!reloadSection)
                setFormData({
                    SectionName: ""
                });
            } catch (err) {
                console.log(err)
            }
        }
    };

    // Fetch Classes On Popup
    useEffect(() => {
        fetchClasses()
    }, [reloadSection])


    // Reset Messages after 5 seconds
    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
        if (success) {
            setTimeout(() => {
                setSuccess("");
            }, 5000);
        }
    }, [errorMessage, success]);

    console.log(formData);
    return (
        <div className="form-section category-form edit-category-form">
            <section className="heading">
                <h2 style={{color: "#7380ec"}}>
                    <GiNotebook/>
                    Add new Section {" "}
                </h2>
                <p>Enter section name below</p>
                {success && <p className="succeed-msg">Succeed</p>}
                {errorMessage && <p className="error-msg">Something went wrong</p>}
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className={errors.SectionName ? "error" : "form-valid"} name="SectionName"
                               id="SectionName" placeholder="Enter Section Name here" onChange={onChange}/>
                        <p>{errors.SectionName}</p>
                    </div>
                    <SectionClassFilter
                        classes={classes}
                        selectedSectionClass={selectedSectionClass}
                        setSelectedSectionClass={setSelectedSectionClass}/>
                    <div className="form-group">
                        <input type="submit" className="btn btn-block" value="Add Section"/>
                    </div>

                </form>
            </section>
        </div>
    );
};

export default AddSectionForm;
