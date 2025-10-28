import { Check, X } from "lucide-react";

export function DatosEconomicos({ datos }) {
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
      {datos.tiene_otros_ingresos !== undefined && (
        <div>
          <p className="text-xs text-gray-500 mb-1">¿Tiene otros ingresos?</p>
          <BooleanIndicator value={datos.tiene_otros_ingresos} />
        </div>
      )}
      {datos.conyuge_trabaja !== undefined && (
        <div>
          <p className="text-xs text-gray-500 mb-1">¿Cónyuge trabaja?</p>
          <BooleanIndicator value={datos.conyuge_trabaja} />
        </div>
      )}
      {datos.tiene_automovil_propio !== undefined && (
        <div>
          <p className="text-xs text-gray-500 mb-1">¿Tiene automóvil propio?</p>
          <BooleanIndicator value={datos.tiene_automovil_propio} />
        </div>
      )}
      {datos.tiene_deudas !== undefined && (
        <div>
          <p className="text-xs text-gray-500 mb-1">¿Tiene deudas?</p>
          <BooleanIndicator value={datos.tiene_deudas} />
        </div>
      )}
      {datos.gastos_mensuales && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Gastos Mensuales</p>
          <p className="font-medium text-gray-800">
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            }).format(Number(datos.gastos_mensuales))}
          </p>
        </div>
      )}
    </div>
  );
}
