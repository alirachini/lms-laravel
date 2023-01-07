import React from 'react'
import {useState,useEffect} from "react";
import Trees from "./Trees";
import Students from "./students";
import axios from "axios";

const Attendance = () => {
  useEffect(() => {getdata()},[])
    const[selected_section_tree,setselected_section_tree]=useState();
    //classes and sections are stored here
    const [ClassesAndSections,setClassesAndSections]=useState([]);
    //students of selected section are stored in here
    const [students,setStudents]=useState([]);
    //classes
    const [Classes,setClasses]=useState();
    const [loading,setloading]=useState(true);
    //date today
    const [datetoday,setdatetoday]=useState('');
    //loading data for attendance
    const [loadingattendance,setloadingattendance]=useState(true)
    //set students buttons on and off
    const [student_tested,set_student_tested]=useState(false)
  
    const getdata = async () => {
      const response = await axios.get(`http://localhost:8000/api/classesall`);
      if(response.data){
        setClassesAndSections(response.data);
      }
      setloading(false);
    }
    // to show the students in the students table
    const showstudent = async(id,date) =>{
      setloadingattendance(true);
          const response = await axios.get(`http://localhost:8000/api/students/section/${id}`) 
      if(response.data)
      {
      setStudents(response.data);
      getCurrentDate();
      }
      setloadingattendance(false)
      setloading(false)
    }
  //get classes
    const getclasses = async () => {
      const response = await axios.get(`http://localhost:8000/api/classes`);
      if(response.data){
        setClasses(response.data);
      }
      setloading(false);
    }
    const getCurrentDate = () =>{
      
      let newDate = new Date()
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      let separator = ("/")
      setdatetoday(`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`);
      }
  return (
    <div className="container">
        <Trees data={ClassesAndSections} getdata={getdata} showstudent={showstudent} getclasses={getclasses} set_selected_section_in_tree={setselected_section_tree} buttons_on={set_student_tested}/>
        <Students students={students} date={datetoday} classes={Classes} loadingattendance={loadingattendance} section={selected_section_tree} buttons={student_tested} get_students={showstudent}/>
      </div>
  )
}

export default Attendance