import { useEffect, useState } from "react";
import { AiOutlinePartition } from "react-icons/ai";
import { GiBlackBook } from 'react-icons/gi';
import axios from "axios";

const AddClassForm = ({ reloadClass, setReloadClass }) => {
  const [formData, setFormData] = useState({
    ClassName: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let canSubmit = false;

  // On Change for controlled fields
  const onChange = (a) => {
    setFormData((prevState) => ({
      ...prevState,
      [a.target.name]: a.target.value,
    }));
  };

  //Submission Function
  const AddNewClass = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/classes/add",
        userData
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

  //  Submit
  const onSubmit = async (a) => {
    a.preventDefault();
    setErrors(validate(formData));
    if (canSubmit) {
      try {
        const message = await AddNewClass(formData);
        setSuccess(message);
        setReloadClass(!reloadClass);
        setFormData({
          ClassName: "",
        });
      } catch (err) {
        console.log(err);
      }
    }
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
    <div className="form-section add-class-form">
      <section className="heading">
        <h2 style={{color: "#7380ec"}}>
          <GiBlackBook /> Add New Class
        </h2>
        <p>Enter class name below</p>
        {success && <p className="succeed-msg">Class Added Successfully</p>}
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
              onChange={onChange}
            />
            <p>{errors.ClassName}</p>
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-block"
              value="Add new Class"
            />
          </div>
        </form>
      </section>
    </div>
  );
};


export default AddClassForm;
