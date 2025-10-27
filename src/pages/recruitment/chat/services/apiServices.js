// services/apiServices.js

// ============================================
// CONFIGURACIÓN
// ============================================

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const USE_DEBUG_MODE = true; // Cambiar a false para usar backend real

// ============================================
// DATOS MOCK PARA DEBUG
// ============================================

const MOCK_CV_RESPONSE = {
  exito: true,
  token_subida: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  datos_extraidos: {
    candidato: {
      nombre_completo: "Carlos Andrés Pérez",
      correo_electronico: "carlos.perez@ejemplo.com",
      telefono_movil: "3001234567",
      documento_identidad: "1030567890",
      expedida_en: "Bogotá",
      edad: 35,
      lugar_nacimiento: "Cali",
      fecha_nacimiento: "1990-05-15",
    },
    informacion_academica: {
      formacion: "Profesional",
      titulo_obtenido: "Ingeniero Industrial",
      anio_terminacion: 2015,
      otros_estudios: ["Diplomado en Logística", "Cocina"],
      estudio_actual: [],
    },
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
    referencias_personales: [
      {
        nombre: "María González",
        domicilio: "Calle 45 #12-34, Bogotá",
        telefono_celular: "3101112233",
        ocupacion: "Abogado",
        tiempo_conocerlo: "10 años",
      },
      {
        nombre: "Pedro Rodríguez",
        domicilio: "Carrera 7 #89-12, Bogotá",
        telefono_celular: "3104445566",
        ocupacion: "Contador",
        tiempo_conocerlo: "5 años",
      },
    ],
  },
};

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Simula delay de red para mejor UX en modo debug
 * @param {number} ms - Milisegundos de delay
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Maneja errores HTTP y los convierte en mensajes legibles
 * @param {Response} response - Respuesta de fetch
 */
async function handleHTTPError(response) {
  let errorMessage = `Error HTTP ${response.status}: ${response.statusText}`;

  try {
    const errorData = await response.json();
    if (errorData.mensaje || errorData.error) {
      errorMessage = errorData.mensaje || errorData.error;
    }
  } catch {
    // Si no se puede parsear el JSON, usar mensaje por defecto
  }

  throw new Error(errorMessage);
}

/**
 * Valida que el archivo sea un PDF válido
 * @param {File} file - Archivo a validar
 * @throws {Error} Si el archivo no es válido
 */
function validateCVFile(file) {
  if (!file) {
    throw new Error("No se proporcionó ningún archivo");
  }

  if (file.type !== "application/pdf") {
    throw new Error("El archivo debe ser un PDF");
  }

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (file.size > MAX_SIZE) {
    throw new Error("El archivo no debe superar los 10MB");
  }
}

// ============================================
// API: SUBIDA Y PROCESAMIENTO DE CV
// ============================================

/**
 * Versión DEBUG: Simula la subida y procesamiento del CV
 * @param {File} file - Archivo CV
 * @returns {Promise<Object>}
 */
async function uploadCVDebug(file) {
  console.log("🔧 [DEBUG MODE] Simulando subida de CV:", file.name);

  // Validar archivo
  validateCVFile(file);

  // Simular delay de procesamiento (1.5-2.5 segundos)
  await delay(1500 + Math.random() * 1000);

  // Simular respuesta exitosa
  console.log("✅ [DEBUG MODE] Respuesta simulada:", MOCK_CV_RESPONSE);
  return MOCK_CV_RESPONSE;
}

/**
 * Versión REAL: Sube el CV al backend y obtiene datos extraídos
 * @param {File} file - Archivo CV (PDF)
 * @returns {Promise<Object>} { exito, token_subida, datos_extraidos }
 */
async function uploadCVReal(file) {
  console.log("📤 Subiendo CV al servidor:", file.name);

  // Validar archivo antes de enviar
  validateCVFile(file);

  const formData = new FormData();
  formData.append("cv_file", file);

  try {
    const response = await fetch(`${API_BASE_URL}/api/submit/cv-extract`, {
      method: "POST",
      body: formData,
      // No enviar Content-Type, el browser lo maneja automáticamente con boundary
    });

    if (!response.ok) {
      await handleHTTPError(response);
    }

    const data = await response.json();

    if (!data.exito) {
      throw new Error(data.mensaje || "El servidor no pudo procesar el CV");
    }

    console.log("✅ CV procesado exitosamente:", data);
    return data;
  } catch (error) {
    console.error("❌ Error al subir CV:", error);
    throw error;
  }
}

