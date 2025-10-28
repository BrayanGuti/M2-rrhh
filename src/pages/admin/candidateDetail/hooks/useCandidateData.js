// hooks/useCandidateData.js
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DEBUG_MODE } from "../../../../const/config.js";

// ==================== CONFIGURATION ====================
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

// Cache duration: 10 minutes
const CACHE_DURATION = 10 * 60 * 1000;
const STALE_TIME = 5 * 60 * 1000;

// ==================== MOCK DATA ====================
const mockResponses = {
  basic: {
    exito: true,
    candidato_id: "ñelwfjñefpoeñaslmñasdv",
    mensaje: "Datos básicos del candidato obtenidos con éxito.",
    datos_postulacion: {
      fecha_solicitud: "2025-10-20",
      puesto_aspirado: "Líder de Compra",
      sueldo_deseado: 4500000,
    },
    candidato: {
      nombre_completo: "Carlos",
      correo: "juan.perez@ejemplo.com",
      telefono: "3001234567",
      documento_identidad: "1030567890",
      expedida_en: "Bogotá",
      edad: 35,
      fecha_nacimiento: "1990-05-15",
      lugar_nacimiento: "Cali",
    },
  },
  detalles_personales: {
    exito: true,
    detalles_personales: {
      libreta_militar_numero: "987654321",
      estado_civil: "Casado",
      numero_hijos: 2,
      tipo_vivienda: "Arrendada",
      valor_arriendo: 1200000,
      direccion_vivienda: "Calle 100 # 15-30",
      barrio: "Chico",
      localidad: "Usaquén",
      ciudad: "Bogotá",
      pais: "Colombia",
      tiempo_que_habita: "1 año",
      con_quien_vive: "Esposa e Hijos",
      eps: "Sura",
      afp: "Porvenir",
      observaciones:
        "El candidato ha expresado su disponibilidad es inmediata.",
    },
  },
  informacion_familiar: {
    exito: true,
    informacion_familiar: {
      conyuge: { nombre: "María Rodríguez", edad: 33, ocupacion: "Diseñadora" },
      hijos: [
        { nombre: "Hijo 1", edad: 8, ocupacion: "Estudiante" },
        { nombre: "Hijo 2", edad: 5, ocupacion: "Estudiante" },
      ],
      padres: [
        { nombre: "Padre", edad: 65, ocupacion: "Pensionado" },
        { nombre: "Madre", edad: 60, ocupacion: "Ama de Casa" },
      ],
      hermanos: [
        { nombre: "Hermano 1", edad: 30, ocupacion: "Ingeniero" },
        { nombre: "Hermano 2", edad: 25, ocupacion: "Médico" },
      ],
    },
  },
  informacion_academica: {
    exito: true,
    informacion_academica: {
      formacion: "Profesional",
      titulo_obtenido: "Ingeniero Industrial",
      anio_terminacion: 2015,
      otros_estudios: ["Diplomado en Logística", "Cocina"],
      estudio_actual: [],
    },
  },
  informacion_laboral: {
    exito: true,
    informacion_laboral: [
      {
        nombre: "Empresa Alfa",
        telefono: "6019876543",
        cargo: "Jefe de Compras",
        experiencia: 3,
        motivo_retiro: "Crecimiento profesional",
        funciones_realizadas:
          "Gestión de proveedores, negociación de contratos...",
        logros: "Reducción de costos del 15% en 2024.",
        dificultades: "Alta rotación de personal en el equipo.",
      },
      {
        nombre: "Empresa Beta",
        telefono: "6015554433",
        cargo: "Coordinador de Compras",
        experiencia: 2,
        motivo_retiro: "Mejora salarial",
        funciones_realizadas: "Supervisión de inventario y pedidos grandes.",
        logros: "Implementación de nuevo sistema de seguimiento.",
        dificultades: "Problemas de comunicación interdepartamental.",
      },
      {
        nombre: "Empresa Gamma",
        telefono: "6012221100",
        cargo: "Líder de Compra",
        experiencia: 1,
        motivo_retiro: "Finalización de contrato",
        funciones_realizadas: "Tareas de compra operativas.",
        logros: "Optimización del tiempo de entrega.",
        dificultades: "Presupuestos ajustados.",
      },
    ],
  },
  referencias_personales: {
    exito: true,
    referencias_personales: [
      {
        nombre: "Referencia 1",
        domicilio: "Dirección Ref 1",
        telefono_celular: "3101112233",
        ocupacion: "Abogado",
        tiempo_conocerlo: "10 años",
      },
      {
        nombre: "Referencia 2",
        domicilio: "Dirección Ref 2",
        telefono_celular: "3104445566",
        ocupacion: "Contador",
        tiempo_conocerlo: "5 años",
      },
    ],
  },
  datos_generales: {
    exito: true,
    datos_generales: {
      como_se_entero_empleo: "Portal de empleo (LinkedIn)",
      tiene_familiares_empresa: false,
      lo_recomienda_alguien: true,
      ha_trabajado_con_nosotros: true,
      puede_viajar: true,
      dispuesto_cambiar_residencia: true,
      fecha_disponibilidad: "2025-11-15",
    },
  },
  datos_economicos: {
    exito: true,
    datos_economicos: {
      tiene_otros_ingresos: false,
      conyuge_trabaja: true,
      tiene_automovil_propio: false,
      tiene_deudas: true,
      gastos_mensuales: 3500000,
    },
  },
  tallas: {
    exito: true,
    tallas: {
      talla_camisa_blusa: "L",
      talla_pantalon: "34",
      talla_calzado: "42",
    },
  },
};

