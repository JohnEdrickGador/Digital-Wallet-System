import React, {useEffect, useState} from "react"
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom"
import Authentication from "./pages/Authentication"
import Wallet from "./pages/Wallet"

function App() {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
        console.log("App > Wallet")
        setAuthenticated(true);
    } else {
        setAuthenticated(false)
    }
  }, [])

  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Authentication/>} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/wallet" element = {<Wallet />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
