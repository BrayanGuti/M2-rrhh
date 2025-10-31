import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../../pages/admin-panel/utils/jwt";

const Admin404 = () => {
  const navigate = useNavigate();
  const user = getUserFromToken();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 font-sans">
      <div className="text-center p-8 max-w-xl bg-white rounded-2xl shadow-md">
        <div className="text-[5rem] mb-4">🔍</div>

        <h1 className="text-6xl font-bold text-gray-800 m-0">404</h1>
        <h2 className="text-2xl text-gray-600 mt-4">Página no encontrada</h2>

        <p className="text-gray-500 mt-4 text-base leading-relaxed">
          Hola <strong>{user?.name || "Usuario"}</strong>, la página que buscas
          no existe en el panel de administración.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/admin")}
            className="hover:cursor-pointer px-8 py-3 bg-blue-500 text-white rounded-lg text-base font-medium transition-colors duration-200 hover:bg-blue-600"
          >
            🏠 Ir al Panel Principal
          </button>

          <button
            onClick={() => navigate(-1)}
            className="hover:cursor-pointer px-8 py-3 bg-gray-500 text-white rounded-lg text-base font-medium transition-colors duration-200 hover:bg-gray-600"
          >
            ← Volver atrás
          </button>
        </div>

        {user?.roleName && (
          <p className="mt-8 text-sm text-gray-400">
            Rol actual: <strong>{user.roleName}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default Admin404;
