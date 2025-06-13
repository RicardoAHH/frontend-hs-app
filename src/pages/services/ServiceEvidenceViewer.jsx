import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // ① para leer el parámetro :id y navegar
import instance from '../../libs/axios';                    // ② tu cliente axios con baseURL 'https://.../crelape.com/'

export default function ServiceEvidenceViewer() {
  const { id } = useParams();    // ③ extraemos el id de la URL (/services/evidence/:id)
  const navigate = useNavigate(); 
  const [evidenceUrl, setEvidenceUrl] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        // ④ traemos el detalle del servicio concreto
        const { data, status } = await instance.get(`api/v1/services/${id}`);
        if (status === 200) {
          // ⑤ tu API devuelve data.evidence como URL string
          setEvidenceUrl(data.evidence);
        } else {
          setError(`Error inesperado: status ${status}`);
        }
      } catch (err) {
        setError('No se pudo cargar la evidencia.');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // ⑥ Renderizado según estado
  if (loading) return <p className="p-6">Cargando evidencia…</p>;
  if (error)   return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Evidencia del Servicio #{id}</h2>

      {evidenceUrl ? (
        // ⑦ si es imagen la mostramos, si no ofrecemos descargar
        evidenceUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
          <img
            src={evidenceUrl}
            alt={`Evidencia ${id}`}
            className="w-full h-auto rounded"
          />
        ) : (
          <a
            href={evidenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Abrir evidencia (PDF/otro)
          </a>
        )
      ) : (
        <p className="text-gray-600">No hay evidencia asociada.</p>
      )}

      {/* ⑧ botón para volver al listado */}
      <button
        onClick={() => navigate('/services/list')}
        className="mt-6 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
      >
        Volver a listado
      </button>
    </div>
  );
}
