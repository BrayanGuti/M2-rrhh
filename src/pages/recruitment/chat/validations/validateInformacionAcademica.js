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

  if (
    data.formacion !== "Primaria" &&
    data.formacion !== "Bachillerato" &&
    !data.titulo_obtenido
  ) {
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
