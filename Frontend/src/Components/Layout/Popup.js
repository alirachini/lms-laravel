import { useEffect } from "react";
import "./Popup.css";

const Popup = ({ show, setShow, title, content }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);
  const closeHandler = () => {
    setShow(false);
    document.body.style.overflow = "auto";
  };
  return (
    <div
      className="overlay"
      style={{ display: show ? "block" : "none", opacity: show ? "1" : "0" }}
    >
      <div className="popup">
        <h2>{title}</h2>
        <span className="close" onClick={closeHandler}>
          &times;
        </span>
        <div className="content">{content}</div>
      </div>
    </div>
  );
};
export default Popup;
