// validations/formValidations.js

/**
 * Validación para Datos de Postulación
 * @param {Object} data - datos_postulacion del formData
 * @returns {Object} { isValid: boolean, errors: {} }
 */
export const validateDatosPostulacion = (data) => {
  const errors = {};

  if (!data.puesto_aspirado) {
    errors.puesto_aspirado = "Debes seleccionar un puesto";
  }

  if (!data.sueldo_deseado || data.sueldo_deseado <= 0) {
    errors.sueldo_deseado = "Debes ingresar un sueldo válido";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validación para Candidato (datos personales básicos)
 * @param {Object} data - candidato del formData
 * @returns {Object} { isValid: boolean, errors: {} }
 */
export const validateCandidato = (data) => {
  const errors = {};

  if (!data || typeof data !== "object") {
    return { isValid: false, errors: {} };
  }

  if (!data.nombre_completo || data.nombre_completo.trim().length < 3) {
    errors.nombre_completo =
      "El nombre completo es requerido (mínimo 3 caracteres)";
  }

  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.correo_electronico || !emailRegex.test(data.correo_electronico)) {
    errors.correo_electronico = "Ingresa un correo electrónico válido";
  }

  // Validación de teléfono (formato colombiano básico)
  const phoneRegex = /^[0-9]{10}$/;
  if (!data.telefono_movil || !phoneRegex.test(data.telefono_movil)) {
    errors.telefono_movil = "Ingresa un teléfono móvil válido (10 dígitos)";
  }

  if (!data.documento_identidad || data.documento_identidad.trim().length < 5) {
    errors.documento_identidad = "El documento de identidad es requerido";
  }

  if (!data.expedida_en || data.expedida_en.trim().length < 2) {
    errors.expedida_en = "El lugar de expedición es requerido";
  }

  if (!data.edad || data.edad < 18 || data.edad > 100) {
    errors.edad = "Debes tener entre 18 y 100 años";
  }

  if (!data.lugar_nacimiento || data.lugar_nacimiento.trim().length < 2) {
    errors.lugar_nacimiento = "El lugar de nacimiento es requerido";
  }

  if (!data.fecha_nacimiento) {
    errors.fecha_nacimiento = "La fecha de nacimiento es requerida";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validación para Detalles Personales
 * @param {Object} data - detalles_personales del formData
 * @returns {Object} { isValid: boolean, errors: {} }
 */
export const validateDetallesPersonales = (data) => {
  const errors = {};

  if (!data.estado_civil) {
    errors.estado_civil = "El estado civil es requerido";
  }

  if (data.numero_hijos < 0) {
    errors.numero_hijos = "El número de hijos no puede ser negativo";
  }

  if (!data.tipo_vivienda) {
    errors.tipo_vivienda = "El tipo de vivienda es requerido";
  }

  if (!data.direccion_vivienda || data.direccion_vivienda.trim().length < 5) {
    errors.direccion_vivienda = "La dirección de vivienda es requerida";
  }

  if (!data.barrio || data.barrio.trim().length < 2) {
    errors.barrio = "El barrio es requerido";
  }

  if (!data.con_quien_vive || data.con_quien_vive.trim().length < 2) {
    errors.con_quien_vive = "Debes indicar con quién vives";
  }

  if (!data.eps || data.eps.trim().length < 2) {
    errors.eps = "La EPS es requerida";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validación para Información Académica
 * @param {Object} data - informacion_academica del formData
 * @returns {Object} { isValid: boolean, errors: {} }
 */
export const validateInformacionAcademica = (data) => {
  const errors = {};

  if (!data.formacion) {
    errors.formacion = "El nivel de formación es requerido";
  }

  if (data.formacion !== "Primaria" && !data.titulo_obtenido) {
    errors.titulo_obtenido = "El título obtenido es requerido";
  }

  if (
    !data.anio_terminacion ||
    data.anio_terminacion < 1950 ||
    data.anio_terminacion > new Date().getFullYear()
  ) {
    errors.anio_terminacion = "El año de terminación es inválido";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validación para Referencias Personales
 * @param {Array} data - referencias_personales del formData
 * @returns {Object} { isValid: boolean, errors: {} }
 */
export const validateReferenciasPersonales = (data) => {
  const errors = {};

  if (!Array.isArray(data) || data.length < 2) {
    errors.referencias = "Debes agregar al menos 2 referencias personales";
    return {
      isValid: false,
      errors,
    };
  }

  // Validar cada referencia
  data.forEach((ref, index) => {
    if (!ref.nombre || ref.nombre.trim().length < 3) {
      errors[`referencia_${index}_nombre`] = `Nombre requerido en referencia ${
        index + 1
      }`;
    }
    if (!ref.telefono || ref.telefono.trim().length < 10) {
      errors[
        `referencia_${index}_telefono`
      ] = `Teléfono requerido en referencia ${index + 1}`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validación para Datos Generales
 * @param {Object} data - datos_generales del formData
 * @returns {Object} { isValid: boolean, errors: {} }
 */
export const validateDatosGenerales = (data) => {
  const errors = {};

  if (
    !data.como_se_entero_empleo ||
    data.como_se_entero_empleo.trim().length < 2
  ) {
    errors.como_se_entero_empleo = "Debes indicar cómo te enteraste del empleo";
  }

  if (!data.fecha_disponibilidad) {
    errors.fecha_disponibilidad = "La fecha de disponibilidad es requerida";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validación para Tallas
 * @param {Object} data - tallas del formData
 * @returns {Object} { isValid: boolean, errors: {} }
 */
export const validateTallas = (data) => {
  const errors = {};

  if (!data.talla_camisa_blusa) {
    errors.talla_camisa_blusa = "La talla de camisa/blusa es requerida";
  }

  if (!data.talla_pantalon) {
    errors.talla_pantalon = "La talla de pantalón es requerida";
  }

  if (!data.talla_calzado) {
    errors.talla_calzado = "La talla de calzado es requerida";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
