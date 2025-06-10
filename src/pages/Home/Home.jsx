import { Link } from "react-router";


function Home() {
    return (
        <div className="bg-gray-100 h-screen">
            {/* Navbar */}
            <nav className="bg-blue-500 p-4 text-white flex items-center justify-between">
                <div className="font-bold text-xl">Funval Home</div> {/* Reemplaza "Funval Home" con el nombre de tu app */}
                <div>
                    <Link
                        to="/login" // <-- This is the path to your login page
                        className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                    >
                        Login
                    </Link>
                </div>
            </nav>

            {/* Contenido principal */}
            <main className="container mx-auto py-6">
                <h1 className="text-3xl font-bold mb-4">Bienvenido a Funval</h1>
                <p className="text-gray-700">
                    Este es un ejemplo de página de inicio. Puedes agregar más contenido aquí.
                </p>
            </main>
        </div>
    );
}

export default Home;