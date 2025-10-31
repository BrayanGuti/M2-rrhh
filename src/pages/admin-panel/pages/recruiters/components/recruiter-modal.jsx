import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { useState } from "react";
import { validateRecruiterForm } from "../utils/createRecruiterValidator";
import { DEBUG_MODE, ROLS } from "@/const/config";
import { Loader2 } from "lucide-react";

export function RecruiterModal({
  isOpen,
  mode,
  recruiter,
  onClose,
  onCreate,
  isCreating,
}) {
  const [formData, setFormData] = useState({
    rol: ROLS.recruiter,
    nombre: "",
    correo: "",
    telefono: "",
    nombre_usuario: "",
    contrasena: "",
    documento_identidad: "",
    direccion: "",
  });

  const [errors, setErrors] = useState({});

  const handleCreate = async () => {
    // Validar formulario
    const validation = validateRecruiterForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);

      if (DEBUG_MODE) {
        console.log("🔧 [DEBUG MODE] Validation errors:", validation.errors);
      }
      return;
    }

    // Limpiar errores
    setErrors({});

    // Llamar a onCreate
    if (onCreate) {
      const result = await onCreate(formData);

      if (result?.success) {
        // Limpiar formulario
        setFormData({
          rol: "Reclutador",
          nombre: "",
          correo: "",
          telefono: "",
          nombre_usuario: "",
          contrasena: "",
          documento_identidad: "",
          direccion: "",
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px] rounded-2xl border border-gray-200 shadow-2xl bg-white/90 backdrop-blur-xl">
        <DialogHeader className="pb-4 border-b border-gray-200">
          <DialogTitle className="text-2xl font-semibold text-[#2C3E50] flex items-center gap-2">
            {mode === "view"
              ? "Información del Reclutador"
              : "Crear Nuevo Reclutador"}
          </DialogTitle>
        </DialogHeader>

        {/* CONTENIDO */}
        {mode === "view" && recruiter ? (
          <div className="grid gap-5 py-5 text-gray-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500 text-sm">Nombre</Label>
                <p className="font-medium">{recruiter.nombre}</p>
              </div>
              <div>
                <Label className="text-gray-500 text-sm">Rol</Label>
                <p className="font-medium">{recruiter.rol}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500 text-sm">Correo</Label>
                <p className="font-medium">{recruiter.correo}</p>
              </div>
              <div>
                <Label className="text-gray-500 text-sm">Teléfono</Label>
                <p className="font-medium">{recruiter.telefono}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500 text-sm">Usuario</Label>
                <p className="font-medium">{recruiter.nombre_usuario}</p>
              </div>
              <div>
                <Label className="text-gray-500 text-sm">Documento</Label>
                <p className="font-medium">{recruiter.documento_identidad}</p>
              </div>
            </div>

            <div>
              <Label className="text-gray-500 text-sm">Dirección</Label>
              <p className="font-medium">{recruiter.direccion}</p>
            </div>

            <div>
              <Label className="text-gray-500 text-sm">Fecha de Creación</Label>
              <p className="font-medium">
                {new Date(recruiter.created_at).toLocaleString("es-CO")}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 py-5">
            {[
              ["nombre", "Nombre", "Ej. María López"],
              ["correo", "Correo", "correo@empresa.com", "email"],
              ["telefono", "Teléfono", "3001234567"],
              ["nombre_usuario", "Nombre de Usuario", "Ej. usuario123"],
              ["contrasena", "Contraseña", "••••••••", "password"],
              ["documento_identidad", "Documento de Identidad", "1234567890"],
              ["direccion", "Dirección", "Calle 123 #45-67"],
            ].map(([id, label, placeholder, type = "text"]) => (
              <div key={id} className="grid gap-1.5">
                <Label htmlFor={id} className="text-gray-600 font-medium">
                  {label}
                </Label>
                <Input
                  id={id}
                  type={type}
                  value={formData[id]}
                  onChange={(e) =>
                    setFormData({ ...formData, [id]: e.target.value })
                  }
                  placeholder={placeholder}
                  className={`rounded-xl border-gray-300 focus:ring-2 focus:ring-[#44BBA4] focus:border-[#44BBA4] transition-all ${
                    errors[id] ? "border-red-500" : ""
                  }`}
                  disabled={isCreating}
                />
                {errors[id] && (
                  <span className="text-xs text-red-500">{errors[id]}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* FOOTER */}
        <DialogFooter className="pt-4 border-t border-gray-200 mt-2">
          {mode === "view" ? (
            <Button
              onClick={onClose}
              className="cursor-pointer bg-[#44BBA4] hover:bg-[#3aa593] text-white font-semibold rounded-xl px-5"
            >
              Cerrar
            </Button>
          ) : (
            <div className="flex gap-3 justify-end w-full">
              <Button
                variant="outline"
                onClick={onClose}
                className="cursor-pointer rounded-xl border-gray-300 text-gray-600 hover:bg-gray-100"
                disabled={isCreating}
              >
                Cancelar
              </Button>
              <Button
                className="cursor-pointer bg-[#44BBA4] hover:bg-[#3aa593] text-white font-semibold rounded-xl px-5"
                onClick={handleCreate}
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creando...
                  </>
                ) : (
                  "Crear Reclutador"
                )}
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
