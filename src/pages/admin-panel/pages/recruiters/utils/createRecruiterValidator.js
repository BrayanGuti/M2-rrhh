// src/utils/validators.js

/**
 * Valida que un campo no esté vacío
 */
export const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Valida formato de email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida formato de teléfono colombiano (10 dígitos)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

/**
 * Valida formato de documento de identidad (números)
 */
export const isValidDocument = (document) => {
  const documentRegex = /^[0-9]+$/;
  return documentRegex.test(document) && document.length >= 6;
};

/**
 * Valida que la contraseña tenga al menos 6 caracteres
 */
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Valida todos los campos del formulario de reclutador
 * @param {Object} formData - Datos del formulario
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateRecruiterForm = (formData) => {
  const errors = {};

  // El rol es automático, no se valida

  // Validar nombre
  if (!isNotEmpty(formData.nombre)) {
    errors.nombre = "El nombre es requerido";
  }

  // Validar correo
  if (!isNotEmpty(formData.correo)) {
    errors.correo = "El correo es requerido";
  } else if (!isValidEmail(formData.correo)) {
    errors.correo = "El correo no es válido";
  }

  // Validar teléfono
  if (!isNotEmpty(formData.telefono)) {
    errors.telefono = "El teléfono es requerido";
  } else if (!isValidPhone(formData.telefono)) {
    errors.telefono = "El teléfono debe tener 10 dígitos";
  }

  // Validar nombre de usuario
  if (!isNotEmpty(formData.nombre_usuario)) {
    errors.nombre_usuario = "El nombre de usuario es requerido";
  }

  // Validar contraseña
  if (!isNotEmpty(formData.contrasena)) {
    errors.contrasena = "La contraseña es requerida";
  } else if (!isValidPassword(formData.contrasena)) {
    errors.contrasena = "La contraseña debe tener al menos 6 caracteres";
  }

  // Validar documento de identidad
  if (!isNotEmpty(formData.documento_identidad)) {
    errors.documento_identidad = "El documento de identidad es requerido";
  } else if (!isValidDocument(formData.documento_identidad)) {
    errors.documento_identidad =
      "El documento debe contener solo números y al menos 6 dígitos";
  }

  // Validar dirección
  if (!isNotEmpty(formData.direccion)) {
    errors.direccion = "La dirección es requerida";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
