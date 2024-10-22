import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Authentication() {
    // const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('authToken') != null) {
            console.log("Go to Wallet")
            navigate('/wallet')

        } else {
            navigate('/login');
        }
    }, [])

    return (
        <></>
    )
}
