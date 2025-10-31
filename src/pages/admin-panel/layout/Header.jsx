// components/Header.jsx
import { Menu, X } from "lucide-react";
import { Button } from "@/ui/button";
import { Avatar, AvatarFallback } from "@/ui/avatar";
import { useAuth } from "../hooks/useAuth";

export function Header({ title, isSidebarOpen, onToggleSidebar }) {
  const { user, isLoading } = useAuth();

  // Obtener iniciales del nombre
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Botón del menú */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="text-gray-700 hover:bg-[#44BBA4]/10"
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>

          {/* Logo con <img> estándar */}
          <img
            src="/logo-hotel-dorado-plaza.webp"
            alt="Hotel El Dorado"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Título central */}
        <h1 className="text-xl font-bold text-gray-800 text-center flex-1">
          {title}
        </h1>

        {/* Información del usuario */}
        <div className="flex items-center gap-3">
          {!isLoading && user && (
            <>
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.roleName}</p>
              </div>
              <Avatar className="w-10 h-10 border-2 border-[#44BBA4]">
                <AvatarFallback className="bg-[#44BBA4] text-white font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
