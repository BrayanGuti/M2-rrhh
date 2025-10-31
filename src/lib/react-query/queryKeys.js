// @/lib/react-query/queryKeys.js

/**
 * Query Keys Factory
 * Centraliza todas las keys de React Query del proyecto
 */

export const queryKeys = {
  // ==================== CANDIDATES ====================
  candidates: {
    // Base
    all: ["candidates"],

    // Listas paginadas
    lists: () => [...queryKeys.candidates.all, "list"],
    list: (filters = {}) => [...queryKeys.candidates.lists(), filters],

    // Detalles individuales (usa postulacionId)
    details: () => [...queryKeys.candidates.all, "detail"],
    detail: (postulacionId) => [
      ...queryKeys.candidates.details(),
      postulacionId,
    ],

    // Información básica (primer fetch con postulacionId)
    basic: (postulacionId) => [
      ...queryKeys.candidates.detail(postulacionId),
      "basic",
    ],

    // Secciones específicas (usan candidatoId extraído)
    section: (candidatoId, sectionName) => [
      ...queryKeys.candidates.all,
      "candidato",
      candidatoId,
      sectionName,
    ],

    // CV/PDF
    cv: (candidatoId) => [...queryKeys.candidates.section(candidatoId, "cv")],

    // Todas las secciones de un candidato
    allSections: (candidatoId) => [
      ...queryKeys.candidates.all,
      "candidato",
      candidatoId,
    ],
  },

  // ==================== RECRUITERS ====================
  recruiters: {
    all: ["recruiters"],
    lists: () => [...queryKeys.recruiters.all, "list"],
    list: (filters = {}) => [...queryKeys.recruiters.lists(), filters],
    details: () => [...queryKeys.recruiters.all, "detail"],
    detail: (id) => [...queryKeys.recruiters.details(), id],
  },
};

/**
 * Nombres de secciones disponibles para candidatos
 */
export const CANDIDATE_SECTIONS = {
  BASIC: "basic",
  CV: "cv",
  DETALLES_PERSONALES: "detalles_personales",
  INFORMACION_FAMILIAR: "informacion_familiar",
  INFORMACION_ACADEMICA: "informacion_academica",
  INFORMACION_LABORAL: "informacion_laboral",
  REFERENCIAS_PERSONALES: "referencias_personales",
  DATOS_GENERALES: "datos_generales",
  DATOS_ECONOMICOS: "datos_economicos",
  TALLAS: "tallas",
};
