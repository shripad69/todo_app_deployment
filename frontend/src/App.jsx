import "tailwindcss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login'
import Home from './pages/home'
import Signup from './pages/signup'
import { useState, useEffect } from "react";

function App() {

  const [isLogin, setIsLogin] = useState(() => !!localStorage.getItem('token'))

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLogin(!!token)
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={isLogin ? <Home /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
