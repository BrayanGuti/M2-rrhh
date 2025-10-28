import { Card } from "../../../../../ui/card";
import {
  Mail,
  Phone,
  Calendar,
  Briefcase,
  User,
  MapPin,
  CreditCard,
  DollarSign,
} from "lucide-react";

export function MainInfoCard({ datosPostulacion, candidato }) {
  return (
    <Card className="bg-white border-gray-200 rounded-2xl p-8 shadow-md">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {candidato.nombre_completo}
        </h1>
        <p className="text-gray-500">Información de Postulación</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Puesto Aspirado */}
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-xl bg-[#44BBA4]/10 flex-shrink-0">
            <Briefcase className="w-5 h-5 text-[#44BBA4]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Puesto Aspirado</p>
            <p className="font-semibold text-gray-800">
              {datosPostulacion.puesto_aspirado}
            </p>
          </div>
        </div>

        {/* Sueldo Deseado */}
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-xl bg-[#44BBA4]/10 flex-shrink-0">
            <DollarSign className="w-5 h-5 text-[#44BBA4]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Sueldo Deseado</p>
            <p className="font-semibold text-gray-800">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              }).format(Number(datosPostulacion.sueldo_deseado))}
            </p>
          </div>
        </div>

        {/* Fecha de Solicitud */}
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-xl bg-[#44BBA4]/10 flex-shrink-0">
            <Calendar className="w-5 h-5 text-[#44BBA4]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Fecha de Solicitud</p>
            <p className="font-semibold text-gray-800">
              {datosPostulacion.fecha_solicitud}
            </p>
          </div>
        </div>

        {/* Correo */}
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-xl bg-[#15616D]/10 flex-shrink-0">
            <Mail className="w-5 h-5 text-[#15616D]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Correo Electrónico</p>
            <p className="font-semibold text-gray-800 break-all">
              {candidato.correo}
            </p>
          </div>
        </div>

        {/* Teléfono */}
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-xl bg-[#15616D]/10 flex-shrink-0">
            <Phone className="w-5 h-5 text-[#15616D]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Teléfono</p>
            <p className="font-semibold text-gray-800">{candidato.telefono}</p>
          </div>
        </div>

        {/* Documento */}
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-xl bg-[#15616D]/10 flex-shrink-0">
            <CreditCard className="w-5 h-5 text-[#15616D]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Documento de Identidad</p>
            <p className="font-semibold text-gray-800">
              {candidato.documento_identidad}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Expedida en: {candidato.expedida_en}
            </p>
          </div>
        </div>

        {/* Edad */}
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-xl bg-[#D39B6A]/10 flex-shrink-0">
            <User className="w-5 h-5 text-[#D39B6A]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Edad</p>
            <p className="font-semibold text-gray-800">{candidato.edad} años</p>
          </div>
        </div>

        {/* Fecha de Nacimiento */}
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-xl bg-[#D39B6A]/10 flex-shrink-0">
            <Calendar className="w-5 h-5 text-[#D39B6A]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Fecha de Nacimiento</p>
            <p className="font-semibold text-gray-800">
              {candidato.fecha_nacimiento}
            </p>
          </div>
        </div>

        {/* Lugar de Nacimiento */}
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-xl bg-[#D39B6A]/10 flex-shrink-0">
            <MapPin className="w-5 h-5 text-[#D39B6A]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Lugar de Nacimiento</p>
            <p className="font-semibold text-gray-800">
              {candidato.lugar_nacimiento}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
