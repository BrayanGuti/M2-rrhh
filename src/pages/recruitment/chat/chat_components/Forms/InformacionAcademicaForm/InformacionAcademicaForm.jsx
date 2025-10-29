// chat_components/Forms/InformacionAcademicaForm.jsx
import { useState, useEffect } from "react";
import { useFormDataStore } from "../../../stores/useFormDataStore";
import { VACANCY_COVERTATION_PHASES } from "../../../const";

const FORMACION_OPTIONS = [
  "Primaria",
  "Bachillerato",
  "Técnico",
  "Tecnólogo",
  "Universitario",
  "Posgrado",
];

export function InformacionAcademicaForm() {
  const { formData, setSection, validateSection } = useFormDataStore();

  const [localData, setLocalData] = useState({
    formacion: formData.informacion_academica.formacion || "",
    titulo_obtenido: formData.informacion_academica.titulo_obtenido || "",
    anio_terminacion: formData.informacion_academica.anio_terminacion || 0,
    otros_estudios:
      formData.informacion_academica.otros_estudios?.length > 0
        ? formData.informacion_academica.otros_estudios
        : [""], // ✅ Inicia con un string vacío
    estudio_actual:
      formData.informacion_academica.estudio_actual?.length > 0
        ? formData.informacion_academica.estudio_actual
        : [""], // ✅ Inicia con un string vacío
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const triggerValidation = () => {
      const result = validateSection(
        VACANCY_COVERTATION_PHASES.form_informacion_academica
      );
      setErrors(result.errors);
      return result.isValid;
    };

    // Exponer globalmente para que el botón la pueda llamar
    window.__validateCurrentForm = triggerValidation;

    return () => {
      delete window.__validateCurrentForm;
    };
  }, [validateSection]);

  const handleChange = (field, value) => {
    setLocalData((prev) => {
      if (prev[field] === value) return prev;
      return { ...prev, [field]: value };
    });

    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev) => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }

    // Guardar en el store global
    setSection(
      VACANCY_COVERTATION_PHASES.form_informacion_academica,
      (prev) => ({
        ...prev,
        [field]: value,
      })
    );
  };

  // Manejar "No Aplica" para título obtenido
  const handleNoAplica = () => {
    setLocalData((prev) => ({
      ...prev,
      titulo_obtenido: null,
    }));

    // Limpiar error del campo
    if (errors.titulo_obtenido) {
      setErrors((prev) => {
        const { titulo_obtenido: _, ...rest } = prev;
        return rest;
      });
    }

    // Guardar null en el store global
    setSection(
      VACANCY_COVERTATION_PHASES.form_informacion_academica,
      (prev) => ({
        ...prev,
        titulo_obtenido: null,
      })
    );
  };

  // Manejar cambios en arrays dinámicos
  const handleArrayChange = (field, index, value) => {
    setLocalData((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;

      const updated = { ...prev, [field]: newArray };

      // Guardar en el store global
      setSection(
        VACANCY_COVERTATION_PHASES.form_informacion_academica,
        (prevStore) => ({
          ...prevStore,
          [field]: newArray,
        })
      );

      return updated;
    });
  };

  // Agregar nuevo elemento al array
  const handleAddToArray = (field) => {
    if (localData[field].length < 3) {
      setLocalData((prev) => {
        const newArray = [...prev[field], ""];

        const updated = { ...prev, [field]: newArray };

        // Guardar en el store global
        setSection(
          VACANCY_COVERTATION_PHASES.form_informacion_academica,
          (prevStore) => ({
            ...prevStore,
            [field]: newArray,
          })
        );

        return updated;
      });
    }
  };

  // Eliminar elemento del array
  const handleRemoveFromArray = (field, index) => {
    setLocalData((prev) => {
      const newArray = prev[field].filter((_, i) => i !== index);

      const updated = { ...prev, [field]: newArray };

      // Guardar en el store global
      setSection(
        VACANCY_COVERTATION_PHASES.form_informacion_academica,
        (prevStore) => ({
          ...prevStore,
          [field]: newArray,
        })
      );

      return updated;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#44BBA4]/20">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#15616D]/10">
        <span className="text-3xl">🎓</span>
        <div>
          <h3 className="text-lg font-bold text-[#15616D]">
            Información Académica
          </h3>
          <p className="text-xs text-[#15616D]/60">
            Cuéntanos sobre tu formación educativa
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Sección: Formación Principal */}
        <Section title="📚 Formación Principal">
          <FormacionSelect
            handleChange={handleChange}
            localData={localData}
            errors={errors}
          />

          <TituloObtenidoInput
            handleChange={handleChange}
            handleNoAplica={handleNoAplica}
            localData={localData}
            errors={errors}
          />

          <AnioTerminacionInput
            handleChange={handleChange}
            localData={localData}
            errors={errors}
          />
        </Section>

        {/* Sección: Otros Estudios */}
        <Section title="📖 Otros Estudios (Opcional)">
          <p className="text-xs text-[#15616D]/60 mb-3">
            Agrega cursos, diplomados o certificaciones adicionales (máximo 3)
          </p>
          <DynamicArrayInput
            field="otros_estudios"
            localData={localData}
            handleArrayChange={handleArrayChange}
            handleAddToArray={handleAddToArray}
            handleRemoveFromArray={handleRemoveFromArray}
            placeholder="Ej: Curso de Excel Avanzado"
          />
        </Section>

        {/* Sección: Estudios Actuales */}
        <Section title="📝 Estudios Actuales (Opcional)">
          <p className="text-xs text-[#15616D]/60 mb-3">
            Agrega estudios que estés cursando actualmente (máximo 3)
          </p>
          <DynamicArrayInput
            field="estudio_actual"
            localData={localData}
            handleArrayChange={handleArrayChange}
            handleAddToArray={handleAddToArray}
            handleRemoveFromArray={handleRemoveFromArray}
            placeholder="Ej: Diplomado en Gestión Hotelera"
          />
        </Section>
      </div>
    </div>
  );
}

