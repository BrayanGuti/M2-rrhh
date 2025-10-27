// chat_components/Forms/DatosPostulacionForm.jsx
import { useState, useEffect } from "react";
import { useFormDataStore } from "../../../stores/useFormDataStore";
import { getCurrentDateISO } from "../../../services/dateUtils";
import { VACANCY_COVERTATION_PHASES } from "../../../const/Phases";
import { POSITIONS, SEDES } from "../../../../../../const/Positions";

// Constante de sedes disponibles

export function DatosPostulacionForm() {
  const { formData, setSection, validateSection } = useFormDataStore();

  const currentDate = getCurrentDateISO();

  const [localData, setLocalData] = useState({
    fecha_solicitud: formData.datos_postulacion.fecha_solicitud || currentDate,
    puesto_aspirado: formData.datos_postulacion.puesto_aspirado || "",
    sueldo_deseado: formData.datos_postulacion.sueldo_deseado || "",
    sede: formData.datos_postulacion.sede || "",
  });

  const [errors, setErrors] = useState({});

  // Guardar fecha automáticamente en el store al montar
  useEffect(() => {
    setSection(VACANCY_COVERTATION_PHASES.form_datos_postulacion, (prev) => ({
      ...prev,
      fecha_solicitud: localData.fecha_solicitud,
    }));
  }, []);

  // 🔥 Exponer función de validación para que ActionButtonArea la pueda llamar
  useEffect(() => {
    const triggerValidation = () => {
      const result = validateSection(
        VACANCY_COVERTATION_PHASES.form_datos_postulacion
      );
      setErrors(result.errors);
      return result.isValid;
    };

    // Exponer globalmente para que el botón la pueda llamar
    window.__validateCurrentForm = triggerValidation;

    return () => {
      delete window.__validateCurrentForm;
    };
  }, [validateSection]); // Se actualiza cuando validateSection cambie

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
    setSection(VACANCY_COVERTATION_PHASES.form_datos_postulacion, (prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#44BBA4]/20">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#15616D]/10">
        <span className="text-3xl">💼</span>
        <div>
          <h3 className="text-lg font-bold text-[#15616D]">
            Datos de Postulación
          </h3>
          <p className="text-xs text-[#15616D]/60">
            Completa la información de tu aplicación
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <PuestoAspiradoSelect
          handleChange={handleChange}
          localData={localData}
          errors={errors}
        />
        <SedeSelect
          handleChange={handleChange}
          localData={localData}
          errors={errors}
        />
        <SueldoDeseadoInput
          handleChange={handleChange}
          localData={localData}
          errors={errors}
        />
      </div>
    </div>
  );
}

function PuestoAspiradoSelect({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Puesto al que Aspiras <span className="text-red-500">*</span>
      </label>
      <select
        value={localData.puesto_aspirado}
        onChange={(e) => handleChange("puesto_aspirado", e.target.value)}
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.puesto_aspirado ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Selecciona un puesto</option>
        {POSITIONS.map((position) => (
          <option key={position} value={position}>
            {position}
          </option>
        ))}
      </select>
      {errors.puesto_aspirado && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.puesto_aspirado}
        </p>
      )}
    </div>
  );
}

function SedeSelect({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Sede de Preferencia <span className="text-red-500">*</span>
      </label>
      <select
        value={localData.sede}
        onChange={(e) => handleChange("sede", e.target.value)}
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.sede ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Selecciona una sede</option>
        {SEDES.map((sede) => (
          <option key={sede} value={sede}>
            {sede}
          </option>
        ))}
      </select>
      {errors.sede && (
        <p className="text-xs text-red-500 mt-1 animate-shake">{errors.sede}</p>
      )}
    </div>
  );
}

function SueldoDeseadoInput({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Sueldo Deseado (COP) <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#15616D]/60">
          $
        </span>
        <input
          type="number"
          value={localData.sueldo_deseado}
          onChange={(e) => {
            const value = e.target.value;
            handleChange("sueldo_deseado", value === "" ? "" : Number(value));
          }}
          placeholder="Ej: 1500000"
          className={`w-full pl-8 pr-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
            errors.sueldo_deseado ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {errors.sueldo_deseado && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.sueldo_deseado}
        </p>
      )}
      {localData.sueldo_deseado > 0 && (
        <p className="text-xs text-[#15616D]/60 mt-1">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
          }).format(localData.sueldo_deseado)}
        </p>
      )}
    </div>
  );
}
