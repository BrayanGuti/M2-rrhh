import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Avatar, AvatarFallback } from "@/ui/avatar";
import { Mail, Phone, Info, Trash2, Plus } from "lucide-react";

export function RecruitersList({
  recruiters,
  onViewDetails,
  onDelete,
  onAddNew,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recruiters.map((recruiter) => (
        <RecruiterCard
          key={recruiter.documento_identidad}
          recruiter={recruiter}
          onViewDetails={onViewDetails}
          onDelete={onDelete}
        />
      ))}
      <AddRecruiterCard onClick={onAddNew} />
    </div>
  );
}

export function RecruiterCard({ recruiter, onViewDetails, onDelete }) {
  return (
    <Card className="bg-white border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-16 h-16 border-2 border-[#44BBA4]">
          <AvatarFallback className="bg-[#44BBA4] text-white font-semibold text-lg">
            {recruiter.nombre
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            {recruiter.nombre}
          </h3>
          <p className="text-sm text-gray-500">{recruiter.rol}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-4 h-4 text-[#44BBA4]" />
          <span className="text-sm">{recruiter.correo}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="w-4 h-4 text-[#44BBA4]" />
          <span className="text-sm">{recruiter.telefono}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => onViewDetails(recruiter)}
          className="flex-1 bg-[#44BBA4] hover:bg-[#3aa593] text-white rounded-xl cursor-pointer"
        >
          <Info className="w-4 h-4 mr-2" />
          Más información
        </Button>
        <Button
          onClick={() => onDelete(recruiter)}
          variant="outline"
          className="flex-1 border-red-300 text-red-600 hover:bg-red-50 rounded-xl cursor-pointer"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Eliminar
        </Button>
      </div>
    </Card>
  );
}

export function AddRecruiterCard({ onClick }) {
  return (
    <Card
      onClick={onClick}
      className="bg-gradient-to-br from-[#44BBA4]/10 to-[#44BBA4]/5 border-2 border-dashed border-[#44BBA4] rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center min-h-[280px]"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-[#44BBA4] rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Agregar Reclutador
        </h3>
        <p className="text-sm text-gray-600">Crear un nuevo reclutador</p>
      </div>
    </Card>
  );
}
