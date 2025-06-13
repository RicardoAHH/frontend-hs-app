import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../libs/axios';

export default function ServiceApprovalPanel() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [feedbackType, setFeedbackType] = useState('success'); 

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

  const handleDecision = async (id, action, req) => {
    try {
      const endpoint = `api/v1/review/${id}`;
      const payload = {
        status: action === 'approve' ? 1 : 2,
        comment: action === 'approve' ? 'Aprobado por el administrador' : 'Rechazado por el administrador',
        amount_approved: action === 'approve' ? req.amount_reported : 0
      };

      const { status } = await instance.patch(endpoint, payload);

      if (status === 200) {
        setRequests(prev => prev.filter(r => r.id !== id));
        setFeedbackMessage(
          `Solicitud ${action === 'approve' ? 'aprobada' : 'rechazada'} correctamente.`
        );
        setFeedbackType(action === 'approve' ? 'success' : 'error'); 
        setTimeout(() => setFeedbackMessage(null), 3000);
      } else {
        alert(`Error al ${action}: status ${status}`);
      }
    } catch (err) {
      console.error(`Error al ${action} solicitud:`, err);
      alert(`No se pudo ${action}.`);
    }
  };

  if (loading) return <p className="p-6">Cargando solicitudes pendientes…</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="h-100 overflow-y-auto space-y-4 p-2">
      <h2 className="text-xl font-semibold">Aprobación de Horas de Servicio</h2>

      {feedbackMessage && (
        <div
          className={`px-4 py-2 rounded border ${
            feedbackType === 'success'
              ? 'bg-green-100 text-green-700 border-green-300'
              : 'bg-red-100 text-red-700 border-red-300'
          }`}
        >
          {feedbackMessage}
        </div>
      )}

      {requests.length === 0 ? (
        <p className="text-gray-600">No hay solicitudes pendientes.</p>
      ) : (
        requests.map(req => (
          <div
            key={req.id}
            className="bg-white p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="space-y-1">
              <p><span className="font-medium">Usuario:</span> {req.user.full_name}</p>
              <p><span className="font-medium">Fecha:</span> {new Date(req.created_at).toLocaleDateString()}</p>
              <p><span className="font-medium">Horas:</span> {req.amount_reported}</p>
              <p><span className="font-medium">Estado:</span> {req.status}</p>
              <button
                onClick={() => navigate(`/services/evidence/${req.id}`)}
                className="text-[#2c7ee2] underline cursor-pointer"
              >
                Ver evidencia
              </button>
            </div>

            <div className="mt-4 md:mt-0 flex space-x-2">
              <button
                onClick={() => handleDecision(req.id, 'approve', req)}
                className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Aprobar
              </button>
              <button
                onClick={() => handleDecision(req.id, 'reject', req)}
                className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded"
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
