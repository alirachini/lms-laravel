import React, {useState} from 'react';
import {FiInfo} from "react-icons/fi";

const SectionViewForm = ({viewSection}) => {
    const [formData, setFormData] = useState(viewSection);
    const {SectionName} = formData;


    return (
        <div className="form-section">
            <section className="heading">
                <h2 className="infoTitle">
                    <FiInfo/> Section Information
                </h2>
            </section>

            <section className="form">
                <form>
                    <div className="form-group">
                        <strong>Section Name: </strong> {formData}
                    </div>
                </form>
            </section>
        </div>


    );
};

export default SectionViewForm;
