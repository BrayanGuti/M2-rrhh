export function InformacionAcademica({ informacion }) {
  if (!informacion) {
    return <p className="text-gray-500 text-sm">Sin información registrada</p>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {informacion.formacion && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Nivel de Formación</p>
            <p className="font-medium text-gray-800">{informacion.formacion}</p>
          </div>
        )}
        {informacion.titulo_obtenido && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Título Obtenido</p>
            <p className="font-medium text-gray-800">
              {informacion.titulo_obtenido}
            </p>
          </div>
        )}
        {informacion.anio_terminacion && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Año de Terminación</p>
            <p className="font-medium text-gray-800">
              {informacion.anio_terminacion}
            </p>
          </div>
        )}
      </div>

      {informacion.otros_estudios && informacion.otros_estudios.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-2">Otros Estudios</p>
          <div className="flex flex-wrap gap-2">
            {informacion.otros_estudios.map((estudio, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#44BBA4]/10 text-[#44BBA4] rounded-full text-sm font-medium"
              >
                {estudio}
              </span>
            ))}
          </div>
        </div>
      )}

      {informacion.estudio_actual && informacion.estudio_actual.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-2">Estudios Actuales</p>
          <div className="flex flex-wrap gap-2">
            {informacion.estudio_actual.map((estudio, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#15616D]/10 text-[#15616D] rounded-full text-sm font-medium"
              >
                {estudio}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
