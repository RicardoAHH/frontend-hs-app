import React from 'react';

export default function ServiceActionMenu({
  role,           // nombre del rol ('Student' o 'Admin')
  onReport,       // función para «reportar horas»
  onList,         // función para «listar horas»
  onEvidence,     // función para «ver evidencias»
  onApproval      // función para «aprobar/rechazar» (solo Admin)
}) {
  const isAdmin   = role === 'Admin';    
  const isStudent = role === 'Student'; 

  // Clase común para los botones
  const btnClass =
    'w-full text-center bg-[#2c7ee2] hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-lg mb-2 transition-all duration-300 ease-in-out';

  return (
    <div className="space-y-2 p-4 bg-white rounded shadow max-w-xs mx-auto ">
      {/* Para STUDENT: siempre puede reportar y listar sus propias horas */}
      {isStudent && (
        <>
          <button onClick={onReport}   className={btnClass}>Reportar horas</button>
          <button onClick={onList}     className={btnClass}>Mis horas</button>
          <button onClick={onEvidence} className={btnClass}>Ver mis evidencias</button>
        </>
      )}

      {/* Para ADMIN: listar TODO, ver evidencias y aprobar/rechazar */}
      {isAdmin && (
        <>
          <button onClick={onList}     className={btnClass}>Listar todas las horas</button>
          <button onClick={onEvidence} className={btnClass}>Ver evidencias</button>
          <button onClick={onApproval} className={btnClass}>Aprobar / Rechazar</button>
        </>
      )}
    </div>
  );
}
