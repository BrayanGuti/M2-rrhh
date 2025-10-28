/**
 * Validación para Datos Económicos
 * @param {Object} data - datos_economicos del formData
 * @returns {Object} { isValid: boolean, errors: {} }
 */
export const validateDatosEconomicos = (data) => {
  const errors = {};

  // Validar que los campos booleanos sean efectivamente booleanos
  const camposBooleanos = [
    "tiene_otros_ingresos",
    "conyuge_trabaja",
    "tiene_automovil_propio",
    "tiene_deudas",
  ];

  camposBooleanos.forEach((campo) => {
    if (typeof data[campo] !== "boolean") {
      errors[campo] = `El campo ${campo} debe ser verdadero o falso`;
    }
  });

  // Validar gastos mensuales
  if (
    data.gastos_mensuales === null ||
    data.gastos_mensuales === undefined ||
    data.gastos_mensuales === ""
  ) {
    errors.gastos_mensuales = "Los gastos mensuales son requeridos";
  } else {
    const gastos = Number(data.gastos_mensuales);

    // Validar que sea un número válido
    if (isNaN(gastos)) {
      errors.gastos_mensuales = "Debe ser un valor numérico válido";
    }
    // Validar que sea mayor a 0
    else if (gastos <= 0) {
      errors.gastos_mensuales = "Los gastos mensuales deben ser mayores a $0";
    }
    // Validar que sea un valor razonable (mínimo salario mínimo aproximado)
    else if (gastos < 300000) {
      errors.gastos_mensuales =
        "El valor parece muy bajo, verifica que sea correcto (mínimo $300,000)";
    }
    // Validar que no sea un valor excesivamente alto (máximo 50 millones)
    else if (gastos > 50000000) {
      errors.gastos_mensuales =
        "El valor parece muy alto, verifica que sea correcto (máximo $50,000,000)";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
