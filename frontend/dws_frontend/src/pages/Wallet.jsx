import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Wallet() {
    const [authToken, setAuthToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            console.log("App > Wallet")
            setAuthToken(localStorage.getItem('authToken'))
        } else {
            navigate('/login')
        }
      }, [])
    return (
        <div>
            <h1>
                Hello Wallet
            </h1>    
        </div>
    )
}
