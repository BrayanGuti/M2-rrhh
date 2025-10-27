export function Tallas({ tallas }) {
  if (!tallas) {
    return <p className="text-gray-500 text-sm">Sin información registrada</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tallas.talla_camisa_blusa && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Talla Camisa/Blusa</p>
          <p className="font-medium text-gray-800">
            {tallas.talla_camisa_blusa}
          </p>
        </div>
      )}
      {tallas.talla_pantalon && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Talla Pantalón</p>
          <p className="font-medium text-gray-800">{tallas.talla_pantalon}</p>
        </div>
      )}
      {tallas.talla_calzado && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Talla Calzado</p>
          <p className="font-medium text-gray-800">{tallas.talla_calzado}</p>
        </div>
      )}
    </div>
  );
}
