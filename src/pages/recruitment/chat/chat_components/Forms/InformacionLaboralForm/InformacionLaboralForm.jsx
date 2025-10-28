// chat_components/Forms/InformacionLaboralForm.jsx
import { useState, useEffect } from "react";
import { useFormDataStore } from "../../../stores/useFormDataStore";

const MAX_AMOUNT_EXPERIENCIAS = 3;

const EMPTY_EXPERIENCIA = {
  nombre: "",
  telefono: "",
  cargo: "",
  experiencia: "",
  motivo_retiro: "",
  funciones_realizadas: "",
  logros: "",
  dificultades: "",
};

export function InformacionLaboralForm() {
  const { formData, setSection, validateSection } = useFormDataStore();

  const [experiencias, setExperiencias] = useState(
    formData.informacion_laboral.length > 0 ? formData.informacion_laboral : []
  );

  const [sinExperiencia, setSinExperiencia] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const triggerValidation = () => {
      // Si marcó "sin experiencia", siempre es válido
      if (sinExperiencia) {
        setErrors({});
        return true;
      }

      // Ejecutar validación
      const result = validateSection("informacion_laboral");

      // IMPORTANTE: Actualizar errores en el estado
      setErrors(result.errors);

      return result.isValid;
    };

    window.__validateCurrentForm = triggerValidation;
    return () => delete window.__validateCurrentForm;
  }, [validateSection, sinExperiencia, experiencias]);

  const handleSinExperiencia = () => {
    setSinExperiencia(true);
    setExperiencias([]);
    setSection("informacion_laboral", []);
    setErrors({});
  };

  const addExperiencia = () => {
    if (experiencias.length < MAX_AMOUNT_EXPERIENCIAS) {
      setSinExperiencia(false);
      const newExperiencias = [...experiencias, EMPTY_EXPERIENCIA];
      setExperiencias(newExperiencias);
      setSection("informacion_laboral", newExperiencias);
    }
  };

  const removeExperiencia = (index) => {
    const newExperiencias = experiencias.filter((_, i) => i !== index);
    setExperiencias(newExperiencias);
    setSection("informacion_laboral", newExperiencias);

    // Limpiar errores de esta experiencia
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith(`exp_${index}_`)) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
  };

  const updateExperiencia = (index, field, value) => {
    const newExperiencias = [...experiencias];
    newExperiencias[index] = {
      ...newExperiencias[index],
      [field]: value,
    };
    setExperiencias(newExperiencias);
    setSection("informacion_laboral", newExperiencias);

    // Limpiar error del campo específico
    const errorKey = `exp_${index}_${field}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  const canAddMore = experiencias.length < MAX_AMOUNT_EXPERIENCIAS;

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-[#44BBA4]/20">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-6 pb-4 border-b border-[#15616D]/10">
        <span className="text-3xl">💼</span>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#15616D]">
            Experiencia Laboral
          </h3>
          <p className="text-xs text-[#15616D]/60">
            Agrega hasta 3 experiencias laborales previas
          </p>
        </div>
      </div>

      {sinExperiencia ? (
        <div className="text-center py-6 sm:py-8 bg-blue-50 rounded-lg border-2 border-blue-200">
          <span className="text-4xl sm:text-5xl mb-3 block">📋</span>
          <p className="text-[#15616D] font-medium mb-2">
            Has indicado que no tienes experiencia laboral previa
          </p>
          <p className="text-sm text-gray-600 mb-4">
            No hay problema, puedes continuar con el proceso
          </p>
          <button
            onClick={() => {
              setSinExperiencia(false);
              addExperiencia();
            }}
            className="px-4 py-2 text-sm bg-[#44BBA4] hover:bg-[#3aa18e] text-white rounded-lg transition-colors"
          >
            Cambiar y Agregar Experiencia
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiencias.length === 0 ? (
            <div className="text-center py-6 sm:py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <span className="text-4xl sm:text-5xl mb-3 block">💼</span>
              <p className="text-gray-600 mb-4 text-sm sm:text-base px-4">
                Agrega tu experiencia laboral o indica si no tienes
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center px-4">
                <button
                  onClick={addExperiencia}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#44BBA4] hover:bg-[#3aa18e] text-white rounded-lg transition-colors font-medium"
                >
                  + Agregar Experiencia
                </button>
                <button
                  onClick={handleSinExperiencia}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                >
                  No Tengo Experiencia
                </button>
              </div>
            </div>
          ) : (
            <>
              {experiencias.map((exp, index) => (
                <ExperienciaCard
                  key={index}
                  experiencia={exp}
                  index={index}
                  onUpdate={updateExperiencia}
                  onRemove={removeExperiencia}
                  errors={errors}
                  canRemove={
                    experiencias.length > 1 || experiencias.length === 1
                  }
                />
              ))}

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {canAddMore && (
                  <button
                    onClick={addExperiencia}
                    className="flex-1 py-2 sm:py-3 border-2 border-dashed border-[#44BBA4] text-[#44BBA4] hover:bg-[#44BBA4] hover:text-white rounded-lg transition-colors font-medium text-sm sm:text-base"
                  >
                    + Agregar Otra Experiencia ({experiencias.length}/
                    {MAX_AMOUNT_EXPERIENCIAS})
                  </button>
                )}
                {experiencias.length > 0 && (
                  <button
                    onClick={handleSinExperiencia}
                    className="sm:w-auto px-4 py-2 sm:py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium text-sm sm:text-base"
                  >
                    No Tengo Experiencia
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ExperienciaCard({
  experiencia,
  index,
  onUpdate,
  onRemove,
  errors,
  canRemove,
}) {
  const getError = (field) => errors[`exp_${index}_${field}`];

  return (
    <div className="border-2 border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm sm:text-md font-semibold text-[#15616D]">
          Experiencia #{index + 1}
        </h4>
        {canRemove && (
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 text-xs sm:text-sm font-medium"
          >
            ✕ Eliminar
          </button>
        )}
      </div>

      <div className="space-y-3">
        {/* Nombre de la Empresa */}
        <div>
          <input
            type="text"
            placeholder="Nombre de la empresa *"
            value={experiencia.nombre}
            onChange={(e) => onUpdate(index, "nombre", e.target.value)}
            className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-[#15616D] text-sm sm:text-base focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
              getError("nombre") ? "border-red-500" : "border-gray-300"
            }`}
          />
          {getError("nombre") && (
            <p className="text-xs text-red-500 mt-1">{getError("nombre")}</p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <input
            type="tel"
            placeholder="Teléfono de contacto *"
            value={experiencia.telefono}
            onChange={(e) => onUpdate(index, "telefono", e.target.value)}
            className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-[#15616D] text-sm sm:text-base focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
              getError("telefono") ? "border-red-500" : "border-gray-300"
            }`}
          />
          {getError("telefono") && (
            <p className="text-xs text-red-500 mt-1">{getError("telefono")}</p>
          )}
        </div>

        {/* Cargo */}
        <div>
          <input
            type="text"
            placeholder="Cargo desempeñado *"
            value={experiencia.cargo}
            onChange={(e) => onUpdate(index, "cargo", e.target.value)}
            className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-[#15616D] text-sm sm:text-base focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
              getError("cargo") ? "border-red-500" : "border-gray-300"
            }`}
          />
          {getError("cargo") && (
            <p className="text-xs text-red-500 mt-1">{getError("cargo")}</p>
          )}
        </div>

        {/* Años de Experiencia */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#15616D] mb-1">
            Años de experiencia *
          </label>
          <input
            type="number"
            placeholder="Ej: 3"
            min="0"
            max="50"
            value={experiencia.experiencia ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              // Permitir campo vacío o número positivo
              if (value === "" || /^[0-9]*$/.test(value)) {
                onUpdate(
                  index,
                  "experiencia",
                  value === "" ? "" : Number(value)
                );
              }
            }}
            className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-[#15616D] text-sm sm:text-base focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors appearance-none 
      [-moz-appearance:textfield]
      [&::-webkit-outer-spin-button]:appearance-none
      [&::-webkit-inner-spin-button]:appearance-none
      ${getError("experiencia") ? "border-red-500" : "border-gray-300"}
    `}
          />
          {getError("experiencia") && (
            <p className="text-xs text-red-500 mt-1">
              {getError("experiencia")}
            </p>
          )}
        </div>

        {/* Motivo de Retiro */}
        <div>
          <input
            type="text"
            placeholder="Motivo de retiro *"
            value={experiencia.motivo_retiro}
            onChange={(e) => onUpdate(index, "motivo_retiro", e.target.value)}
            className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-[#15616D] text-sm sm:text-base focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
              getError("motivo_retiro") ? "border-red-500" : "border-gray-300"
            }`}
          />
          {getError("motivo_retiro") && (
            <p className="text-xs text-red-500 mt-1">
              {getError("motivo_retiro")}
            </p>
          )}
        </div>

        {/* Funciones Realizadas */}
        <div>
          <textarea
            placeholder="Funciones realizadas *"
            rows={3}
            value={experiencia.funciones_realizadas}
            onChange={(e) =>
              onUpdate(index, "funciones_realizadas", e.target.value)
            }
            className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-[#15616D] text-sm sm:text-base focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent resize-none transition-colors ${
              getError("funciones_realizadas")
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {getError("funciones_realizadas") && (
            <p className="text-xs text-red-500 mt-1">
              {getError("funciones_realizadas")}
            </p>
          )}
        </div>

        {/* Logros (Ahora Obligatorio) */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#15616D] mb-1">
            Logros *
          </label>
          <textarea
            placeholder="Logros destacados durante tu experiencia... *"
            rows={2}
            value={experiencia.logros}
            onChange={(e) => onUpdate(index, "logros", e.target.value)}
            className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-[#15616D] text-sm sm:text-base focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent resize-none transition-colors ${
              getError("logros") ? "border-red-500" : "border-gray-300"
            }`}
          />
          {getError("logros") && (
            <p className="text-xs text-red-500 mt-1">{getError("logros")}</p>
          )}
        </div>

        {/* Dificultades (Ahora Obligatorio) */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#15616D] mb-1">
            Dificultades *
          </label>
          <textarea
            placeholder="Dificultades enfrentadas... *"
            rows={2}
            value={experiencia.dificultades}
            onChange={(e) => onUpdate(index, "dificultades", e.target.value)}
            className={`w-full px-3 sm:px-4 py-2 border rounded-lg text-[#15616D] text-sm sm:text-base focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent resize-none transition-colors ${
              getError("dificultades") ? "border-red-500" : "border-gray-300"
            }`}
          />
          {getError("dificultades") && (
            <p className="text-xs text-red-500 mt-1">
              {getError("dificultades")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
