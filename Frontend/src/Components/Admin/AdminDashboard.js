import React, { useState, useEffect } from 'react'
import "./Admin.css"
import Admin from './Admin'
import Navbar from '../Navbar/Navbar'
import { CgAddR } from 'react-icons/cg';
import { GoSearch } from 'react-icons/go';
import PopUp from '../PopUp/PopUp';
import { BsFillPeopleFill } from 'react-icons/bs';
import axios from "axios";
import { MdEdit } from "react-icons/md"



const AdminDashoard = () => {
    const [popUp, setPopUp] = useState(false);
    const [popup, setPopup] = useState(false);
    const [popup1, setPopup1] = useState(false);

    const [Loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const [active, setActive] = useState(null);
    const [username, setUsername] = useState(null);
    const [adminID, setAdminID] = useState(null);
    const [picture, setPicture] = useState([]);
    const [addemail, setAddemail] = useState(null);

    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [conf, setConf] = useState(null);
    const [usernameAdd, setUsernameAdd] = useState(null);
    const [passwordAdd, setPasswordAdd] = useState(null);
    const [confAdd, setConfAdd] = useState(null);

    const [resetPass, setResetPass] = useState(0)
    const [searchrterm, setSearchTerm] = useState("");



    const onChangeFile = e => {
        setPicture(e.target.files[0]);
    }

    useEffect(() => {
        FetchData();

    }, []);

    const FetchData = async () => {
        // setLoading(true);
        await fetch(`http://127.0.0.1:8000/api/admins`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

            })
            .then((data) => {
                setData(data);
                console.log(data)
            })
            .catch((error) => {
                console.error(error.message);
                setError(error);
            });
    };



    const EditAdmin = async () => {

        console.log(typeof (picture));
        setLoading(true);
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("email", email);
        if (typeof (picture) === "array" || typeof (picture) === "object") {
            formData.append("picture", picture);
        }
        formData.append("slug", username);
        formData.append("_method", "PUT");
        await axios.post(`http://127.0.0.1:8000/api/admins/${adminID}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => {
                console.log("updated");
                setLoading(false);
                FetchData();
            })

            .catch((error) => {
                console.log(error);
            });
    }

    const ChangeActivation = async () => {
        if (active === 1) {
            setLoading(true);
            await fetch(`http://localhost:8000/api/admins/${adminID}?isActive=0`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw response;
                })
                .then(() => {
                    setLoading(false);
                    setActive(null);
                    setAdminID(null);
                    FetchData();
                })
                .catch((error) => {
                    console.error(error.message);
                    setError(error);
                });
        } else if (active === 0) {
            setLoading(true);
            fetch(`http://localhost:8000/api/admins/${adminID}?isActive=1`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw response;
                })
                .then(() => {
                    setLoading(false);
                    setActive(null);
                    setAdminID(null);
                    FetchData();
                })
                .catch((error) => {
                    console.error(error.message);
                    setError(error);
                });
        }
    }


    // Add admin section
    const AddAdmin = () => {
        if (passwordAdd === confAdd) {
            setLoading(true);

            const formData = new FormData();
            formData.append("username", usernameAdd);
            formData.append("password", passwordAdd);
            formData.append("email", addemail);
            formData.append("picture", picture);
            formData.append("slug", usernameAdd);
            formData.append("isActive", 1);
            axios.post(`http://127.0.0.1:8000/api/admins`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((res) => {
                    console.log("sent");
                    setLoading(false);
                    FetchData();
                })
                .catch((error) => {
                    console.log(error.message);


                });
        } else {
            return alert('Please confirm the password correctly');
        }
    }

    return (

        <div className="dash-side">
            <Navbar />
            <div className='show-contacts'>
                <h1 className='ClassH2'>Admins</h1>
                <div className='title_and_search'>
                    <h2 className='addclassh2'>Add New Admin <CgAddR onClick={() => { setPopUp(true) }} className='iconAdd' /></h2>
                    <div className='searchclassh2'>
                        <div class="se">
                            <div class="search-box">
                                <button class="btn-search"><GoSearch /></button>
                                <input type="text" class="input-search" placeholder="Type to Search..."
                                    pattern=".*\S.*"
                                    onChange={(e) => {
                                        setSearchTerm((e.target.value))
                                    }} />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Add admin form. */}
                <PopUp trigger={popUp} setTrigger={setPopUp}>
                    <section className="heading">
                        <h2>
                            <BsFillPeopleFill />   Add New Admin
                        </h2>
                        <p>Enter your information below</p>
                    </section>
                    <section className="form">
                        <form onSubmit={() => {
                            AddAdmin();
                            setPopUp(false);
                        }}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Useranme"
                                    value={usernameAdd}
                                    onChange={(e) => {
                                        setUsernameAdd(e.target.value)
                                    }}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={addemail}
                                    onChange={(e) => {
                                        setAddemail(e.target.value)
                                    }}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={passwordAdd}
                                    onChange={(e) => {
                                        setPasswordAdd(e.target.value)
                                    }}
                                    required
                                />

                                <input
                                    type="password"
                                    name="conf_password"
                                    id="conf_password"
                                    placeholder="Confirm Password"
                                    value={confAdd}
                                    onChange={(e) => {
                                        setConfAdd(e.target.value)
                                    }}
                                    required
                                />

                                <input
                                    type="file"
                                    name="picture"
                                    onChange={(onChangeFile)}
                                    required
                                />

                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-block" value="confirm" />
                            </div>
                        </form>
                    </section>
                </PopUp>


                {/* Edit admin form. */}
                <PopUp trigger={popup1} setTrigger={setPopup1}>
                    <section className="heading">
                        <h2>
                            <MdEdit />   Edit Admin
                        </h2>
                        <p>Edit your information below</p>
                    </section>
                    <section className="form">
                        <form onSubmit={() => {
                            EditAdmin();
                            setPopup1(false);
                        }}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Useranme"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                    }}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}

                                />
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}

                                />

                                <input
                                    type="password"
                                    name="conf_password"
                                    id="conf_password"
                                    placeholder="Confirm Password"
                                    value={conf}
                                    onChange={(e) => {
                                        setConf(e.target.value)
                                    }}

                                />

                                <input
                                    type="file"
                                    name="picture"
                                    onChange={(onChangeFile)}

                                />

                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-block" value="confirm" />
                            </div>
                        </form>
                    </section>
                </PopUp>


                <PopUp trigger={popup} setTrigger={setPopup}>
                    <section className="heading">
                        <h3>Are you sure you want to change Activation State?</h3><br />
                        <button className='confirm' onClick={() => {
                            ChangeActivation();
                            setPopup(false)
                        }}>Yes
                        </button>
                    </section>
                </PopUp>

                <div className='tablecenter'>
                    {data?.admins.filter((info => {
                        if (searchrterm === "") {
                            return info;
                        } else if (info.username.toLowerCase().includes(searchrterm.toLowerCase())) {
                            return info;
                        }
                    }))
                        .map((info) => (
                            <Admin id={info.id} username={info.username}
                                email={info.email}
                                password={info.password}
                                popup1={popup1}
                                setPopup1={setPopup1}
                                setUsername={setUsername}
                                setPassword={setPassword}
                                setConf={setConf}
                                setPicture={setPicture}
                                setEmail={setEmail}
                                picture={info.picture}
                                popup={popup} setPopup={setPopup} setAdminID={setAdminID}
                                active={info.isActive} setActive={setActive}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default AdminDashoard
