// services/apiServices.js

// Cambia esto por tu URL del backend
const API_BASE_URL = "http://localhost:8000"; // O tu URL de producción

// Flag para usar versión de debug (cambiar a false cuando uses backend real)
const USE_DEBUG_MODE = true;

/**
 * Versión de debug que simula la respuesta del backend
 * @param {File} file - Archivo CV
 * @returns {Promise<Object>} Respuesta simulada
 */
async function uploadCVDebug(file) {
  console.log("🔧 [DEBUG MODE] Simulando subida de CV:", file.name);

  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simular respuesta exitosa del backend
  const mockResponse = {
    exito: true,
    token_subida: `temp-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`,
    datos_extraidos: {
      // Campos básicos que probablemente vengan del CV
      nombre_completo: "Juan Pérez Gómez",
      correo_electronico: "juan.perez@ejemplo.com",
      telefono: "+57 300 123 4567",
      documento_identidad: "1030567890",
      edad: 35,
      lugar_nacimiento: "Cali",
      fecha_nacimiento: "1990-05-15",

      // Puedes agregar más campos simulados aquí según necesites
      // expedida_en: "Bogotá",
    },
  };

  console.log("✅ [DEBUG MODE] Respuesta simulada:", mockResponse);
  return mockResponse;
}

/**
 * Sube un CV al backend y extrae información
 * @param {File} file - Archivo CV (PDF)
 * @returns {Promise<Object>} { exito, token_subida, datos_extraidos }
 */
export async function uploadCV(file) {
  // Si está en modo debug, usar versión simulada
  if (USE_DEBUG_MODE) {
    return uploadCVDebug(file);
  }

  // Versión real del backend
  const formData = new FormData();
  formData.append("cv_file", file);

  try {
    const response = await fetch(`${API_BASE_URL}/api/submit/cv-extract`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error al subir CV: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.exito) {
      throw new Error("El servidor no pudo procesar el CV");
    }

    console.log("✅ CV procesado exitosamente:", data);
    return data;
  } catch (error) {
    console.error("❌ Error en uploadCV:", error);
    throw error;
  }
}

/**
 * Envía la aplicación completa al backend
 * @param {Object} applicationData - Datos completos del formulario
 * @returns {Promise<Object>} Respuesta del servidor
 */
export async function submitApplication(applicationData) {
  // Versión debug
  if (USE_DEBUG_MODE) {
    console.log(
      "🔧 [DEBUG MODE] Simulando envío de aplicación:",
      applicationData
    );
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockResponse = {
      exito: true,
      mensaje: "Aplicación recibida exitosamente",
      id_aplicacion: `APP-${Date.now()}`,
    };

    console.log("✅ [DEBUG MODE] Aplicación enviada:", mockResponse);
    return mockResponse;
  }

  // Versión real del backend
  try {
    const response = await fetch(`${API_BASE_URL}/api/submit/application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
      throw new Error(`Error al enviar aplicación: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Aplicación enviada exitosamente:", data);
    return data;
  } catch (error) {
    console.error("❌ Error en submitApplication:", error);
    throw error;
  }
}

/**
 * Mapea datos extraídos del CV al formato del formulario
 * Esta función es flexible y solo mapea campos que existen
 * @param {Object} extractedData - Datos del CV extraídos por el backend
 * @returns {Object} Datos mapeados por sección
 */
export function mapExtractedDataToForm(extractedData) {
  if (!extractedData) return {};

  const mappedData = {
    candidato: {},
    detalles_personales: {},
    // Agregar más secciones según necesites
  };

  // Mapeo flexible de campos
  const fieldMappings = {
    // Sección: candidato
    nombre_completo: { section: "candidato", field: "nombre_completo" },
    correo_electronico: { section: "candidato", field: "correo_electronico" },
    telefono: { section: "candidato", field: "telefono_movil" },
    documento_identidad: { section: "candidato", field: "documento_identidad" },
    edad: { section: "candidato", field: "edad" },
    lugar_nacimiento: { section: "candidato", field: "lugar_nacimiento" },
    fecha_nacimiento: { section: "candidato", field: "fecha_nacimiento" },
    expedida_en: { section: "candidato", field: "expedida_en" },

    // Agregar más mapeos según los campos que devuelva tu backend
  };

  // Aplicar mapeo
  Object.entries(extractedData).forEach(([key, value]) => {
    const mapping = fieldMappings[key];

    if (mapping && value !== null && value !== undefined && value !== "") {
      if (!mappedData[mapping.section]) {
        mappedData[mapping.section] = {};
      }
      mappedData[mapping.section][mapping.field] = value;
    }
  });

  return mappedData;
}
