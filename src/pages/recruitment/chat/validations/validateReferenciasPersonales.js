/**
 * Validación para Referencias Personales
 * @param {Array} data - referencias_personales del formData
 * @returns {Object} { isValid: boolean, errors: {} }
 */
export const validateReferenciasPersonales = (data) => {
  const errors = {};

  // Validar que sea un array y tenga al menos 2 referencias
  if (!Array.isArray(data) || data.length < 2) {
    errors.referencias = "Debes agregar al menos 2 referencias personales";
    return {
      isValid: false,
      errors,
    };
  }

  // Validar cada referencia individualmente
  data.forEach((ref, index) => {
    // Nombre: mínimo 3 caracteres
    if (!ref.nombre || ref.nombre.trim().length < 3) {
      errors[`referencia_${index}_nombre`] =
        "Nombre debe tener al menos 3 caracteres";
    }

    // Domicilio: requerido, mínimo 5 caracteres
    if (!ref.domicilio || ref.domicilio.trim().length < 5) {
      errors[`referencia_${index}_domicilio`] =
        "Domicilio debe tener al menos 5 caracteres";
    }

    // Teléfono: requerido, mínimo 10 dígitos
    if (!ref.telefono_celular || ref.telefono_celular.trim().length < 10) {
      errors[`referencia_${index}_telefono_celular`] =
        "Teléfono debe tener al menos 10 dígitos";
    }

    // Ocupación: requerida, mínimo 3 caracteres
    if (!ref.ocupacion || ref.ocupacion.trim().length < 3) {
      errors[`referencia_${index}_ocupacion`] =
        "Ocupación debe tener al menos 3 caracteres";
    }

    // Tiempo de conocerlo: requerido
    if (!ref.tiempo_conocerlo || ref.tiempo_conocerlo.trim().length < 2) {
      errors[`referencia_${index}_tiempo_conocerlo`] =
        "Especifica el tiempo de conocerlo (ej: 5 años)";
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
