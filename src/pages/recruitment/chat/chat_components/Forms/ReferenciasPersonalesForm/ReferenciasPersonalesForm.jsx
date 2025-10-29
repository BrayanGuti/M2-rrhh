// chat_components/Forms/ReferenciasPersonalesForm.jsx
import { useState, useEffect } from "react";
import { useFormDataStore } from "../../../stores/useFormDataStore";
import { VACANCY_COVERTATION_PHASES } from "../../../const";
import { Trash2, Plus, Users } from "lucide-react";

const REFERENCIA_INICIAL = {
  nombre: "",
  domicilio: "",
  telefono_celular: "",
  ocupacion: "",
  tiempo_conocerlo: "",
};

export function ReferenciasPersonalesForm() {
  const { formData, setSection, validateSection } = useFormDataStore();

  const [referencias, setReferencias] = useState(
    formData.referencias_personales?.length > 0
      ? formData.referencias_personales
      : [{ ...REFERENCIA_INICIAL }, { ...REFERENCIA_INICIAL }]
  );

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Sincronizar con el store al iniciar
  useEffect(() => {
    if (referencias.length >= 2) {
      setSection(
        VACANCY_COVERTATION_PHASES.form_referencias_personales,
        referencias
      );
    }
  }, []);

  // 🔥 Exponer función de validación global
  useEffect(() => {
    const triggerValidation = () => {
      const result = validateSection(
        VACANCY_COVERTATION_PHASES.form_referencias_personales
      );

      // Marcar todos los campos como touched para mostrar errores
      const allTouched = {};
      referencias.forEach((_, index) => {
        allTouched[`${index}_nombre`] = true;
        allTouched[`${index}_domicilio`] = true;
        allTouched[`${index}_telefono_celular`] = true;
        allTouched[`${index}_ocupacion`] = true;
        allTouched[`${index}_tiempo_conocerlo`] = true;
      });
      setTouched(allTouched);

      setErrors(result.errors);
      return result.isValid;
    };

    window.__validateCurrentForm = triggerValidation;

    return () => {
      delete window.__validateCurrentForm;
    };
  }, [validateSection, referencias]);

  const handleChange = (index, field, value) => {
    const newReferencias = [...referencias];
    newReferencias[index] = {
      ...newReferencias[index],
      [field]: value,
    };

    setReferencias(newReferencias);

    // Marcar campo como touched
    setTouched((prev) => ({
      ...prev,
      [`${index}_${field}`]: true,
    }));

    // Limpiar error específico del campo
    const errorKey = `referencia_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => {
        const { [errorKey]: _, ...rest } = prev;
        return rest;
      });
    }

    // Limpiar error general de "mínimo 2 referencias"
    if (errors.referencias && newReferencias.length >= 2) {
      setErrors((prev) => {
        const { referencias: _, ...rest } = prev;
        return rest;
      });
    }

    // Guardar en el store
    setSection(
      VACANCY_COVERTATION_PHASES.form_referencias_personales,
      newReferencias
    );
  };

  const agregarReferencia = () => {
    if (referencias.length < 4) {
      const newReferencias = [...referencias, { ...REFERENCIA_INICIAL }];
      setReferencias(newReferencias);
      setSection(
        VACANCY_COVERTATION_PHASES.form_referencias_personales,
        newReferencias
      );
    }
  };

  const eliminarReferencia = (index) => {
    if (referencias.length > 2) {
      const newReferencias = referencias.filter((_, i) => i !== index);
      setReferencias(newReferencias);
      setSection(
        VACANCY_COVERTATION_PHASES.form_referencias_personales,
        newReferencias
      );

      // Limpiar errores de la referencia eliminada
      setErrors((prev) => {
        const newErrors = { ...prev };
        Object.keys(newErrors).forEach((key) => {
          if (key.startsWith(`referencia_${index}_`)) {
            delete newErrors[key];
          }
        });
        return newErrors;
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#44BBA4]/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#15616D]/10">
        <Users className="text-3xl text-[#44BBA4]" size={32} />
        <div>
          <h3 className="text-lg font-bold text-[#15616D]">
            Referencias Personales
          </h3>
          <p className="text-xs text-[#15616D]/60">
            Mínimo 2 referencias, máximo 4 (no familiares)
          </p>
        </div>
      </div>

      {/* Alerta informativa */}
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          ⚠️ <strong>Importante:</strong> Las referencias personales NO deben
          ser familiares directos. Puedes incluir amigos, colegas, profesores,
          vecinos, etc.
        </p>
      </div>

      {/* Error general */}
      {errors.referencias && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.referencias}</p>
        </div>
      )}

      {/* Lista de referencias */}
      <div className="space-y-6">
        {referencias.map((referencia, index) => (
          <ReferenciaCard
            key={index}
            referencia={referencia}
            index={index}
            handleChange={handleChange}
            eliminarReferencia={eliminarReferencia}
            canDelete={referencias.length > 2}
            errors={errors}
            touched={touched}
          />
        ))}
      </div>

      {/* Botón agregar */}
      {referencias.length < 4 && (
        <button
          onClick={agregarReferencia}
          className="mt-6 w-full py-3 border-2 border-dashed border-[#44BBA4] rounded-lg text-[#44BBA4] hover:bg-[#44BBA4]/5 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Plus size={20} />
          Agregar otra referencia ({referencias.length}/4)
        </button>
      )}
    </div>
  );
}

function ReferenciaCard({
  referencia,
  index,
  handleChange,
  eliminarReferencia,
  canDelete,
  errors,
  touched,
}) {
  const getError = (field) => {
    const errorKey = `referencia_${index}_${field}`;
    const touchedKey = `${index}_${field}`;
    return touched[touchedKey] && errors[errorKey] ? errors[errorKey] : null;
  };

  return (
    <div className="p-5 border-2 border-[#15616D]/10 rounded-lg bg-gray-50 relative">
      {/* Header con número y botón eliminar */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-[#15616D]">
          Referencia #{index + 1}
        </h4>
        {canDelete && (
          <button
            onClick={() => eliminarReferencia(index)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
            title="Eliminar referencia"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-[#15616D] mb-2">
            Nombre Completo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={referencia.nombre}
            onChange={(e) => handleChange(index, "nombre", e.target.value)}
            placeholder="Ej: Juan Pérez García"
            className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
              getError("nombre") ? "border-red-500" : "border-gray-300"
            }`}
          />
          {getError("nombre") && (
            <p className="text-xs text-red-500 mt-1 animate-shake">
              {getError("nombre")}
            </p>
          )}
        </div>

        {/* Domicilio */}
        <div>
          <label className="block text-sm font-medium text-[#15616D] mb-2">
            Domicilio <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={referencia.domicilio}
            onChange={(e) => handleChange(index, "domicilio", e.target.value)}
            placeholder="Ej: Calle 123 #45-67, Barranquilla"
            className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
              getError("domicilio") ? "border-red-500" : "border-gray-300"
            }`}
          />
          {getError("domicilio") && (
            <p className="text-xs text-red-500 mt-1 animate-shake">
              {getError("domicilio")}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-[#15616D] mb-2">
            Teléfono / Celular <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={referencia.telefono_celular}
            onChange={(e) =>
              handleChange(index, "telefono_celular", e.target.value)
            }
            placeholder="Ej: 3001234567"
            maxLength={10}
            className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
              getError("telefono_celular")
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {getError("telefono_celular") && (
            <p className="text-xs text-red-500 mt-1 animate-shake">
              {getError("telefono_celular")}
            </p>
          )}
        </div>

        {/* Grid de 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ocupación */}
          <div>
            <label className="block text-sm font-medium text-[#15616D] mb-2">
              Ocupación <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={referencia.ocupacion}
              onChange={(e) => handleChange(index, "ocupacion", e.target.value)}
              placeholder="Ej: Ingeniero"
              className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
                getError("ocupacion") ? "border-red-500" : "border-gray-300"
              }`}
            />
            {getError("ocupacion") && (
              <p className="text-xs text-red-500 mt-1 animate-shake">
                {getError("ocupacion")}
              </p>
            )}
          </div>

          {/* Tiempo de conocerlo */}
          <div>
            <label className="block text-sm font-medium text-[#15616D] mb-2">
              Tiempo de Conocerlo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={referencia.tiempo_conocerlo}
              onChange={(e) =>
                handleChange(index, "tiempo_conocerlo", e.target.value)
              }
              placeholder="Ej: 5 años"
              className={`w-full px-4 py-3 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
                getError("tiempo_conocerlo")
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {getError("tiempo_conocerlo") && (
              <p className="text-xs text-red-500 mt-1 animate-shake">
                {getError("tiempo_conocerlo")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
