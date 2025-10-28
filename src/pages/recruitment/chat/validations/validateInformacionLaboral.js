/**
 * Validación para Información Laboral
 * @param {Array} data - informacion_laboral del formData
 * @returns {Object} { isValid: boolean, errors: {} }
 */
export const validateInformacionLaboral = (data) => {
  const errors = {};

  // Si el array está vacío, NO es válido (debe tener al menos 1 experiencia o marcar "no tengo experiencia")
  // Esto se maneja en el formulario con un flag especial
  if (!Array.isArray(data)) {
    errors.experiencias =
      "Debes agregar al menos una experiencia laboral o marcar 'No tengo experiencia'";
    return { isValid: false, errors };
  }

  // Si tiene el flag de "sin experiencia", es válido
  if (data.length === 0) {
    // El formulario manejará esto con un estado local
    return { isValid: true, errors: {} };
  }

  // Validar cada experiencia agregada
  data.forEach((exp, index) => {
    if (!exp.nombre || exp.nombre.trim().length < 2) {
      errors[`exp_${index}_nombre`] = `El nombre de la empresa es requerido`;
    }

    if (!exp.telefono || exp.telefono.trim().length < 7) {
      errors[`exp_${index}_telefono`] = `El teléfono de contacto es requerido`;
    }

    if (!exp.cargo || exp.cargo.trim().length < 2) {
      errors[`exp_${index}_cargo`] = `El cargo es requerido`;
    }

    if (!exp.experiencia || exp.experiencia <= 0) {
      errors[
        `exp_${index}_experiencia`
      ] = `Los años de experiencia son requeridos`;
    }

    if (!exp.motivo_retiro || exp.motivo_retiro.trim().length < 3) {
      errors[`exp_${index}_motivo_retiro`] = `El motivo de retiro es requerido`;
    }

    if (
      !exp.funciones_realizadas ||
      exp.funciones_realizadas.trim().length < 10
    ) {
      errors[
        `exp_${index}_funciones_realizadas`
      ] = `Las funciones realizadas son requeridas (mínimo 10 caracteres)`;
    }

    // Validación obligatoria para logros
    if (!exp.logros || exp.logros.trim().length < 10) {
      errors[
        `exp_${index}_logros`
      ] = `Los logros son requeridos (mínimo 10 caracteres)`;
    }

    // Validación obligatoria para dificultades
    if (!exp.dificultades || exp.dificultades.trim().length < 10) {
      errors[
        `exp_${index}_dificultades`
      ] = `Las dificultades son requeridas (mínimo 10 caracteres)`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
