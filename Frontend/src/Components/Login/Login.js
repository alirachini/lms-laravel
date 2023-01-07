import React, {useState, useEffect} from "react";
import "./Login.css";
import {useNavigate} from 'react-router-dom';
import Photo from '../Images/photo1.jpg';

function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [data, setData] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const onSubmit = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/api/login?username=${username}&password=${password}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((reponse) => {
                if (reponse.ok) {
                    return reponse.json();
                }
                throw reponse;
            })
            .then((data) => {
                setData(data);
                if (data.status.length === 0) {
                    return alert("incorrect username and password");
                }
                 else if (data.status[0].isActive ===1){

                    localStorage.setItem("token", data.token);
                    localStorage.setItem("id", data.status[0].id);
                    console.log(data.status[0].id);
                    navigate("/reports");
                } else if( data.status[0].isActive === 0){
                    return alert("inactive Admin");
                }

            }, );
    };
    return (
        <div className="sectionLogin">

            <div className="image_login">
                <img src={Photo}></img>
            </div>

            <div className="contentBx">
                <div className="formBx">
                    <h2>Login</h2>
                    <form onSubmit={onSubmit}>
                        <div className="inputBx">
                            <span>Username</span>
                            <input type="text" name="" onChange={(e)=>{setUsername(e.target.value)}}></input>
                        </div>
                        <div className="inputBx">
                            <span>Password</span>
                            <input type="password" name="" onChange={(e)=>{setPassword(e.target.value)}}></input>
                        </div>
                        <div className="inputBx">
                            <input type="submit" value="Submit" name=""></input>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}


export default Login;