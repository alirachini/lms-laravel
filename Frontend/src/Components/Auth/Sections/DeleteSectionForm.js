import axios from "axios";
import React, {useEffect, useState} from "react";
import {AiFillDelete} from "react-icons/ai";

const DeleteSectionForm = ({
                               reloadSection,
                               deleteSection,
                               setReloadSection,
                           }) => {
    const [success, setSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {id, SectionName} = deleteSection;


    //Submission
    const DeleteClass = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/section/delete/${id}`, {_method: "DELETE"})
            if (response.data) {
                const {data: message} = response;
                return message;
            }
        } catch (err) {
            setErrorMessage(err.response.data)
            throw new Error()
        }
    };

    //on Submit
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const message = await DeleteClass(id);
            setSuccess(message);
            setReloadSection(!reloadSection);
        } catch (err) {
            console.log(err);
        }
    }

    // Reset Messages after 5 seconds
    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
        setTimeout(() => {
            setSuccess("");
        }, 5000);
    }, [errorMessage]);

    return (
        <div className="form-section category-form delete-category-form">
            <section className="heading">
                <h2 style={{color: "#7380ec"}}>
                    <AiFillDelete/> Delete Section
                </h2>
                <p>Are you sure you want to delete {SectionName} ?</p>
                {success && <p className="succeed-msg">Section Deleted Successfully</p>}
                {errorMessage && <p className="error-msg">Something went wrong</p>}
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="submit"
                               className="btn btn-block"
                               value="Delete Section"
                        />
                    </div>
                </form>
            </section>
        </div>
    )
};

export default DeleteSectionForm;
