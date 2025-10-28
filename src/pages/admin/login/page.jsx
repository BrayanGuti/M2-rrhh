import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Validación simple (ejemplo)
    if (username && password) {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo - Logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-50 via-white to-gray-100 items-center justify-center p-12">
        <div className="max-w-md w-full">
          <img
            src="/logo-hotel-dorado-plaza.webp"
            alt="Hotel El Dorado"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>

      {/* Lado derecho - Formulario de login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Logo en móviles */}
          <div className="lg:hidden flex justify-center mb-8">
            <img
              src="/logo-dorado.webp"
              alt="Hotel El Dorado"
              className="h-16 w-auto"
              loading="lazy"
            />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenido
            </h1>
            <p className="text-gray-600">
              Ingresa tus credenciales para acceder al panel administrativo
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Usuario
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                className="h-12 rounded-xl border-gray-300 focus:border-[#44BBA4] focus:ring-[#44BBA4]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="h-12 rounded-xl border-gray-300 focus:border-[#44BBA4] focus:ring-[#44BBA4]"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#44BBA4] hover:bg-[#3aa593] text-white font-medium rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Iniciar sesión
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
