import { useNavigate } from 'react-router-dom';
import { login } from '../../libs/axios/auth';
import { profile } from "../../libs/axios/profile";



export default function Login() {
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target);
            const body = Object.fromEntries(formData.entries())
            const { data, status } = await login(body)
            console.table({ data, status })

            if (status === 200) {
                const { data: me, status: s2 } = await profile();
                if (s2 === 200) {
                    navigate('/profile', { state: { profile: me } });
                    return;
                }
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center" style={{
            backgroundImage: "url('/Cal.gif')"
        }}>
            <div className="w-full max-w-md bg-gradient-to-b from-white/100 to-white/50  rounded-lg shadow-xl p-8 sm:p-10">
                {/* Espacio para el Logo de Funval */}
                <div className="flex justify-center mb-8">
                    {/* Puedes reemplazar este div con una etiqueta <img> si tienes el logo en un archivo.
                        Ajusta el 'alt', 'src' y las clases 'w-32 h-32' según el tamaño de tu logo.
                    */}
                    <div className="w-32 h-32 bg-[#000000] rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyK1XvWE2WeDczhjH9zb6FPq95eyxB3SUA-A&s" alt="funval" className="rounded-xl w-[95%]" />
                    </div>
                </div>

                <h2 className="text-3xl font-extrabold text-center text-[#023866] mb-6">
                    Inicia Sesión
                </h2>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
                            Correo electrónico
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c7ee2] bg-white/15 text-gray-500 placeholder-gray-500"
                            type="email"
                            name='email'
                            id="email"
                            placeholder="tu_correo@ejemplo.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c7ee2] bg-white/15 text-gray-500 placeholder-gray-500"
                            type="password"
                            id="password"
                            name='password'
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#023866] hover:bg-[#2c7ee2] hover:bg-opacity-90 text-[#ffffff] font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2c7ee2] focus:ring-opacity-75"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600 text-sm">
                    ¿No tienes una cuenta? {' '}
                    <a href="#" className="text-[#2c7ee2] hover:underline font-medium">
                        Regístrate aquí
                    </a>
                </p>
            </div>
        </div>
    );
}
