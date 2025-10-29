// stores/useFormDataStore.js
import { create } from "zustand";
import { sendApplication } from "../services/apiServices";
import {
  validateDatosPostulacion,
  validateCandidato,
  validateDetallesPersonales,
  validateInformacionAcademica,
  validateReferenciasPersonales,
  validateDatosGenerales,
  validateTallas,
  validateInformacionFamiliar,
  validateInformacionLaboral,
  validateDatosEconomicos,
} from "../validations";
import { VACANCY_COVERTATION_PHASES, initialFormData } from "../const";

// ============================================
// VALIDADORES
// ============================================

const FORM_VALIDATORS = {
  [VACANCY_COVERTATION_PHASES.form_datos_postulacion]: validateDatosPostulacion,
  [VACANCY_COVERTATION_PHASES.form_candidato]: validateCandidato,
  [VACANCY_COVERTATION_PHASES.form_detalles_personales]:
    validateDetallesPersonales,
  [VACANCY_COVERTATION_PHASES.form_informacion_familiar]:
    validateInformacionFamiliar,
  [VACANCY_COVERTATION_PHASES.form_informacion_academica]:
    validateInformacionAcademica,
  [VACANCY_COVERTATION_PHASES.form_informacion_laboral]:
    validateInformacionLaboral,
  [VACANCY_COVERTATION_PHASES.form_referencias_personales]:
    validateReferenciasPersonales,
  [VACANCY_COVERTATION_PHASES.form_datos_generales]: validateDatosGenerales,
  [VACANCY_COVERTATION_PHASES.form_datos_economicos]: validateDatosEconomicos,
  [VACANCY_COVERTATION_PHASES.form_tallas]: validateTallas,
};

// ============================================
// STORE
// ============================================

