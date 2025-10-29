// chat_components/Forms/DetallesPersonalesForm.jsx
import { useState, useEffect } from "react";
import { useFormDataStore } from "../../stores/useFormDataStore";
import { VACANCY_COVERTATION_PHASES } from "../../const";

const ESTADO_CIVIL_OPTIONS = [
  "Soltero/a",
  "Casado/a",
  "Unión Libre",
  "Divorciado/a",
  "Viudo/a",
];

const TIPO_VIVIENDA_OPTIONS = ["Propia", "Arrendada", "Familiar"];

export function DetallesPersonalesForm() {
  const { formData, setSection, validateSection } = useFormDataStore();

  const [localData, setLocalData] = useState({
    observaciones: formData.detalles_personales.observaciones || "",
    libreta_militar_numero:
      formData.detalles_personales.libreta_militar_numero || "",
    estado_civil: formData.detalles_personales.estado_civil || "",
    numero_hijos: formData.detalles_personales.numero_hijos || 0,
    tipo_vivienda: formData.detalles_personales.tipo_vivienda || "",
    valor_arriendo: formData.detalles_personales.valor_arriendo || 0,
    direccion_vivienda: formData.detalles_personales.direccion_vivienda || "",
    tiempo_que_habita: formData.detalles_personales.tiempo_que_habita || "",
    barrio: formData.detalles_personales.barrio || "",
    localidad: formData.detalles_personales.localidad || "",
    telefono_fijo: formData.detalles_personales.telefono_fijo || "",
    con_quien_vive: formData.detalles_personales.con_quien_vive || "",
    eps: formData.detalles_personales.eps || "",
    afp: formData.detalles_personales.afp || "",
  });

  const [errors, setErrors] = useState({});

  // 🔥 Exponer función de validación para que ActionButtonArea la pueda llamar
  useEffect(() => {
    const triggerValidation = () => {
      const result = validateSection(
        VACANCY_COVERTATION_PHASES.form_detalles_personales
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
    setSection(VACANCY_COVERTATION_PHASES.form_detalles_personales, (prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Manejar "No Aplica" para campos opcionales
  const handleNoAplica = (field) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: null,
    }));

    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev) => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }

    // Guardar null en el store global
    setSection(VACANCY_COVERTATION_PHASES.form_detalles_personales, (prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#44BBA4]/20">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#15616D]/10">
        <span className="text-3xl">📋</span>
        <div>
          <h3 className="text-lg font-bold text-[#15616D]">
            Detalles Personales
          </h3>
          <p className="text-xs text-[#15616D]/60">
            Información adicional sobre tu situación personal
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Sección: Datos Civiles y Familiares */}
        <Section title="👨‍👩‍👧‍👦 Datos Civiles y Familiares">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EstadoCivilSelect
              handleChange={handleChange}
              localData={localData}
              errors={errors}
            />
            <NumeroHijosInput
              handleChange={handleChange}
              localData={localData}
              errors={errors}
            />
          </div>
          <ConQuienViveInput
            handleChange={handleChange}
            localData={localData}
            errors={errors}
          />
          <LibretaMilitarInput
            handleChange={handleChange}
            handleNoAplica={handleNoAplica}
            localData={localData}
            errors={errors}
          />
        </Section>

        {/* Sección: Información de Vivienda */}
        <Section title="🏠 Información de Vivienda">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TipoViviendaSelect
              handleChange={handleChange}
              localData={localData}
              errors={errors}
            />
            <ValorArriendoInput
              handleChange={handleChange}
              localData={localData}
              errors={errors}
            />
          </div>
          <DireccionViviendaInput
            handleChange={handleChange}
            localData={localData}
            errors={errors}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BarrioInput
              handleChange={handleChange}
              localData={localData}
              errors={errors}
            />
            <LocalidadInput
              handleChange={handleChange}
              localData={localData}
              errors={errors}
            />
            <TiempoQueHabitaInput
              handleChange={handleChange}
              localData={localData}
              errors={errors}
            />
          </div>
          <TelefonoFijoInput
            handleChange={handleChange}
            handleNoAplica={handleNoAplica}
            localData={localData}
            errors={errors}
          />
        </Section>

        {/* Sección: Salud y Seguridad Social */}
        <Section title="🏥 Salud y Seguridad Social">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EPSInput
              handleChange={handleChange}
              localData={localData}
              errors={errors}
            />
            <AFPInput
              handleChange={handleChange}
              localData={localData}
              errors={errors}
            />
          </div>
        </Section>

        {/* Sección: Observaciones */}
        <ObservacionesTextarea
          handleChange={handleChange}
          localData={localData}
          errors={errors}
        />
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

function EstadoCivilSelect({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Estado Civil <span className="text-red-500">*</span>
      </label>
      <select
        value={localData.estado_civil}
        onChange={(e) => handleChange("estado_civil", e.target.value)}
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.estado_civil ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Selecciona tu estado civil</option>
        {ESTADO_CIVIL_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors.estado_civil && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.estado_civil}
        </p>
      )}
    </div>
  );
}

function NumeroHijosInput({ handleChange, localData, errors }) {
  const displayValue =
    localData.numero_hijos === "" ||
    localData.numero_hijos === null ||
    typeof localData.numero_hijos === "undefined"
      ? ""
      : localData.numero_hijos;

  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Número de Hijos <span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        value={displayValue}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "") {
            // permitir campo vacío mientras el usuario borra
            handleChange("numero_hijos", "");
            return;
          }
          const value = parseInt(v, 10);
          if (!isNaN(value) && value >= 0) {
            handleChange("numero_hijos", value);
          }
        }}
        onBlur={() => {
          // al salir del input, normalizar vacío a 0
          if (localData.numero_hijos === "") {
            handleChange("numero_hijos", 0);
          }
        }}
        min="0"
        placeholder="0"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.numero_hijos ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.numero_hijos && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.numero_hijos}
        </p>
      )}
    </div>
  );
}

