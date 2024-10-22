import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    const handleSignup = async (e) => {
        e.preventDefault()
    
        const requestBody = {
            "username": username,
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": password
        }
    
        const loginEndpoint = 'http://127.0.0.1:8000/signup/'
    
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
          alert(`Signup Failed: ${errorMessage}`)
          return;
        }
    
        const data = await response.json();

        alert("Account created successfully")
        navigate('/login')
    
        } catch (error) {
          console.log(error);
          alert("An unexpected error occurred. Please try again.");
        }
    
    }

    return (
        <div className="signup-page">
            <form className="signup-container" onSubmit={handleSignup}>
                <div className="title-container">
                    <h2>Digital Wallet System</h2>
                </div>
                <TextField id="outlined-basic" label="Username" required variant="outlined" onChange={(e) => {setUsername(e.target.value)}}/>
                <TextField id="outlined-basic" label="First Name" required variant="outlined" onChange={(e) => {setFirstName(e.target.value)}}/>
                <TextField id="outlined-basic" label="Last Name" required variant="outlined" onChange={(e) => {setLastName(e.target.value)}}/>
                <TextField id="outlined-basic" label="Email Address" required variant="outlined" onChange={(e) => {setEmail(e.target.value)}}/>
                <TextField 
                    id="outlined-basic" 
                    label="Password" 
                    required 
                    variant="outlined" 
                    type={showPassword ? 'text' : 'password'} 
                    onChange={(e) => {setPassword(e.target.value)}}

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
                <div className="signup-btn-container">
                    <Button variant="contained" type='submit' >Sign Up</Button>
                    <p>Already have an account? <a href="/login">Log In</a></p>
                </div>
            </form>
        </div>
    )
}
