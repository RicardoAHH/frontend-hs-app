import { logout } from "../../libs/axios/auth";
import { useNavigate } from 'react-router';

export default function Profile() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const { status } = await logout();
            if (status === 200) {
                // Si el logout es exitoso, redirige al usuario a la página de inicio o login
                navigate('/');
                console.log('Sesión cerrada exitosamente.');
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            alert('Hubo un problema al cerrar la sesión.'); // Muestra un mensaje al usuario
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-[#023866] p-4 text-white flex items-center justify-between shadow-md">
                {/* Botón de Logout a la izquierda */}
                <button
                    onClick={handleLogout}
                    className="bg-[#2c7ee2] hover:bg-opacity-90 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2c7ee2] focus:ring-opacity-75"
                >
                    Cerrar Sesión
                </button>

                {/* Título de la página o nombre de la aplicación */}
                <div className="font-bold text-xl">
                    Panel de Usuarios
                </div>

                {/* Este espacio puede quedar vacío o usarse para otro elemento a la derecha si lo necesitas */}
                <div></div>
            </nav>


        </div>
    );
}