import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../libs/axios';

const categories = [
  {
    "id": 1,
    "name": "Indexacion",
    "description": "Indexacion de nombre en family search"
  },
  {
    "id": 2,
    "name": "Instructor",
    "description": "Instructor de la clase"
  },
  {
    "id": 3,
    "name": "Liderazgo",
    "description": "Servir en el obispado o en la presidencia de la estaca"
  },
  {
    "id": 4,
    "name": "Revision",
    "description": "Revision de registros en family search"
  },
  {
    "id": 5,
    "name": "Asistencia al templo",
    "description": "Asistir al templo y llevar tus propias ordenanzas"
  }
];

export default function ReportServiceForm() {
  const navigate = useNavigate();

  // Estados campos del formulario
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [evidence, setEvidence] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  // Handler de envío, usamos formData porque enviaremos texto y archivos
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!categoryId) {
      setError('Por favor, selecciona una categoría.');
      setLoading(false);
      return;
    }
    if (!evidence) {
      setError('Por favor, selecciona un archivo de evidencia.');
      setLoading(false);
      return;
    }

    // usamos formData porque enviaremos texto y archivos
    const formData = new FormData();
    formData.append('amount_reported', amount);
    formData.append('description', description);
    formData.append('category_id', categoryId);
    if (evidence) {
      formData.append('evidence', evidence);
    }

    try {
      // POST 
      const { status } = await instance.post('api/v1/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (status === 201) {
        navigate('/services/list');
        alert('Servicio reportado exitosamente');
        console.log('Servicio reportado exitosamente');

      } else {
        setError(`Error inesperado: status ${status}`);
      }
    } catch (err) {
      console.error('Error al reportar servicio:', err);
      setError('No se pudo reportar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Reportar Horas de Servicio</h2>

      {/* Horas reportadas */}
      <div>
        <label className="block font-medium">Horas:</label>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        />
      </div>
      {/* CategoryID */}
      <div>
        <label htmlFor="category" className="block font-medium">Categoría:</label>
        <select
          id="category"
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        >
          <option value="">-- Selecciona una categoría --</option> {/* Opción por defecto */}
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Descripción */}
      <div>
        <label className="block font-medium">Descripción:</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        />
      </div>

      {/* Evidencia */}
      <div className=''>
        <label className="block font-medium">Evidencia (imagen/PDF):</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={e => setEvidence(e.target.files[0])}
          className="w-full border-1"
        />
      </div>

      {/* Error */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Botones */}
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#2c7ee2] text-white px-4 py-2 rounded hover:bg-opacity-90"
        >
          {loading ? 'Enviando…' : 'Reportar'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/services')}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

