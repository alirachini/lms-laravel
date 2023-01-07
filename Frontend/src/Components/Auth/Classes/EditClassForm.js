import React from 'react';
import axios from "axios";
import {AiFillEdit} from "react-icons/ai";
import { MdEdit } from "react-icons/md"

import {useEffect, useState} from "react";

const EditClassForm = ({ reloadClass, setReloadClass, editClass }) => {
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState(editClass);
  const { id, ClassName } = formData;
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  let canSubmit = false;

  // On Change for controlled fields
  const onChange = (a) => {
    setFormData((prevState) => ({
      ...prevState,
      [a.target.name]: a.target.value,
    }));
  };

  //Submission
  const EditClass = async (classData) => {
    try {
      const response = await axios.post(
          `http://localhost:8000/api/classes/update/${id}`,
          classData,
          {_method: "POST"}
      );
      if (response.data) {
        const { data: message } = response;
        return message;
      }
    } catch (err) {
      setErrorMessage(err.response.data);
      throw new Error();
    }
  };

  // on Submit action
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(formData));
    if (canSubmit) {
      try {
        const data = new FormData();
        console.log(ClassName);
        data.append("ClassName", ClassName);
        data.append("_method", "PUT");
        const message = await EditClass(data);

        setSuccess(message);
        setReloadClass(!reloadClass);
      } catch (err) {
        setErrorMessage(err);
        throw new Error();
      }
    }
  };

  //Validation
  const validate = (values) => {
    canSubmit = false;
    const errorMessage = {};
    if (values.ClassName === "") {
      errorMessage.ClassName = "Class name is required";
    } else {
      errorMessage.ClassName = "";
    }

    if (errorMessage.ClassName === "") {
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
      <div className="form-section category-form edit-category-form ">
          <section className="heading">
              <h2 style={{color: "#7380ec"}}>
                  <MdEdit/> Edit Class
              </h2>
              {success && <p className="succeed-msg">Class updated successfully</p>}
              {errorMessage && <p className="error-msg">Something went wrong</p>}
          </section>
          <section className="form">
              <form onSubmit={onSubmit}>
                  <div className="form-group">
                      <input
                          type="text"
                          className={errors.ClassName ? "error" : "form-valid"}
                          name="ClassName"
                          id="ClassName"
                          placeholder="Enter class name here"
                          value={ClassName}
                          onChange={onChange}
                      />
                      <p>{errors.ClassName}</p>
                  </div>
                  <div className="form-group">
                      <input
                          type="submit"
                          className="btn btn-block"
                          value="Update Class"
                      />
                  </div>
              </form>
          </section>
      </div>
  );
};
export default EditClassForm;