// Componente de Sección para agrupar campos
function Section({ title, children }) {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-[#15616D]/10">
      <h4 className="text-sm font-semibold text-[#15616D] mb-3">{title}</h4>
      {children}
    </div>
  );
}

function FormacionSelect({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Nivel de Formación <span className="text-red-500">*</span>
      </label>
      <select
        value={localData.formacion}
        onChange={(e) => handleChange("formacion", e.target.value)}
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.formacion ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Selecciona tu nivel de formación</option>
        {FORMACION_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors.formacion && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.formacion}
        </p>
      )}
    </div>
  );
}

function TituloObtenidoInput({
  handleChange,
  handleNoAplica,
  localData,
  errors,
}) {
  const isNoAplica = localData.titulo_obtenido === null;
  const isPrimaria = localData.formacion === "Primaria";

  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Título Obtenido {!isPrimaria && <span className="text-red-500">*</span>}
        {isPrimaria && (
          <span className="text-[#15616D]/60 text-xs ml-1">
            (Opcional para Primaria)
          </span>
        )}
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={isNoAplica ? "" : localData.titulo_obtenido}
          onChange={(e) => handleChange("titulo_obtenido", e.target.value)}
          placeholder="Ej: Bachiller Académico, Técnico en Cocina"
          disabled={isNoAplica}
          className={`flex-1 px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
            isNoAplica ? "bg-gray-100 cursor-not-allowed" : ""
          } ${errors.titulo_obtenido ? "border-red-500" : "border-gray-300"}`}
        />
        <button
          type="button"
          onClick={() =>
            isNoAplica ? handleChange("titulo_obtenido", "") : handleNoAplica()
          }
          className={`px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
            isNoAplica
              ? "bg-[#44BBA4] text-white hover:bg-[#3a9d8a]"
              : "bg-gray-200 text-[#15616D] hover:bg-gray-300"
          }`}
        >
          {isNoAplica ? "Aplica" : "No Aplica"}
        </button>
      </div>
      {errors.titulo_obtenido && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.titulo_obtenido}
        </p>
      )}
    </div>
  );
}

function AnioTerminacionInput({ handleChange, localData, errors }) {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Año de Terminación <span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        value={localData.anio_terminacion || ""}
        onChange={(e) => {
          const value = e.target.value;
          handleChange("anio_terminacion", value === "" ? "" : Number(value));
        }}
        min="1950"
        max={currentYear}
        placeholder={`Ej: ${currentYear - 5}`}
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.anio_terminacion ? "border-red-500" : "border-gray-300"
        }`}
        style={{
          MozAppearance: "textfield",
          WebkitAppearance: "none",
          appearance: "none",
        }}
      />
      <style>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
      {errors.anio_terminacion && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.anio_terminacion}
        </p>
      )}
      {localData.anio_terminacion > 0 && (
        <p className="text-xs text-[#15616D]/60 mt-1">
          Hace {currentYear - localData.anio_terminacion} año(s)
        </p>
      )}
    </div>
  );
}

function DynamicArrayInput({
  field,
  localData,
  handleArrayChange,
  handleAddToArray,
  handleRemoveFromArray,
  placeholder,
}) {
  const items = localData[field] || [];
  const canAddMore = items.length < 3;

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-medium text-[#15616D] min-w-[20px]">
                {index + 1}.
              </span>
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleArrayChange(field, index, e.target.value)
                }
                placeholder={placeholder}
                className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {items.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveFromArray(field, index)}
              className="w-full sm:w-auto mt-2 sm:mt-0 px-3 py-2 bg-[#FFE6E1] text-[#D9534F] rounded-lg hover:bg-[#FFD6CF] transition-colors self-start sm:self-center text-sm font-medium"
              title="Eliminar"
            >
              Eliminar
            </button>
          )}
        </div>
      ))}

      {canAddMore && (
        <button
          type="button"
          onClick={() => handleAddToArray(field)}
          className="w-full px-3 py-2 border-2 border-dashed border-[#44BBA4] text-[#44BBA4] rounded-lg hover:bg-[#44BBA4]/10 transition-colors font-medium flex items-center justify-center gap-1 text-sm"
          aria-label="Agregar otro campo"
        >
          <span className="text-lg">+</span>
          <span className="hidden sm:inline">Agregar otro campo</span>
          <span className="sm:hidden">Agregar</span>
        </button>
      )}

      {items.length >= 3 && (
        <p className="text-xs text-[#15616D]/60 text-center">
          Máximo de 3 campos alcanzado
        </p>
      )}
    </div>
  );
}
