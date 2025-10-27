import { Button } from "../../../../../ui/button";
import { X, Check, Bookmark } from "lucide-react";

export function ActionButtons({
  handleReject,
  handleSaveContact,
  handleAccept,
}) {
  return (
    <div className="flex justify-center gap-4 pb-8 pt-4">
      <Button
        onClick={handleReject}
        className="px-8 py-6 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium shadow-md transition-all hover:shadow-lg"
      >
        <X className="w-5 h-5 mr-2" />
        Rechazar
      </Button>
      <Button
        onClick={handleSaveContact}
        className="px-8 py-6 bg-[#D39B6A] hover:bg-[#c28a59] text-white rounded-xl font-medium shadow-md transition-all hover:shadow-lg"
      >
        <Bookmark className="w-5 h-5 mr-2" />
        Guardar como Contacto
      </Button>
      <Button
        onClick={handleAccept}
        className="px-8 py-6 bg-[#44BBA4] hover:bg-[#3aa593] text-white rounded-xl font-medium shadow-md transition-all hover:shadow-lg"
      >
        <Check className="w-5 h-5 mr-2" />
        Aceptar
      </Button>
    </div>
  );
}
