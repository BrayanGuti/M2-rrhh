// chat_components/Forms/CandidatoForm.jsx
import { useState, useEffect } from "react";
import { useFormDataStore } from "../../stores/useFormDataStore";
import { VACANCY_COVERTATION_PHASES } from "../../const";

// Función para calcular edad desde fecha de nacimiento
const calculateAge = (birthDate) => {
  if (!birthDate) return 0;

  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  // Ajustar si aún no ha cumplido años este año
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export function CandidatoForm() {
  const { formData, setSection, validateSection } = useFormDataStore();

  const [localData, setLocalData] = useState({
    nombre_completo: formData.candidato.nombre_completo || "",
    correo_electronico: formData.candidato.correo_electronico || "",
    telefono_movil: formData.candidato.telefono_movil || "",
    documento_identidad: formData.candidato.documento_identidad || "",
    expedida_en: formData.candidato.expedida_en || "",
    edad: formData.candidato.edad || 0,
    lugar_nacimiento: formData.candidato.lugar_nacimiento || "",
    fecha_nacimiento: formData.candidato.fecha_nacimiento || "",
  });

  const [errors, setErrors] = useState({});

  // 🔥 Exponer función de validación para que ActionButtonArea la pueda llamar
  useEffect(() => {
    const triggerValidation = () => {
      const result = validateSection(VACANCY_COVERTATION_PHASES.form_candidato);
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
    setSection(VACANCY_COVERTATION_PHASES.form_candidato, (prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Manejar cambio de fecha de nacimiento y calcular edad automáticamente
  const handleDateChange = (value) => {
    const calculatedAge = calculateAge(value);

    setLocalData((prev) => ({
      ...prev,
      fecha_nacimiento: value,
      edad: calculatedAge,
    }));

    // Limpiar errores de ambos campos
    if (errors.fecha_nacimiento || errors.edad) {
      setErrors((prev) => {
        const { fecha_nacimiento: _, edad: __, ...rest } = prev;
        return rest;
      });
    }

    // Guardar en el store global (fecha y edad)
    setSection(VACANCY_COVERTATION_PHASES.form_candidato, (prev) => ({
      ...prev,
      fecha_nacimiento: value,
      edad: calculatedAge,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#44BBA4]/20">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#15616D]/10">
        <span className="text-3xl">👤</span>
        <div>
          <h3 className="text-lg font-bold text-[#15616D]">
            Información Personal
          </h3>
          <p className="text-xs text-[#15616D]/60">
            Completa tus datos personales
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <NombreCompletoInput
          handleChange={handleChange}
          localData={localData}
          errors={errors}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CorreoElectronicoInput
            handleChange={handleChange}
            localData={localData}
            errors={errors}
          />
          <TelefonoMovilInput
            handleChange={handleChange}
            localData={localData}
            errors={errors}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DocumentoIdentidadInput
            handleChange={handleChange}
            localData={localData}
            errors={errors}
          />
          <ExpedidaEnInput
            handleChange={handleChange}
            localData={localData}
            errors={errors}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FechaNacimientoInput
            handleDateChange={handleDateChange}
            localData={localData}
            errors={errors}
          />
          <EdadDisplay localData={localData} errors={errors} />
        </div>

        <LugarNacimientoInput
          handleChange={handleChange}
          localData={localData}
          errors={errors}
        />
      </div>
    </div>
  );
}

function NombreCompletoInput({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Nombre Completo <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={localData.nombre_completo}
        onChange={(e) => handleChange("nombre_completo", e.target.value)}
        placeholder="Ej: Juan Andres Pérez García"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.nombre_completo ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.nombre_completo && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.nombre_completo}
        </p>
      )}
    </div>
  );
}

function CorreoElectronicoInput({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Correo Electrónico <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        value={localData.correo_electronico}
        onChange={(e) => handleChange("correo_electronico", e.target.value)}
        placeholder="ejemplo@correo.com"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.correo_electronico ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.correo_electronico && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.correo_electronico}
        </p>
      )}
    </div>
  );
}

function TelefonoMovilInput({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Teléfono Móvil <span className="text-red-500">*</span>
      </label>
      <input
        type="tel"
        value={localData.telefono_movil}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, ""); // Solo números
          handleChange("telefono_movil", value);
        }}
        placeholder="3001234567"
        maxLength="10"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.telefono_movil ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.telefono_movil && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.telefono_movil}
        </p>
      )}
    </div>
  );
}

function DocumentoIdentidadInput({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Documento de Identidad <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={localData.documento_identidad}
        onChange={(e) => handleChange("documento_identidad", e.target.value)}
        placeholder="1234567890"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.documento_identidad ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.documento_identidad && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.documento_identidad}
        </p>
      )}
    </div>
  );
}

function ExpedidaEnInput({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Expedida en <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={localData.expedida_en}
        onChange={(e) => handleChange("expedida_en", e.target.value)}
        placeholder="Ej: Bogotá"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.expedida_en ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.expedida_en && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.expedida_en}
        </p>
      )}
    </div>
  );
}

function FechaNacimientoInput({ handleDateChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Fecha de Nacimiento <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        value={localData.fecha_nacimiento}
        onChange={(e) => handleDateChange(e.target.value)}
        max={new Date().toISOString().split("T")[0]} // No permitir fechas futuras
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.fecha_nacimiento ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.fecha_nacimiento && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.fecha_nacimiento}
        </p>
      )}
    </div>
  );
}

function EdadDisplay({ localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Edad <span className="text-red-500">*</span>
      </label>
      <div
        className={`w-full px-4 py-3 border rounded-lg bg-gray-50 text-[#15616D] flex items-center ${
          errors.edad ? "border-red-500" : "border-gray-300"
        }`}
      >
        <span className="text-2xl mr-2">🎂</span>
        <span className="font-semibold">
          {localData.edad > 0
            ? `${localData.edad} años`
            : "Selecciona tu fecha de nacimiento"}
        </span>
      </div>
      {errors.edad && (
        <p className="text-xs text-red-500 mt-1 animate-shake">{errors.edad}</p>
      )}
    </div>
  );
}

function LugarNacimientoInput({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Lugar de Nacimiento <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={localData.lugar_nacimiento}
        onChange={(e) => handleChange("lugar_nacimiento", e.target.value)}
        placeholder="Ej: Medellín, Antioquia"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.lugar_nacimiento ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.lugar_nacimiento && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.lugar_nacimiento}
        </p>
      )}
    </div>
  );
}
