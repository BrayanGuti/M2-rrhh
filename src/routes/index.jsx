import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { adminRoutes } from "./admin.routes";

/**
 * Router principal de la aplicación
 *
 * Aquí se centralizan todas las rutas del proyecto.
 * En el futuro, aquí también importarás las rutas del admin.
 */
export const router = createBrowserRouter([...publicRoutes, ...adminRoutes]);
