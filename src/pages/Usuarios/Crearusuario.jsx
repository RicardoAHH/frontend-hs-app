import GlobalNav from "../../components/GlobalNav";
import { createUsers } from "../../libs/axios/createUser";
import { useState, useEffect } from "react";

const Crearusuario = () => {
  const [formData, setFormData] = useState({
    f_name: "",
    s_name: "",
    f_lastname: "",
    s_lastname: "",
    email: "",
    password: "",
    role_id: "1", // string para consistencia
    controller_id: "2",
    country_id: "4",
    recruiter_id: "3",
    schools: ["3"],
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Ajuste cleanFormData para no borrar recruiter_id cuando role_id sea 4, pero si rol 1 y 2,3 sí
  const cleanFormData = (data) => {
    const cleaned = { ...data };
    cleaned.role_id = Number(data.role_id);
    cleaned.controller_id = Number(data.controller_id);
    cleaned.country_id = Number(data.country_id);
    cleaned.recruiter_id = Number(data.recruiter_id);
    cleaned.schools = data.schools.map(Number); // Convertir cada elemento de schools a número

    const role = parseInt(data.role_id, 10);
    if (role === 1) {
      delete cleaned.controller_id;
      delete cleaned.recruiter_id;
      delete cleaned.country_id;
      delete cleaned.schools;
    } else if (role === 2 || role === 3) {
      delete cleaned.controller_id;
      // recruiter_id se elimina para que no se envíe cuando no es estudiante
      delete cleaned.recruiter_id;
    }
    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanedData = cleanFormData(formData);
      console.log("Datos enviados al backend:", cleanedData);
      const response = await createUsers(cleanedData);
      if (response.status === 201) {
        setMessage("Usuario creado exitosamente.");
        setFormData({
          f_name: "",
          s_name: "",
          f_lastname: "",
          s_lastname: "",
          email: "",
          password: "",
          role_id: "4",
          controller_id: "2",
          country_id: "4",
          recruiter_id: "3",
          schools: ["3"],
        });
      }
    } catch (error) {
      setMessage("Error al crear el usuario.");
    }
  };

  return (
    <>
    <GlobalNav/>
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Crear Usuario</h1>
       {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="f_name"
          placeholder="Primer Nombre"
          value={formData.f_name}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="s_name"
          placeholder="Segundo Nombre"
          value={formData.s_name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="f_lastname"
          placeholder="Primer Apellido"
          value={formData.f_lastname}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="s_lastname"
          placeholder="Segundo Apellido"
          value={formData.s_lastname}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        <select
          name="role_id"
          value={formData.role_id}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="3">Reclutador</option>
          <option value="2">Controlador</option>
          <option value="1">Administrador</option>
          <option value="4">Estudiante</option>
        </select>

        {/* Mostrar recruiter_id SOLO para estudiantes */}
        {formData.role_id === "4" && (
          <div className="border p-3 rounded-lg">
            <label htmlFor="recruiter_id" className="block font-semibold mb-2">
              Reclutador:
            </label>
            <select
              id="recruiter_id"
              name="recruiter_id"
              value={formData.recruiter_id}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="3">Stuart Kristoffers Feiles Herzog</option>
            </select>
          </div>
        )}

        {/* Mostrar controller_id solo para estudiantes */}
        {formData.role_id === "4" && (
          <select
            name="controller_id"
            value={formData.controller_id}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="5">Marisa Luigi Connelly Kuphal</option>
            <option value="18">Pedro Pablo</option>
          </select>
        )}

        {/* Escuelas para roles reclutador y controlador */}
        {(formData.role_id === "3" || formData.role_id === "2") && (
          <div className="border p-3 rounded-lg">
            <label className="block font-semibold mb-2">Escuelas:</label>
            {[
              "Software",
              "Inglés",
              "Matemáticas",
              "Redes",
              "Marketing Digital",
            ].map((school, index) => {
              const value = (index + 1).toString();
              return (
                <label key={value} className="block">
                  <input
                    type="checkbox"
                    value={value}
                    checked={formData.schools.includes(value)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFormData((prevData) => {
                        let newSchools = [...prevData.schools];
                        if (checked) {
                          newSchools.push(value);
                        } else {
                          newSchools = newSchools.filter((v) => v !== value);
                        }
                        return { ...prevData, schools: newSchools };
                      });
                    }}
                    className="mr-2"
                  />
                  {school}
                </label>
              );
            })}
          </div>
        )}

        {/* Escuela para estudiantes */}
        {formData.role_id === "4" && (
          <div className="border p-3 rounded-lg">
            <label className="block font-semibold mb-2">Escuela:</label>
            <select
              name="schools"
              value={formData.schools[0] || ""}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  schools: [e.target.value],
                }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Seleccione una escuela</option>
              <option value="1">Software</option>
              <option value="2">Inglés</option>
              <option value="3">Matemáticas</option>
              <option value="4">Redes</option>
              <option value="5">Marketing Digital</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Crear Usuario
        </button>
      </form>
     
    </div>
    </>
  );
};

export default Crearusuario;
