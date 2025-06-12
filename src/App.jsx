import { useState } from 'react'
import { Route, Routes } from "react-router";
import Login from './pages/login/Login';
import Home from "./pages/Home/Home";
import Profile from './pages/profile/Profile';
import Actualizar from './pages/profile/actualizar-perfil/Actualizar';
import Usuarios from './pages/usuarios/Usuarios';
import UserDetailCard from './pages/Usuarios/UserDetailCard/UserDetailCard';
import Crearusuario from './pages/Usuarios/Crearusuario';
import Cambioclave from './pages/profile/actualizar-perfil/Cambioclave';


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users/:id/edit" element={<Actualizar />} />
        <Route path="/users" element={<Usuarios />} />
        <Route path="/users/:id" element={<UserDetailCard />} />
        <Route path='/users/create' element={<Crearusuario />} />
        <Route path='/users/cambiar-contraseña' element={<Cambioclave />} />

      </Routes>
    </>
  )
}

export default App
