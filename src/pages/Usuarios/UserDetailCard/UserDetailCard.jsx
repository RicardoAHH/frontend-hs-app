import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getUserInfo } from '../../../libs/axios/users';
import { useNavigate } from 'react-router'

export default function UserDetailPage() {
    const { id } = useParams(); // Obtiene el ID de la URL
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) {
                setError("ID de usuario no proporcionado en la URL.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const { data, status } = await getUserInfo(id); // Llama a tu API con el ID de la URL

                if (status === 200) {
                    setUser(data);
                } else {
                    console.warn(`Petición exitosa, pero status no es 200: ${status}`);
                    setError('Ocurrió un problema al cargar el usuario.');
                }
            } catch (err) {
                console.error("Error al obtener el usuario:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleGoBack = () => {
        navigate('/users');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
                <p className="text-center text-gray-600 text-lg">Cargando detalles del usuario...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#577cbe] p-6 flex flex-col justify-center items-center">
            <button
                onClick={handleGoBack}
                className="mb-6 px-6 py-2 bg-[#023866] text-[#ffffff] font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#023866] focus:ring-opacity-75"
            >
                &larr; Regresar a Usuarios
            </button>
            <div className="bg-[#ffffff] rounded-lg shadow-xl p-6 md:p-8 max-w-lg mx-auto border border-gray-200">
                <h2 className="text-2xl font-bold text-[#023866] mb-6 text-center">Detalles del Usuario</h2>

                <div className="space-y-4 text-gray-700">
                    {/* Full Name */}
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="font-semibold text-gray-800">Nombre Completo:</span>
                        <span>{user.full_name || `${user.f_name} ${user.m_name || ''} ${user.f_lastname} ${user.s_lastname || ''}`}</span>
                    </div>

                    {/* ID */}
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="font-semibold text-gray-800">ID:</span>
                        <span>{user.id}</span>
                    </div>

                    {/* Email */}
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="font-semibold text-gray-800">Email:</span>
                        <span>{user.email}</span>
                    </div>

                    {/* Phone (optional) */}
                    {user.phone && (
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                            <span className="font-semibold text-gray-800">Teléfono:</span>
                            <span>{user.phone}</span>
                        </div>
                    )}

                    {/* Status */}
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="font-semibold text-gray-800">Estado:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'N/A'}
                        </span>
                    </div>

                    {/* Role */}
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-800">Rol:</span>
                        <span>{user.role ? user.role.name : `ID: ${user.role_id}`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}