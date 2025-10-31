import { token } from "../../../utils/jwt";
import { DEBUG_MODE } from "@/const/config";
import {
  GET_RECRUITERS,
  CREATE_RECRUITER,
  DELETE_RECRUITER,
} from "@/const/endpoints";
import { MOCK_RECRUITERS, ERROR_MESSAGES } from "../const/config.js";

/**
 * Delay helper para simular latencia en modo debug
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Obtiene los headers comunes para las peticiones
 */
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token()}`,
});

/**
 * Obtiene la lista de reclutadores
 */
export const fetchRecruiters = async () => {
  if (DEBUG_MODE) {
    console.log("🔧 [DEBUG MODE] Fetching recruiters (mock data)");
    await delay(800);
    return MOCK_RECRUITERS;
  }

  try {
    const response = await fetch(GET_RECRUITERS, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.FETCH);
    }

    const data = await response.json();

    if (data.exito && data.usuarios) {
      return data.usuarios;
    }

    throw new Error(ERROR_MESSAGES.FETCH);
  } catch (error) {
    console.error("Error fetching recruiters:", error);
    throw new Error(ERROR_MESSAGES.GENERIC);
  }
};

/**
 * Crea un nuevo reclutador
 */
export const createRecruiter = async (recruiterData) => {
  if (DEBUG_MODE) {
    console.log("🔧 [DEBUG MODE] Creating recruiter:", recruiterData);
    await delay(1200);

    // Simular éxito
    return {
      ...recruiterData,
      id: String(Date.now()),
      created_at: new Date().toISOString(),
    };
  }

  try {
    const response = await fetch(CREATE_RECRUITER, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(recruiterData),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.CREATE);
    }

    const data = await response.json();

    if (data.exito) {
      // Retornar los datos con la fecha de creación
      return {
        ...recruiterData,
        created_at: new Date().toISOString(),
      };
    }

    throw new Error(ERROR_MESSAGES.CREATE);
  } catch (error) {
    console.error("Error creating recruiter:", error);
    throw new Error(ERROR_MESSAGES.GENERIC);
  }
};

/**
 * Elimina un reclutador
 */
export const deleteRecruiter = async (recruiterId) => {
  if (DEBUG_MODE) {
    console.log("🔧 [DEBUG MODE] Deleting recruiter:", recruiterId);
    await delay(1000);

    // Simular éxito
    return { exito: true };
  }

  try {
    const response = await fetch(DELETE_RECRUITER(recruiterId), {
      method: "POST",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.DELETE);
    }

    const data = await response.json();

    if (data.exito) {
      return data;
    }

    throw new Error(ERROR_MESSAGES.DELETE);
  } catch (error) {
    console.error("Error deleting recruiter:", error);
    throw new Error(ERROR_MESSAGES.GENERIC);
  }
};
