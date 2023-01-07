import React, { useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import AddIcon from "@mui/icons-material/Add";
import InputLabel from '@mui/material/InputLabel';
import Popup from "reactjs-popup";
import StudentTable from "./StudentTable";
import AttendanceTable from "./AttendanceTable"
import MenuItem from "@mui/material/MenuItem";
import "./students.css";
import axios from "axios"
import { Select } from "@mui/material";


const Students = ({ students,date,classes,loadingattendance,section,buttons,get_students}) => {
  // clickadd for the add new student and the click register is for updating section and those hooks are used to show each form
  const [clickadd,setclickadd]=useState(false)
  const [register_confirm_button,setregister_confirm_button]=useState(false)
  const [studs,setStuds]=useState([])
  const [clickregister,setclickregister]=useState(false)
  const [classselected,setclass]=useState('N/A')
  const [sections,setSections]=useState([])
  const [sectionselect,setsectionselect]=useState(false)
  const [studentselect,setstudentselect]=useState(false)
  const [sectionselected,setsectionselected]=useState('N/A')
  const[student_selected,setstudent_selected]=useState('')
  
  const[the_attendance,set_the_attendance]=useState([]);

  const [datefromdata,setdatefromdata]=useState("");
  const [attendance,setAttendance]=useState(false)
  const [loading,setloading]=useState(true)
  const [status,setStatus]=useState([])


  //hide the add new student button and animate the existing button
  const [add_button_hidden,set_add_button_hidden]=useState(false)
  const control_add_button_after_existing_click = () => {
    set_add_button_hidden(false);
    setclickregister(false)
  }

  const[register_button_hidden,set_register_button_hidden]=useState(false)
  const constrol_register_button_after_add_click = () =>{
    set_register_button_hidden(false)
    setclickadd(false)
  }
  
  const get_the_attendance = async (students,date) =>{
    const response = await axios.post('http://localhost:8000/api/add/attendance',{"students":students,"date":date})
    if(response.data){
    set_the_attendance(response.data)
    console.log(the_attendance)
    }
    setloading(false)
    }
  //for showing the add new student form
  const showaddform = (clickadd, clickregister) =>{
    if (clickadd === false){
      setclickadd(true)
    }
    else if(clickadd === true)
    {
      setclickadd(false)
    }
  }
  //for showing the register student to this section
  const showregisterform = (clickregister, clickadd) =>{
    if (clickregister === false){
      setclickregister(true)
    }
    else if(clickregister === true)
    {
      setclickregister(false)
    }
  }
  const getstatus = async() => {
    const response = await axios.get('http://localhost:8000/api/statuses');
    if(response.data){
    setStatus(response.data)
    }
    setloading(false)
  }
  const setdatetoday = (date) =>
  {
    const dateToBackend = Date.parse(date)

  }

  const getdatefromdate = async (date) =>
  {
    const response = await axios.post(`http://localhost:8000/api/date/add`,{"attendance_date":date})
    if(response.data){
      setdatefromdata(response.date);
    }
    setloading(false)
  }
  const getSections = async (section_id)=>{
    const response = await axios.get(`http://localhost:8000/api/sections/${section_id}`)
    if(response.data){
      setSections(response.data)
    }
    setloading(false)
  }
// get students and show them in the students dropdownlist
  const getstudents = async (students_id)=>{
    const response = await axios.get(`http://localhost:8000/api/students/section/${students_id}`)
    if(response.data){
      setStuds(response.data)
    }
    setloading(false)
  }

  //handle the classes and sections
  const handleChange = (item) => {
    setclass(item.ClassName)
    getSections(item.target.value)
    setsectionselect(true)
  } 

  const section_change = (item) =>{
    setsectionselected(item.target.value)
    getstudents(item.target.value)
    setstudentselect(true)
  }

  const student_change = (item) => {
    setstudent_selected(item.target.value)
  }
  const confirmchange = async(student_selected,sectionselected,get_students) => {
    const response = await axios.post(`http://localhost:8000/api/student/update/section/${student_selected}`,{"section_id":sectionselected})
    get_students(sectionselected)
  }

  //handle the existing button and the add button
  const existing_button = ()=>{

  }
  return (
    <div className="student_div">
      <h1 className="student_title">Students</h1>
      <div className="student_container">
        <Popup
          onClose={()=>{
            control_add_button_after_existing_click(add_button_hidden,clickregister)
            constrol_register_button_after_add_click(register_button_hidden,clickregister)
          }}
          closeOnDocumentClick={false}
          trigger={ buttons ?
            /*Button Register Button */
              <Button
                className="add_student_button"
                type="button"
                color="primary"
                size="larger"
                startIcon={<AddIcon className="plus_icon" />}
                Add Student
              >Register Student</Button>
              :
              <Button
                disabled
                className="add_student_button"
                type="button"
                color="primary"
                size="larger"
                startIcon={<AddIcon className="plus_icon" />}
                Add Student
              >Register Student</Button>

          }
          position="bottom left"
        >
          <div className={"poped"}>
            <div className="add_register_div">

              {/* button Existing student*/}
              { register_button_hidden ? <></>: add_button_hidden ?
              <Button className="Existing_student_on"
              onClick={()=>{
                showregisterform(clickregister);
                setsectionselect(false);
                setstudentselect(false);
                setregister_confirm_button(false)
                set_add_button_hidden(!add_button_hidden)
              }}>Existing Student</Button>  
              :
              <Button className="Existing_student"
              onClick={()=>{
                showregisterform(clickregister);
                setsectionselect(false);
                setstudentselect(false);
                setregister_confirm_button(false)
                set_add_button_hidden(!add_button_hidden)
              }}>Existing Student</Button>
              }
            </div>
            {clickregister===true ? 
              <div className="register">
                <div className="select_class_and_section_div">
                  <h3 className="existing_student_title">Existing Student</h3>
                  <Box sx={{ minWidth: 120 }} className="box">
                  <FormControl fullWidth >
                  <InputLabel id="demo-simple-select-label">Class</InputLabel>
                  <Select 
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Class"
                  onChange={(item)=>{handleChange(item)}}
                  >
                    {classes.map((item,index)=>{return (
                          <MenuItem key={index} value={item.id}>
                            {item.ClassName}
                          </MenuItem>
                        );})}
                  </Select>
                  </FormControl>
                 </Box>{ sectionselect ?
                 <Box sx={{ minWidth: 120 }} className="box">
                 <FormControl fullWidth >
                 <InputLabel id="demo-simple-select-label">Section</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Section"
                  onChange={(item)=> {section_change(item)} }
                  value={sectionselected}
                  >
                  {sections.map((item,index)=>{return (
                          <MenuItem key={index} value={item.id}>
                            {item.SectionName}
                          </MenuItem>
                        );})}
                  </Select></FormControl>
                 </Box>:<></>}{ studentselect ?
                 <Box sx={{ minWidth: 120 }} className="box">
                 <FormControl fullWidth >
                 <InputLabel id="demo-simple-select-label">Student</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Student"
                onChange={(item)=> {student_change(item);setregister_confirm_button(true)} }
                  value={student_selected}
                  >
                  {studs.map((item,index)=>{return (
                          <MenuItem key={index} value={item.id}>
                            {item.fname +" "+item.lname}
                          </MenuItem>
                  );})}</Select></FormControl>
                  </Box>:<></>}
                  <div className="confirm_register_div">{register_confirm_button ? <Button className="confirm_register_button" onClick={()=>confirmchange(student_selected,section,get_students)}>confirm register</Button>:<></>}
                      </div>
                </div>
              </div>:<></>}
          </div>
        </Popup> 
        {
          (date != "") ?
        <h2 className="DateToday">Date Today: {date}</h2>
        : ""
        }{ buttons ?
              <Button
                type="button"
                className="add_attendance_button"
                color="primary"
                size="larger"
                startIcon={<AddIcon className="plus_icon" />}
                onClick={()=>{
                  // getdatefromdate(date)
                  getstatus()
                  getdatefromdate(date)
                  setdatetoday(date)
                  setAttendance(!attendance)
                  get_the_attendance(students,date);
                  // enteredattendance(students,date)
                  
                }}
              >
                Add Attendance
              </Button>:
              <Button
              disabled
              type="button"
              className="add_attendance_button"
              color="primary"
              size="larger"
              startIcon={<AddIcon className="plus_icon" />}
              onClick={()=>{
                // getdatefromdate(date)
                getstatus()
                getdatefromdate(date)
                setdatetoday(date)
                setAttendance(!attendance)
                get_the_attendance(students,date);
                // enteredattendance(students,date)
                
              }}
            >
              Add Attendance
            </Button>
            }
      </div>
      <div className="tables_container">
        { attendance ? 
        <div className="Attendancetable">
        <AttendanceTable students={students} status={status} date={date} thisatt={the_attendance}loadings={loadingattendance}/>
        </div>
        :
        <div className="StudentTable">
        <StudentTable students={students}/>
        </div>
        }
      </div>
    </div>
  );
};

export default Students;