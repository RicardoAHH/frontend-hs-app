import React, { useState, useEffect } from "react";
import instance from "../../libs/axios";
import { useNavigate } from "react-router-dom";

export default function ServiceList({ role }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // traer las horas según rol
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // construimos la URL dependiendo del rol: si es Student, filtramos por usuario; si Admin, traemos todas
        const url =
          role === "Student"
            ? "api/v1/services?user=me" // interpreta 'me' como tu usuario
            : "api/v1/services"; // si el role no es estudiante entonces=>Admin ve todas
        const { data, status } = await instance.get(url);
        if (status === 200) {
          setServices(data);
        } else {
          setError(`respuesta: ${status}`);
        }
      } catch (err) {
        console.error("Error cargando servicios:", err);
        setError("No se pudieron cargar los servicios.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [role]);

  // handlers para ver detalle o evidencias
  const handleView = (id) => {
    navigate(`/services/evidence/${id}`);
  };

  if (loading) return <p className="p-6">Cargando horas de servicio…</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="h-100 overflow-y-auto space-y-4 p-2">
      {services.length === 0 ? (
        <p className="text-gray-600">No hay registros.</p>
      ) : (
        services.map((svc) => (
          <div
            key={svc.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            {/* mostramos datos  */}
            <div>
              <p>
                <span className="font-medium">Fecha:</span>{" "}
                {new Date(svc.created_at).toLocaleDateString()}
                

              </p>
              <p>
                <span className="font-medium">Horas:</span>{" "}
                {svc.amount_reported}
              </p>

              <p className="font-medium flex items-center gap-2">
                Estado:
                <span
                  className={`px-2 py-1 rounded text-white text-sm font-semibold
                    ${
                        svc.status === "Approved"
                        ? "bg-green-500"
                        : svc.status === "Rejected"
                        ? "bg-red-500"
                        : svc.status === "Pending"
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-400"
                    }
                    `}
                >
                  {svc.status}
                </span>
              </p>
            </div>
            {/* botón para ver evidencias */}
            <button
              onClick={() => handleView(svc.id)}
              className="bg-[#2c7ee2] text-white px-3 py-1 rounded hover:bg-blue-400 cursor-pointer"
            >
              Ver Evidencia
            </button>
          </div>
        ))
      )}
    </div>
  );
}
