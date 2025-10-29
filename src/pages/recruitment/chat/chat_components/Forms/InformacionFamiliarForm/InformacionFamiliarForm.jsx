// chat_components/Forms/InformacionFamiliarForm.jsx
import { useState, useEffect } from "react";
import { useFormDataStore } from "../../../stores/useFormDataStore";
import { validateInformacionFamiliar } from "../../../validations";
import { VACANCY_COVERTATION_PHASES } from "../../../const";

export function InformacionFamiliarForm() {
  const { formData, setSection } = useFormDataStore();

  const estadoCasado = ["Casado/a", "Unión Libre"];
  const mostrarConyuge = estadoCasado.includes(
    formData.detalles_personales.estado_civil
  );
  const mostrarHijos = formData.detalles_personales.numero_hijos > 0;
  const numHijosEsperados = Math.min(
    formData.detalles_personales.numero_hijos,
    5
  );

  const [localData, setLocalData] = useState({
    conyuge: formData.informacion_familiar.conyuge || {
      nombre: null,
      edad: null,
      ocupacion: null,
    },
    hijos: formData.informacion_familiar.hijos || [],
    padres:
      formData.informacion_familiar.padres.length === 2
        ? formData.informacion_familiar.padres
        : [
            { nombre: null, edad: null, ocupacion: null },
            { nombre: null, edad: null, ocupacion: null },
          ],
    hermanos: formData.informacion_familiar.hermanos || [],
  });

  const [padresNoAplica, setPadresNoAplica] = useState([false, false]);
  const [errors, setErrors] = useState({});

  // Exponer función de validación
  useEffect(() => {
    const triggerValidation = () => {
      const result = validateInformacionFamiliar(
        localData,
        formData.detalles_personales
      );
      setErrors(result.errors);
      return result.isValid;
    };

    window.__validateCurrentForm = triggerValidation;

    return () => {
      delete window.__validateCurrentForm;
    };
  }, [localData, formData.detalles_personales]);

  const handleConyugeChange = (field, value) => {
    setLocalData((prev) => ({
      ...prev,
      conyuge: { ...prev.conyuge, [field]: value },
    }));

    if (errors[`conyuge_${field}`]) {
      setErrors((prev) => {
        const { [`conyuge_${field}`]: _, ...rest } = prev;
        return rest;
      });
    }

    setSection(
      VACANCY_COVERTATION_PHASES.form_informacion_familiar,
      (prev) => ({
        ...prev,
        conyuge: { ...prev.conyuge, [field]: value },
      })
    );
  };

  const handleHijoChange = (index, field, value) => {
    setLocalData((prev) => {
      const newHijos = [...prev.hijos];
      newHijos[index] = { ...newHijos[index], [field]: value };
      return { ...prev, hijos: newHijos };
    });

    if (errors[`hijo_${index}_${field}`]) {
      setErrors((prev) => {
        const { [`hijo_${index}_${field}`]: _, ...rest } = prev;
        return rest;
      });
    }

    setSection(VACANCY_COVERTATION_PHASES.form_informacion_familiar, (prev) => {
      const newHijos = [...prev.hijos];
      newHijos[index] = { ...newHijos[index], [field]: value };
      return { ...prev, hijos: newHijos };
    });
  };

  const agregarHijo = () => {
    if (localData.hijos.length >= 5) return;

    const nuevoHijo = { nombre: "", edad: "", ocupacion: "" };
    setLocalData((prev) => ({
      ...prev,
      hijos: [...prev.hijos, nuevoHijo],
    }));

    if (errors.hijos_general) {
      setErrors((prev) => {
        const { hijos_general: _, ...rest } = prev;
        return rest;
      });
    }

    setSection(
      VACANCY_COVERTATION_PHASES.form_informacion_familiar,
      (prev) => ({
        ...prev,
        hijos: [...prev.hijos, nuevoHijo],
      })
    );
  };

  const eliminarHijo = (index) => {
    setLocalData((prev) => ({
      ...prev,
      hijos: prev.hijos.filter((_, i) => i !== index),
    }));

    setSection(
      VACANCY_COVERTATION_PHASES.form_informacion_familiar,
      (prev) => ({
        ...prev,
        hijos: prev.hijos.filter((_, i) => i !== index),
      })
    );
  };

  const handlePadreChange = (index, field, value) => {
    setLocalData((prev) => {
      const newPadres = [...prev.padres];
      newPadres[index] = { ...newPadres[index], [field]: value };
      return { ...prev, padres: newPadres };
    });

    if (errors[`padre_${index}_${field}`]) {
      setErrors((prev) => {
        const { [`padre_${index}_${field}`]: _, ...rest } = prev;
        return rest;
      });
    }

    setSection(VACANCY_COVERTATION_PHASES.form_informacion_familiar, (prev) => {
      const newPadres = [...prev.padres];
      newPadres[index] = { ...newPadres[index], [field]: value };
      return { ...prev, padres: newPadres };
    });
  };

  const handlePadreNoAplica = (index, checked) => {
    setPadresNoAplica((prev) => {
      const newNoAplica = [...prev];
      newNoAplica[index] = checked;
      return newNoAplica;
    });

    if (checked) {
      const padreVacio = { nombre: null, edad: null, ocupacion: null };
      setLocalData((prev) => {
        const newPadres = [...prev.padres];
        newPadres[index] = padreVacio;
        return { ...prev, padres: newPadres };
      });

      setSection(
        VACANCY_COVERTATION_PHASES.form_informacion_familiar,
        (prev) => {
          const newPadres = [...prev.padres];
          newPadres[index] = padreVacio;
          return { ...prev, padres: newPadres };
        }
      );

      // Limpiar errores de ese padre
      setErrors((prev) => {
        const {
          [`padre_${index}_nombre`]: _,
          [`padre_${index}_edad`]: __,
          [`padre_${index}_ocupacion`]: ___,
          ...rest
        } = prev;
        return rest;
      });
    }
  };

  const handleHermanoChange = (index, field, value) => {
    setLocalData((prev) => {
      const newHermanos = [...prev.hermanos];
      newHermanos[index] = { ...newHermanos[index], [field]: value };
      return { ...prev, hermanos: newHermanos };
    });

    if (errors[`hermano_${index}_${field}`]) {
      setErrors((prev) => {
        const { [`hermano_${index}_${field}`]: _, ...rest } = prev;
        return rest;
      });
    }

    setSection(VACANCY_COVERTATION_PHASES.form_informacion_familiar, (prev) => {
      const newHermanos = [...prev.hermanos];
      newHermanos[index] = { ...newHermanos[index], [field]: value };
      return { ...prev, hermanos: newHermanos };
    });
  };

  const agregarHermano = () => {
    if (localData.hermanos.length >= 5) return;

    const nuevoHermano = { nombre: "", edad: "", ocupacion: "" };
    setLocalData((prev) => ({
      ...prev,
      hermanos: [...prev.hermanos, nuevoHermano],
    }));

    setSection(
      VACANCY_COVERTATION_PHASES.form_informacion_familiar,
      (prev) => ({
        ...prev,
        hermanos: [...prev.hermanos, nuevoHermano],
      })
    );
  };

  const eliminarHermano = (index) => {
    setLocalData((prev) => ({
      ...prev,
      hermanos: prev.hermanos.filter((_, i) => i !== index),
    }));

    setSection(
      VACANCY_COVERTATION_PHASES.form_informacion_familiar,
      (prev) => ({
        ...prev,
        hermanos: prev.hermanos.filter((_, i) => i !== index),
      })
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#44BBA4]/20">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#15616D]/10">
        <span className="text-3xl">👨‍👩‍👧‍👦</span>
        <div>
          <h3 className="text-lg font-bold text-[#15616D]">
            Información Familiar
          </h3>
          <p className="text-xs text-[#15616D]/60">
            Completa la información de tu núcleo familiar
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Cónyuge */}
        {mostrarConyuge && (
          <ConyugeSection
            conyuge={localData.conyuge}
            handleChange={handleConyugeChange}
            errors={errors}
          />
        )}

        {/* Hijos */}
        {mostrarHijos && (
          <HijosSection
            hijos={localData.hijos}
            numHijosEsperados={numHijosEsperados}
            handleChange={handleHijoChange}
            agregarHijo={agregarHijo}
            eliminarHijo={eliminarHijo}
            errors={errors}
          />
        )}

        {/* Padres */}
        <PadresSection
          padres={localData.padres}
          padresNoAplica={padresNoAplica}
          handleChange={handlePadreChange}
          handleNoAplica={handlePadreNoAplica}
          errors={errors}
        />

        {/* Hermanos */}
        <HermanosSection
          hermanos={localData.hermanos}
          handleChange={handleHermanoChange}
          agregarHermano={agregarHermano}
          eliminarHermano={eliminarHermano}
          errors={errors}
        />
      </div>
    </div>
  );
}

