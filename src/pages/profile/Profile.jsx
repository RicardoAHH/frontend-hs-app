import React, { useState, useEffect } from 'react';
import { logout } from "../../libs/axios/auth";
import { useNavigate } from 'react-router-dom';
import { profile } from "../../libs/axios/profile";
import ProfileInfo from '../../components/ProfileInfo';
import ButtonLink from '../../components/ButtonLink';

export default function Profile({ profileData: initialProfile }) {
    const navigate = useNavigate();
    /* necesitamos este estado local para poder acceder a los datos del usuario q inicia sesion */
    const [profileData, setProfileData] = useState(initialProfile);
    /* Efecto para fetchear el perfil al cargar /profile ,así se garantiza que tras
     login o recarga de página obtienes los datos correctos.*/
    useEffect(() => {
        if (!initialProfile) {
            (async () => {
                try {
                    const { data, status } = await profile();
                    if (status === 200) setProfileData(data);
                } catch (err) {
                    console.error('Error al obtener perfil en Profile.jsx:', err);
                }
            })();
        }
    }, [initialProfile]);

    // Handlers para los botones 
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
    //place hoilders button
    const handleUpdateProfile = () => { };

    const handleListRoles = () => { navigate('/roles'); };
    const handleListServices = () => { navigate('/services'); };

    if (!profileData) return <p className="p-6">Cargando perfil…</p>;
    const handleListUsers = () => {
        navigate('/users');
    };



    return (
        <>
            <div className="min-h-screen bg-gray-100 bg-cover bg-center" style={{
                backgroundImage: "url('/fondo.jpg')"
            }}>
                {/* Navbar */}

                <nav className="bg-[#023866] p-4 text-white flex flex-wrap items-center justify-center md:justify-between gap-3 shadow-md">
                    {/* Botón de Logout a la izquierda */}

                    <button
                        onClick={handleLogout}
                        className="bg-[#2c7ee2] hover:bg-blue-400 cursor-pointer text-white font-semibold py-2 m-auto px-4 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2c7ee2] focus:ring-opacity-75 ml-15"
                    >
                        Cerrar Sesión
                    </button>
                    <div className="font-bold text-xl hidden md:block">
                        Panel de Usuarios
                    </div>
                    <div className='rounded-xl m-auto overflow-hidden mr-20'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyK1XvWE2WeDczhjH9zb6FPq95eyxB3SUA-A&s" alt="funval" className="rounded-xl h-[40px] object-cover" />
                    </div>
                </nav>

                <main className="p-6 flex flex-col md:flex-row m-auto max-w-[900px] gap-15 md:mt-20">
                    {/* PANEL IZQUIERDO PROFILE INFO */}
                    <div className="w-full md:w-1/2">
                        {profileData
                            ? <ProfileInfo profile={profileData} />
                            : <p>Cargando perfil…</p>
                        }
                    </div>
                    {/* PANEL DERECHO LISTA DE BOTONES */}
                    <div className="w-full md:w-1/2 mt-6 md:mt-0 h-auto">
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