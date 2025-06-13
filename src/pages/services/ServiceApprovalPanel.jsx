import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../libs/axios'; 

export default function ServiceApprovalPanel() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);       
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //  traemos únicamente las solicitudes pendientes
  useEffect(() => {
    const fetchPending = async () => {
      try {
        setLoading(true);
        const { data, status } = await instance.get('api/v1/services?status=pending');
        if (status === 200) {
          setRequests(data);
        } else {
          setError(`Error inesperado: status ${status}`);
        }
      } catch (err) {
        console.error('Error cargando solicitudes pendientes:', err);
        setError('No se pudieron cargar las solicitudes.');
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  //  aprobar o rechazar
  const handleDecision = async (id, action) => {
    try {
      // POST  'approve' o 'reject'
      const endpoint = `api/v1/services/${id}/${action}`;
      const { status } = await instance.post(endpoint);
      if (status === 200) {
        // eliminar del listado local
        setRequests(prev => prev.filter(req => req.id !== id));
      } else {
        alert(`Error al ${action}: status ${status}`);
      }
    } catch (err) {
      console.error(`Error al ${action} solicitud:`, err);
      alert(`No se pudo ${action}.`);
    }
  };

  if (loading) return <p className="p-6">Cargando solicitudes pendientes…</p>;
  if (error)   return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="h-100 overflow-y-auto space-y-4 p-2">
      <h2 className="text-xl font-semibold">Aprobación de Horas de Servicio</h2>

      {requests.length === 0 ? (
        <p className="text-gray-600">No hay solicitudes pendientes.</p>
      ) : (
        requests.map(req => (
          <div
            key={req.id}
            className="bg-white p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            {/* Detalle básico */}
            <div className="space-y-1">
              <p>
                <span className="font-medium">Usuario:</span> {req.user.full_name}
              </p>
              <p>
                <span className="font-medium">Fecha:</span> {new Date(req.created_at).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Horas:</span> {req.amount_reported}
              </p>
              <p>
                <span className="font-medium">Estado:</span> {req.status}
              </p>
              {/* Link a evidencias */}
              <button
                onClick={() => navigate(`/services/evidence/${req.id}`)}
                className="text-[#2c7ee2] underline"
              >
                Ver evidencia
              </button>
            </div>

            {/* Botones de decisión */}
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button
                onClick={() => handleDecision(req.id, 'approve')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Aprobar
              </button>
              <button
                onClick={() => handleDecision(req.id, 'reject')}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Rechazar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
