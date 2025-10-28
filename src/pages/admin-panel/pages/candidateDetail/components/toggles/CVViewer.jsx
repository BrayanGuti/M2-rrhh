// components/PageParts/toggles/CVViewer.jsx
import { useState } from "react";
import { FileText, Download, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/ui/button";
import { Alert, AlertDescription } from "@/ui/alert";

export function CVViewer({
  pdfUrl,
  isLoading,
  error,
  candidatoNombre,
  candidatoCargo,
}) {
  const [showIframe, setShowIframe] = useState(true);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-600">Cargando hoja de vida...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error al cargar la hoja de vida: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!pdfUrl) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-gray-500">
        <FileText className="w-16 h-16 text-gray-300" />
        <p>No hay hoja de vida disponible</p>
      </div>
    );
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `Hoja_de_Vida_${
      candidatoNombre || "Candidato"
    }_${candidatoCargo}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="space-y-4">
      {/* Botones de acción */}
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded-xl bg-[#15616D] text-white 
               hover:bg-[#104d56]  hover:shadow-lg 
               active:scale-95 cursor-pointer 
               shadow-md transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          Descargar Hoja de Vida
        </Button>

        <Button
          onClick={handleOpenNewTab}
          className="flex items-center gap-2 rounded-xl bg-white border border-gray-300 text-[#15616D] 
               hover:bg-gray-100 hover:text-[#0d4b52]  hover:shadow-md 
               active:scale-95 cursor-pointer 
               shadow-sm transition-all duration-200"
        >
          <ExternalLink className="w-4 h-4" />
          Abrir en Nueva Pestaña
        </Button>

        <Button
          onClick={() => setShowIframe(!showIframe)}
          variant="ghost"
          className={`flex items-center gap-2 rounded-xl px-4 py-2 
                 active:scale-95 cursor-pointer
                transition-all duration-200 ${
                  showIframe
                    ? "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 shadow-sm hover:shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900 shadow-sm hover:shadow-md"
                }`}
        >
          <FileText className="w-4 h-4" />
          {showIframe ? "Ocultar Vista Previa" : "Mostrar Vista Previa"}
        </Button>
      </div>

      {/* Iframe del PDF */}
      {showIframe && (
        <div className="border rounded-lg overflow-hidden bg-gray-50">
          <iframe
            src={pdfUrl}
            title="Hoja de Vida del Candidato"
            className="w-full h-[600px]"
            style={{ border: "none" }}
            onError={() => {
              console.error("Error loading PDF in iframe");
            }}
          />

          {/* Fallback para navegadores que no soportan PDFs en iframe */}
          <div className="p-4 bg-blue-50 border-t">
            <p className="text-sm text-gray-700">
              ¿No puedes ver el PDF?
              <button
                onClick={handleOpenNewTab}
                className="ml-2 text-blue-600 hover:underline font-medium"
              >
                Ábrelo en una nueva pestaña
              </button>{" "}
              o{" "}
              <button
                onClick={handleDownload}
                className="text-blue-600 hover:underline font-medium"
              >
                descárgalo aquí
              </button>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
