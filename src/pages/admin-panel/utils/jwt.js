export const token = localStorage.getItem("access_token");

/**
 * Decodifica un JWT sin verificar la firma
 */
export const decodeJWT = (token) => {
  try {
    if (!token) return null;

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error al decodificar JWT:", error);
    return null;
  }
};

/**
 * Verifica si el JWT ha expirado
 * @returns {boolean} true si expiró, false si aún es válido
 */
export const isTokenExpired = () => {
  const token = localStorage.getItem("access_token");

  if (!token) return true;

  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

/**
 * Elimina el token y redirige al login si ha expirado
 * @param {function} navigate - Función de navegación de react-router
 * @returns {boolean} true si el token expiró y fue eliminado, false si sigue válido
 */
export const handleTokenExpiration = (navigate) => {
  if (isTokenExpired()) {
    alert("Su sesión ha expirado. Por favor, inicie sesión nuevamente.");
    localStorage.removeItem("access_token");
    navigate("/login");
    return true;
  }
  return false;
};

/**
 * Obtiene los datos del usuario desde el JWT
 */
export const getUserFromToken = () => {
  const token = localStorage.getItem("access_token");

  if (!token) return null;

  const decoded = decodeJWT(token);
  if (!decoded) return null;

  // Mapeo de rol_id a nombre del rol
  const roleMap = {
    1: "Reclutador",
    2: "Super Admin",
  };

  return {
    userId: decoded.user_id,
    name: decoded.name,
    roleId: decoded.rol_id,
    roleName: roleMap[decoded.rol_id] || "Usuario",
    exp: decoded.exp,
    iat: decoded.iat,
  };
};
