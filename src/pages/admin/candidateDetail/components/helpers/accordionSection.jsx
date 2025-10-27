import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../ui/accordion";
import { Alert, AlertDescription } from "../../../../../ui/alert";
import { Button } from "../../../../../ui/button";
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";

export function AccordionSection({
  value,
  title,
  isLoading,
  hasError,
  onRetry,
  children,
}) {
  return (
    <AccordionItem
      value={value}
      className="bg-white border border-gray-200 rounded-2xl px-6 shadow-sm"
    >
      <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline py-5">
        {title}
      </AccordionTrigger>
      <AccordionContent className="pb-5">
        {isLoading ? (
          <LoadingSection />
        ) : hasError ? (
          <ErrorSection
            message="No se pudo cargar la información"
            onRetry={onRetry}
          />
        ) : (
          children
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

export function LoadingSection() {
  return (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-2" />
      <span className="text-gray-500">Cargando información...</span>
    </div>
  );
}

function ErrorSection({ message, onRetry }) {
  return (
    <Alert variant="destructive" className="my-2">
      <AlertCircle className="h-4 w-4" />
      <div className="flex items-center justify-between flex-1">
        <AlertDescription>
          {message || "Error al cargar la información"}
        </AlertDescription>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="ml-4 border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800 shrink-0"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reintentar
          </Button>
        )}
      </div>
    </Alert>
  );
}
