import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { LogIn } from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import { LoginHeader } from "./LoginHeader";

export function LoginForm({
  username,
  password,
  setUsername,
  setPassword,
  onLoginSuccess,
}) {
  const { login, loading, error, success } = useLogin();

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);

    if (result?.exito) {
      onLoginSuccess();
    }
  };

  return (
    <>
      <LoginHeader />

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Usuario */}
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

        {/* Contraseña */}
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

        {/* Botón */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-[#44BBA4] hover:bg-[#3aa593] text-white font-medium rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-70"
        >
          {loading ? (
            "Iniciando sesión..."
          ) : (
            <>
              <LogIn className="w-5 h-5 mr-2" />
              Iniciar sesión
            </>
          )}
        </Button>

        {/* Mensajes de estado */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">¡Bienvenido!</p>}
      </form>
    </>
  );
}
