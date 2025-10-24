import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './public.routes';

/**
 * Router principal de la aplicación
 * 
 * Aquí se centralizan todas las rutas del proyecto.
 * En el futuro, aquí también importarás las rutas del admin.
 */
export const router = createBrowserRouter([
  ...publicRoutes,
  // En el futuro agregarás:
  // ...adminRoutes,
]);