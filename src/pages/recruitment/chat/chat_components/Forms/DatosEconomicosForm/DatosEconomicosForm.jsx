// chat_components/Forms/DatosEconomicosForm.jsx
import { useState, useEffect } from "react";
import { useFormDataStore } from "../../../stores/useFormDataStore";
import { VACANCY_COVERTATION_PHASES } from "../../../const";
import { DollarSign, TrendingUp, Car, CreditCard, Wallet } from "lucide-react";

const DATOS_INICIALES = {
  tiene_otros_ingresos: false,
  conyuge_trabaja: false,
  tiene_automovil_propio: false,
  tiene_deudas: false,
  gastos_mensuales: "",
};

export function DatosEconomicosForm() {
  const { formData, setSection, validateSection } = useFormDataStore();

  const [localData, setLocalData] = useState({
    ...DATOS_INICIALES,
    ...formData.datos_economicos,
    // Asegurar que gastos_mensuales sea string para el input
    gastos_mensuales:
      formData.datos_economicos?.gastos_mensuales?.toString() || "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Sincronizar con el store al iniciar
  useEffect(() => {
    const dataToSave = {
      ...localData,
      gastos_mensuales:
        localData.gastos_mensuales === ""
          ? ""
          : Number(localData.gastos_mensuales),
    };
    setSection(VACANCY_COVERTATION_PHASES.form_datos_economicos, dataToSave);
  }, []);

  // 🔥 Exponer función de validación global
  useEffect(() => {
    const triggerValidation = () => {
      const result = validateSection(
        VACANCY_COVERTATION_PHASES.form_datos_economicos
      );

      // Marcar campos requeridos como touched
      setTouched({
        gastos_mensuales: true,
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

    // Guardar en el store (convertir gastos_mensuales a número)
    const valueToSave =
      field === "gastos_mensuales"
        ? value === ""
          ? ""
          : Number(value)
        : value;

    setSection(VACANCY_COVERTATION_PHASES.form_datos_economicos, (prev) => ({
      ...prev,
      [field]: valueToSave,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#44BBA4]/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#15616D]/10">
        <DollarSign className="text-[#44BBA4]" size={32} />
        <div>
          <h3 className="text-lg font-bold text-[#15616D]">Datos Económicos</h3>
          <p className="text-xs text-[#15616D]/60">
            Información sobre tu situación económica
          </p>
        </div>
      </div>

      {/* Alerta de confidencialidad */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          🔒 <strong>Confidencial:</strong> Esta información es tratada con
          total confidencialidad y solo se usa para fines administrativos.
        </p>
      </div>

      <div className="space-y-6">
        {/* Preguntas económicas Sí/No */}
        <div className="space-y-4">
          <PreguntaSiNo
            label="¿Tiene otros ingresos adicionales?"
            description="Ej: Negocios propios, arrendamientos, inversiones"
            field="tiene_otros_ingresos"
            value={localData.tiene_otros_ingresos}
            handleChange={handleChange}
            icon={<TrendingUp size={24} className="text-[#44BBA4]" />}
          />

          <PreguntaSiNo
            label="¿Su cónyuge o pareja trabaja?"
            description="Información para contacto de emergencia"
            field="conyuge_trabaja"
            value={localData.conyuge_trabaja}
            handleChange={handleChange}
            icon={<Wallet size={24} className="text-[#44BBA4]" />}
          />

          <PreguntaSiNo
            label="¿Tiene automóvil propio?"
            description="Para roles que puedan requerir movilidad"
            field="tiene_automovil_propio"
            value={localData.tiene_automovil_propio}
            handleChange={handleChange}
            icon={<Car size={24} className="text-[#44BBA4]" />}
          />

          <PreguntaSiNo
            label="¿Tiene deudas actualmente?"
            description="Préstamos, créditos, tarjetas, etc."
            field="tiene_deudas"
            value={localData.tiene_deudas}
            handleChange={handleChange}
            icon={<CreditCard size={24} className="text-[#44BBA4]" />}
          />
        </div>

        {/* Gastos mensuales */}
        <GastosMensualesInput
          handleChange={handleChange}
          localData={localData}
          errors={errors}
          touched={touched}
        />
      </div>
    </div>
  );
}

function PreguntaSiNo({
  label,
  description,
  field,
  value,
  handleChange,
  icon,
}) {
  return (
    <div className="p-4 border-2 border-[#15616D]/10 rounded-lg bg-gray-50 hover:border-[#44BBA4]/30 transition-colors">
      <label className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">{icon}</div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#15616D] mb-1">{label}</p>
          <p className="text-xs text-[#15616D]/60 mb-3">{description}</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleChange(field, true)}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                value === true
                  ? "bg-[#44BBA4] text-white shadow-md scale-105"
                  : "bg-white text-[#15616D] border-2 border-gray-300 hover:border-[#44BBA4]"
              }`}
            >
              ✓ Sí
            </button>
            <button
              type="button"
              onClick={() => handleChange(field, false)}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                value === false
                  ? "bg-[#E63946] text-white shadow-md scale-105"
                  : "bg-white text-[#15616D] border-2 border-gray-300 hover:border-[#E63946]"
              }`}
            >
              ✗ No
            </button>
          </div>
        </div>
      </label>
    </div>
  );
}

function GastosMensualesInput({ handleChange, localData, errors, touched }) {
  const showError = touched.gastos_mensuales && errors.gastos_mensuales;

  // Formatear número con separadores de miles
  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="p-5 border-2 border-[#15616D]/20 rounded-lg bg-gradient-to-br from-[#44BBA4]/5 to-transparent">
      <label className="block">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign size={20} className="text-[#44BBA4]" />
          <span className="text-sm font-semibold text-[#15616D]">
            Gastos Mensuales Aproximados <span className="text-red-500">*</span>
          </span>
        </div>
        <p className="text-xs text-[#15616D]/60 mb-3">
          Incluye: arriendo, servicios, alimentación, transporte, educación,
          etc.
        </p>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#15616D] font-semibold text-lg">
            $
          </span>
          <input
            type="number"
            value={localData.gastos_mensuales}
            onChange={(e) => {
              const value = e.target.value;
              handleChange("gastos_mensuales", value === "" ? "" : value);
            }}
            placeholder="Ej: 2500000"
            min="0"
            step="50000"
            className={`w-full pl-10 pr-4 py-3.5 border-2 rounded-lg text-[#15616D] text-lg font-medium focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-all ${
              showError
                ? "border-red-500 bg-red-50"
                : "border-gray-300 bg-white hover:border-[#44BBA4]/50"
            }`}
          />
        </div>
        {showError && (
          <p className="text-xs text-red-500 mt-2 animate-shake font-medium">
            ⚠️ {errors.gastos_mensuales}
          </p>
        )}
        {localData.gastos_mensuales > 0 && !showError && (
          <div className="mt-3 p-3 bg-[#44BBA4]/10 rounded-lg border border-[#44BBA4]/20">
            <p className="text-sm font-semibold text-[#15616D]">
              💰 Gastos mensuales: {formatCurrency(localData.gastos_mensuales)}
            </p>
            <p className="text-xs text-[#15616D]/70 mt-1">
              Aproximadamente{" "}
              {formatCurrency(Math.round(localData.gastos_mensuales / 30))} por
              día
            </p>
          </div>
        )}
      </label>
    </div>
  );
}
