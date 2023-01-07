import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@material-ui/core/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from 'axios'
import Select from "@mui/material/Select";

const AttendanceTable = ({ students, status, date, thisatt, loading }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const [Attendance, setAttendance] = useState([]);

  const handleChange = (event, id, index, date) => {
    const values = [...thisatt];
    const isFound = values.some((item) => {
      return item.student_id === id;
    });
    if (isFound) {
      values[index].status_id = event.target.value;
      values[index].student_id = id;
    } else {
      values.push({ student_id: id, status_id: event.target.value});
    }
    setAttendance(values);
  };

  const sendAttendanceSheet = async(Attendance) => {
    let att = JSON.stringify(Attendance)
    const response = await axios.post(`http://localhost:8000/api/attendance/update`,{"attendance":att})
    if(response.data){
      console.log(response.data)
    }
  };

  useEffect(() => {
    setAttendance([]);
  }, [students]);
  if (loading) {
    return <></>;
  } else {
    return (
      <>
        <div className="attendance_container">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className="table_head" align="center">
                    Profile
                  </StyledTableCell>
                  <StyledTableCell className="table_head" align="center">
                    Name
                  </StyledTableCell>
                  <StyledTableCell className="table_head" align="center">
                    Attendance{" "}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      <img width="50px" src={item.picture} alt="404"/>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.fname + " " + item.lname}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                          onChange={(e) =>{
                            handleChange(e, item.id, index, date, thisatt);
                            console.log(Attendance)
                          }
                          }
                          value={
                            Attendance.length > 0 && Attendance[index]
                              ? Attendance[index].status_id
                              : thisatt[index] ? thisatt[index].status.id : ""
                          }
                        >
                          {status.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.id}>
                                {item.Status}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="confirm_button">
        <Button type="button" color="primary" size="larger" onClick={()=>{sendAttendanceSheet(Attendance)}}>Confirm</Button>
        </div>
      </>
    );
  }
};

export default AttendanceTable;