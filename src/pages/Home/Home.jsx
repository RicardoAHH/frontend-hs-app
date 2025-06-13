import { Link } from "react-router-dom";


function Home() {
    return (
        <div className=" h-screen">
            {/* Navbar */}
            <nav className=" p-2 text-white flex items-center justify-between">
                <div className=""><img src="https://www.estudiantefunval.org/pluginfile.php/1/theme_moove/logo/1729720886/logo%202023.png" alt="Funval logo" className="w-[130px] md:w-[200px] mt-2" /></div>
                <div>
                    <Link

                        to="/login"
                        className=" mr-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 md:py-3  md:px-8 rounded "

                    >
                        Login
                    </Link>
                </div>
            </nav>

            {/* Contenido principal */}
            <main className=" mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Bienvenido a Funval</h1>
                <div className="overflow-hidden h-[300px] md:h-[420px] mt-10 m-auto md:w-[100%]">
                    <img className=" h-[350px] md:h-[500px]  w-[100%] object-cover " src="/banner.gif" alt="banner" />
                </div>
            </main>
        </div>
    );
}

export default Home;