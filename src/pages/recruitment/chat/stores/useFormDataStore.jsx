// stores/useFormDataStore.js
import { create } from "zustand";
import { initialFormData } from "./const";
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
} from "../validations/formValidations";
import { VACANCY_COVERTATION_PHASES } from "../const/Phases";

// 🎯 Mapa de validadores: clave = nombre de sección en formData
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

export const useFormDataStore = create((set, get) => ({
  formData: initialFormData,
  extractedCVData: null,
  uploadToken: null,

  // === VALIDADORES ===

  /**
   * Obtiene la función de validación para una sección específica
   * @param {string} sectionName - Nombre de la sección (ej: "datos_postulacion")
   * @returns {Function|null} Función de validación o null si no existe
   */
  getValidator: (sectionName) => {
    return FORM_VALIDATORS[sectionName] || null;
  },

  /**
   * Valida una sección específica del formulario
   * @param {string} sectionName - Nombre de la sección a validar
   * @returns {Object} { isValid: boolean, errors: {} }
   */
  validateSection: (sectionName) => {
    const validator = FORM_VALIDATORS[sectionName];

    if (!validator) {
      console.warn(`No existe validador para la sección: ${sectionName}`);
      return { isValid: true, errors: {} };
    }

    const sectionData = get().formData[sectionName];
    return validator(sectionData);
  },

  // === VALIDACIÓN GLOBAL Y SUBMIT ===

  /**
   * Valida todas las secciones del formulario
   * @returns {Object} { isValid: boolean, errorsBySections: {}, totalErrors: number }
   */
  validateAllSections: () => {
    const formData = get().formData;
    const allErrors = {};
    let totalErrors = 0;

    // Validar cada sección
    Object.entries(FORM_VALIDATORS).forEach(([phaseKey, validator]) => {
      const sectionKey = phaseKey.replace("form-", "").replace(/-/g, "_");

      let result;

      // Caso especial: informacion_familiar necesita detalles_personales
      if (sectionKey === "informacion_familiar") {
        result = validator(
          formData.informacion_familiar,
          formData.detalles_personales
        );
      } else {
        result = validator(formData[sectionKey]);
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

  /**
   * Envía la aplicación al servidor
   * @returns {Promise<Object>} Respuesta del servidor
   */
  submitApplication: async () => {
    const fullFormData = get().formData;

    try {
      const response = await fetch("/api/submit/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullFormData),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error("Error al enviar la aplicación:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Convierte un currentStep (formato: "form-datos-postulacion")
   * al nombre de sección en formData (formato: "datos_postulacion")
   * @param {string} currentStep - Paso actual del chat
   * @returns {string|null} Nombre de la sección o null
   */
  getFormSectionFromStep: (currentStep) => {
    // Remover el prefijo "form-" y reemplazar guiones por guiones bajos
    if (!currentStep || !currentStep.startsWith("form-")) {
      return null;
    }

    return currentStep.replace("form-", "").replace(/-/g, "_");
  },

  // === FUNCIONES PARA MANEJAR CV ===

  setExtractedData: (extractedData, token) => {
    set({
      extractedCVData: extractedData,
      uploadToken: token,
      formData: {
        ...get().formData,
        upload_token: token,
      },
    });
  },

  // === FUNCIONES PARA MANEJAR CAMPOS ===

  setField: (path, value) => {
    set((state) => {
      const newFormData = { ...state.formData };
      setNestedValue(newFormData, path, value);
      return { formData: newFormData };
    });
  },

  getField: (path) => {
    return getNestedValue(get().formData, path);
  },

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

      // Si data es un array, reemplazar directamente (no hacer spread)
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

  getSection: (section) => {
    return get().formData[section];
  },

  // === FUNCIONES PARA ARRAYS ===

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

  // === VALIDACIÓN Y UTILIDADES ===

  isSectionComplete: (section, requiredFields = []) => {
    const sectionData = get().formData[section];

    if (!sectionData) return false;

    return requiredFields.every((field) => {
      const value = sectionData[field];
      return value !== null && value !== undefined && value !== "";
    });
  },

  getFullFormData: () => {
    return get().formData;
  },

  // === RESET ===

  resetForm: () => {
    set({
      formData: initialFormData,
      extractedCVData: null,
      uploadToken: null,
    });
  },

  clearExtractedData: () => {
    set({
      extractedCVData: null,
      uploadToken: null,
    });
  },
}));

// === FUNCIONES AUXILIARES ===

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
