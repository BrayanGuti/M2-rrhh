import { Check, X } from "lucide-react";

export function DatosGenerales({ datos }) {
  if (!datos) {
    return <p className="text-gray-500 text-sm">Sin información registrada</p>;
  }

  const BooleanIndicator = ({ value }) => (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {value ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      {value ? "Sí" : "No"}
    </span>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {datos.como_se_entero_empleo && (
        <div className="md:col-span-2">
          <p className="text-xs text-gray-500 mb-1">
            ¿Cómo se enteró del empleo?
          </p>
          <p className="font-medium text-gray-800">
            {datos.como_se_entero_empleo}
          </p>
        </div>
      )}
      {datos.tiene_familiares_empresa !== undefined && (
        <div>
          <p className="text-xs text-gray-500 mb-1">
            ¿Tiene familiares en la empresa?
          </p>
          <BooleanIndicator value={datos.tiene_familiares_empresa} />
        </div>
      )}
      {datos.lo_recomienda_alguien !== undefined && (
        <div>
          <p className="text-xs text-gray-500 mb-1">¿Lo recomienda alguien?</p>
          <BooleanIndicator value={datos.lo_recomienda_alguien} />
        </div>
      )}
      {datos.ha_trabajado_con_nosotros !== undefined && (
        <div>
          <p className="text-xs text-gray-500 mb-1">
            ¿Ha trabajado con nosotros?
          </p>
          <BooleanIndicator value={datos.ha_trabajado_con_nosotros} />
        </div>
      )}
      {datos.puede_viajar !== undefined && (
        <div>
          <p className="text-xs text-gray-500 mb-1">¿Puede viajar?</p>
          <BooleanIndicator value={datos.puede_viajar} />
        </div>
      )}
      {datos.dispuesto_cambiar_residencia !== undefined && (
        <div>
          <p className="text-xs text-gray-500 mb-1">
            ¿Dispuesto a cambiar de residencia?
          </p>
          <BooleanIndicator value={datos.dispuesto_cambiar_residencia} />
        </div>
      )}
      {datos.fecha_disponibilidad && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Fecha de Disponibilidad</p>
          <p className="font-medium text-gray-800">
            {datos.fecha_disponibilidad}
          </p>
        </div>
      )}
    </div>
  );
}
