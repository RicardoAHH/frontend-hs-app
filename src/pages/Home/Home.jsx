import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      {/* Navbar */}
      <nav className="p-2 text-white flex items-center justify-between">
        <div>
          <img
            src="https://www.estudiantefunval.org/pluginfile.php/1/theme_moove/logo/1729720886/logo%202023.png"
            alt="Funval logo"
            className="w-[130px] md:w-[200px] mt-2"
          />
        </div>
        <div>
          <button
            onClick={() => navigate("/login")}
            className="mr-5 bg-[#2c7ee2] hover:bg-[#023866] transition-colors text-white font-bold py-1 px-4 md:py-3 md:px-12 rounded-lg cursor-pointer"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="mx-auto p-6 md:pt-0 ">
        <h1 className=" pl-1 w-full text-4xl font-bold mt-5 md:mt-0">Bienvenido a Funval</h1>
        <div className="overflow-hidden h-[300px] md:h-[420px] mt-20 md:mt-5 m-auto md:w-[100%] m-auto ">
          <img
            className="h-[350px] md:h-[500px] w-[100%] object-cover"
            src="/banner.gif"
            alt="banner"
          />
        </div>
      </main>
      <footer className=" mt-10 md:mt-0 ">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between text-sm">
          <p className="mb-2 md:mb-0 text-gray-300">
            &copy; 2025. Desarrollado por{' '}
            <a href="https://ginorojo.github.io/wdd231/proyect/index.html" target="_blank" rel="noopener noreferrer" className="text-gray-300">Gino</a> -{' '}
            <a href="https://eldersound.github.io/proyecto-1/" target="_blank" rel="noopener noreferrer" className="text-gray-300 ">Elder</a> -{' '}
            <a href="https://github.com/RicardoAHH" target="_blank" rel="noopener noreferrer" className="text-gray-300 ">Ricardo</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
