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
