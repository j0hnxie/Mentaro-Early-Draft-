import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Button, Box, FormControl, InputLabel, Input } from "@material-ui/core";
import sha256 from 'crypto-js/sha256';
import CryptoJS from "crypto-js";
import axios from "axios";


const SignIn = ({setToken}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // let history = useHistory();
  const onLogin = (e) => { 
    e.preventDefault();

    const finalPassword = sha256(password).toString(CryptoJS.enc.Hex)

    const params = new URLSearchParams()
    params.append('email', username)
    params.append('hash_pass', finalPassword)

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials : true
    }

    axios.post('/api/login', params, config)
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
      <form onSubmit={onLogin}>
        <FormControl>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input id="username" onChange={(e) => setUsername(e.target.value)} />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" type = "password" onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default SignIn;
