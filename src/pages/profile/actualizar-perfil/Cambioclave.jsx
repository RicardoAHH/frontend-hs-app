import { cambioContraseña } from "../../../libs/axios/contraseña";
import { useState } from "react";

export default function Cambioclave() {
  const [cambioclave, setCambioclave] = useState({
    old_password: "",
    new_password: "",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCambioclave({
      ...cambioclave,
      [e.target.name]: e.target.value,
    });
    setError(null); // Limpia el error al escribir
    setMessage(null); // Limpia mensaje de éxito
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple de campos vacíos
    if (!cambioclave.old_password || !cambioclave.new_password) {
      setError("Por favor, completa ambos campos.");
      return;
    }

    try {
      const response = await cambioContraseña(cambioclave);

      if (response.status === 200 || response.status === 201) {
        setMessage("Contraseña actualizada exitosamente.");
        setCambioclave({ old_password: "", new_password: "" });
      } else {
        setError("No se pudo actualizar la contraseña.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Error al actualizar la contraseña.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center pt-10 items-center">
      <h2 className="text-2xl font-semibold">Cambiar contraseña</h2>
      <form onSubmit={handleSubmit} className="w-[80%] md:w-[50%] space-y-4">
        <input
          type="password"
          name="old_password"
          placeholder="Contraseña antigua"
          value={cambioclave.old_password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="password"
          name="new_password"
          placeholder="Nueva contraseña"
          value={cambioclave.new_password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="cursor-pointer w-full py-2 px-4 bg-[#2c7ee2] hover:bg-[#5991d5] text-white font-semibold rounded-md transition-colors"
        >
          Actualizar contraseña
        </button>
      </form>

      {/* Mensajes de error o éxito */}
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
    </div>
  );
}
