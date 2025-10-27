// chat_components/Forms/TallasForm.jsx
import { useState, useEffect } from "react";
import { useFormDataStore } from "../../../stores/useFormDataStore";
import { VACANCY_COVERTATION_PHASES } from "../../../const/Phases";
import { Shirt, User, Footprints } from "lucide-react";

const TALLAS_CAMISA = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const TALLAS_PANTALON = [
  "28",
  "30",
  "32",
  "34",
  "36",
  "38",
  "40",
  "42",
  "44",
  "46",
  "48",
];

const TALLAS_CALZADO = [
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
];

const DATOS_INICIALES = {
  talla_camisa_blusa: "",
  talla_pantalon: "",
  talla_calzado: "",
};

export function TallasForm() {
  const { formData, setSection, validateSection } = useFormDataStore();

  const [localData, setLocalData] = useState({
    ...DATOS_INICIALES,
    ...formData.tallas,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Sincronizar con el store al iniciar
  useEffect(() => {
    setSection(VACANCY_COVERTATION_PHASES.form_tallas, localData);
  }, []);

  // 🔥 Exponer función de validación global
  useEffect(() => {
    const triggerValidation = () => {
      const result = validateSection(VACANCY_COVERTATION_PHASES.form_tallas);

      // Marcar todos los campos como touched
      setTouched({
        talla_camisa_blusa: true,
        talla_pantalon: true,
        talla_calzado: true,
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
    setSection(VACANCY_COVERTATION_PHASES.form_tallas, (prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#44BBA4]/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#15616D]/10">
        <Shirt className="text-[#44BBA4]" size={32} />
        <div>
          <h3 className="text-lg font-bold text-[#15616D]">
            Tallas de Uniforme
          </h3>
          <p className="text-xs text-[#15616D]/60">
            Información para asignación de uniformes
          </p>
        </div>
      </div>

      {/* Alerta informativa */}
      <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-sm text-purple-800">
          👔 <strong>Importante:</strong> Esta información nos ayudará a
          preparar tu uniforme de trabajo si eres seleccionado/a.
        </p>
      </div>

      <div className="space-y-6">
        {/* Talla Camisa/Blusa */}
        <TallaCamisaSelector
          handleChange={handleChange}
          localData={localData}
          errors={errors}
          touched={touched}
        />

        {/* Talla Pantalón */}
        <TallaPantalonSelector
          handleChange={handleChange}
          localData={localData}
          errors={errors}
          touched={touched}
        />

        {/* Talla Calzado */}
        <TallaCalzadoSelector
          handleChange={handleChange}
          localData={localData}
          errors={errors}
          touched={touched}
        />
      </div>

      {/* Preview de tallas seleccionadas */}
      {(localData.talla_camisa_blusa ||
        localData.talla_pantalon ||
        localData.talla_calzado) && (
        <div className="mt-6 p-4 bg-gradient-to-r from-[#44BBA4]/10 to-[#15616D]/10 rounded-lg border-2 border-[#44BBA4]/30">
          <h4 className="text-sm font-bold text-[#15616D] mb-3 flex items-center gap-2">
            <User size={18} />
            Resumen de Tallas
          </h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            {localData.talla_camisa_blusa && (
              <div className="p-2 bg-white rounded-lg">
                <p className="text-xs text-[#15616D]/60">Camisa/Blusa</p>
                <p className="text-lg font-bold text-[#44BBA4]">
                  {localData.talla_camisa_blusa}
                </p>
              </div>
            )}
            {localData.talla_pantalon && (
              <div className="p-2 bg-white rounded-lg">
                <p className="text-xs text-[#15616D]/60">Pantalón</p>
                <p className="text-lg font-bold text-[#44BBA4]">
                  {localData.talla_pantalon}
                </p>
              </div>
            )}
            {localData.talla_calzado && (
              <div className="p-2 bg-white rounded-lg">
                <p className="text-xs text-[#15616D]/60">Calzado</p>
                <p className="text-lg font-bold text-[#44BBA4]">
                  {localData.talla_calzado}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TallaCamisaSelector({ handleChange, localData, errors, touched }) {
  const showError = touched.talla_camisa_blusa && errors.talla_camisa_blusa;

  return (
    <div className="p-5 border-2 border-[#15616D]/10 rounded-lg bg-gray-50">
      <label className="block">
        <div className="flex items-center gap-2 mb-3">
          <Shirt size={20} className="text-[#44BBA4]" />
          <span className="text-sm font-semibold text-[#15616D]">
            Talla Camisa/Blusa <span className="text-red-500">*</span>
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {TALLAS_CAMISA.map((talla) => (
            <button
              key={talla}
              type="button"
              onClick={() => handleChange("talla_camisa_blusa", talla)}
              className={`py-3 px-2 rounded-lg font-bold text-sm transition-all ${
                localData.talla_camisa_blusa === talla
                  ? "bg-[#44BBA4] text-white shadow-lg scale-110 ring-2 ring-[#44BBA4]/50"
                  : "bg-white text-[#15616D] border-2 border-gray-300 hover:border-[#44BBA4] hover:scale-105"
              }`}
            >
              {talla}
            </button>
          ))}
        </div>
        {showError && (
          <p className="text-xs text-red-500 mt-2 animate-shake font-medium">
            ⚠️ {errors.talla_camisa_blusa}
          </p>
        )}
      </label>
    </div>
  );
}

function TallaPantalonSelector({ handleChange, localData, errors, touched }) {
  const showError = touched.talla_pantalon && errors.talla_pantalon;

  return (
    <div className="p-5 border-2 border-[#15616D]/10 rounded-lg bg-gray-50">
      <label className="block">
        <div className="flex items-center gap-2 mb-3">
          <User size={20} className="text-[#44BBA4]" />
          <span className="text-sm font-semibold text-[#15616D]">
            Talla Pantalón <span className="text-red-500">*</span>
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-11">
          {TALLAS_PANTALON.map((talla) => (
            <button
              key={talla}
              type="button"
              onClick={() => handleChange("talla_pantalon", talla)}
              className={`py-3 px-2 rounded-lg font-bold text-sm transition-all ${
                localData.talla_pantalon === talla
                  ? "bg-[#44BBA4] text-white shadow-lg scale-110 ring-2 ring-[#44BBA4]/50"
                  : "bg-white text-[#15616D] border-2 border-gray-300 hover:border-[#44BBA4] hover:scale-105"
              }`}
            >
              {talla}
            </button>
          ))}
        </div>
        {showError && (
          <p className="text-xs text-red-500 mt-2 animate-shake font-medium">
            ⚠️ {errors.talla_pantalon}
          </p>
        )}
      </label>
    </div>
  );
}

function TallaCalzadoSelector({ handleChange, localData, errors, touched }) {
  const showError = touched.talla_calzado && errors.talla_calzado;

  return (
    <div className="p-5 border-2 border-[#15616D]/10 rounded-lg bg-gray-50">
      <label className="block">
        <div className="flex items-center gap-2 mb-3">
          <Footprints size={20} className="text-[#44BBA4]" />
          <span className="text-sm font-semibold text-[#15616D]">
            Talla Calzado <span className="text-red-500">*</span>
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-12">
          {TALLAS_CALZADO.map((talla) => (
            <button
              key={talla}
              type="button"
              onClick={() => handleChange("talla_calzado", talla)}
              className={`py-3 px-2 rounded-lg font-bold text-sm transition-all ${
                localData.talla_calzado === talla
                  ? "bg-[#44BBA4] text-white shadow-lg scale-110 ring-2 ring-[#44BBA4]/50"
                  : "bg-white text-[#15616D] border-2 border-gray-300 hover:border-[#44BBA4] hover:scale-105"
              }`}
            >
              {talla}
            </button>
          ))}
        </div>
        {showError && (
          <p className="text-xs text-red-500 mt-2 animate-shake font-medium">
            ⚠️ {errors.talla_calzado}
          </p>
        )}
      </label>
    </div>
  );
}
