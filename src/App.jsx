import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { router } from "./routes";
import { SidebarProvider } from "./pages/admin-panel/layout/contexts/SidebarContext";

function App() {
  return (
    <Suspense fallback={<h1>cargando de desarrollo... </h1>}>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </Suspense>
  );
}

export default App;
