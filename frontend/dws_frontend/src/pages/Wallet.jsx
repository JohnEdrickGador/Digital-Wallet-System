import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomAppBar from '../components/CustomAppBar'

export default function Wallet() {
    const [authToken, setAuthToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            setAuthToken(localStorage.getItem('authToken'))
        } else {
            navigate('/login')
        }
        }, []
    )

    return (
        <div className='wallet-page'>
            <CustomAppBar />
        </div>
    )
}
