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

  if (!data.sede) {
    errors.sede = "Debes seleccionar una sede";
  }

  if (!data.sueldo_deseado || data.sueldo_deseado <= 0) {
    errors.sueldo_deseado = "Debes ingresar un sueldo válido";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
