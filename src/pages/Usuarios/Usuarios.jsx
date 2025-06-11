import React, { useState, useEffect, useMemo } from 'react';
import UserCard from '../../components/Usuarios/UserCard'; // Asegúrate de que la ruta sea correcta
import { getUsers } from '../../libs/axios/users';

export default function Usuarios() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const { data, status } = await getUsers();

                if (status === 200) {
                    setUsers(data);
                } else {
                    // Manejo si el status no es 200 pero no hay error en el try/catch
                    console.warn(`Petición exitosa, pero status no es 200: ${status}`);
                    setError('Ocurrió un problema al cargar los usuarios.');
                }
            } catch (err) {
                console.error("Error al obtener usuarios:", err);
                setError('No se pudieron cargar los usuarios. Verifica tu conexión o permisos.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        if (!searchTerm) {
            return users;
        }
        return users.filter(user =>
            user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.toString().includes(searchTerm)
        );
    }, [users, searchTerm]);

    const handleView = (id) => {
        console.log(`Ver usuario con ID: ${id}`);
    };

    const handleEdit = (id) => {
        console.log(`Editar usuario con ID: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Eliminar usuario con ID: ${id}`);
        if (window.confirm(`¿Estás seguro de que quieres eliminar al usuario con ID ${id}?`)) {
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        }
    };

    const handleAddUser = () => {
        console.log('Agregar nuevo usuario');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-[#ffffff] rounded-lg shadow-xl p-8">
                <h1 className="text-3xl font-bold text-[#023866] mb-8 text-center">
                    Gestión de Usuarios
                </h1>

                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <input
                        type="text"
                        placeholder="Buscar por ID, nombre o correo..."
                        className="w-full sm:flex-grow px-4 py-2 border border-gray-300 rounded-lg
                                   focus:outline-none focus:ring-2 focus:ring-[#2c7ee2] bg-white
                                   text-gray-900 placeholder-gray-400 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* {users.role.name === 'Admin' && ( */}

                    <button
                        onClick={handleAddUser}
                        className="w-full sm:w-auto px-6 py-2 bg-[#2c7ee2] hover:bg-opacity-90
                                   text-[#ffffff] font-semibold rounded-lg shadow-md
                                   transition-all duration-300 ease-in-out focus:outline-none
                                   focus:ring-2 focus:ring-[#2c7ee2] focus:ring-opacity-75"
                    >
                        + Agregar Usuario
                    </button>
                    {/* )} */}
                </div>

                <div className="space-y-4">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <UserCard
                                key={user.id}
                                role={user}
                                user={user}
                                onView={handleView}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-600 text-lg py-8">
                            No se encontraron usuarios.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}