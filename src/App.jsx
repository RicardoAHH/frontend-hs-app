import { useState } from 'react'
import { Route, Routes } from "react-router";
import Login from './pages/login/Login';
import Home from "./pages/Home/Home";
import Profile from './pages/profile/Profile';


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
