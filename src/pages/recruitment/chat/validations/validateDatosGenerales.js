/**
 * Validación para Datos Generales
 * @param {Object} data - datos_generales del formData
 * @returns {Object} { isValid: boolean, errors: {} }
 */
export const validateDatosGenerales = (data) => {
  const errors = {};

  // Validar cómo se enteró del empleo
  if (
    !data.como_se_entero_empleo ||
    data.como_se_entero_empleo.trim().length < 2
  ) {
    errors.como_se_entero_empleo = "Debes indicar cómo te enteraste del empleo";
  }

  // Validar fecha de disponibilidad
  if (!data.fecha_disponibilidad) {
    errors.fecha_disponibilidad = "La fecha de disponibilidad es requerida";
  } else {
    // Validar que la fecha no sea en el pasado
    const fechaSeleccionada = new Date(data.fecha_disponibilidad + "T00:00:00");
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
      errors.fecha_disponibilidad = "La fecha no puede ser anterior a hoy";
    }

    // Validar que no sea más de 6 meses en el futuro
    const seisMesesAdelante = new Date();
    seisMesesAdelante.setMonth(seisMesesAdelante.getMonth() + 6);
    seisMesesAdelante.setHours(0, 0, 0, 0);

    if (fechaSeleccionada > seisMesesAdelante) {
      errors.fecha_disponibilidad =
        "La fecha no puede ser mayor a 6 meses desde hoy";
    }
  }

  // Validar que los campos booleanos sean efectivamente booleanos
  const camposBooleanos = [
    "tiene_familiares_empresa",
    "lo_recomienda_alguien",
    "ha_trabajado_con_nosotros",
    "puede_viajar",
    "dispuesto_cambiar_residencia",
  ];

  camposBooleanos.forEach((campo) => {
    if (typeof data[campo] !== "boolean") {
      errors[campo] = `El campo ${campo} debe ser verdadero o falso`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
