import * as React from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StudentTable = ({students}) => {
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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const splittodate = (dateandtime) => {
    const result = dateandtime.split(" ")
    return result[0];
  }
  return (
    <TableContainer component={Paper} className="table_container">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead >
          <TableRow>
            <StyledTableCell className='table_head' align="center">Student ID</StyledTableCell>
            <StyledTableCell className='table_head' align="center">First Name</StyledTableCell>
            <StyledTableCell className='table_head' align="center">Last Name</StyledTableCell>
            <StyledTableCell className='table_head' align="center">Email</StyledTableCell>
            <StyledTableCell className='table_head' align="center">Phone Number</StyledTableCell>
            <StyledTableCell className='table_head' align="center">Birthday</StyledTableCell>
            <StyledTableCell className='table_head' align="center">Profile </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((item,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{index + 1}</StyledTableCell>
              <StyledTableCell align="center">{item.fname}</StyledTableCell>
              <StyledTableCell align="center">{item.lname}</StyledTableCell>
              <StyledTableCell align="center">{item.email}</StyledTableCell>
              <StyledTableCell align="center">{item.phone}</StyledTableCell>
              <StyledTableCell align="center">{splittodate(item.dob)}</StyledTableCell>
              <StyledTableCell align="center"><img width="50px" src={item.picture} alt="404"/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentTable