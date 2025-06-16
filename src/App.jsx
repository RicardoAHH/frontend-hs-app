import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import Login from './pages/login/Login';
import Home from "./pages/Home/Home";
import Profile from './pages/profile/Profile';
import Actualizar from './pages/profile/actualizar-perfil/Actualizar';
import Usuarios from './pages/Usuarios/Usuarios';
import ServicesPage from './pages/services/ServicesPage';
import { profile } from './libs/axios/profile';
import { useNavigate } from 'react-router-dom'; 
import UserDetailCard from './pages/Usuarios/UserDetailCard/UserDetailCard';
import Crearusuario from './pages/Usuarios/Crearusuario';
import Cambioclave from './pages/profile/actualizar-perfil/Cambioclave';



function App() {

  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, status } = await profile();
        if (status === 200) setProfileData(data);
      } catch (err) {
         Si es 401, redirigimos a login
       if (err.response?.status === 401) {
         return navigate('/login');              
       }
       console.error('Error cargando perfil en App:', err);
      }
    };
    fetchProfile();
  }, [navigate]);


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/profile"
          element={
            <Profile
              profileData={useLocation().state?.profile ?? profileData}
            />
          }
        />
        <Route path="/users/:id/edit" element={<Actualizar />} />

        <Route path="/services/*" element={<ServicesPage profileData={profileData} />} />
        <Route path="/users" element={<Usuarios />} />
        <Route path="/users/:id" element={<UserDetailCard />} />
        <Route path='/users/create' element={<Crearusuario />} />
        <Route path='/users/cambiar-contraseña' element={<Cambioclave />} />

      </Routes>
    </>
  )
}

export default App
