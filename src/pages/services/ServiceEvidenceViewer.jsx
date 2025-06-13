import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  
import instance from '../../libs/axios';                    

export default function ServiceEvidenceViewer() {
  const { id } = useParams();    
  const navigate = useNavigate(); 
  const [evidenceUrl, setEvidenceUrl] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        setLoading(true);
        
        const url = `${instance.defaults.baseURL}api/v1/evidence/${id}`;
        setEvidenceUrl(url);
      } catch (err) {
        console.error('[Evidence] Error al construir URL →', err);
        setError('No se pudo cargar la evidencia.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvidence();
  }, [id]);

  
  const handleOpenEvidence = async (e) => {      
   e.preventDefault();
   try {
    
     const { status } = await instance.head(`api/v1/evidence/${id}`);
     if (status === 200) {
       window.open(evidenceUrl, '_blank', 'noopener');  
     } else {
       alert('Lo sentimos, no hay evidencia disponible para este servicio.'); 
     }
   } catch (err) {
     
     const code = err.response?.status;
     if (code === 404) {
       alert('No se encontró la evidencia para este servicio.');
     } else {
       alert('No tienes permiso para ver esta evidencia o ocurrió un error.');
     }
   }
 };

  if (loading) return <p className="p-6">Cargando evidencia…</p>;
  if (error)   return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Evidencia del Servicio </h2>

      {evidenceUrl ? (
        
        evidenceUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
          <img
            src={evidenceUrl}
            alt={`Evidencia ${id}`}
            className="w-full h-auto rounded"
          />
        ) : (
         
          <button
            onClick={handleOpenEvidence}
            className="text-blue-600 underline bg-transparent p-0 border-0 cursor-pointer"
          >
            Abrir evidencia (PDF/otro)
          </button>
        )
      ) : (
        <p className="text-gray-600">No hay evidencia asociada.</p>
      )}

      {/* botón para volver al listado */}
      <button
        onClick={() => navigate('/services/list')}
        className="mt-6 mx-4 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 cursor-pointer"
      >
        Volver a listado
      </button>
    </div>
  );
}