function ConQuienViveInput({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        ¿Con quién vives? <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={localData.con_quien_vive}
        onChange={(e) => handleChange("con_quien_vive", e.target.value)}
        placeholder="Ej: Padres, Cónyuge e hijos, Solo/a"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.con_quien_vive ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.con_quien_vive && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.con_quien_vive}
        </p>
      )}
    </div>
  );
}

function LibretaMilitarInput({
  handleChange,
  handleNoAplica,
  localData,
  errors,
}) {
  const isNoAplica = localData.libreta_militar_numero === null;

  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Número de Libreta Militar
      </label>

      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <input
          type="text"
          value={isNoAplica ? "" : localData.libreta_militar_numero}
          onChange={(e) =>
            handleChange("libreta_militar_numero", e.target.value)
          }
          placeholder="Ej: 12345678"
          disabled={isNoAplica}
          className={`flex-1 w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
            isNoAplica ? "bg-gray-100 cursor-not-allowed" : ""
          } ${
            errors.libreta_militar_numero ? "border-red-500" : "border-gray-300"
          }`}
        />

        <div className="flex flex-col gap-1 w-full md:w-auto">
          <button
            type="button"
            onClick={() =>
              isNoAplica
                ? handleChange("libreta_militar_numero", "")
                : handleNoAplica("libreta_militar_numero")
            }
            className={`w-full md:w-auto px-4 py-3 rounded-lg font-medium transition-colors ${
              isNoAplica
                ? "bg-[#44BBA4] text-white hover:bg-[#3a9d8a]"
                : "bg-gray-200 text-[#15616D] hover:bg-gray-300"
            }`}
          >
            {isNoAplica ? "Si Tengo Libreta" : "No tengo Libreta"}
          </button>

          {/* Texto visible solo en pantallas grandes */}
          <p className="text-xs text-[#15616D]/60 italic hidden md:block">
            Presiono "No tengo Libreta" si no cuentas con una
          </p>
        </div>
      </div>

      {/* Texto visible en móvil debajo del grupo */}
      <p className="text-xs text-[#15616D]/60 italic mt-1 md:hidden">
        Presiono "No tengo Libreta" si no cuentas con una
      </p>

      {errors.libreta_militar_numero && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.libreta_militar_numero}
        </p>
      )}
    </div>
  );
}

function TipoViviendaSelect({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Tipo de Vivienda <span className="text-red-500">*</span>
      </label>
      <select
        value={localData.tipo_vivienda}
        onChange={(e) => handleChange("tipo_vivienda", e.target.value)}
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.tipo_vivienda ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Selecciona tipo de vivienda</option>
        {TIPO_VIVIENDA_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors.tipo_vivienda && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.tipo_vivienda}
        </p>
      )}
    </div>
  );
}

