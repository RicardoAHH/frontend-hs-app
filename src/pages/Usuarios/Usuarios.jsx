import React, { useState, useEffect, useMemo } from 'react';
import UserCard from '../../components/Usuarios/UserCard';
import { getUsers } from '../../libs/axios/users';
import { useNavigate } from 'react-router';
import { deleteUser } from '../../libs/axios/delete';

export default function Usuarios() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState('activo');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const { data, status } = await getUsers();

                if (status === 200) {
                    setUsers(data);
                } else {
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

        let tempUsers = users;
        if (searchTerm) {
            tempUsers = users.filter(user =>
                (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (user.id && user.id.toString().includes(searchTerm))
            );
        }

        if (filterStatus === 'activo') {
            return tempUsers.filter(user => user.status === "activo");
        } else if (filterStatus === 'inactivo') {
            return tempUsers.filter(user => user.status === "inactivo");
        }
        return tempUsers;
    }, [users, searchTerm, filterStatus]);

    const handleToggleActiveInactive = () => {
        setFilterStatus(prevStatus => prevStatus === 'activo' ? 'inactivo' : 'activo');
    };

    const handleView = (id) => {
        navigate(`/users/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/users/${id}/edit`);
    };

    const handleDelete = async (id) => {
        console.log(`Eliminar usuario con ID: ${id}`);
        if (window.confirm(`¿Estás seguro de que quieres eliminar al usuario con ID ${id}?`)) {
        }
        try {
            const { status } = await deleteUser(id);
            if (status === 200) {
                console.log(status)
                alert('Usuario eliminado correctamente.');
            } else {
                console.warn(`Petición exitosa, pero status no es 200: ${status}`);
                alert('Ocurrió un problema al eliminar el usuario.');
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            alert('No se pudo eliminar el usuario. Verifica tu conexión o permisos.');
        }
        // Actualizar la pagina para reflejar el cambio
        window.location.reload();
    };

    const handleAddUser = () => {
        navigate('/users/create');
    };

    const handleGoBack = () => {
        navigate('/profile');
    };

    return (
        <div className="min-h-screen bg-[#023866] p-6">
            <div className="max-w-6xl mx-auto bg-[#ffffff] rounded-lg shadow-xl p-8">
                <button
                    onClick={handleGoBack}
                    className="mb-6 px-6 py-2 bg-[#023866] text-[#ffffff] font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#023866] focus:ring-opacity-75"
                >
                    &larr; Regresar a Perfil
                </button>
                <div className='flex w-[100%] gap-5 justify-center'>
                    <h1 className="text-3xl font-bold text-[#023866] mb-8 text-center">
                        Gestión de Usuarios
                    </h1>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyK1XvWE2WeDczhjH9zb6FPq95eyxB3SUA-A&s" alt="funval" className="rounded-xl h-[40px]" />
                </div>
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
                    <button
                        onClick={handleToggleActiveInactive}
                        className="w-full sm:w-auto px-6 py-2 bg-[#2c7ee2] hover:bg-opacity-90
                                   text-[#ffffff] font-semibold rounded-lg shadow-md
                                   transition-all duration-300 ease-in-out focus:outline-none
                                   focus:ring-2 focus:ring-[#2c7ee2] focus:ring-opacity-75"
                    >
                        Ver usuarios con status: {filterStatus === "activo" ? "inactivo" : "activo"}
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