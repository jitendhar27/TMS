import React, { useState } from 'react';
import Axios from 'axios';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { Alert } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '90vh',
    margin: '10px'
  },
  left: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008080',
    color: '#fff',
  },
  right: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin:'10px',
    
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      
    },
    '& .MuiButton-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Login({ onLogin }) {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(`Attempting to log in with username: ${username} , email: ${email} ,and password: ${password}`);

    try {
      const response = await Axios.post('http://localhost:5000/api/user/login', {
        username : username,
        email: email,
        password: password
      });

      console.log(response);

      if (response.data.success) {
        // Check the user's role received from the server
        const userRole = response.data.role;

        if (userRole === 'customer') {
          setStatus({ message: 'User is a Customer', severity: 'info' });
        } else if (userRole === 'hotelier') {
          setStatus({ message: 'User is a Hotelier', severity: 'info' });
        } else if (userRole === 'admin') {
          setStatus({ message: 'User is a Admin', severity: 'info' });
        }

        console.log("login: " +userRole);
        onLogin(userRole); // Pass userRole to the onLogin function
        alert(userRole);

      } else {
        setStatus({ message: 'Wrong credentials', severity: 'error' });
      }

    } catch (error) {
        if (error.response && error.response.status === 400) {
            setStatus({message: 'Wrong credentials', severity: 'error'});
          } else {
            console.log('Error sending data:', error);
          }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <h1>Welcome Back</h1>
      </div>
      <div className={classes.right}>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            required
            id="outlined-required"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          {status ? <Alert severity={status.severity}>{status.message}</Alert> : 
          <Alert severity="info">Please enter your correct credentials</Alert>}
        </form>
      </div>
    </div>
  );
}


