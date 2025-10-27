import { Alert, AlertDescription, AlertTitle } from "../../../../../ui/alert";
import { Button } from "../../../../../ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export function ErrorBanner({ errorCount, onRetryAll }) {
  if (errorCount === 0) return null;

  return (
    <Alert variant="destructive" className="border-red-200 bg-red-50">
      <AlertCircle className="h-5 w-5" />
      <div className="flex items-center justify-between flex-1">
        <div>
          <AlertTitle className="text-red-800 font-semibold mb-1">
            Error al cargar información
          </AlertTitle>
          <AlertDescription className="text-red-700">
            {errorCount === 1
              ? "1 sección no se pudo cargar correctamente"
              : `${errorCount} secciones no se pudieron cargar correctamente`}
          </AlertDescription>
        </div>
        <Button
          onClick={onRetryAll}
          variant="outline"
          size="sm"
          className="ml-4 border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reintentar todo
        </Button>
      </div>
    </Alert>
  );
}
