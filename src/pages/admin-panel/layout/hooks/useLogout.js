import { useNavigate } from "react-router-dom";

/**
 * Hook personalizado para manejar cierre de sesión
 *
 * Limpia el token del localStorage y redirige al login
 */
export function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    // Eliminar token del localStorage
    localStorage.removeItem("access_token");

    console.log("🔐 Sesión cerrada");

    // Redirigir al login
    navigate("/login", { replace: true });
  };

  return { logout };
}
