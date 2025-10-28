export function InformacionLaboral({ informacion }) {
  console.log("Información Laboral:", informacion);

  if (!informacion || informacion.length === 0) {
    return <p className="text-gray-500 text-sm">Sin información registrada</p>;
  }

  return (
    <div className="space-y-4">
      {informacion.map((trabajo, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-xl p-5 border border-gray-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-semibold text-gray-800 text-lg">
                {trabajo.nombre}
              </h4>
              <p className="text-sm text-gray-600">{trabajo.cargo}</p>
            </div>
            <span className="px-3 py-1 bg-[#44BBA4]/10 text-[#44BBA4] rounded-full text-sm font-medium">
              {trabajo.experiencia} {trabajo.experiencia === 1 ? "año" : "años"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Teléfono</p>
              <p className="font-medium text-gray-800">{trabajo.telefono}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Motivo de Retiro</p>
              <p className="font-medium text-gray-800">
                {trabajo.motivo_retiro}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Funciones Realizadas</p>
              <p className="text-sm text-gray-700">
                {trabajo.funciones_realizadas}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Logros</p>
              <p className="text-sm text-gray-700">{trabajo.logros}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Dificultades</p>
              <p className="text-sm text-gray-700">{trabajo.dificultades}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
