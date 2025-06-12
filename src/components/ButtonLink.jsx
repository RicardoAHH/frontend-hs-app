// src/components/ButtonLink.jsx
import React from 'react';
import { useNavigate } from 'react-router'; // ← corregido 'react-router' → 'react-router-dom'

export default function ButtonLink({
  role,
  onListUsers,
  onListRoles,
  onListServices,
}) {
  const navigate = useNavigate();
  const isAdmin = role === 'Admin';

  // Obtenemos el ID del usuario desde localStorage cambio realizado por gino
  const userId = localStorage.getItem('userId');

  const btnClass =
    'w-full text-center bg-[#2c7ee2] hover:bg-[#5991d5] text-white font-semibold py-2 px-4 rounded-lg mb-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2c7ee2] focus:ring-opacity-75';

  return (
    <div className="space-y-2 p-4">
      <button
        onClick={() => navigate(`/users/${userId}/edit`)} // se agrega el userId para redirigir al usuario a su perfil cuando se inica sesión
        className={btnClass} 
      >
        Actualizar perfil
      </button>

      {isAdmin && (
        <button onClick={onListUsers} className={btnClass}>
          Listar usuarios
        </button>
      )}

      <button onClick={onListRoles} className={btnClass}>
        Listar roles
      </button>

      <button onClick={onListServices} className={btnClass}>
        Listar servicios
      </button>
    </div>
  );
}
