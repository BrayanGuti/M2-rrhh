// hooks/useAuth.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromToken, isTokenExpired } from "../utils/jwt";

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = getUserFromToken();
    setUser(userData);
    setIsLoading(false);
  }, [navigate]);

  return { user, isLoading, isTokenExpired: isTokenExpired() };
};

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
