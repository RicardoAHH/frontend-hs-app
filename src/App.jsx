import { useState } from 'react'
import { Route, Routes } from "react-router";
import Login from './pages/login/Login';
import Home from "./pages/Home/Home";
import Profile from './pages/profile/Profile';
import Actualizar from './pages/profile/actualizar-perfil/Actualizar';


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users/:id/edit" element={<Actualizar />} />
      </Routes>
    </>
  )
}

export default App
