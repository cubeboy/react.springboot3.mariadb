import React, { useState } from 'react';
import { Snackbar, Button, TextField, Stack } from '@mui/material';
import Carlist from './Carlist';

export default function Login() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const [isAuth, setAuth] = useState(false);

  const handleChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value})
  }

  const login = () => {
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    .then(response => {
      if(response.ok) {
        const jwtToken = response.headers.get('Authorization');
        if (jwtToken !== null) {
          sessionStorage.setItem('jwt', jwtToken);
          setAuth(true);
        }
      } else {
        setOpen(true);
      }
    })
    .catch(error => { console.log(error); setOpen(true); });
  }

  const logout = () => {
    sessionStorage.removeItem('jwt');
    setAuth(false);
  }

  if(isAuth) {
    return <Carlist />
  }

  return (
    <div>
      <Stack spacing={2} alignItems='center' mt={2}>
        <TextField name="username" label="Username" onChange={handleChange} />
        <TextField name="password" label="password" type="password" onChange={handleChange} />
        <Button variant="outlined" color="primary" onClick={login}>Login</Button>
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} message="Login failed: Check Username and Password." />
      </Stack>
    </div>
  );
}