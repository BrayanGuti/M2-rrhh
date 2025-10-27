import { lazy } from "react";

// Lazy loading de componentes para optimizar carga inicial
const AdminHome = lazy(() => import("../pages/admin/Adminhome/page.jsx"));
const AdminContacts = lazy(() => import("../pages/admin/contacts/page.jsx"));

/**
 * Rutas públicas de la aplicación
 *
 * Estas rutas son accesibles sin autenticación.
 * Cada ruta puede tener su propio layout y componentes hijos.
 */
export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminHome />,
  },
  {
    path: "/admin/contactos",
    element: <AdminContacts />,
  },
];