/**
 * Función principal: Sube y procesa un CV
 * @param {File} file - Archivo CV (PDF)
 * @returns {Promise<Object>}
 */
export async function uploadCV(file) {
  return USE_DEBUG_MODE ? uploadCVDebug(file) : uploadCVReal(file);
}

// ============================================
// API: ENVÍO DE APLICACIÓN COMPLETA
// ============================================

/**
 * Versión DEBUG: Simula el envío de la aplicación
 * @param {Object} applicationData
 * @returns {Promise<Object>}
 */
async function sendApplicationDebug(applicationData) {
  console.log(
    "🔧 [DEBUG MODE] Simulando envío de aplicación:",
    applicationData
  );

  // Simular delay de red
  await delay(2000);

  // Simular éxito (90% de probabilidad)
  const success = Math.random() > 0.1;

  if (success) {
    const mockResponse = {
      success: true,
      message: "Aplicación recibida exitosamente",
      application_id: `APP-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    console.log("✅ [DEBUG MODE] Aplicación enviada:", mockResponse);
    return mockResponse;
  } else {
    // Simular error ocasional
    throw new Error(
      "Error simulado: El servidor está temporalmente no disponible"
    );
  }
}

/**
 * Versión REAL: Envía la aplicación completa al backend
 * @param {Object} applicationData - Datos del formulario completo
 * @returns {Promise<Object>}
 */
async function sendApplicationReal(applicationData) {
  console.log("📤 Enviando aplicación al servidor...");

  try {
    const response = await fetch(`${API_BASE_URL}/api/submit/application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
      await handleHTTPError(response);
    }

    const data = await response.json();
    console.log("✅ Aplicación enviada exitosamente:", data);
    return data;
  } catch (error) {
    console.error("❌ Error al enviar aplicación:", error);
    throw error;
  }
}

/**
 * Función principal: Envía la aplicación completa
 * @param {Object} applicationData
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export async function sendApplication(applicationData) {
  try {
    const data = USE_DEBUG_MODE
      ? await sendApplicationDebug(applicationData)
      : await sendApplicationReal(applicationData);

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Error desconocido al enviar la aplicación",
    };
  }
}

// ============================================
// UTILIDADES DE DATOS
// ============================================

/**
 * Valida la estructura de datos extraídos del CV
 * @param {Object} extractedData
 * @returns {boolean}
 */
export function isValidCVData(extractedData) {
  if (!extractedData || typeof extractedData !== "object") {
    return false;
  }

  // Validar que al menos tenga datos de candidato
  return extractedData.candidato && typeof extractedData.candidato === "object";
}

/**
 * Cuenta cuántos campos útiles se extrajeron del CV
 * @param {Object} extractedData
 * @returns {number}
 */
export function countExtractedFields(extractedData) {
  if (!extractedData) return 0;

  let count = 0;

  // Contar campos en candidato
  if (extractedData.candidato) {
    count += Object.values(extractedData.candidato).filter(
      (v) => v !== null && v !== undefined && v !== ""
    ).length;
  }

  // Contar campos en información académica
  if (extractedData.informacion_academica) {
    const academic = extractedData.informacion_academica;
    if (academic.formacion) count++;
    if (academic.titulo_obtenido) count++;
    if (academic.anio_terminacion) count++;
    if (academic.otros_estudios?.length)
      count += academic.otros_estudios.length;
  }

  // Contar experiencias laborales
  if (Array.isArray(extractedData.informacion_laboral)) {
    count += extractedData.informacion_laboral.length;
  }

  // Contar referencias
  if (Array.isArray(extractedData.referencias_personales)) {
    count += extractedData.referencias_personales.length;
  }

  return count;
}
