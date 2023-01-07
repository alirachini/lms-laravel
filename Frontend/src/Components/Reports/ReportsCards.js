import React from 'react'
import { useState, useEffect } from "react";
import "./Reports.css"
import { FaUserGraduate } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import { GiBlackBook } from 'react-icons/gi';
import { GiNotebook } from 'react-icons/gi';
import Reports from './Reports';
import BarChart from './BarChart';
import axios from 'axios';
import Navbar from '../Navbar/Navbar'
function ReportsCards() {

    const [loadingClassCount, setLoadingClassCount] = useState(true);
    const [countClasses, setCountClasses] = useState([]);
    const [countAdmins, setCountAdmins] = useState([]);
    const [countSections, setCountSections] = useState([]);
    const [countStudents, setCountStudents] = useState([]);

    const countAdmin = async () => {
        setLoadingClassCount(true);
        await axios.get(`http://localhost:8000/api/countAdmin`)
            .then((res) => {
                setCountAdmins(res.data);
                setLoadingClassCount(false);
            })
    };

    const countSection = async () => {
        setLoadingClassCount(true);
        await axios.get(`http://localhost:8000/api/countSection`)
            .then((res) => {
                setCountSections(res.data);
                setLoadingClassCount(false);
            })
    };

    const countStudent = async () => {
        setLoadingClassCount(true);
        await axios.get(`http://localhost:8000/api/countStudents`)
            .then((res) => {
                setCountStudents(res.data);
                setLoadingClassCount(false);
            })
    };

    const countClass = async () => {
        setLoadingClassCount(true);
        await axios.get(`http://localhost:8000/api/countClass`)
            .then((res) => {
                setCountClasses(res.data);
                setLoadingClassCount(false);
            })
    };


    useEffect(() => {
        countClass();
        countAdmin();
        countSection();
        countStudent();

    }, [])

    console.log(countStudents.students);

    return (
        <div className="dash-side">
            <Navbar />
            <div className='show-contacts'>
                <h1 className='ClassH2'>Dashboard</h1>
                <div className='tablecenter'>
                <div className='values'>
                    <div className='val-box'>
                        <FaUserGraduate className='icon_reports' />
                        <div>
                            <h3>{countStudents.students}</h3>
                            <span>Number of Students </span>
                        </div>
                    </div>

                    <div className='val-box'>
                        <GiBlackBook className='icon_reports' />
                        <div>
                            <h3>{countClasses.classes}</h3>
                            <span>Number of classes</span>
                        </div>
                    </div>

                    <div className='val-box'>
                        <GiNotebook className='icon_reports' />
                        <div>
                            <h3>{countSections.sections}</h3>
                            <span>Number of Sections</span>
                        </div>
                    </div>

                    {/* <div className='val-box'>
                        <BsFillPeopleFill className='icon_reports' />
                        <div>
                            <h3>{countAdmins.admins}</h3>
                            <span>Number of Admins</span>
                        </div>
                    </div> */}
                </div>
                </div>
            </div>
            <div className='flex-container'>
                <Reports className='flex-child magenta' />
                <div className='par_reports'>
                    <h1 className='h1_reports'>Total Attendance</h1>
                    <p className='p_reports'>This pie chart shows the statistics of the total number of the attending status of all students.</p>
                </div>
               
            </div>
            <div className='bar_report'>
             <BarChart/>
             </div>
        </div>
    )
}

export default ReportsCards
