import { useRef } from "react";
import { Upload } from "lucide-react";
import { useChatStore } from "../../stores/useChatStore";

export default function UploadCvButtons() {
  const { handleCVUpload, isProcessing } = useChatStore();

  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea PDF
      if (file.type !== "application/pdf") {
        alert("Por favor, sube únicamente archivos PDF.");
        return;
      }

      // Validar tamaño (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("El archivo es demasiado grande. Máximo 10MB.");
        return;
      }

      await handleCVUpload(file);
    }

    // Resetear input para permitir subir el mismo archivo de nuevo
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={triggerFileUpload}
        disabled={isProcessing}
        className="w-full py-4 px-6 bg-[#44BBA4] hover:bg-[#3da590] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-3"
      >
        <Upload className="w-5 h-5" />
        <span>Subir Hoja de Vida (PDF)</span>
      </button>

      <p className="text-xs text-center text-[#15616D]/60">
        Formatos aceptados: PDF • Tamaño máximo: 10MB
      </p>
    </div>
  );
}
