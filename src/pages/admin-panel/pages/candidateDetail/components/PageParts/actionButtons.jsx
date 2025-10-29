// components/PageParts/ActionButtons.jsx
import { Button } from "@/ui/button";
import { X, Check, Bookmark, Loader2 } from "lucide-react";

export function ActionButtons({
  handleReject,
  handleSaveContact,
  handleAccept,
  isRejecting = false,
  isSaving = false,
  isAccepting = false,
  isAnyActionLoading = false,
  candidateName = "", // Nuevo prop para pasar el nombre
}) {
  return (
    <div className="flex justify-center gap-4 pb-8 pt-4">
      <Button
        onClick={() => handleReject(candidateName)}
        disabled={isAnyActionLoading}
        className="px-8 py-6 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRejecting ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <X className="w-5 h-5 mr-2" />
        )}
        {isRejecting ? "Rechazando..." : "Rechazar"}
      </Button>

      <Button
        onClick={() => handleSaveContact(candidateName)}
        disabled={isAnyActionLoading}
        className="px-8 py-6 bg-[#D39B6A] hover:bg-[#c28a59] text-white rounded-xl font-medium shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <Bookmark className="w-5 h-5 mr-2" />
        )}
        {isSaving ? "Guardando..." : "Guardar como Contacto"}
      </Button>

      <Button
        onClick={handleAccept}
        disabled={isAnyActionLoading}
        className="px-8 py-6 bg-[#44BBA4] hover:bg-[#3aa593] text-white rounded-xl font-medium shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAccepting ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <Check className="w-5 h-5 mr-2" />
        )}
        {isAccepting ? "Procesando..." : "Aceptar"}
      </Button>
    </div>
  );
}
