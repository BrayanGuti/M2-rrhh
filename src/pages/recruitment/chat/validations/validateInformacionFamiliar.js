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