function ValorArriendoInput({ handleChange, localData, errors }) {
  const displayValue =
    localData.valor_arriendo === "" ||
    localData.valor_arriendo === null ||
    typeof localData.valor_arriendo === "undefined"
      ? ""
      : localData.valor_arriendo;

  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Valor de Arriendo (COP)
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#15616D]/60">
          $
        </span>
        <input
          type="number"
          value={displayValue}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "") {
              // permitir borrar a vacío
              handleChange("valor_arriendo", "");
              return;
            }
            const value = parseInt(v, 10);
            if (!isNaN(value) && value >= 0) {
              handleChange("valor_arriendo", value);
            }
          }}
          onBlur={() => {
            // normalizar vacío a 0 al salir del input
            if (localData.valor_arriendo === "") {
              handleChange("valor_arriendo", 0);
            }
          }}
          min="0"
          placeholder="0 (si no aplica)"
          className={`w-full pl-8 pr-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
            errors.valor_arriendo ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {localData.valor_arriendo !== "" && localData.valor_arriendo > 0 && (
        <p className="text-xs text-[#15616D]/60 mt-1">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
          }).format(localData.valor_arriendo)}
        </p>
      )}
    </div>
  );
}

function DireccionViviendaInput({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Dirección de Vivienda <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={localData.direccion_vivienda}
        onChange={(e) => handleChange("direccion_vivienda", e.target.value)}
        placeholder="Ej: Calle 123 #45-67"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.direccion_vivienda ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.direccion_vivienda && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.direccion_vivienda}
        </p>
      )}
    </div>
  );
}

function BarrioInput({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Barrio <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={localData.barrio}
        onChange={(e) => handleChange("barrio", e.target.value)}
        placeholder="Ej: Alameda del Río"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.barrio ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.barrio && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.barrio}
        </p>
      )}
    </div>
  );
}

function LocalidadInput({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Localidad <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={localData.localidad}
        onChange={(e) => handleChange("localidad", e.target.value)}
        placeholder="Ej: suroccidente"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.localidad ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.localidad && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.localidad}
        </p>
      )}
    </div>
  );
}

function TiempoQueHabitaInput({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Tiempo que Habita <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={localData.tiempo_que_habita}
        onChange={(e) => handleChange("tiempo_que_habita", e.target.value)}
        placeholder="Ej: 2 años"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.tiempo_que_habita ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.tiempo_que_habita && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.tiempo_que_habita}
        </p>
      )}
    </div>
  );
}

function TelefonoFijoInput({
  handleChange,
  handleNoAplica,
  localData,
  errors,
}) {
  const isNoAplica = localData.telefono_fijo === null;

  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Teléfono Fijo
      </label>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <input
          type="tel"
          value={isNoAplica ? "" : localData.telefono_fijo}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // Solo números
            handleChange("telefono_fijo", value);
          }}
          placeholder="Ej: 6012345678"
          disabled={isNoAplica}
          className={`flex-1 px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
            isNoAplica ? "bg-gray-100 cursor-not-allowed" : ""
          } ${errors.telefono_fijo ? "border-red-500" : "border-gray-300"}`}
        />
        <div className="flex flex-col gap-1 w-full md:w-auto">
          <button
            type="button"
            onClick={() =>
              isNoAplica
                ? handleChange("telefono_fijo", "")
                : handleNoAplica("telefono_fijo")
            }
            className={`w-full md:w-auto px-4 py-3 rounded-lg font-medium transition-colors ${
              isNoAplica
                ? "bg-[#44BBA4] text-white hover:bg-[#3a9d8a]"
                : "bg-gray-200 text-[#15616D] hover:bg-gray-300"
            }`}
          >
            {isNoAplica ? "Aplica" : "No Aplica"}
          </button>
          <p className="text-xs text-[#15616D]/60 italic hidden md:block">
            Presiono "No Aplica" si no aplica
          </p>
        </div>
      </div>

      {/* texto visible en movil debajo del grupo */}
      <p className="text-xs text-[#15616D]/60 italic mt-1 md:hidden">
        Presiono "No Aplica" si no aplica
      </p>

      {errors.telefono_fijo && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.telefono_fijo}
        </p>
      )}
    </div>
  );
}

function EPSInput({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        EPS <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={localData.eps}
        onChange={(e) => handleChange("eps", e.target.value)}
        placeholder="Ej: Salud Total, Sura, Nueva EPS"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.eps ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.eps && (
        <p className="text-xs text-red-500 mt-1 animate-shake">{errors.eps}</p>
      )}
    </div>
  );
}

function AFPInput({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Administradora de Fondos de Pensiones (AFP){" "}
        <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={localData.afp}
        onChange={(e) => handleChange("afp", e.target.value)}
        placeholder="Ej: Porvenir, Protección, Colfondos"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
          errors.afp ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.afp && (
        <p className="text-xs text-red-500 mt-1 animate-shake">{errors.afp}</p>
      )}
    </div>
  );
}

function ObservacionesTextarea({ handleChange, localData, errors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#15616D] mb-2">
        Observaciones (Opcional)
      </label>
      <textarea
        value={localData.observaciones}
        onChange={(e) => handleChange("observaciones", e.target.value)}
        placeholder="Agrega cualquier información adicional que consideres relevante..."
        rows="4"
        className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors resize-none ${
          errors.observaciones ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.observaciones && (
        <p className="text-xs text-red-500 mt-1 animate-shake">
          {errors.observaciones}
        </p>
      )}
      <p className="text-xs text-[#15616D]/60 mt-1">
        {localData.observaciones.length} caracteres
      </p>
    </div>
  );
}
