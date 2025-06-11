import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { updateUser, getUser } from "../../../libs/axios/update";

const Actualizar = () => {
  const { id } = useParams(); // Obtén el id de los parámetros de la ruta
  const [formData, setFormData] = useState({
    f_name: "",
    m_name: "",
    f_lastname: "",
    s_lastname: "",
    email: "",
    password: "",
    role_id: 4,
    controller_id: 2,
    country_id: 4,
    recruiter_id: 3,
    schools: [3],
  });
  const [message, setMessage] = useState(null);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser(id);
        setFormData({
          f_name: data.f_name || "",
          m_name: data.m_name || "",
          f_lastname: data.f_lastname || "",
          s_lastname: data.s_lastname || "",
          email: data.email || "",
          role_id: data.role_id || 4,
          role: data.role || { id: 4, name: "Student" },
          controller_id: data.controller_id || 2,
          country_id: data.country_id || 4,
          recruiter_id: data.recruiter_id || 3,
          schools: data.schools || [3],
          phone: data.phone || "",
        });
      } catch (error) {
        setMessage("Error al cargar los datos del usuario.");
      }
    };

    fetchUserData();
  }, [id]);

  // Que el mensaje desaparezca después de 2 segundos
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(id, formData);
      setMessage(res.data.message || "Usuario actualizado con éxito");
    } catch (error) {
      setMessage(error.message || "Error al actualizar el usuario");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md pt-10"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Actualizar Usuario
      </h2>

      <label className="block mb-4">
        <span className="text-gray-700">Primer Nombre:</span>
        <input
          name="f_name"
          value={formData.f_name}
          onChange={handleChange}
          placeholder="First Name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Segundo Nombre:</span>
        <input
          name="m_name"
          value={formData.m_name}
          onChange={handleChange}
          placeholder="Second Name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Primer Apellido:</span>
        <input
          name="f_lastname"
          value={formData.f_lastname}
          onChange={handleChange}
          placeholder="First Lastname"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Segundo Apellido:</span>
        <input
          name="s_lastname"
          value={formData.s_lastname}
          onChange={handleChange}
          placeholder="Second Lastname"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Email:</span>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Role:</span>
        <input
          name="role"
          type="text"
          value={formData.role ? formData.role.name : ""}
          onChange={handleChange}
          placeholder="role"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Telefono:</span>
        <input
          name="phone"
          type="text"
          value={formData.phone || ""}
          onChange={handleChange}
          placeholder="Telefono"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></input>
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Escuela:</span>
        <input
          name="escuela"
          type="text"
          value={
            formData.schools
              ? formData.schools.map((school) => school.name).join(", ")
              : ""
          }
          onChange={handleChange}
          placeholder="role"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
      >
        Actualizar Usuario
      </button>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </form>
  );
};

export default Actualizar;

// {
//     "id": 32,
//     "f_name": "Fleur Wilkins",
//     "m_name": null,
//     "f_lastname": "Kerr",
//     "s_lastname": "Hartman",
//     "email": "qolos@mailinator.com",
//     "phone": null,
//     "status": "activo",
//     "role_id": 4,
//     "full_name": "Fleur Wilkins  Kerr Hartman",
//     "role": {
//         "id": 4,
//         "name": "Student"
//     },
//     "schools": [
//         {
//             "id": 2,
//             "name": "Ingles",
//             "pivot": {
//                 "user_id": 32,
//                 "school_id": 2
//             }
//         }
//     ]
// }
