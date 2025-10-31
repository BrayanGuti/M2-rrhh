import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../../pages/admin-panel/utils/jwt"; // Ajusta la ruta
import Admin404 from "./admin-404";
import Public404 from "./public-404";

/**
 * Componente que maneja todas las rutas no encontradas
 * Redirige según el estado de autenticación
 */
const NotFound = () => {
  const hasValidToken = !isTokenExpired();
  console.log("Token válido:", hasValidToken);

  if (hasValidToken) {
    return <Admin404 />;
  }

  return <Public404 />;
};

export default NotFound;