function ConyugeSection({ conyuge, handleChange, errors }) {
  return (
    <div className="border border-[#44BBA4]/30 rounded-lg p-4 bg-[#44BBA4]/5">
      <h4 className="font-semibold text-[#15616D] mb-3 flex items-center gap-2">
        <span>💑</span> Información del Cónyuge{" "}
        <span className="text-red-500">*</span>
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#15616D] mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            value={conyuge.nombre || ""}
            onChange={(e) => handleChange("nombre", e.target.value)}
            placeholder="Ej: María Rodríguez"
            className={`w-full px-3 py-2 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
              errors.conyuge_nombre ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.conyuge_nombre && (
            <p className="text-xs text-red-500 mt-1">{errors.conyuge_nombre}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#15616D] mb-1">
            Edad
          </label>
          <input
            type="number"
            value={conyuge.edad || ""}
            onChange={(e) =>
              handleChange(
                "edad",
                e.target.value === "" ? null : Number(e.target.value)
              )
            }
            placeholder="Ej: 33"
            className={`w-full px-3 py-2 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
              errors.conyuge_edad ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.conyuge_edad && (
            <p className="text-xs text-red-500 mt-1">{errors.conyuge_edad}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#15616D] mb-1">
            Ocupación
          </label>
          <input
            type="text"
            value={conyuge.ocupacion || ""}
            onChange={(e) => handleChange("ocupacion", e.target.value)}
            placeholder="Ej: Diseñadora"
            className={`w-full px-3 py-2 border rounded-lg text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent transition-colors ${
              errors.conyuge_ocupacion ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.conyuge_ocupacion && (
            <p className="text-xs text-red-500 mt-1">
              {errors.conyuge_ocupacion}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function HijosSection({
  hijos,
  numHijosEsperados,
  handleChange,
  agregarHijo,
  eliminarHijo,
  errors,
}) {
  return (
    <div className="border border-[#44BBA4]/30 rounded-lg p-4 bg-[#44BBA4]/5">
      {/* ENCABEZADO RESPONSIVE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <h4 className="font-semibold text-[#15616D] flex items-center gap-2 text-base sm:text-lg text-center sm:text-left">
          <span>👶</span> Información de Hijos{" "}
          <span className="text-red-500">*</span>
          <span className="text-xs font-normal text-[#15616D]/60">
            ({hijos.length} de {numHijosEsperados})
          </span>
        </h4>

        {hijos.length < numHijosEsperados && (
          <button
            onClick={agregarHijo}
            className="text-sm bg-[#44BBA4] text-white px-3 py-1.5 rounded-lg hover:bg-[#3a9d8a] transition-colors self-center sm:self-auto"
          >
            ➕ Agregar hijo
          </button>
        )}
      </div>

      {errors.hijos_general && (
        <p className="text-sm text-red-500 mb-3 animate-shake">
          {errors.hijos_general}
        </p>
      )}

      <div className="space-y-3">
        {hijos.map((hijo, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#15616D]">
                Hijo {index + 1}
              </span>
              <button
                onClick={() => eliminarHijo(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ❌ Eliminar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Nombre */}
              <div>
                <label className="block text-xs font-medium text-[#15616D] mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={hijo.nombre}
                  onChange={(e) =>
                    handleChange(index, "nombre", e.target.value)
                  }
                  placeholder="Nombre del hijo"
                  className={`w-full px-3 py-2 border rounded-lg text-sm text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent ${
                    errors[`hijo_${index}_nombre`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors[`hijo_${index}_nombre`] && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors[`hijo_${index}_nombre`]}
                  </p>
                )}
              </div>

              {/* Edad */}
              <div>
                <label className="block text-xs font-medium text-[#15616D] mb-1">
                  Edad
                </label>
                <input
                  type="number"
                  value={hijo.edad}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "edad",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  placeholder="Edad"
                  className={`w-full px-3 py-2 border rounded-lg text-sm text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent ${
                    errors[`hijo_${index}_edad`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors[`hijo_${index}_edad`] && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors[`hijo_${index}_edad`]}
                  </p>
                )}
              </div>

              {/* Ocupación */}
              <div>
                <label className="block text-xs font-medium text-[#15616D] mb-1">
                  Ocupación
                </label>
                <input
                  type="text"
                  value={hijo.ocupacion}
                  onChange={(e) =>
                    handleChange(index, "ocupacion", e.target.value)
                  }
                  placeholder="Ej: Estudiante"
                  className={`w-full px-3 py-2 border rounded-lg text-sm text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent ${
                    errors[`hijo_${index}_ocupacion`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors[`hijo_${index}_ocupacion`] && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors[`hijo_${index}_ocupacion`]}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PadresSection({
  padres,
  padresNoAplica,
  handleChange,
  handleNoAplica,
  errors,
}) {
  const labels = ["Padre", "Madre"];

  return (
    <div className="border border-[#44BBA4]/30 rounded-lg p-4 bg-[#44BBA4]/5">
      <h4 className="font-semibold text-[#15616D] mb-3 flex items-center gap-2">
        <span>👨‍👩</span> Información de Padres{" "}
        <span className="text-red-500">*</span>
      </h4>

      {errors.padres_general && (
        <p className="text-sm text-red-500 mb-3 animate-shake">
          {errors.padres_general}
        </p>
      )}

      <div className="space-y-4">
        {padres.map((padre, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#15616D]">
                {labels[index]}
              </span>
              <label className="flex items-center gap-2 text-xs text-[#15616D]/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={padresNoAplica[index]}
                  onChange={(e) => handleNoAplica(index, e.target.checked)}
                  className="rounded text-[#44BBA4] focus:ring-[#44BBA4]"
                />
                No aplica
              </label>
            </div>

            {!padresNoAplica[index] && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#15616D] mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={padre.nombre || ""}
                    onChange={(e) =>
                      handleChange(index, "nombre", e.target.value)
                    }
                    placeholder={`Nombre del ${labels[index].toLowerCase()}`}
                    className={`w-full px-3 py-2 border rounded-lg text-sm text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent ${
                      errors[`padre_${index}_nombre`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[`padre_${index}_nombre`] && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors[`padre_${index}_nombre`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#15616D] mb-1">
                    Edad
                  </label>
                  <input
                    type="number"
                    value={padre.edad || ""}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "edad",
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                    placeholder="Edad"
                    className={`w-full px-3 py-2 border rounded-lg text-sm text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent ${
                      errors[`padre_${index}_edad`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[`padre_${index}_edad`] && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors[`padre_${index}_edad`]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#15616D] mb-1">
                    Ocupación
                  </label>
                  <input
                    type="text"
                    value={padre.ocupacion || ""}
                    onChange={(e) =>
                      handleChange(index, "ocupacion", e.target.value)
                    }
                    placeholder="Ej: Pensionado"
                    className={`w-full px-3 py-2 border rounded-lg text-sm text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent ${
                      errors[`padre_${index}_ocupacion`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[`padre_${index}_ocupacion`] && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors[`padre_${index}_ocupacion`]}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function HermanosSection({
  hermanos,
  handleChange,
  agregarHermano,
  eliminarHermano,
  errors,
}) {
  return (
    <div className="border border-[#44BBA4]/30 rounded-lg p-4 bg-[#44BBA4]/5">
      {/* ENCABEZADO RESPONSIVE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <h4 className="font-semibold text-[#15616D] flex items-center gap-2 text-base sm:text-lg text-center sm:text-left">
          <span>👫</span> Información de Hermanos
          {hermanos.length > 0 && (
            <span className="text-xs font-normal text-[#15616D]/60">
              ({hermanos.length} de 5)
            </span>
          )}
        </h4>

        {hermanos.length < 5 && (
          <button
            onClick={agregarHermano}
            className="text-sm bg-[#44BBA4] text-white px-3 py-1.5 rounded-lg hover:bg-[#3a9d8a] transition-colors self-center sm:self-auto"
          >
            ➕ Agregar hermano
          </button>
        )}
      </div>

      {/* MENSAJE CUANDO NO HAY HERMANOS */}
      {hermanos.length === 0 ? (
        <p className="text-sm text-[#15616D]/60 text-center py-4">
          No hay hermanos agregados. Haz clic en "Agregar hermano" para
          comenzar.
        </p>
      ) : (
        <div className="space-y-3">
          {hermanos.map((hermano, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#15616D]">
                  Hermano {index + 1}
                </span>
                <button
                  onClick={() => eliminarHermano(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ❌ Eliminar
                </button>
              </div>

              {/* CAMPOS DE INFORMACIÓN */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Nombre */}
                <div>
                  <label className="block text-xs font-medium text-[#15616D] mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={hermano.nombre}
                    onChange={(e) =>
                      handleChange(index, "nombre", e.target.value)
                    }
                    placeholder="Nombre del hermano"
                    className={`w-full px-3 py-2 border rounded-lg text-sm text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent ${
                      errors[`hermano_${index}_nombre`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[`hermano_${index}_nombre`] && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors[`hermano_${index}_nombre`]}
                    </p>
                  )}
                </div>

                {/* Edad */}
                <div>
                  <label className="block text-xs font-medium text-[#15616D] mb-1">
                    Edad
                  </label>
                  <input
                    type="number"
                    value={hermano.edad}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "edad",
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    placeholder="Edad"
                    className={`w-full px-3 py-2 border rounded-lg text-sm text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent ${
                      errors[`hermano_${index}_edad`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[`hermano_${index}_edad`] && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors[`hermano_${index}_edad`]}
                    </p>
                  )}
                </div>

                {/* Ocupación */}
                <div>
                  <label className="block text-xs font-medium text-[#15616D] mb-1">
                    Ocupación
                  </label>
                  <input
                    type="text"
                    value={hermano.ocupacion}
                    onChange={(e) =>
                      handleChange(index, "ocupacion", e.target.value)
                    }
                    placeholder="Ej: Ingeniero"
                    className={`w-full px-3 py-2 border rounded-lg text-sm text-[#15616D] focus:ring-2 focus:ring-[#44BBA4] focus:border-transparent ${
                      errors[`hermano_${index}_ocupacion`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[`hermano_${index}_ocupacion`] && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors[`hermano_${index}_ocupacion`]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
