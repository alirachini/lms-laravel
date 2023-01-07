import React, { PureComponent, useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import "./Reports.css";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarCharts = () => {
  useEffect(() => {
    get_sections()
    getCurrentDate();
  }, []);

  const [loading, setloading] = useState(true);
  const [sections, setSections] = useState([]);
  const [attendance, set_attendance] = useState([]);
  const [data_arrays, set_date_array] = useState();

  const get_sections = async () => {
    const response = await axios.get("http://localhost:8000/api/sections");
    setSections(response.data);
  };

  const getCurrentDate = async () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let separator = "/";
    let current_date = `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;

    const response = await axios.post(`http://localhost:8000/api/date/add`, {
      attendance_date: current_date,
    });
    if (response.data) {
      let x = response.data[0].id;
      let date_array = [];
      let y = x - 7;
      for (x; x >= y; x--) {
        date_array.push(x);
      }
      set_date_array(date_array);
    }
    setloading(false)
  };

  const get_data = async (item, date_arrays) => {
    const response = await axios.post(
      `http://localhost:8000/api/attendance/section`,{section:item,dates:date_arrays}
    );
    if (response.data) {
      set_attendance(response.data)
    }
    console.log(response.data[0].date)
    setdata([
    {
      name: response.data[6].date,
      Late: response.data[6].late,
      Present: response.data[6].present,
      Absent: response.data[6].absent,
      "N-A": response.data[6].not_available,
    },
    {
      name: response.data[5].date,
      Late: response.data[5].late,
      Present: response.data[5].present,
      Absent: response.data[5].absent,
      "N-A": response.data[5].not_available,
    },
    {
      name: response.data[4].date,
      Late: response.data[4].late,
      Present: response.data[4].present,
      Absent: response.data[4].absent,
      "N-A": response.data[4].not_available,
    },
    {
      name: response.data[3].date,
      Late: response.data[3].late,
      Present: response.data[3].present,
      Absent: response.data[3].absent,
      "N-A": response.data[3].not_available,
    },
    {
      name: response.data[2].date,
      Late: response.data[2].late,
      Present: response.data[2].present,
      Absent: response.data[2].absent,
      "N-A": response.data[2].not_available,
    },
    {
      name: response.data[1].date,
      Late: response.data[1].late,
      Present: response.data[1].present,
      Absent: response.data[1].absent,
      "N-A": response.data[1].not_available,
    },
    {
      name: response.data[0].date,
      Late: response.data[0].late,
      Present: response.data[0].present,
      Absent: response.data[0].absent,
      "N-A": response.data[0].not_available,
    },
  ]);
    setloading(false);
  };
  const[data,setdata]=useState([])

  const getIntroOfPage = (label) => {
    if (label === "Page A") {
      return "Page A is about men's clothing";
    }
    if (label === "Page B") {
      return "Page B is about women's dress";
    }
    if (label === "Page C") {
      return "Page C is about women's bag";
    }
    if (label === "Page D") {
      return "Page D is about household goods";
    }
    if (label === "Page E") {
      return "Page E is about food";
    }
    if (label === "Page F") {
      return "Page F is about baby food";
    }
    return "";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label" >{`${label}`}</p>
          <p className="intro">{getIntroOfPage(label)}</p>
          <p className="desc">Attendance By Section.</p>
        </div>
      );
    }

    return null;
  };
if (loading) return "loading..."
  return (
    <>
      <Box sx={{ minWidth: 120 }} className="box">
        <FormControl fullWidth className="input_drop">
          <InputLabel id="demo-simple-select-label">Section</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Section"
            onChange={(item) => {
              get_data(item.target.value, data_arrays);
            }}
          >
            {sections.map((item, index) => {
              return (
                <MenuItem key={index} value={item.id}>
                  {item.SectionName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <div className="barchart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Present" barSize={5} fill="#7380ec" />
            <Bar dataKey="Late" barSize={5} fill="#88ff19" />
            <Bar dataKey="Absent" barSize={5} fill="red" />
            <Bar dataKey="N-A" barSize={5} fill="green" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
export default BarCharts;
