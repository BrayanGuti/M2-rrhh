export function InformacionFamiliar({ informacion }) {
  if (!informacion) {
    return <p className="text-gray-500 text-sm">Sin información registrada</p>;
  }

  const hasData =
    informacion.conyuge ||
    (informacion.hijos && informacion.hijos.length > 0) ||
    (informacion.padres && informacion.padres.length > 0) ||
    (informacion.hermanos && informacion.hermanos.length > 0);

  if (!hasData) {
    return <p className="text-gray-500 text-sm">Sin información registrada</p>;
  }

  return (
    <div className="space-y-6">
      {/* Cónyuge */}
      {informacion.conyuge && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 text-sm">Cónyuge</h4>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Nombre</p>
                <p className="font-medium text-gray-800">
                  {informacion.conyuge.nombre}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Edad</p>
                <p className="font-medium text-gray-800">
                  {informacion.conyuge.edad} años
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Ocupación</p>
                <p className="font-medium text-gray-800">
                  {informacion.conyuge.ocupacion}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hijos */}
      {informacion.hijos && informacion.hijos.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 text-sm">Hijos</h4>
          <div className="space-y-3">
            {informacion.hijos.map((hijo, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Nombre</p>
                    <p className="font-medium text-gray-800">{hijo.nombre}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Edad</p>
                    <p className="font-medium text-gray-800">
                      {hijo.edad} años
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Ocupación</p>
                    <p className="font-medium text-gray-800">
                      {hijo.ocupacion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Padres */}
      {informacion.padres && informacion.padres.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 text-sm">Padres</h4>
          <div className="space-y-3">
            {informacion.padres.map((padre, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Nombre</p>
                    <p className="font-medium text-gray-800">{padre.nombre}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Edad</p>
                    <p className="font-medium text-gray-800">
                      {padre.edad} años
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Ocupación</p>
                    <p className="font-medium text-gray-800">
                      {padre.ocupacion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hermanos */}
      {informacion.hermanos && informacion.hermanos.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 text-sm">Hermanos</h4>
          <div className="space-y-3">
            {informacion.hermanos.map((hermano, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Nombre</p>
                    <p className="font-medium text-gray-800">
                      {hermano.nombre}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Edad</p>
                    <p className="font-medium text-gray-800">
                      {hermano.edad} años
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Ocupación</p>
                    <p className="font-medium text-gray-800">
                      {hermano.ocupacion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
