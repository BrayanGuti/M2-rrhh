/**
 * Validación para Tallas
 * @param {Object} data - tallas del formData
 * @returns {Object} { isValid: boolean, errors: {} }
 */
export const validateTallas = (data) => {
  const errors = {};

  // Tallas válidas
  const TALLAS_CAMISA_VALIDAS = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const TALLAS_PANTALON_VALIDAS = [
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
    "40",
    "42",
    "44",
    "46",
    "48",
  ];
  const TALLAS_CALZADO_VALIDAS = [
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
  ];

  // Validar talla_camisa_blusa
  if (!data.talla_camisa_blusa || data.talla_camisa_blusa.trim() === "") {
    errors.talla_camisa_blusa = "La talla de camisa/blusa es requerida";
  } else if (!TALLAS_CAMISA_VALIDAS.includes(data.talla_camisa_blusa)) {
    errors.talla_camisa_blusa = "Selecciona una talla válida";
  }

  // Validar talla_pantalon
  if (!data.talla_pantalon || data.talla_pantalon.trim() === "") {
    errors.talla_pantalon = "La talla de pantalón es requerida";
  } else if (!TALLAS_PANTALON_VALIDAS.includes(data.talla_pantalon)) {
    errors.talla_pantalon = "Selecciona una talla válida";
  }

  // Validar talla_calzado
  if (!data.talla_calzado || data.talla_calzado.trim() === "") {
    errors.talla_calzado = "La talla de calzado es requerida";
  } else if (!TALLAS_CALZADO_VALIDAS.includes(data.talla_calzado)) {
    errors.talla_calzado = "Selecciona una talla válida";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
