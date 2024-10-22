import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorAlert, setErrorAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
        console.log("Login > Wallet")
        navigate('/wallet')
    }
  }, [])

  const emailChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert("Please enter an email address and a password");
      setErrorAlert(true)
      return;
    }

    const requestBody = {
      "email": email,
      "password": password
    }

    const loginEndpoint = 'http://127.0.0.1:8000/login/'

    //submit the requestBody to the api login endpoint
    try {
      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(requestBody)
      }
    )

    if (!response.ok) {
      const errorMessage = await response.text();
      console.log(errorMessage);
      alert(`Login failed: ${errorMessage}`)
      return;
    }

    const data = await response.json();

    //save the auth token to localstorage
    localStorage.setItem('authToken', data.token);
    navigate('/wallet');

    } catch (error) {
      console.log(error);
      alert("An unexpected error occurred. Please try again.");
    }

  }

  return (
    <div className='login-page'>
      <form className='login-container' onSubmit={handleLogin}>
          <div className="title-container">
              <h2>Digital Wallet System</h2>
          </div>
          <TextField id="outlined-basic" label="Email Address" variant="outlined" onChange={emailChangeHandler}/>
          <TextField id="outlined-basic" label="Password" variant="outlined" type='password' onChange={passwordChangeHandler}/>
          <div className="login-btn-container">
              <Button variant="contained" type='submit'>Sign in</Button>
              <Button variant="outlined">Create an Account</Button>
          </div>
      </form>    
    </div>

  )
}
