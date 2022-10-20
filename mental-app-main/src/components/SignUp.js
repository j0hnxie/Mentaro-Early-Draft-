import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Button, Box, FormControl, InputLabel, Input } from "@material-ui/core";
import axios from "axios";
import sha256 from 'crypto-js/sha256';
import CryptoJS from "crypto-js";


const SignUp = ({ setToken, match }) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [password, setPassword] = useState("");
  const userid = match.params.userId
  const companyid = match.params.companyId

  // let history = useHistory();
  const onSignUp = (e) => { 
    e.preventDefault();

    const finalPassword = sha256(password).toString(CryptoJS.enc.Hex)

    const params = new URLSearchParams()
    params.append('company_id', companyid)
    params.append('user_id', userid)
    params.append('firstname', first)
    params.append('lastname', last)
    params.append('hash_pass', finalPassword)

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    axios.post('/api/signup', params, config)
      .then((response) => response.data)
      .then((response) => {
        console.log(response);
        if (response.success) {
          setToken(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className="App">
      <form onSubmit={onSignUp}>
        <FormControl>
          <InputLabel htmlFor="firstname">First Name</InputLabel>
          <Input id="firstname" onChange={(e) => setFirst(e.target.value)} />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="lastname">Last Name</InputLabel>
          <Input id="lastname" onChange={(e) => setLast(e.target.value)} />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
