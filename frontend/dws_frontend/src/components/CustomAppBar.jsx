import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function CustomAppBar() {
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();
    const logoutEndpoint = 'http://127.0.0.1:8000/logout/'
    try {
      const response = await fetch(logoutEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        },
        body: null
      })

      if (!response.ok) {
        const errorMessage = await response.text();
        alert(`Logout failed: ${errorMessage}`)
        return;
      }

      const data = await response.json();

      if (data) {
        localStorage.removeItem('authToken');
        navigate('/');
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    }
  }

  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bayad Digital Wallet System
          </Typography>
          <Button color="inherit" onClick={logoutHandler}>Logout</Button>
        </Toolbar>
      </AppBar>
  );
}