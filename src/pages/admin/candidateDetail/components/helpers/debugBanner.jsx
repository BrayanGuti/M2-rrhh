import { Alert, AlertDescription } from "../../../../../ui/alert";

export function DebugBanner() {
  return (
    <Alert className="mb-4 bg-yellow-50 border-yellow-300">
      <AlertDescription className="flex items-center">
        <span className="mr-2">🔧</span>
        <strong className="mr-2">Modo Debug Activo</strong>
        <span className="text-sm text-gray-600">
          - Usando datos simulados con delays realistas
        </span>
      </AlertDescription>
    </Alert>
  );
}
