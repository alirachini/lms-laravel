import { useState,useEffect } from "react";
import "./App.css";

import ClassesPage from "./Components/Auth/DashboardPages/ClassesPage";
import SectionsPage from "./Components/Auth/DashboardPages/SectionsPage";
import LandingPage from "./Components/Auth/DashboardPages/LandingPage";
import Attendance from "./Components/Attendance";
import Loading from "./Components/Loading/Loading";


import AdminDashoard from "./Components/Admin/AdminDashboard";
import Login from "./Components/Login/Login";
import ReportsCards from "./Components/Reports/ReportsCards";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Components/Login/Profile";
import StudentsDashboard from "./Components/Students/StudentsDashboard";
import axios from "axios";


// axios.defaults.baseURL= "http://127.0.0.1:8000/";
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Accept'] = 'application/json';

// axios.defaults.withCredentials = true;

const App = () => {
    const [ClassesAndSections,setClassesAndSections]=useState([]);
    const [loading,setloading]=useState(true);
    useEffect(() => {getdata()} , []);
    const getdata = async() =>{
        const response = await axios.get(`http://localhost:8000/api/classesall`);
        if(response.data){
          setClassesAndSections(response.data);
          console.log(response.data)
        }
        setloading(false);
      }
   // Class State & Loading Class State

   const [loadingClasses, setLoadingClasses] = useState(true);
   const [classes, setClasses] = useState([]);

   // numberClass State & LoadingNumber
   const [loadingClassCount, setLoadingClassCount] = useState(true);
   const [countClasses, setCountClasses] = useState([]);

   // section state & loading state
   const [loadingSections, setLoadingSections] = useState(true);
   const [sections, setSections] = useState([]);

   // numberSection State & LoadingNumber
   const [loadingSectionCount, setLoadingSectionCount] = useState(true);
   const [countSections, setCountSections] = useState([]);

   const [loadingSectionByClass, setLoadingSectionByClass] = useState(true);
   const [sectionByClass, setSectionByClass] = useState([]);

   const [loadingStudents, setLoadingStudents] = useState(true);
   const [students, setStudents] = useState([]);


    /**
     *
     * @param id
     * @returns {Promise<void>}
     */
     const fetchSectionsByClass = async (id) => {
      setLoadingSectionByClass(true);
      try {
          const response = await axios.get(`http://localhost:8000/api/section/class/${id}`);
          const {data: sections} = response;
          setSectionByClass(sections);
      } catch (err) {
          console.log(err.message)
      }
      setLoadingSectionByClass(false)
  };


  /**
   * Count Students in each Section
   * @param id
   * @returns {Promise<JSX.Element>}
   */
  const sectionCount = async (id) => {
      try {
          setLoadingSectionCount(true);
          const response = await axios.get(
              `http://localhost:8000/api/studentsCount/${id}`
          );
          const {data: countSections} = response;
          setCountSections(countSections);
          setLoadingSectionCount(false);
      } catch (error) {
          console.log(error.message);
          console.log(countSections);
      }
  }


  const fetchSections = async () => {
      try {
          setLoadingSections(true);
          const response = await axios.get("http://localhost:8000/api/sections");
          const {data: sections} = response;
          setSections(sections);
          setLoadingSections(false);
      } catch (err) {
          console.log(err.message);
      }
  };

  /**
   * Count Classes
   * @returns {Promise<void>}
   */

  /**
   *  Fetch Classes
   * @returns {Promise<void>}
   */
  const fetchClasses = async () => {
      try {
          setLoadingClasses(true);
          const response = await axios.get("http://localhost:8000/api/classes");
          const {data: classes} = response;
          setClasses(classes);
          setLoadingClasses(false);
      } catch (err) {
          console.log(err.message);
      }
  };


    return (
    <Router>
      <>
        <Routes>
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/loading" element={<Loading/>} />
        <Route exact path="/reports" element={<ReportsCards/>} />
        <Route exact path="/login" element={<Login/>} />
 
        <Route exact path="/admin" element={<AdminDashoard />} />
        <Route exact path="/students" element={<StudentsDashboard />} />

        <Route exact path="/attendance" element={<Attendance ClassesAndSection={ClassesAndSections}/>}/>

        <Route
                        exact
                        path="/classes"
                        element={
                            <ClassesPage
                                classes={classes}
                                loadingClasses={loadingClasses}
                                fetchClasses={fetchClasses}
                            />
                        }
                    />
  
                    <Route
                        exact
                        path="/sections"
                        element={
                            <SectionsPage
                                classes={classes}
                                sectionByClass={sectionByClass}
                                fetchSectionsByClass={fetchSectionsByClass}
                                loadingSectionByClass={loadingSectionByClass}
                                sectionCount={sectionCount}
                                fetchSections={fetchSections}
                                fetchClasses={fetchClasses}
                                loadingClasses={loadingClasses}
                                sections={sections}
                                loadingSections={loadingSections}
                            />
                        }
                    />

               
       
        </Routes>
      </>
    </Router>
  );
};

export default App;
