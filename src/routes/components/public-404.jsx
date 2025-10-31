import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Public404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-8xl font-bold text-gray-800 m-0">404</h1>
        <h2 className="text-2xl text-gray-600 mt-4">Página no encontrada</h2>
        <p className="text-gray-500 mt-4 text-base">
          Lo sentimos, la página que buscas no existe.
        </p>
        <p className="text-gray-400 mt-2 text-sm">
          Serás redirigido al inicio en 3 segundos...
        </p>
        <button
          onClick={() => navigate("/")}
          className="hover:cursor-pointer mt-8 px-8 py-3 bg-blue-500 text-white rounded-lg text-base font-medium transition-colors duration-200 hover:bg-blue-600"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default Public404;
