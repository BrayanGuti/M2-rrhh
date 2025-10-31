const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

// ==== Candidatos ====
export const GET_CANDIDATES = (params) =>
  `${API_BASE_URL}/api/candidatos/?${params.toString()}`;

export const REJECT_CANDIDATE = (candidate_id) =>
  `${API_BASE_URL}/api/candidatos/pendientes/${candidate_id}/rechazar`;

export const SAVE_AS_CONTACT = (candidate_id) =>
  `${API_BASE_URL}/api/candidatos/pendientes/${candidate_id}/contacto`;

// ==== Detalles de Candidatos ====
export const GET_CANDIDATE_DETAILS = (endpoint) => `${API_BASE_URL}${endpoint}`;
export const GET_PDF_RESUME = (endpoint) => `${API_BASE_URL}${endpoint}`;

// ==== Auth ====
export const LOGIN = `${API_BASE_URL}/api/usuarios/login`;

// ==== Reclutadores ====
export const GET_RECRUITERS = `${API_BASE_URL}/api/usuarios/?rol=Reclutador`;

export const CREATE_RECRUITER = `${API_BASE_URL}/api/usuarios/reclutador/registro`;

export const DELETE_RECRUITER = (recruiter_id) =>
  `${API_BASE_URL}/api/usuarios/eliminar/${recruiter_id}`;

// ==== Formulario de Postulacion ====

export const SUBMIT_CV = `${API_BASE_URL}/api/submit/cv-extract`;

export const SUBMIT_APPLICATION = `${API_BASE_URL}/api/submit/application`;
