import React, { useState, useEffect } from 'react'
import "./Students.css"
import Navbar from '../Navbar/Navbar'
import { CgAddR } from 'react-icons/cg';
import { GoSearch } from 'react-icons/go';
import PopUp from '../PopUp/PopUp';
import { BsFillPeopleFill } from 'react-icons/bs';
import axios from "axios";
import { MdEdit } from "react-icons/md"
import { GiCommercialAirplane } from "react-icons/gi"
import { MdOutlineAirplanemodeInactive } from "react-icons/md"
import { FaPlusSquare } from "react-icons/fa";
import { FaUserGraduate } from 'react-icons/fa';

const StudentsDashboard = () => {

    const [popUp, setPopUp] = useState(false);
    const [popup, setPopup] = useState(false);
    const [popup1, setPopup1] = useState(false);

    const [Loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const [studentID, setStudentID] = useState(null);

    const [active, setActive] = useState(null);
    const [fname, setfname] = useState(null);
    const [lname, setlname] = useState(null);
    const [picture, setPicture] = useState([]);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [dob, setdob] = useState(null);

    const [fnameAdd, setFnameAdd] = useState(null);
    const [lnameAdd, setLnameAdd] = useState(null);
    const [addemail, setAddemail] = useState(null);
    const [phoneAdd, setPhoneAdd] = useState(null);
    const [dobAdd, setDobAdd] = useState(null);

    const [searchrterm, setSearchTerm] = useState("");


    const onChangeFile = e => {
        setPicture(e.target.files[0]);
    }

    useEffect(() => {
        FetchData();

    }, []);

    const FetchData = async () => {
        // setLoading(true);
        await fetch(`http://127.0.0.1:8000/api/students`, {
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

    // Edit students
    const EditStudent = async () => {

        console.log(typeof (picture));
        setLoading(true);
        const formData = new FormData();
        formData.append("fname", fname);
        formData.append("lname", lname);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("dob", dob);
        if (typeof (picture) === "array" || typeof (picture) === "object") {
            formData.append("picture", picture);
        }
        formData.append("slug", fname);
        formData.append("_method", "PUT");
        await axios.post(`http://127.0.0.1:8000/api/students/${studentID}`, formData, {
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
            await fetch(`http://localhost:8000/api/students/${studentID}?isActive=0`, {
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
                    setStudentID(null);
                    FetchData();
                })
                .catch((error) => {
                    console.error(error.message);
                    setError(error);
                });
        } else if (active === 0) {
            setLoading(true);
            fetch(`http://localhost:8000/api/students/${studentID}?isActive=1`, {
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
                    setStudentID(null);
                    FetchData();
                })
                .catch((error) => {
                    console.error(error.message);
                    setError(error);
                });
        }
    }


    // Add student section
    console.log(active);
    const AddStudent = () => {

        setLoading(true);
        const formData = new FormData();
        formData.append("fname", fnameAdd);
        formData.append("lname", lnameAdd);
        formData.append("email", addemail);
        formData.append("phone", phoneAdd);
        formData.append("picture", picture);
        formData.append("dob", dobAdd);
        formData.append("slug", fnameAdd);
        formData.append("isActive", 1);
        axios.post(`http://127.0.0.1:8000/api/students`, formData, {
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
    }
    console.log(active)


    return (
        <div className="dash-side">
            <Navbar />
            <div className='show-contacts'>
                <h1 className='ClassH2'>Students</h1>
                <div className='title_and_search'>
                    <h2 className='addclassh2'>Add New Students <CgAddR onClick={() => { setPopUp(true) }} className='iconAdd' /></h2>
                    <div className='searchclassh2'>
                        <div class="se">
                            <div class="search-box">
                                <button class="btn-search"><GoSearch /></button>
                                <input type="text" class="input-search" placeholder="Type to Search..."
                                    pattern=".*\S.*"
                                    onChange={(e) => {
                                        setSearchTerm((e.target.value))
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Add student popup */}
                <PopUp trigger={popUp} setTrigger={setPopUp}>
                    <section className="heading">
                        <h2>
                            <FaUserGraduate />   Add New Student
                        </h2>
                        <p>Enter the information below</p>
                    </section>
                    <section className="form">
                        <form onSubmit={() => {
                            AddStudent();
                            setPopUp(false);
                        }}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="First Name"
                                    value={fnameAdd}
                                    onChange={(e) => {
                                        setFnameAdd(e.target.value)
                                    }}
                                    required
                                />

                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Last Name"
                                    value={lnameAdd}
                                    onChange={(e) => {
                                        setLnameAdd(e.target.value)
                                    }}
                                    required
                                />

                                <input
                                    type="phone"
                                    name="name"
                                    id="name"
                                    placeholder="Phone Number"
                                    value={phoneAdd}
                                    onChange={(e) => {
                                        setPhoneAdd(e.target.value)
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
                                    type="date"
                                    name="name"
                                    id="name"
                                    placeholder="Date Of Birth"
                                    value={dobAdd}
                                    onChange={(e) => {
                                        setDobAdd(e.target.value)
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

                {/* Edit Student Popup */}

                <PopUp trigger={popup1} setTrigger={setPopup1}>
                    <section className="heading">
                        <h2>
                            <MdEdit />   Edit Student
                        </h2>
                        <p>Edit the information below</p>
                    </section>
                    <section className="form">
                        <form onSubmit={() => {
                            EditStudent();
                            setPopup1(false);
                        }}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="First Name"
                                    value={fname}
                                    onChange={(e) => {
                                        setfname(e.target.value)
                                    }}
                                />
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Last Name"
                                    value={lname}
                                    onChange={(e) => {
                                        setlname(e.target.value)
                                    }}
                                />

                                <input
                                    type="phone"
                                    name="name"
                                    id="name"
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value)
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
                                    type="date"
                                    name="name"
                                    id="name"
                                    placeholder="Date Of Birth"
                                    value={dob}
                                    onChange={(e) => {
                                        setdob(e.target.value)
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
                    <div className="formContact">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Photo</th>
                                    <th>Fname</th>
                                    <th>Lname</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>DOB</th>
                                    <th>Edit</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.students.filter((item => {
                                    if (searchrterm === "") {
                                        return item;
                                    } else if (item.fname.toLowerCase().includes(searchrterm.toLowerCase())) {
                                        return item;
                                    }
                                }))
                                    .map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td><img className='imageProfileTable' src={`http://localhost:8000/pictures/${item.picture}`}></img></td>
                                                <td>{item.fname}</td>
                                                <td>{item.lname}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.dob}</td>
                                                <td><MdEdit onClick={() => {setStudentID(item.id); setPopup1(true); setfname(item.fname); setlname(item.lname); setEmail(item.email); setPhone(item.phone); setdob(item.dob); setPicture(item.picture);}} className='iconProfile' /></td>

                                                {item.isActive === 1 ?
                                                    <td><GiCommercialAirplane onClick={() => { setActive(item.isActive); setStudentID(item.id); setPopup(true); ChangeActivation() }} className='iconProfileGreen' /></td> :
                                                    <td><MdOutlineAirplanemodeInactive onClick={() => { setActive(item.isActive); setStudentID(item.id); setPopup(true); ChangeActivation() }} className='iconProfileRed' /></td>
                                                }

                                            </tr>


                                        );

                                    })}

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default StudentsDashboard
