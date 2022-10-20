import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
// import { useHistory } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@material-ui/core";

function createData(name, place) {
  return { name, place};
}

const UserHomePage = () => {
  const rows = [
    createData("Name1", 1),
    createData("Name2", 2),
    createData("Name3", 3),
  ]
  const [forms, setForms] = useState([])
  // let history = useHistory()

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials : true
    }

    axios.get('/api/fetchtodoforms', config)
      .then((response) => response.data)
      .then((response) => {
        setForms(response.forms)
      })
      .catch((error) => {
        console.log(error);
      });
      
  }, []);

  return (
    <div className="container">
        <Button variant="contained" color="primary" href="/">Back</Button>
        <Button variant="contained" color="primary" href="/GraphPage">Graphs</Button>
        <Button variant="contained" color="primary" href="/BreathingExercise">Breathing</Button>

      <div className="section">
        {forms.map((element) => (
          <Button variant="contained" color="primary" href={`/${element.form_name}Form`}>
            Take your {element.form_name} Form
          </Button>
        ))}
      </div>

      <div className="section">
        <TableContainer component={Paper}>
          <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Place</TableCell>
                <TableCell align="right">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.place}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>


      <div className="section">
        <div className="quote">
          <h3> Quote of the Day </h3>
          <p> "Johann sucks balls" </p>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
