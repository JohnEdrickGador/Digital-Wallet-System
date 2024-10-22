import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomAppBar from '../components/CustomAppBar'
import WalletCard from '../components/WalletCard';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function Wallet() {
    const [authToken, setAuthToken] = useState('');
    const [user, setUser] = useState('')
    const [userName, setUserName] = useState('')
    const [wallet, setWallet] = useState(null)
    const [isWallet, setIsWallet] = useState(false)
    const [txnAmount, setTxnAmount] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('authToken') && localStorage.getItem('dwsUser')) {
            const token = localStorage.getItem('authToken');
            const user = localStorage.getItem('dwsUser');

            if (token && user) {
                const userObj = JSON.parse(user)
                setUserName(userObj.username)
                setAuthToken(token)
                setUser(user)
            } else {
                navigate('/login')
            }
        } else {
            navigate('/login')
        }
        }, []
    )

    useEffect(() => {
        if(user !== '') {
            getWallet();
            setIsWallet(true)
        }
    }, [user])

    const getWallet = async (e) => {
        const userObj = JSON.parse(user)
        const walletEndpoint = `http://127.0.0.1:8000/get_wallet/${userObj.username}`
        
        try {
            const response = await fetch(walletEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: null
            })
            
            if (!response.ok) {
                if(response.status == 404) {
                    console.log("User has no wallet")
                    setIsWallet(false)
                    return;
                }
            }
            

            const data = await response.json();
            setWallet(data.details.wallet)
            setIsWallet(true)
            // console.log(data.details)
            // console.log(wallet)
        } catch (e) {
            console.log(e)
        }
    }

    const createWallet = async (e) => {
        const userObj = JSON.parse(user)
        const walletEndpoint = `http://127.0.0.1:8000/create_wallet/`
        const body = {
            "username": userObj.username,
            "email": userObj.email,
            "balance": 0.0
        }
        try {
            const response = await fetch(walletEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify(body)
            })
            
            if (!response.ok) {
                if(response.status == 404) {
                    console.log("Wallet creation unsuccessful")
                    return;
                }
            }
            

            const data = await response.json();
            setWallet(data.details.wallet)
            setIsWallet(true)
        } catch (e) {
            console.log(e)
        }
    }

    const amountChangeHandler = (e) => {
        setTxnAmount(e.target.value)
    }

    const deposit = async (e) => {
        const userObj = JSON.parse(user)
        const depositEndpoint = `http://127.0.0.1:8000/deposit/${userObj.username}`

        if (txnAmount <= 0) {
            alert("Invalid transaction amount entered");
            setTxnAmount('')
            return;
        }

        const body = {
            "amount": txnAmount
        }

        try {
            const response = await fetch(depositEndpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify(body)
            })
            
            if (!response.ok) {
                if(response.status == 404) {
                    console.log("Deposit unsuccessful")
                    setTxnAmount('')
                    return;
                }
            }
            
            const data = await response.json();
            setWallet(data.details.wallet)
            setIsWallet(true)
            setTxnAmount('')
        } catch (e) {
            console.log(e)
        }

        

    }

    const debit = async (e) => {
        const userObj = JSON.parse(user)
        const debitEndpoint = `http://127.0.0.1:8000/debit/${userObj.username}`

        if (txnAmount > wallet.balance) {
            alert("Invalid transaction amount entered");
            setTxnAmount('')
            return;
        }

        const body = {
            "amount": txnAmount
        }

        try {
            const response = await fetch(debitEndpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify(body)
            })
            
            if (!response.ok) {
                if(response.status == 404) {
                    console.log("Deposit unsuccessful")
                    setTxnAmount('')
                    return;
                }
            }
            
            const data = await response.json();
            setWallet(data.details.wallet)
            setIsWallet(true)
            setTxnAmount('')
        } catch (e) {
            console.log(e)
        }

        

    }

    return (
        <div className='wallet-page'>
            <CustomAppBar />
            <div className="greetings">
                <h1>Welcome back, {userName}</h1>
            </div>

            <div className="wallet-container">
                {isWallet && wallet ? <WalletCard wallet={wallet}/> : <Button variant="contained" onClick={createWallet}>Create a wallet</Button>}
            </div>
            {
                isWallet && wallet ? 

                <div className="txn-container">
                <TextField id="outlined-basic" label="Amount" variant="outlined" type="number" className='amount-field' onChange={amountChangeHandler} value={txnAmount}/>
                <div className="txn-btn-container">
                    <Button variant="contained" onClick={deposit}>Cash In</Button>
                    <Button variant="outlined" onClick={debit}>Withdraw</Button>    
                </div>
                </div> : <></>
            }

            
            
        </div>
    )
}
