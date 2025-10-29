export function ReferenciasPersonales({ referencias }) {
  if (!referencias || referencias.length === 0) {
    return <p className="text-gray-500 text-sm">Sin información registrada</p>;
  }

  return (
    <div className="space-y-4">
      {referencias.map((referencia, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-xl p-5 border border-gray-200"
        >
          <h4 className="font-semibold text-gray-800 mb-3">
            {referencia.nombre}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Domicilio</p>
              <p className="font-medium text-gray-800">
                {referencia.domicilio}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Teléfono</p>
              <p className="font-medium text-gray-800">{referencia.telefono}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Ocupación</p>
              <p className="font-medium text-gray-800">
                {referencia.ocupacion}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Tiempo de Conocerlo</p>
              <p className="font-medium text-gray-800">
                {referencia.tiempo_conocerlo}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
