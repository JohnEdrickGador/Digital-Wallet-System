import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login() {
  return (
    <div className='login-container'>
        <div className="title-container">
            <h2>Digital Wallet System</h2>
        </div>
        <TextField id="outlined-basic" label="Email Address" variant="outlined" />
        <TextField id="outlined-basic" label="Password" variant="outlined" type='password'/>
        <div className="login-btn-container">
            <Button variant="contained">Sign in</Button>
            <Button variant="outlined">Create an Account</Button>
        </div>
    </div>
  )
}
