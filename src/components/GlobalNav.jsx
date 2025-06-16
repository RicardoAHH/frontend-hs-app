import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { profile } from '../libs/axios/profile';

export default function GlobalNav() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data, status } = await profile();
                if (status === 200) setProfileData(data);
            } catch (err) {

                console.error('Error cargando perfil:', err);
            }
        };
        fetchProfile();
    }, []);


    if (!profileData) return null
    const role = profileData.role.name;
    const firstName = profileData.f_name
    const handleGoBack = () => {
        navigate('/profile');
    };
    return (

        <nav className="bg-[#023866] p-2 text-white flex flex-wrap items-center justify-center md:justify-between gap-3 shadow-md">


            <button
                onClick={handleGoBack}
                className="bg-[#2c7ee2] hover:bg-blue-400 cursor-pointer text-white font-semibold py-2 m-auto px-4 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2c7ee2] focus:ring-opacity-75 ml-15"
            >
                &larr; Regresar a Perfil
            </button>
            <div className="font-semibold m-auto text-md hidden md:block">
                <h2>Bienvenido<span className='ml-2'>{role}</span>
                    <span className='ml-2'>{firstName}</span>
                </h2>
            </div>
            <div className='rounded-xl m-auto overflow-hidden mr-20'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyK1XvWE2WeDczhjH9zb6FPq95eyxB3SUA-A&s" alt="funval" className="rounded-xl h-[40px] object-cover" />
            </div>
        </nav>
    )
}
