// validations/formValidations.js

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

  if (data.formacion !== "Primaria" && !data.titulo_obtenido) {
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
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

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

export const validateInformacionFamiliar = (data, detallesPersonales) => {
  const errors = {};
  const estadoCasado = ["Casado/a", "Unión Libre"];

  // Validar cónyuge solo si está casado o en unión libre
  if (estadoCasado.includes(detallesPersonales.estado_civil)) {
    if (!data.conyuge?.nombre || data.conyuge.nombre.trim().length === 0) {
      errors.conyuge_nombre = "El nombre del cónyuge es requerido";
    }
    if (!data.conyuge?.edad || data.conyuge.edad <= 0) {
      errors.conyuge_edad = "La edad del cónyuge es requerida";
    }
    if (
      !data.conyuge?.ocupacion ||
      data.conyuge.ocupacion.trim().length === 0
    ) {
      errors.conyuge_ocupacion = "La ocupación del cónyuge es requerida";
    }
  }

  // Validar hijos si numero_hijos > 0
  if (detallesPersonales.numero_hijos > 0) {
    const numHijosEsperados = Math.min(detallesPersonales.numero_hijos, 5);

    if (data.hijos.length === 0) {
      errors.hijos_general = `Debes agregar información de ${numHijosEsperados} hijo(s)`;
    } else if (data.hijos.length < numHijosEsperados) {
      errors.hijos_general = `Debes agregar ${numHijosEsperados} hijo(s), actualmente tienes ${data.hijos.length}`;
    }

    // Validar cada hijo
    data.hijos.forEach((hijo, idx) => {
      if (!hijo.nombre || hijo.nombre.trim().length === 0) {
        errors[`hijo_${idx}_nombre`] = "El nombre es requerido";
      }
      if (!hijo.edad || hijo.edad <= 0) {
        errors[`hijo_${idx}_edad`] = "La edad es requerida";
      }
      if (!hijo.ocupacion || hijo.ocupacion.trim().length === 0) {
        errors[`hijo_${idx}_ocupacion`] = "La ocupación es requerida";
      }
    });
  }

  // Validar padres - al menos uno debe estar completo
  const padreCompleto =
    data.padres[0]?.nombre && data.padres[0]?.edad && data.padres[0]?.ocupacion;
  const madreCompleta =
    data.padres[1]?.nombre && data.padres[1]?.edad && data.padres[1]?.ocupacion;

  if (!padreCompleto && !madreCompleta) {
    errors.padres_general =
      "Debes completar al menos la información de un padre/madre";
  }

  // Validar cada padre si no está marcado como "No aplica"
  data.padres.forEach((padre, idx) => {
    const nombrePadre = idx === 0 ? "Padre" : "Madre";

    // Si tiene algún campo lleno, todos deben estar llenos
    const tieneAlgunCampo = padre.nombre || padre.edad || padre.ocupacion;

    if (tieneAlgunCampo) {
      if (!padre.nombre || padre.nombre.trim().length === 0) {
        errors[
          `padre_${idx}_nombre`
        ] = `El nombre del ${nombrePadre.toLowerCase()} es requerido`;
      }
      if (!padre.edad || padre.edad <= 0) {
        errors[
          `padre_${idx}_edad`
        ] = `La edad del ${nombrePadre.toLowerCase()} es requerida`;
      }
      if (!padre.ocupacion || padre.ocupacion.trim().length === 0) {
        errors[
          `padre_${idx}_ocupacion`
        ] = `La ocupación del ${nombrePadre.toLowerCase()} es requerida`;
      }
    }
  });

  // Validar hermanos - cada uno que agregue debe estar completo
  data.hermanos.forEach((hermano, idx) => {
    if (!hermano.nombre || hermano.nombre.trim().length === 0) {
      errors[`hermano_${idx}_nombre`] = "El nombre es requerido";
    }
    if (!hermano.edad || hermano.edad <= 0) {
      errors[`hermano_${idx}_edad`] = "La edad es requerida";
    }
    if (!hermano.ocupacion || hermano.ocupacion.trim().length === 0) {
      errors[`hermano_${idx}_ocupacion`] = "La ocupación es requerida";
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

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
