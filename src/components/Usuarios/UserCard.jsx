import React from 'react';

export default function UserCard({ user, onView, onEdit, onDelete }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-4
                        bg-[#ffffff] border border-gray-200 rounded-lg shadow-md
                        transition-all duration-200 ease-in-out hover:shadow-lg">
            <div className="flex-grow text-[#023866] mb-4 md:mb-0 md:mr-6 text-center md:text-left">
                <p className="text-sm text-gray-600">ID: <span className="font-semibold">{user.id}</span></p>
                <p className="text-sm text-gray-600">Rol: <span className="font-semibold">{user.role.name}</span></p>
                <p className="text-xl font-bold">{user.full_name}</p>
                <p className="text-gray-700 text-sm">{user.email}</p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-2">
                <button
                    onClick={() => onView(user.id)}
                    className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-md
                               hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400
                               transition-colors"
                >
                    Ver
                </button>
                <button
                    onClick={() => onEdit(user.id)}
                    className="px-4 py-2 text-sm bg-[#2c7ee2] text-[#ffffff] rounded-md
                               hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#2c7ee2]
                               transition-colors"
                >
                    Editar
                </button>
                <button
                    onClick={() => onDelete(user.id)}
                    className="px-4 py-2 text-sm bg-red-500 text-[#ffffff] rounded-md
                               hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400
                               transition-colors"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}