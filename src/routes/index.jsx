import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { adminRoutes } from "./admin.routes";
import NotFound from "./components/NotFound.jsx";

/**
 * Router principal de la aplicación
 * La ruta "*" (catch-all) debe ir AL FINAL
 */
export const router = createBrowserRouter([
  ...publicRoutes,
  ...adminRoutes,
  // 👇 CATCH-ALL: Debe ser la última ruta
  {
    path: "*",
    element: <NotFound />,
  },
]);
