import React from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";

const DeleteClassForm = ({ setReloadClass, deleteClass, reloadClass }) => {
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { id, ClassName } = deleteClass;

  //Submission

  const DeleteClass = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/classes/delete/${id}`,
        { _method: "DELETE" }
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

  //onSubmit

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await DeleteClass(id);
      setSuccess(message);
      setReloadClass(!reloadClass);
    } catch (err) {
      console.log(err);
    }
  };
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
            <AiFillDelete/> Delete Class
        </h2>
          <p>Are you sure you want to delete {ClassName} ?</p>
        {success && <p className="succeed-msg">Class Deleted Successfully</p>}
        {errorMessage && <p className="error-msg">Something went wrong</p>}
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-block"
              value="Delete Class"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default DeleteClassForm;
