import { NavLink, useLocation } from "react-router-dom";
import { Home, Users, Calendar, UserCog, LogOut } from "lucide-react";
import { useAuth, useLogout } from "../hooks/useAuth";

const allNavItems = [
  { to: "/admin", icon: Home, label: "Inicio", roles: ["1", "2"] },
  {
    to: "/admin/contactos",
    icon: Users,
    label: "Contactos",
    roles: ["1", "2"],
  },
  {
    to: "/admin/calendario",
    icon: Calendar,
    label: "Calendario",
    roles: ["1", "2"],
  },
  {
    to: "/admin/reclutadores",
    icon: UserCog,
    label: "Reclutadores",
    roles: ["1"],
  }, // Solo Super Admin (rol 2)
];

export function Sidebar({ isOpen }) {
  const location = useLocation();
  const { logout } = useLogout();
  const { user, isLoading } = useAuth();

  // Filtrar items según el rol del usuario
  const navItems = allNavItems.filter(
    (item) => user && item.roles.includes(user.roleId)
  );

  if (isLoading) {
    return null; // O un skeleton loader
  }

  return (
    <aside
      className={`fixed left-0 top-[73px] bottom-0 z-40 bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-lg transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <nav className="flex flex-col h-full p-4">
        <div className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive
                    ? "bg-[#44BBA4] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && (
                  <span className="font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Botón de cierre de sesión */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all mt-auto w-full text-left"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && (
            <span className="font-medium whitespace-nowrap">Salir</span>
          )}
        </button>
      </nav>
    </aside>
  );
}
