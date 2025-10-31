// hooks/useCandidateData.js
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DEBUG_MODE } from "@/const/config.js";
import { GET_CANDIDATE_DETAILS, GET_PDF_RESUME } from "@/const/endpoints.js";
import { token } from "../../../utils/jwt";
import {
  getCacheKey,
  saveToCache,
  getFromCache,
  STALE_TIME,
} from "@/lib/react-query/cache";
import { queryKeys, CANDIDATE_SECTIONS } from "@/lib/react-query/queryKeys";

// ==================== CONFIGURACIÓN ====================
// PDF Local para modo DEBUG - Coloca tu PDF en la carpeta public
const LOCAL_PDF_PATH = "/mock.pdf";

// ==================== MOCK DATA ====================
const mockResponses = {
  basic: {
    exito: true,
    candidato_id: "ñelwfjñefpoeñaslmñasdv",
    estado: "pendiente",
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
  const response = await fetch(GET_CANDIDATE_DETAILS(endpoint), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Fetch específico para PDFs (retorna Blob)
const fetchPDFWithDebug = async (endpoint, delay = 1000) => {
  const startTime = Date.now();

  if (DEBUG_MODE) {
    console.log(`[FETCH PDF] 🔄 Starting: Local PDF from ${LOCAL_PDF_PATH}`);
    await simulateDelay(delay);

    // Cargar PDF desde carpeta public (local)
    const response = await fetch(LOCAL_PDF_PATH);
    if (!response.ok) {
      const elapsed = Date.now() - startTime;
      console.log(`[FETCH PDF] ❌ Failed: Local PDF not found (${elapsed}ms)`);
      throw new Error(`Failed to fetch local PDF from ${LOCAL_PDF_PATH}`);
    }

    const blob = await response.blob();
    const elapsed = Date.now() - startTime;
    console.log(`[FETCH PDF] ✅ Success: Local PDF loaded (${elapsed}ms)`);
    return blob;
  }

  // Real API call
  const response = await fetch(GET_PDF_RESUME(endpoint), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.blob();
};

// ==================== CUSTOM HOOKS ====================

/**
 * Hook para obtener información básica del candidato (PRIORIDAD MÁXIMA)
 * Usa postulacionId de la URL y retorna candidato_id
 */
export const useCandidateBasicInfo = (postulacionId) => {
  return useQuery({
    queryKey: queryKeys.candidates.basic(postulacionId),
    queryFn: async () => {
      const cacheKey = getCacheKey(
        postulacionId,
        CANDIDATE_SECTIONS.BASIC,
        "postulacion"
      );
      const cached = getFromCache(cacheKey);

      if (cached) return cached;

      const data = await fetchWithDebug(
        `/api/candidatos/${postulacionId}`,
        500,
        true
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
 * Hook para obtener el CV/Hoja de Vida del candidato (PDF)
 * Retorna un Blob que se mantiene en memoria durante la sesión
 */
export const useCandidateCV = (candidatoId, enabled = true) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  const query = useQuery({
    queryKey: queryKeys.candidates.cv(candidatoId),
    queryFn: async () => {
      const blob = await fetchPDFWithDebug(
        `/api/candidatos/${candidatoId}/cv_adjunto`,
        1200
      );

      // Crear URL del Blob para usar en iframe/window.open
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      return { blob, url };
    },
    enabled: !!candidatoId && enabled,
    staleTime: Infinity, // El PDF no cambia durante la sesión
    cacheTime: Infinity, // Mantener en caché de React Query
    gcTime: Infinity, // Para React Query v5+
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Cleanup: revocar URL cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        if (DEBUG_MODE) {
          console.log("[PDF] 🗑️ Blob URL revoked");
        }
      }
    };
  }, [pdfUrl]);

  return {
    ...query,
    pdfUrl,
  };
};

/**
 * Hook para cargar secciones individuales con cache y retry
 * Usa candidatoId extraído de la respuesta básica
 */
export const useCandidateSection = (candidatoId, section, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.candidates.section(candidatoId, section),
    queryFn: async () => {
      const cacheKey = getCacheKey(candidatoId, section, "candidato");
      const cached = getFromCache(cacheKey);

      if (cached) return cached;

      const data = await fetchWithDebug(
        `/api/candidatos/${candidatoId}/${section}`,
        1000,
        false
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
  // Incluye CV/Hoja de Vida
  const cvQuery = useCandidateCV(
    candidatoId,
    basicQuery.isSuccess && !!candidatoId
  );
  const detallesQuery = useCandidateSection(
    candidatoId,
    CANDIDATE_SECTIONS.DETALLES_PERSONALES,
    basicQuery.isSuccess && !!candidatoId
  );
  const familiarQuery = useCandidateSection(
    candidatoId,
    CANDIDATE_SECTIONS.INFORMACION_FAMILIAR,
    basicQuery.isSuccess && !!candidatoId
  );
  const academicaQuery = useCandidateSection(
    candidatoId,
    CANDIDATE_SECTIONS.INFORMACION_ACADEMICA,
    basicQuery.isSuccess && !!candidatoId
  );

  // LOTE 2: Prioridad Media
  const laboralQuery = useCandidateSection(
    candidatoId,
    CANDIDATE_SECTIONS.INFORMACION_LABORAL,
    loadBatch2 && !!candidatoId
  );
  const referenciasQuery = useCandidateSection(
    candidatoId,
    CANDIDATE_SECTIONS.REFERENCIAS_PERSONALES,
    loadBatch2 && !!candidatoId
  );
  const generalesQuery = useCandidateSection(
    candidatoId,
    CANDIDATE_SECTIONS.DATOS_GENERALES,
    loadBatch2 && !!candidatoId
  );

  // LOTE 3: Prioridad Baja
  const economicosQuery = useCandidateSection(
    candidatoId,
    CANDIDATE_SECTIONS.DATOS_ECONOMICOS,
    loadBatch3 && !!candidatoId
  );
  const tallasQuery = useCandidateSection(
    candidatoId,
    CANDIDATE_SECTIONS.TALLAS,
    loadBatch3 && !!candidatoId
  );

  // Lógica de carga en cascada
  useEffect(() => {
    if (!candidatoId) return;

    // Cuando el lote 1 termine (éxito o error), cargar lote 2
    const batch1Settled =
      (cvQuery.isSuccess || cvQuery.isError) &&
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
    cvQuery.isSuccess,
    cvQuery.isError,
    detallesQuery.isSuccess,
    detallesQuery.isError,
    familiarQuery.isSuccess,
    familiarQuery.isError,
    academicaQuery.isSuccess,
    academicaQuery.isError,
    loadBatch2,
  ]);

  useEffect(() => {
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
    queryClient.invalidateQueries(
      queryKeys.candidates.section(candidatoId, section)
    );
  };

  // Función para reintentar todas las secciones fallidas
  const retryAllFailed = () => {
    const failedSections = [
      { query: cvQuery, name: CANDIDATE_SECTIONS.CV },
      { query: detallesQuery, name: CANDIDATE_SECTIONS.DETALLES_PERSONALES },
      { query: familiarQuery, name: CANDIDATE_SECTIONS.INFORMACION_FAMILIAR },
      { query: academicaQuery, name: CANDIDATE_SECTIONS.INFORMACION_ACADEMICA },
      { query: laboralQuery, name: CANDIDATE_SECTIONS.INFORMACION_LABORAL },
      {
        query: referenciasQuery,
        name: CANDIDATE_SECTIONS.REFERENCIAS_PERSONALES,
      },
      { query: generalesQuery, name: CANDIDATE_SECTIONS.DATOS_GENERALES },
      { query: economicosQuery, name: CANDIDATE_SECTIONS.DATOS_ECONOMICOS },
      { query: tallasQuery, name: CANDIDATE_SECTIONS.TALLAS },
    ].filter((s) => s.query.isError);

    if (DEBUG_MODE) {
      console.log(
        `[RETRY] 🔄 Retrying ${failedSections.length} failed sections`
      );
    }

    failedSections.forEach((section) => {
      queryClient.invalidateQueries(
        queryKeys.candidates.section(candidatoId, section.name)
      );
    });
  };

  // Contar errores
  const errorCount = [
    cvQuery,
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
    cv: cvQuery,
    detalles: detallesQuery,
    familiar: familiarQuery,
    academica: academicaQuery,
    laboral: laboralQuery,
    referencias: referenciasQuery,
    generales: generalesQuery,
    economicos: economicosQuery,
    tallas: tallasQuery,

    // Helpers
    candidatoId,
    isAnyLoading:
      basicQuery.isLoading ||
      cvQuery.isLoading ||
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
