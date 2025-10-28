export function DetallesPersonales({ detalles }) {
  if (!detalles) {
    return <p className="text-gray-500 text-sm">Sin información registrada</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {detalles.estado_civil && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Estado Civil</p>
          <p className="font-medium text-gray-800">{detalles.estado_civil}</p>
        </div>
      )}
      {detalles.numero_hijos !== undefined && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Número de Hijos</p>
          <p className="font-medium text-gray-800">{detalles.numero_hijos}</p>
        </div>
      )}
      {detalles.libreta_militar_numero && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Libreta Militar</p>
          <p className="font-medium text-gray-800">
            {detalles.libreta_militar_numero}
          </p>
        </div>
      )}
      {detalles.tipo_vivienda && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Tipo de Vivienda</p>
          <p className="font-medium text-gray-800">{detalles.tipo_vivienda}</p>
        </div>
      )}
      {detalles.valor_arriendo && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Valor Arriendo</p>
          <p className="font-medium text-gray-800">
            ${detalles.valor_arriendo.toLocaleString("es-CO")}
          </p>
        </div>
      )}
      {detalles.direccion_vivienda && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Dirección</p>
          <p className="font-medium text-gray-800">
            {detalles.direccion_vivienda}
          </p>
        </div>
      )}
      {detalles.barrio && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Barrio</p>
          <p className="font-medium text-gray-800">{detalles.barrio}</p>
        </div>
      )}
      {detalles.localidad && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Localidad</p>
          <p className="font-medium text-gray-800">{detalles.localidad}</p>
        </div>
      )}
      {detalles.ciudad && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Ciudad</p>
          <p className="font-medium text-gray-800">{detalles.ciudad}</p>
        </div>
      )}
      {detalles.pais && (
        <div>
          <p className="text-xs text-gray-500 mb-1">País</p>
          <p className="font-medium text-gray-800">{detalles.pais}</p>
        </div>
      )}
      {detalles.tiempo_que_habita && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Tiempo que Habita</p>
          <p className="font-medium text-gray-800">
            {detalles.tiempo_que_habita}
          </p>
        </div>
      )}
      {detalles.con_quien_vive && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Con Quién Vive</p>
          <p className="font-medium text-gray-800">{detalles.con_quien_vive}</p>
        </div>
      )}
      {detalles.eps && (
        <div>
          <p className="text-xs text-gray-500 mb-1">EPS</p>
          <p className="font-medium text-gray-800">{detalles.eps}</p>
        </div>
      )}
      {detalles.afp && (
        <div>
          <p className="text-xs text-gray-500 mb-1">AFP</p>
          <p className="font-medium text-gray-800">{detalles.afp}</p>
        </div>
      )}
      {detalles.observaciones && (
        <div className="md:col-span-2">
          <p className="text-xs text-gray-500 mb-1">Observaciones</p>
          <p className="font-medium text-gray-800">{detalles.observaciones}</p>
        </div>
      )}
    </div>
  );
}
