// chat_components/Forms/DatosGeneralesForm.jsx
import { useState, useEffect } from "react";
import { useFormDataStore } from "../../../stores/useFormDataStore";
import { VACANCY_COVERTATION_PHASES } from "../../../const";
import { Info, Calendar, Briefcase } from "lucide-react";

const FORMAS_ENTERARSE = [
  "Portal de empleo (LinkedIn)",
  "Portal de empleo (Indeed)",
  "Portal de empleo (CompuTrabajo)",
  "Redes sociales (Facebook, Instagram, etc.)",
  "Referido por conocido/amigo",
  "Referido por empleado de la empresa",
  "Página web de la empresa",
  "Anuncio en prensa/periódico",
  "Feria de empleo",
  "Universidad/Institución educativa",
  "Otro",
];

const DATOS_INICIALES = {
  como_se_entero_empleo: "",
  tiene_familiares_empresa: false,
  lo_recomienda_alguien: false,
  ha_trabajado_con_nosotros: false,
  puede_viajar: false,
  dispuesto_cambiar_residencia: false,
  fecha_disponibilidad: "",
};

export function DatosGeneralesForm() {
  const { formData, setSection, validateSection } = useFormDataStore();

  const [localData, setLocalData] = useState({
    ...DATOS_INICIALES,
    ...formData.datos_generales,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Sincronizar con el store al iniciar
  useEffect(() => {
    setSection(VACANCY_COVERTATION_PHASES.form_datos_generales, localData);
  }, []);

  // 🔥 Exponer función de validación global
  useEffect(() => {
    const triggerValidation = () => {
      const result = validateSection(
        VACANCY_COVERTATION_PHASES.form_datos_generales
      );

      // Marcar todos los campos requeridos como touched
      setTouched({
        como_se_entero_empleo: true,
        fecha_disponibilidad: true,
      });

      setErrors(result.errors);
      return result.isValid;
    };

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

    // Marcar campo como touched
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev) => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }

    // Guardar en el store
    setSection(VACANCY_COVERTATION_PHASES.form_datos_generales, (prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#44BBA4]/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#15616D]/10">
        <Info className="text-[#44BBA4]" size={32} />
        <div>
          <h3 className="text-lg font-bold text-[#15616D]">Datos Generales</h3>
          <p className="text-xs text-[#15616D]/60">
            Información adicional sobre tu aplicación
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Cómo se enteró del empleo */}
        <ComoSeEnteroSelect
          handleChange={handleChange}
          localData={localData}
          errors={errors}
          touched={touched}
        />

        {/* Preguntas de Sí/No */}
        <div className="space-y-4">
          <PreguntaSiNo
            label="¿Tiene familiares trabajando en la empresa?"
            field="tiene_familiares_empresa"
            value={localData.tiene_familiares_empresa}
            handleChange={handleChange}
          />

          <PreguntaSiNo
            label="¿Lo recomienda alguien de la empresa?"
            field="lo_recomienda_alguien"
            value={localData.lo_recomienda_alguien}
            handleChange={handleChange}
          />

          <PreguntaSiNo
            label="¿Ha trabajado con nosotros anteriormente?"
            field="ha_trabajado_con_nosotros"
            value={localData.ha_trabajado_con_nosotros}
            handleChange={handleChange}
            icon="📋"
          />

          <PreguntaSiNo
            label="¿Puede viajar por motivos de trabajo?"
            field="puede_viajar"
            value={localData.puede_viajar}
            handleChange={handleChange}
          />

          <PreguntaSiNo
            label="¿Está dispuesto a cambiar de residencia?"
            field="dispuesto_cambiar_residencia"
            value={localData.dispuesto_cambiar_residencia}
            handleChange={handleChange}
          />
        </div>

        {/* Fecha de disponibilidad */}
        <FechaDisponibilidadInput
          handleChange={handleChange}
          localData={localData}
          errors={errors}
          touched={touched}
        />
      </div>
    </div>
  );
}

function ComoSeEnteroSelect({ handleChange, localData, errors, touched }) {
  const showError =
    touched.como_se_entero_empleo && errors.como_se_entero_empleo;

  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        ¿Cómo se enteró de este empleo? <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <Briefcase
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#15616D]/40"
          size={20}
        />
        <select
          value={localData.como_se_entero_empleo}
          onChange={(e) =>
            handleChange("como_se_entero_empleo", e.target.value)
          }
          className={`w-full pl-11 pr-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors appearance-none bg-white ${
            showError ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Selecciona una opción</option>
          {FORMAS_ENTERARSE.map((forma) => (
            <option key={forma} value={forma}>
              {forma}
            </option>
          ))}
        </select>
      </div>
      {showError && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.como_se_entero_empleo}
        </p>
      )}
    </div>
  );
}

function PreguntaSiNo({ label, field, value, handleChange }) {
  return (
    <div className="p-3 border border-[#15616D]/20 rounded-lg bg-gray-50">
      <label className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#15616D] mb-2">{label}</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleChange(field, true)}
              className={`w-20 py-1.5 px-3 text-sm rounded-md font-medium transition-all ${
                value === true
                  ? "bg-[#44BBA4] text-white shadow-sm"
                  : "bg-white text-[#15616D] border border-gray-300 hover:border-[#44BBA4]"
              }`}
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => handleChange(field, false)}
              className={`w-20 py-1.5 px-3 text-sm rounded-md font-medium transition-all ${
                value === false
                  ? "bg-[#E63946] text-white shadow-sm"
                  : "bg-white text-[#15616D] border border-gray-300 hover:border-[#E63946]"
              }`}
            >
              No
            </button>
          </div>
        </div>
      </label>
    </div>
  );
}

function FechaDisponibilidadInput({
  handleChange,
  localData,
  errors,
  touched,
}) {
  const showError = touched.fecha_disponibilidad && errors.fecha_disponibilidad;

  // Obtener fecha mínima (hoy)
  const today = new Date().toISOString().split("T")[0];

  // Calcular fecha máxima (6 meses desde hoy)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Fecha de Disponibilidad <span className="text-red-500">*</span>
      </label>
      <p className="text-xs text-[#15616D]/60 mb-2">
        ¿A partir de qué fecha puedes comenzar a trabajar?
      </p>
      <div className="relative">
        <Calendar
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#15616D]/40 pointer-events-none"
          size={20}
        />
        <input
          type="date"
          value={localData.fecha_disponibilidad}
          onChange={(e) => handleChange("fecha_disponibilidad", e.target.value)}
          min={today}
          max={maxDateStr}
          className={`w-full pl-11 pr-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
            showError ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {showError && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.fecha_disponibilidad}
        </p>
      )}
      {localData.fecha_disponibilidad && (
        <p className="text-xs text-[#44BBA4] mt-1">
          📅 Disponible desde:{" "}
          {new Date(
            localData.fecha_disponibilidad + "T00:00:00"
          ).toLocaleDateString("es-CO", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
    </div>
  );
}
