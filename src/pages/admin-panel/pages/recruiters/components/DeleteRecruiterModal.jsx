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
import { DEBUG_MODE } from "@/const/config";

export function DeleteRecruiterModal({ isOpen, onClose, recruiter, onDelete }) {
  const [phase, setPhase] = useState("confirm"); // "confirm" | "loading" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (phase === "success") {
      const timer = setTimeout(() => {
        onClose();
        setPhase("confirm");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, onClose]);

  useEffect(() => {
    if (isOpen) {
      setPhase("confirm");
      setErrorMessage("");
    }
  }, [isOpen]);

  const handleDelete = async () => {
    try {
      setPhase("loading");
      if (DEBUG_MODE)
        console.log("🔧 [DEBUG MODE] Deleting recruiter:", recruiter);

      await onDelete(recruiter);
      setPhase("success");
    } catch (error) {
      if (DEBUG_MODE) console.error("🔧 [DEBUG MODE] Delete error:", error);
      setErrorMessage(error.message || "Error al eliminar el reclutador");
      setPhase("error");
    }
  };

  const renderContent = () => {
    switch (phase) {
      case "confirm":
        return (
          <>
            <DialogHeader className="text-center border-b border-gray-100 pb-3">
              <DialogTitle className="text-2xl font-semibold text-gray-800">
                Confirmar eliminación
              </DialogTitle>
            </DialogHeader>

            <div className="py-5 space-y-3">
              <p className="text-gray-600 text-center">
                Esta acción eliminará permanentemente al reclutador:
              </p>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm text-center">
                <p className="font-semibold text-gray-800 text-lg">
                  {recruiter?.nombre}
                </p>
                <p className="text-sm text-gray-500">{recruiter?.correo}</p>
              </div>
            </div>

            <DialogFooter className="flex justify-center gap-3 pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={onClose}
                className="cursor-pointer rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="cursor-pointer rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold px-6 transition-colors"
              >
                Eliminar
              </Button>
            </DialogFooter>
          </>
        );

      case "loading":
        return (
          <div className="flex flex-col items-center justify-center py-10 space-y-3">
            <Loader2 className="animate-spin w-12 h-12 text-[#44BBA4]" />
            <p className="text-gray-700 font-medium text-base">
              Eliminando reclutador...
            </p>
            <p className="text-sm text-gray-500">Por favor espera un momento</p>
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center justify-center py-10 space-y-3">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-700">
              ¡Eliminado correctamente!
            </h3>
            <p className="text-gray-600 text-sm text-center">
              El reclutador se eliminó con éxito.
            </p>
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center justify-center py-10 space-y-3">
            <div className="bg-red-100 rounded-full p-3">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-red-700">
              Error al eliminar
            </h3>
            <p className="text-gray-600 text-sm text-center">{errorMessage}</p>

            <DialogFooter className="flex justify-center gap-3 pt-4 w-full">
              <Button
                variant="outline"
                onClick={onClose}
                className="cursor-pointer rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cerrar
              </Button>
              <Button
                onClick={handleDelete}
                className="cursor-pointer rounded-xl bg-[#44BBA4] hover:bg-[#3aa593] text-white font-semibold px-6 transition-colors"
              >
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
      <DialogContent className="sm:max-w-md rounded-2xl border border-gray-100 shadow-lg bg-white">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
