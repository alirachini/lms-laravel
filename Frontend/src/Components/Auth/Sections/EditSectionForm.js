import React, {useEffect, useState} from 'react';
import axios from "axios";
import { MdEdit } from "react-icons/md"
import {TbSection} from "react-icons/tb";

import SectionClassFilter from "../Classes/SectionClassFilter";

const EditSectionForm = ({
                             editSection,
                             setSelectedSectionClass,
                             selectedSectionClass,
                             classes,
                             reloadSection,
                             setReloadSection,
                             fetchClasses
                         }) => {
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState(editSection);
    const {id, SectionName} = formData
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    let canSubmit = false;


    // On Change for controlled fields
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    //Submission Function
    const EditSection = async (sectionData) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/section/update/${id}`,
                sectionData,
                {_method: "PUT"}, sectionData
            );
            if (response.data) {
                const {data: message} = response
                return message;
            }
        } catch (err) {
            setErrorMessage(err.response.data)
            throw new Error();
        }
    }

    // on Submit
    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate(formData));
        if (canSubmit) {
            try {
                const data = new FormData();
                console.log(SectionName);
                data.append("SectionName", SectionName);
                data.append("class_id", selectedSectionClass);
                data.append("_method", "PUT");
                const message = await EditSection(data);
                setSuccess(message);
                setReloadSection(!reloadSection)
            } catch (err) {
                console.log(err)
            }
        }
    }

    // Fetch Classes On Popup
    useEffect(() => {
        fetchClasses()
    }, [reloadSection])

    //Validation
    const validate = (values) => {
        canSubmit = false;
        const errorMessage = {};
        if (values.SectionName === "") {
            errorMessage.ClassName = "Section name is required";
        } else {
            errorMessage.SectionName = "";
        }
        if (errorMessage.SectionName === "") {
            canSubmit = true;
        }
        return errorMessage;
    };

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


    return (
        <div className="form-section category-form edit-category-form">
            <section className="heading">
                <h2 style={{color: "#7380ec"}}>
                    <MdEdit/>
                    Edit Section {" "}
                </h2 >
                <p>Enter your information below</p>
                {success && <p className="succeed-msg">{success.message}</p>}
                {errorMessage && <p className="error-msg">{errorMessage.message}</p>}
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" value={SectionName} className={errors.SectionName ? "error" : "form-valid"}
                               name="SectionName"
                               id="SectionName" placeholder="Enter Section Name here" onChange={onChange}/>
                        <p>{errors.SectionName}</p>
                    </div>
                    <SectionClassFilter
                        classes={classes}
                        selectedSectionClass={selectedSectionClass}
                        setSelectedSectionClass={setSelectedSectionClass}
                        state={false}
                    />
                    <div className="form-group">
                        <input type="submit" className="btn btn-block" value="Update Section"/>
                    </div>

                </form>
            </section>
        </div>
    );
};

export default EditSectionForm;
