import { lazy } from "react";

// Lazy loading de componentes para optimizar carga inicial
const RecruitmentPage = lazy(() => import("../pages/recruitment/page"));

/**
 * Rutas públicas de la aplicación
 *
 * Estas rutas son accesibles sin autenticación.
 * Cada ruta puede tener su propio layout y componentes hijos.
 */
export const publicRoutes = [
  {
    path: "/",
    element: <RecruitmentPage />,
  },
  // En el futuro puedes agregar más rutas públicas:
  // {
  //   path: '/about',
  //   element: <AboutPage />,
  // },
];