// ==================== CACHE UTILITIES ====================
const getCacheKey = (id, section, type = "candidato") => {
  // Para la petición básica usamos postulacion, para las demás usamos candidato
  return `${type}_${id}_${section}`;
};

const saveToCache = (key, data) => {
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

const getFromCache = (key) => {
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

// ==================== API UTILITIES ====================
const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithDebug = async (endpoint, delay = 800, isBasicInfo = false) => {
  const sectionName = endpoint.split("/").pop();
  const startTime = Date.now();

  if (DEBUG_MODE) {
    const idType = isBasicInfo ? "postulacionId" : "candidatoId";
    console.log(`[FETCH] 🔄 Starting: ${sectionName} (using ${idType})`);
  }

  if (DEBUG_MODE) {
    await simulateDelay(delay);

    // Simulate error for datos_economicos
    if (sectionName === "datos_economicos") {
      const elapsed = Date.now() - startTime;
      console.log(`[FETCH] ❌ Failed: ${sectionName} (${elapsed}ms)`);
      throw new Error(`HTTP error! status: 500`);
    }

    const response = mockResponses[sectionName] || mockResponses.basic;
    const elapsed = Date.now() - startTime;
    console.log(`[FETCH] ✅ Success: ${sectionName} (${elapsed}ms)`);
    return response;
  }

  // Real API call
  console.log(`${API_BASE_URL}${endpoint}`);
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTAiLCJyb2xfaWQiOiIxIiwiaWF0IjoxNzYxNjIzNTU2LCJleHAiOjE3NjE2NTIzNTZ9.3ZeAjOC8D6SkUjGO6BVbQBRLgJGZhLgK2J858B3gYmI",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// ==================== CUSTOM HOOKS ====================

/**
 * Hook para obtener información básica del candidato (PRIORIDAD MÁXIMA)
 * Usa postulacionId de la URL y retorna candidato_id
 */
export const useCandidateBasicInfo = (postulacionId) => {
  return useQuery({
    queryKey: ["candidate", postulacionId, "basic"],
    queryFn: async () => {
      const cacheKey = getCacheKey(postulacionId, "basic", "postulacion");
      const cached = getFromCache(cacheKey);

      if (cached) return cached;

      const data = await fetchWithDebug(
        `/api/candidatos/${postulacionId}`,
        500,
        true // Indica que es petición básica con postulacionId
      );
      saveToCache(cacheKey, data);
      return data;
    },
    enabled: !!postulacionId,
    staleTime: STALE_TIME,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook para cargar secciones individuales con cache y retry
 * Usa candidatoId extraído de la respuesta básica
 */
export const useCandidateSection = (candidatoId, section, enabled = true) => {
  return useQuery({
    queryKey: ["candidate", candidatoId, section],
    queryFn: async () => {
      const cacheKey = getCacheKey(candidatoId, section, "candidato");
      const cached = getFromCache(cacheKey);

      if (cached) return cached;

      const data = await fetchWithDebug(
        `/api/candidatos/${candidatoId}/${section}`,
        1000,
        false // Indica que usa candidatoId
      );
      saveToCache(cacheKey, data);
      return data;
    },
    enabled: !!candidatoId && enabled,
    staleTime: STALE_TIME,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook compuesto con carga automática en lotes
 * Recibe postulacionId de la URL
 */
export const useCandidateDetail = (postulacionId) => {
  const [loadBatch2, setLoadBatch2] = useState(false);
  const [loadBatch3, setLoadBatch3] = useState(false);
  const queryClient = useQueryClient();

  // Información básica (siempre se carga primero con postulacionId)
  const basicQuery = useCandidateBasicInfo(postulacionId);

  // Extraer candidatoId de la respuesta básica
  const candidatoId = basicQuery.data?.candidato_id;

  if (DEBUG_MODE && candidatoId) {
    console.log(`[ID] 🎯 candidato_id extraído: ${candidatoId}`);
  }

  // LOTE 1: Prioridad Alta (se carga inmediatamente después de basic)
  // Ahora usa candidatoId en lugar de postulacionId
  const detallesQuery = useCandidateSection(
    candidatoId,
    "detalles_personales",
    basicQuery.isSuccess && !!candidatoId
  );
  const familiarQuery = useCandidateSection(
    candidatoId,
    "informacion_familiar",
    basicQuery.isSuccess && !!candidatoId
  );
  const academicaQuery = useCandidateSection(
    candidatoId,
    "informacion_academica",
    basicQuery.isSuccess && !!candidatoId
  );

  // LOTE 2: Prioridad Media
  const laboralQuery = useCandidateSection(
    candidatoId,
    "informacion_laboral",
    loadBatch2 && !!candidatoId
  );
  const referenciasQuery = useCandidateSection(
    candidatoId,
    "referencias_personales",
    loadBatch2 && !!candidatoId
  );
  const generalesQuery = useCandidateSection(
    candidatoId,
    "datos_generales",
    loadBatch2 && !!candidatoId
  );

  // LOTE 3: Prioridad Baja
  const economicosQuery = useCandidateSection(
    candidatoId,
    "datos_economicos",
    loadBatch3 && !!candidatoId
  );
  const tallasQuery = useCandidateSection(
    candidatoId,
    "tallas",
    loadBatch3 && !!candidatoId
  );

  // Lógica de carga en cascada
  useEffect(() => {
    // Solo proceder si tenemos candidatoId
    if (!candidatoId) return;

    // Cuando el lote 1 termine (éxito o error), cargar lote 2
    const batch1Settled =
      (detallesQuery.isSuccess || detallesQuery.isError) &&
      (familiarQuery.isSuccess || familiarQuery.isError) &&
      (academicaQuery.isSuccess || academicaQuery.isError);

    if (batch1Settled && !loadBatch2) {
      if (DEBUG_MODE) {
        console.log("[BATCH] 📦 Lote 1 completado. Iniciando Lote 2...");
      }
      setLoadBatch2(true);
    }
  }, [
    candidatoId,
    detallesQuery.isSuccess,
    detallesQuery.isError,
    familiarQuery.isSuccess,
    familiarQuery.isError,
    academicaQuery.isSuccess,
    academicaQuery.isError,
    loadBatch2,
  ]);

  useEffect(() => {
    // Solo proceder si tenemos candidatoId
    if (!candidatoId) return;

    // Cuando el lote 2 termine, cargar lote 3
    const batch2Settled =
      loadBatch2 &&
      (laboralQuery.isSuccess || laboralQuery.isError) &&
      (referenciasQuery.isSuccess || referenciasQuery.isError) &&
      (generalesQuery.isSuccess || generalesQuery.isError);

    if (batch2Settled && !loadBatch3) {
      if (DEBUG_MODE) {
        console.log("[BATCH] 📦 Lote 2 completado. Iniciando Lote 3...");
      }
      setLoadBatch3(true);
    }
  }, [
    candidatoId,
    loadBatch2,
    laboralQuery.isSuccess,
    laboralQuery.isError,
    referenciasQuery.isSuccess,
    referenciasQuery.isError,
    generalesQuery.isSuccess,
    generalesQuery.isError,
    loadBatch3,
  ]);

  // Función para reintentar una sección específica
  const retrySection = (section) => {
    if (DEBUG_MODE) {
      console.log(`[RETRY] 🔄 Retrying section: ${section}`);
    }
    queryClient.invalidateQueries(["candidate", candidatoId, section]);
  };

  // Función para reintentar todas las secciones fallidas
  const retryAllFailed = () => {
    const failedSections = [
      { query: detallesQuery, name: "detalles_personales" },
      { query: familiarQuery, name: "informacion_familiar" },
      { query: academicaQuery, name: "informacion_academica" },
      { query: laboralQuery, name: "informacion_laboral" },
      { query: referenciasQuery, name: "referencias_personales" },
      { query: generalesQuery, name: "datos_generales" },
      { query: economicosQuery, name: "datos_economicos" },
      { query: tallasQuery, name: "tallas" },
    ].filter((s) => s.query.isError);

    if (DEBUG_MODE) {
      console.log(
        `[RETRY] 🔄 Retrying ${failedSections.length} failed sections`
      );
    }

    failedSections.forEach((section) => {
      queryClient.invalidateQueries(["candidate", candidatoId, section.name]);
    });
  };

  // Contar errores
  const errorCount = [
    detallesQuery,
    familiarQuery,
    academicaQuery,
    laboralQuery,
    referenciasQuery,
    generalesQuery,
    economicosQuery,
    tallasQuery,
  ].filter((q) => q.isError).length;

  return {
    basic: basicQuery,
    detalles: detallesQuery,
    familiar: familiarQuery,
    academica: academicaQuery,
    laboral: laboralQuery,
    referencias: referenciasQuery,
    generales: generalesQuery,
    economicos: economicosQuery,
    tallas: tallasQuery,

    // Helpers
    candidatoId, // Exponemos el candidatoId extraído por si se necesita
    isAnyLoading:
      basicQuery.isLoading ||
      detallesQuery.isLoading ||
      familiarQuery.isLoading ||
      academicaQuery.isLoading ||
      laboralQuery.isLoading ||
      referenciasQuery.isLoading ||
      generalesQuery.isLoading ||
      economicosQuery.isLoading ||
      tallasQuery.isLoading,

    errorCount,
    retrySection,
    retryAllFailed,
  };
};
