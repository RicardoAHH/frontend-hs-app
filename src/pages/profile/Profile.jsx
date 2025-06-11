import React, { useState, useEffect } from 'react';
import { logout } from "../../libs/axios/auth";
import { useNavigate } from 'react-router';
import { profile } from "../../libs/axios/profile";
import { getUsers } from "../../libs/axios/users";
import ProfileInfo from '../../components/ProfileInfo';
import ButtonLink from '../../components/ButtonLink';

export default function Profile() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data, status } = await profile();
                if (status === 200) {
                    setProfileData(data);
                } else {
                    console.warn(`Perfil cargado, pero status no es 200: ${status}`);
                }
            } catch (err) {
                console.error('Error al obtener perfil:', err);
            }
        };
        fetchProfile();
    }, []);


    const handleLogout = async () => {
        try {
            const { status } = await logout();
            if (status === 200) {
                // Si el logout es exitoso, redirige al usuario a la página de inicio o login
                navigate('/');
                console.log('Sesión cerrada exitosamente.');
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            alert('Hubo un problema al cerrar la sesión.'); // Muestra un mensaje al usuario
        }
    };

    // Handlers para los botones del panel derecho (placeholders)
    const handleUpdateProfile = () => { };
    const handleListUsers = () => { };
    const handleListRoles = () => { };
    const handleListServices = () => { };


    return (
<<<<<<< HEAD
        <div className="min-h-screen bg-gray-100">

            <nav className="bg-[#023866] p-4 text-white flex items-center justify-between shadow-md">

                <button
                    onClick={handleLogout}
                    className="bg-[#2c7ee2] hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2c7ee2] focus:ring-opacity-75"
                >
                    Cerrar Sesión
                </button>


                <div className="font-bold text-xl">
                    Panel de Usuarios
                </div>
            </nav>
=======
        <>
            <div className="min-h-screen bg-gray-100">
                {/* Navbar */}
                <nav className="bg-[#023866] p-4 text-white flex items-center justify-between shadow-md">
                    {/* Botón de Logout a la izquierda */}
                    <button
                        onClick={handleLogout}
                        className="bg-[#2c7ee2] hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2c7ee2] focus:ring-opacity-75"
                    >
                        Cerrar Sesión
                    </button>

                    {/* Título de la página o nombre de la aplicación */}
                    <div className="font-bold text-xl">
                        Panel de Usuarios
                    </div>

                    {/* Este espacio puede quedar vacío o usarse para otro elemento a la derecha si lo necesitas */}
                    <div></div>
                </nav>
>>>>>>> cf58c828253a3e648a2e3654ac2d74b7712816ac

                <main className="p-6 flex flex-col md:flex-row">
                    {/* PANEL IZQUIERDO PROFILE INFO */}
                    <div className="w-full md:w-2/3">
                        {profileData
                            ? <ProfileInfo profile={profileData} />
                            : <p>Cargando perfil…</p>
                        }
                    </div>
                    {/* PANEL DERECHO LISTA DE BOTONES */}
                     <div className="w-full md:w-1/3 mt-6 md:mt-0 h-auto">
                       <ButtonLink
                           role={profileData?.role?.name}        
                           onUpdateProfile={handleUpdateProfile}
                            onListUsers={handleListUsers}
                           onListRoles={handleListRoles}
                           onListServices={handleListServices}
                      />
                   </div>
                </main>
            </div>

        </>
    );
}