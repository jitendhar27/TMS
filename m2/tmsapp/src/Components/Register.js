import React, { useState } from 'react';
import Axios from 'axios';
import { TextField, Button, makeStyles, MenuItem } from '@material-ui/core';
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

export default function RegistrationForm() {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');


  const [status, setStatus] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post('http://localhost:5000/api/user/register', {
        username : username,
        email: email,
        password: password,
        role : role
      });

      console.log(response.data);
      setStatus(true);

    } catch (error) {
      console.log('error sending data: ', error);
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

          <TextField
            select
            required
            id="outlined-required"
            label="Role"
            variant="outlined"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="hotelier">Hotelier</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
          {status && <Alert severity='success'>User Registered Successfully</Alert>}
        </form>
      </div>
    </div>
  );
}