export const useFormDataStore = create((set, get) => ({
  // Estado del formulario
  formData: initialFormData,
  uploadToken: null,

  // ==========================================
  // GESTIÓN DE DATOS DEL FORMULARIO
  // ==========================================

  /**
   * Actualiza múltiples secciones del formulario con datos extraídos del CV
   * @param {Object} extractedData - Datos del CV por sección
   * @param {string} token - Token de subida del CV
   */
  applyExtractedData: (extractedData, token) => {
    set((state) => {
      const newFormData = { ...state.formData };

      // Aplicar token de subida
      if (token) {
        newFormData.upload_token = token;
      }

      // Aplicar datos extraídos por cada sección
      if (extractedData.candidato) {
        newFormData.candidato = {
          ...newFormData.candidato,
          ...extractedData.candidato,
        };
      }

      if (extractedData.informacion_academica) {
        newFormData.informacion_academica = {
          ...newFormData.informacion_academica,
          ...extractedData.informacion_academica,
        };
      }

      if (extractedData.informacion_laboral) {
        newFormData.informacion_laboral = extractedData.informacion_laboral;
      }

      if (extractedData.referencias_personales) {
        newFormData.referencias_personales =
          extractedData.referencias_personales;
      }

      console.log("✅ Datos extraídos aplicados al formulario:", newFormData);

      return {
        formData: newFormData,
        uploadToken: token,
      };
    });
  },

  /**
   * Actualiza una sección completa del formulario
   * @param {string} section - Nombre de la sección
   * @param {Object|Function|Array} data - Datos nuevos o función que recibe datos actuales
   */
  setSection: (section, data) => {
    set((state) => {
      // Si data es una función, ejecutarla con la sección actual
      if (typeof data === "function") {
        return {
          formData: {
            ...state.formData,
            [section]: data(state.formData[section]),
          },
        };
      }

      // Si data es un array, reemplazar directamente
      if (Array.isArray(data)) {
        return {
          formData: {
            ...state.formData,
            [section]: [...data],
          },
        };
      }

      // Si data es un objeto, hacer merge
      return {
        formData: {
          ...state.formData,
          [section]: {
            ...state.formData[section],
            ...data,
          },
        },
      };
    });
  },

  /**
   * Obtiene una sección del formulario
   * @param {string} section
   * @returns {Object|Array}
   */
  getSection: (section) => {
    return get().formData[section];
  },

  /**
   * Actualiza un campo específico usando path notation
   * @param {string} path - Ruta del campo (ej: "candidato.nombre_completo")
   * @param {*} value - Nuevo valor
   */
  setField: (path, value) => {
    set((state) => {
      const newFormData = { ...state.formData };
      setNestedValue(newFormData, path, value);
      return { formData: newFormData };
    });
  },

  /**
   * Obtiene el valor de un campo usando path notation
   * @param {string} path
   * @returns {*}
   */
  getField: (path) => {
    return getNestedValue(get().formData, path);
  },

  // ==========================================
  // GESTIÓN DE ARRAYS
  // ==========================================

  /**
   * Agrega un item a un array
   * @param {string} path - Ruta del array
   * @param {*} item - Item a agregar
   */
  addArrayItem: (path, item) => {
    set((state) => {
      const newFormData = { ...state.formData };
      const array = getNestedValue(newFormData, path);

      if (Array.isArray(array)) {
        setNestedValue(newFormData, path, [...array, item]);
      }

      return { formData: newFormData };
    });
  },

  /**
   * Actualiza un item en un array
   * @param {string} path - Ruta del array
   * @param {number} index - Índice del item
   * @param {*} item - Nuevo valor
   */
  updateArrayItem: (path, index, item) => {
    set((state) => {
      const newFormData = { ...state.formData };
      const array = getNestedValue(newFormData, path);

      if (Array.isArray(array) && array[index] !== undefined) {
        const newArray = [...array];
        newArray[index] = item;
        setNestedValue(newFormData, path, newArray);
      }

      return { formData: newFormData };
    });
  },

  /**
   * Elimina un item de un array
   * @param {string} path - Ruta del array
   * @param {number} index - Índice del item a eliminar
   */
  removeArrayItem: (path, index) => {
    set((state) => {
      const newFormData = { ...state.formData };
      const array = getNestedValue(newFormData, path);

      if (Array.isArray(array)) {
        const newArray = array.filter((_, i) => i !== index);
        setNestedValue(newFormData, path, newArray);
      }

      return { formData: newFormData };
    });
  },

  // ==========================================
  // VALIDACIÓN
  // ==========================================

  /**
   * Valida una sección específica del formulario
   * @param {string} phaseKey - Clave de la fase (ej: "form-candidato")
   * @returns {Object} { isValid: boolean, errors: {} }
   */
  validateSection: (phaseKey) => {
    const validator = FORM_VALIDATORS[phaseKey];

    if (!validator) {
      console.warn(`No existe validador para la fase: ${phaseKey}`);
      return { isValid: true, errors: {} };
    }

    // Convertir phase key a section key
    const sectionKey = phaseKey.replace("form-", "").replace(/-/g, "_");
    const sectionData = get().formData[sectionKey];

    // Caso especial: informacion_familiar necesita detalles_personales
    if (sectionKey === "informacion_familiar") {
      return validator(sectionData, get().formData.detalles_personales);
    }

    return validator(sectionData);
  },

  /**
   * Valida todas las secciones del formulario
   * @returns {Object} { isValid: boolean, errorsBySections: {}, totalErrors: number }
   */
  validateAllSections: () => {
    const formData = get().formData;
    const allErrors = {};
    let totalErrors = 0;

    Object.entries(FORM_VALIDATORS).forEach(([phaseKey, validator]) => {
      const sectionKey = phaseKey.replace("form-", "").replace(/-/g, "_");
      const sectionData = formData[sectionKey];

      let result;

      // Caso especial: informacion_familiar
      if (sectionKey === "informacion_familiar") {
        result = validator(sectionData, formData.detalles_personales);
      } else {
        result = validator(sectionData);
      }

      if (!result.isValid) {
        allErrors[phaseKey] = result.errors;
        totalErrors += Object.keys(result.errors).length;
      }
    });

    return {
      isValid: Object.keys(allErrors).length === 0,
      errorsBySections: allErrors,
      totalErrors,
    };
  },

  // ==========================================
  // ENVÍO DE APLICACIÓN
  // ==========================================

  /**
   * Envía la aplicación completa al servidor
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
   */
  submitApplication: async () => {
    const formData = get().formData;

    console.log("📤 Enviando aplicación completa...", formData);

    const result = await sendApplication(formData);

    if (result.success) {
      console.log("✅ Aplicación enviada exitosamente");
    } else {
      console.error("❌ Error al enviar aplicación:", result.error);
    }

    return result;
  },

  // ==========================================
  // UTILIDADES
  // ==========================================

  /**
   * Verifica si una sección está completa
   * @param {string} section - Nombre de la sección
   * @param {Array<string>} requiredFields - Campos requeridos
   * @returns {boolean}
   */
  isSectionComplete: (section, requiredFields = []) => {
    const sectionData = get().formData[section];

    if (!sectionData) return false;

    return requiredFields.every((field) => {
      const value = sectionData[field];
      return value !== null && value !== undefined && value !== "";
    });
  },

  /**
   * Obtiene todo el formulario
   * @returns {Object}
   */
  getFullFormData: () => {
    return get().formData;
  },

  /**
   * Convierte un currentStep a nombre de sección
   * @param {string} currentStep - Paso actual (ej: "form-candidato")
   * @returns {string|null} Nombre de sección (ej: "candidato")
   */
  getFormSectionFromStep: (currentStep) => {
    if (!currentStep || !currentStep.startsWith("form-")) {
      return null;
    }
    return currentStep.replace("form-", "").replace(/-/g, "_");
  },

  // ==========================================
  // RESET
  // ==========================================

  /**
   * Resetea todo el formulario a su estado inicial
   */
  resetForm: () => {
    set({
      formData: initialFormData,
      uploadToken: null,
    });
    console.log("🔄 Formulario reseteado");
  },

  /**
   * Limpia el token de subida
   */
  clearUploadToken: () => {
    set({ uploadToken: null });
  },
}));

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

function getNestedValue(obj, path) {
  const keys = path.split(".");
  let current = obj;

  for (const key of keys) {
    if (current === undefined || current === null) return undefined;
    current = current[key];
  }

  return current;
}
