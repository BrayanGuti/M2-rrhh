import { Button } from "../../../../ui/button";
import { Card } from "../../../../ui/card";
import { Eye, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export function PendingCandidatesList({
  candidates = [],
  metadata,
  onPageChange,
  isLoading,
  isError,
}) {
  if (isLoading) {
    return (
      <Card className="bg-white border-gray-200 rounded-2xl overflow-hidden shadow-md">
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#44BBA4]" />
          <span className="ml-3 text-gray-600">Cargando candidatos...</span>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="bg-white border-gray-200 rounded-2xl overflow-hidden shadow-md">
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <p className="text-red-600 font-medium mb-2">
              Error al cargar candidatos
            </p>
            <p className="text-gray-500 text-sm">
              Por favor, intenta nuevamente
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (!candidates || candidates.length === 0) {
    return (
      <Card className="bg-white border-gray-200 rounded-2xl overflow-hidden shadow-md">
        <div className="flex items-center justify-center p-12">
          <p className="text-gray-500">No hay candidatos pendientes</p>
        </div>
      </Card>
    );
  }

  const {
    pagina_actual,
    elementos_por_pagina,
    total_elementos,
    total_paginas,
  } = metadata;
  const startIndex = (pagina_actual - 1) * elementos_por_pagina + 1;
  const endIndex = Math.min(
    pagina_actual * elementos_por_pagina,
    total_elementos
  );

  return (
    <Card className="bg-white border-gray-200 rounded-2xl overflow-hidden shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          Candidatos Pendientes
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Mostrando {startIndex}-{endIndex} de {total_elementos} candidatos
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Nombre Completo
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Cargo Postulado
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Correo Electrónico
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Fecha de Postulación
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr
                key={candidate.id_postulacion}
                className={`border-t border-gray-100 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {candidate.nombre_completo}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {candidate.puesto_aspirado}
                </td>
                <td className="px-6 py-4 text-gray-600">{candidate.correo}</td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(candidate.fecha_solicitud).toLocaleDateString(
                    "es-ES"
                  )}
                </td>
                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#44BBA4] hover:bg-[#44BBA4]/10 rounded-lg"
                    onClick={() =>
                      (window.location.href = `/admin/candidatos/${candidate.id_postulacion}`)
                    }
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {total_paginas > 1 && (
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Página {pagina_actual} de {total_paginas}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagina_actual - 1)}
              disabled={pagina_actual === 1}
              className="rounded-lg"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagina_actual + 1)}
              disabled={pagina_actual === total_paginas}
              className="rounded-lg"
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
