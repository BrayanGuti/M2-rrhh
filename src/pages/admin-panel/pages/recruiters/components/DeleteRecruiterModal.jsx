import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useState, useEffect } from "react";

export function DeleteRecruiterModal({ isOpen, onClose, recruiter, onDelete }) {
  const [phase, setPhase] = useState("confirm"); // "confirm" | "loading" | "success" | "error"

  useEffect(() => {
    if (phase === "success") {
      const timer = setTimeout(() => onClose(), 2000); // cerrar automáticamente tras 2s
      return () => clearTimeout(timer);
    }
  }, [phase, onClose]);

  const handleDelete = async () => {
    try {
      setPhase("loading");
      await onDelete(recruiter); // espera a que la acción de eliminación termine
      setPhase("success");
    } catch {
      setPhase("error");
    }
  };

  const renderContent = () => {
    switch (phase) {
      case "confirm":
        return (
          <>
            <DialogHeader>
              <DialogTitle>¿Estás seguro?</DialogTitle>
            </DialogHeader>
            <p className="text-gray-600">
              Esta acción eliminará al usuario permanentemente.
            </p>
            <DialogFooter className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Eliminar
              </Button>
            </DialogFooter>
          </>
        );

      case "loading":
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="animate-spin w-8 h-8 text-gray-500 mb-3" />
            <p className="text-gray-600">Eliminando reclutador...</p>
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="w-10 h-10 text-green-500 mb-3" />
            <h3 className="text-lg font-semibold text-green-600">
              Eliminado correctamente
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              El reclutador se eliminó con éxito.
            </p>
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <XCircle className="w-10 h-10 text-red-500 mb-3" />
            <h3 className="text-lg font-semibold text-red-600">
              Error al eliminar
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              No se pudo eliminar el reclutador. Intenta nuevamente.
            </p>
            <DialogFooter className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Reintentar
              </Button>
            </DialogFooter>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">{renderContent()}</DialogContent>
    </Dialog>
  );
}
