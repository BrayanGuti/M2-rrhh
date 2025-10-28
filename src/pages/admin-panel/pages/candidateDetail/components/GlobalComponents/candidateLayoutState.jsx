import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { AdminLayout } from "../../../../layout/Layout";
import { Button } from "@/ui/button";
import { Alert, AlertDescription } from "@/ui/alert";
import { useNavigate } from "react-router-dom";

export function CandidateLayoutState({ loading, error, children }) {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Cargando información del candidato
          </h2>
          <p className="text-gray-500">Por favor espera un momento...</p>
        </div>
      ) : error ? (
        <div className="max-w-2xl mx-auto mt-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error al cargar la información del candidato. Por favor intenta de
              nuevo.
            </AlertDescription>
          </Alert>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mt-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>
      ) : (
        children
      )}
    </AdminLayout>
  );
}
