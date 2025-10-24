import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { router } from "./routes";

function App() {
  return (
    <Suspense fallback={<h1>cargando de desarrollo... </h1>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
