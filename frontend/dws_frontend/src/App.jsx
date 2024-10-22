import React, {useEffect, useState} from "react"
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom"
import Authentication from "./pages/Authentication"
import Wallet from "./pages/Wallet"
import { ThemeProvider } from "@emotion/react"
import theme from "./components/Theme"

function App() {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
        setAuthenticated(true);
    } else {
        setAuthenticated(false)
    }
  }, [])

  return(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Authentication/>} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/wallet" element = {<Wallet />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
    
  )
}

export default App
