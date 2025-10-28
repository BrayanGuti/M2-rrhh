import { Navigate } from "react-router-dom";

/**
 * Componente para proteger rutas de administrador
 *
 * Verifica si existe un token de acceso en localStorage.
 * Si no existe, redirige al login.
 *
 * @param {React.ReactNode} children - Componente hijo a renderizar si está autenticado
 */
export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token");

  // Si no hay token, redirigir al login
  if (!token) {
    console.warn("⚠️ Acceso denegado: No hay token en localStorage");
    return <Navigate to="/login" replace />;
  }

  // Si hay token, renderizar el componente hijo
  return children;
}
