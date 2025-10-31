import { useState } from "react";
import { DEBUG_MODE } from "@/const/config";
import { LOGIN } from "@/const/endpoints";

/**
 * Hook personalizado para manejar inicio de sesión.
 * En modo DEBUG simula la respuesta del backend.
 */

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const login = async (nombre_usuario, contrasena) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 🧩 Si está en modo debug, simulamos el login
      if (DEBUG_MODE) {
        await new Promise((resolve) => setTimeout(resolve, 800)); // delay simulado

        if (nombre_usuario === "usuario" && contrasena === "12345") {
          const fakeData = {
            exito: true,
            token_acceso:
              "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTEiLCJuYW1lIjoiSGVybmFuIE1lbG8iLCJyb2xfaWQiOiIxIiwiaWF0IjoxNzYxNzk3NDQyLCJleHAiOjE3NjE4NDc4NDJ9.MJyPBljPyHRTCB_SbUxv-sJVFmtnU6x26LPpPWIul2k",
          };

          localStorage.setItem("access_token", fakeData.token_acceso);
          setSuccess(true);

          if (DEBUG_MODE)
            console.log("🧪 [DEBUG] Login simulado exitoso:", fakeData);

          return fakeData;
        } else {
          const fail = {
            exito: false,
            mensaje: "Credenciales inválidas (debug)",
          };
          setError(fail.mensaje);
          if (DEBUG_MODE)
            console.warn("🧪 [DEBUG] Login simulado fallido:", fail);
          return fail;
        }
      }

      // 🚀 Si no está en modo debug, hace la petición real al backend
      const response = await fetch(LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre_usuario, contrasena }),
      });

      const data = await response.json();

      if (data.exito && data.token_acceso) {
        localStorage.setItem("access_token", data.token_acceso);
        setSuccess(true);
        return data;
      } else {
        setError("Usuario o contraseña incorrectos.");
        return data;
      }
    } catch (err) {
      console.error("Error en el inicio de sesión:", err);
      setError("Ocurrió un error al iniciar sesión.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
}
