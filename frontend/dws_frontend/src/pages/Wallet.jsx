import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomAppBar from '../components/CustomAppBar'

export default function Wallet() {
    const [authToken, setAuthToken] = useState('');
    const [wallet, setWallet] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            setAuthToken(localStorage.getItem('authToken'))
        } else {
            navigate('/login')
        }
        }, []
    )

    const getWallet = async (e) => {
        const walletEndpoint = 'http://127.0.0.1:8000/get_wallet/'
    }



    return (
        <div className='wallet-page'>
            <CustomAppBar />
        </div>
    )
}
