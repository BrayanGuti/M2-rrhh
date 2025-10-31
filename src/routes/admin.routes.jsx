// adminRoutes.jsx
import { lazy } from "react";
import { ProtectedRoute } from "./components/protectedRoute.jsx";
import { AdminLayoutRoute } from "./components/AdminLayoutRoute.jsx";

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

export const adminRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayoutRoute />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true, // Ruta por defecto: /admin
        element: <AdminHome />,
      },
      {
        path: "contactos",
        element: <AdminContacts />,
      },
      {
        path: "candidatos/:id",
        element: <AdminCandidates />,
      },
      {
        path: "reclutadores",
        element: <RecruitersPage />,
      },
    ],
  },
  // Ejemplo de ruta admin SIN layout (para casos especiales)
  // {
  //   path: "/admin/pantalla-completa",
  //   element: (
  //     <ProtectedRoute>
  //       <AdminFullScreen />
  //     </ProtectedRoute>
  //   ),
  // },
];
