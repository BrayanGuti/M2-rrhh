import { lazy } from "react";
import { ProtectedRoute } from "./components/protectedRoute.jsx";

// Lazy loading de componentes para optimizar carga inicial
const AdminHome = lazy(() =>
  import("../pages/admin-panel/pages/adminhome/page")
);
const AdminContacts = lazy(() =>
  import("../pages/admin-panel/pages/contacts/page")
);
const AdminCandidates = lazy(() =>
  import("../pages/admin-panel/pages/candidateDetail/page")
);

const RecruitersPage = lazy(() =>
  import("../pages/admin-panel/pages/recruiters/page")
);

/**
 * Rutas protegidas del administrador
 *
 * Todas estas rutas requieren autenticación.
 * Si el usuario no tiene token, será redirigido al login.
 */
export const adminRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/contactos",
    element: (
      <ProtectedRoute>
        <AdminContacts />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/candidatos/:id",
    element: (
      <ProtectedRoute>
        <AdminCandidates />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/reclutadores",
    element: (
      <ProtectedRoute>
        <RecruitersPage />
      </ProtectedRoute>
    ),
  },
];
