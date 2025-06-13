import React from 'react';


export default function ButtonLink({
  role,
  onUpdateProfile,
  onListUsers,
  onListRoles,
  onListServices
}) {
  const isAdmin = role === 'Admin';

  const btnClass =
    'w-full text-center bg-[#2c7ee2] hover:bg-[#023866] text-white font-semibold py-2 px-4 rounded-lg mb-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2c7ee2] focus:ring-opacity-75';

  return (
    <div className="space-y-2 p-4 ">
      <button onClick={onUpdateProfile} className={btnClass}>
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
