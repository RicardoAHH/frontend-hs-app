import React from 'react';
import { useEffect } from 'react';


export default function ProfileInfo({ profile }) {
  if (!profile) return null; // No renderizar nada si aún no hay datos

  //se agrega el useEffect para guardar el id del usuario en localStorage cambio realizado por gino
   useEffect(() => {
    if (profile?.id) {
      localStorage.setItem('userId', profile.id);
    }
  }, [profile]);

//hasta aquí se agrega el useEffect para guardar el id del usuario en localStorage cambio realizado por gino

 const { full_name, email, student } = profile;

  const country    = student?.country    ?? null;
  const controller = student?.controller ?? null;
  const recruiter  = student?.recruiter  ?? null;


  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto flex flex-col items-center">
      {/* Imagen de perfil placeholder */}
      <img
        src="https://www.estudiantefunval.org/theme/image.php/moove/core/1729720886/u/f1"
        alt="Avatar placeholder"
        className="w-32 h-32 rounded-full mb-4"
      />

      {/* Nombre completo */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {full_name}
      </h2>

      {/* Email */}
      <p className="text-gray-600 mb-4">
        {email}
      </p>

      {/* Solo si es estudiante: mostrar país, controlador y reclutador */}
      {student && (
        <div className="w-full space-y-2 text-gray-700">
          {student.country && (
            <p>
              <span className="font-medium">País:</span> {country.name}
            </p>
          )}

          {student.controller && (
            <p>
              <span className="font-medium">Controlador:</span> {controller.full_name}
            </p>
          )}

          {student.recruiter && (
            <p>
              <span className="font-medium">Reclutador:</span> {recruiter.full_name}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
