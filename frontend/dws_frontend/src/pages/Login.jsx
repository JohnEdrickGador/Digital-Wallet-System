import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword)
}

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert("Please enter an email address and a password");
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

    

    const data = await response.json();

    if (!response.ok) {
      alert(`Login failed: ${data.response_message}`)
      setEmail('');
      setPassword('');
      return;
    }

    //save the auth token to localstorage
    localStorage.setItem('dwsUser', JSON.stringify(data.details.user));
    localStorage.setItem('authToken', data.details.token);
    navigate('/wallet');

    } catch (error) {
      console.log(error);
      alert("An unexpected error occurred. Please try again.");
    }

  }

  const routeToSignUp = (e) => {
    navigate('/signup')
  }

  return (
    <div className='login-page'>
      <form className='login-container' onSubmit={handleLogin}>
          <div className="title-container">
              <h2>Digital Wallet System</h2>
          </div>
          <TextField id="outlined-basic" label="Email Address" required value={email} variant="outlined" onChange={emailChangeHandler}/>
          <TextField 
                    id="outlined-basic" 
                    label="Password" 
                    required
                    value={password} 
                    variant="outlined" 
                    type={showPassword ? 'text' : 'password'} 
                    onChange={passwordChangeHandler}

                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
          <div className="login-btn-container">
              <Button variant="contained" type='submit'>Sign in</Button>
              <Button variant="outlined" onClick={routeToSignUp}>Create an Account</Button>
          </div>
      </form>    
    </div>

  )
}
