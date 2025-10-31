// @/lib/react-query/cache.js

import { DEBUG_MODE } from "@/const/config";

// ==================== CONFIGURACIÓN ====================
export const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos
export const STALE_TIME = 5 * 60 * 1000; // 5 minutos

// ==================== CACHE UTILITIES ====================

/**
 * Genera key única para localStorage
 * @param {string} id - ID del recurso (postulacionId o candidatoId)
 * @param {string} section - Nombre de la sección
 * @param {string} type - Tipo de recurso (default: "candidato")
 * @returns {string} Key única para localStorage
 */
export const getCacheKey = (id, section, type = "candidato") => {
  return `${type}_${id}_${section}`;
};

/**
 * Guarda datos en localStorage con timestamp
 * @param {string} key - Key de localStorage
 * @param {any} data - Datos a guardar
 */
export const saveToCache = (key, data) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
    if (DEBUG_MODE) {
      console.log(`[CACHE] 💾 Saved: ${key}`);
    }
  } catch (error) {
    console.error("[CACHE] Error saving to localStorage:", error);
  }
};

/**
 * Obtiene datos de localStorage verificando expiración
 * @param {string} key - Key de localStorage
 * @returns {any|null} Datos si existen y no han expirado, null en caso contrario
 */
export const getFromCache = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const age = Date.now() - timestamp;

    if (age > CACHE_DURATION) {
      localStorage.removeItem(key);
      if (DEBUG_MODE) {
        console.log(`[CACHE] 🗑️ Expired: ${key}`);
      }
      return null;
    }

    if (DEBUG_MODE) {
      console.log(`[CACHE] ✅ Hit: ${key} (${Math.round(age / 1000)}s old)`);
    }
    return data;
  } catch (error) {
    console.error("[CACHE] Error reading from localStorage:", error);
    return null;
  }
};

/**
 * Limpia toda la cache de candidatos
 * @param {string|null} candidatoId - ID específico del candidato o null para limpiar todo
 */
export const clearCandidateCache = (candidatoId = null) => {
  try {
    const keys = Object.keys(localStorage);
    const pattern = candidatoId ? `candidato_${candidatoId}_` : "candidato_";

    keys
      .filter((key) => key.startsWith(pattern))
      .forEach((key) => localStorage.removeItem(key));

    if (DEBUG_MODE) {
      console.log(`[CACHE] 🗑️ Cleared cache for: ${pattern}*`);
    }
  } catch (error) {
    console.error("[CACHE] Error clearing cache:", error);
  }
};

/**
 * Limpia cache de postulaciones
 * @param {string|null} postulacionId - ID específico de la postulación o null para limpiar todo
 */
export const clearPostulacionCache = (postulacionId = null) => {
  try {
    const keys = Object.keys(localStorage);
    const pattern = postulacionId
      ? `postulacion_${postulacionId}_`
      : "postulacion_";

    keys
      .filter((key) => key.startsWith(pattern))
      .forEach((key) => localStorage.removeItem(key));

    if (DEBUG_MODE) {
      console.log(`[CACHE] 🗑️ Cleared cache for: ${pattern}*`);
    }
  } catch (error) {
    console.error("[CACHE] Error clearing cache:", error);
  }
};

/**
 * Limpia toda la cache (útil para logout o reset general)
 */
export const clearAllCache = () => {
  try {
    localStorage.clear();
    if (DEBUG_MODE) {
      console.log(`[CACHE] 🗑️ Cleared all cache`);
    }
  } catch (error) {
    console.error("[CACHE] Error clearing all cache:", error);
  }
};
