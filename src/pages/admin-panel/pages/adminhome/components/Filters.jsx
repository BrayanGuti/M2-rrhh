import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { ORDER_LABELS } from "../constants/filters";

export function Filters({
  positions,
  cargoFilter,
  ordenFilter,
  onCargoChange,
  onOrdenChange,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-6 transition-all duration-300 hover:shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Filtrar por cargo */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Filtrar por cargo
          </label>
          <Select value={cargoFilter} onValueChange={onCargoChange}>
            <SelectTrigger className="w-full bg-white border border-gray-300 rounded-xl shadow-sm text-gray-700 hover:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-150">
              <SelectValue placeholder="Seleccionar cargo" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              <SelectItem
                value="todos"
                className="cursor-pointer transition-all hover:bg-blue-50"
              >
                Todos los cargos
              </SelectItem>
              {positions.map((position) => (
                <SelectItem
                  key={position}
                  value={position}
                  className="cursor-pointer transition-all hover:bg-blue-50"
                >
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ordenar por fecha */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Ordenar por fecha
          </label>
          <Select value={ordenFilter} onValueChange={onOrdenChange}>
            <SelectTrigger className="w-full bg-white border border-gray-300 rounded-xl shadow-sm text-gray-700 hover:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-150">
              <SelectValue placeholder="Seleccionar orden" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              <SelectItem
                value="DESC"
                className="cursor-pointer transition-all hover:bg-blue-50"
              >
                {ORDER_LABELS?.DESC || "Más recientes"}
              </SelectItem>
              <SelectItem
                value="ASC"
                className="cursor-pointer transition-all hover:bg-blue-50"
              >
                {ORDER_LABELS?.ASC || "Más antiguos"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
