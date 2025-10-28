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
