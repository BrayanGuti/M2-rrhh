// Endpoints
export const ENDPOINTS = {
  REGISTER_RECRUITER: "/api/usuarios/reclutador/registro",
  DELETE_USER: "/api/usuarios/eliminar",
  GET_USERS: "/api/usuarios",
};

// Mensajes de error genéricos
export const ERROR_MESSAGES = {
  GENERIC: "Ocurrió un error. Por favor, intenta nuevamente.",
  NETWORK: "Error de conexión. Verifica tu conexión a internet.",
  CREATE: "No se pudo crear el reclutador.",
  DELETE: "No se pudo eliminar el reclutador.",
  FETCH: "No se pudieron cargar los reclutadores.",
};

// Datos mock para modo debug
export const MOCK_RECRUITERS = [
  {
    id: "1",
    nombre: "Hernan Melo",
    rol: "Reclutador",
    correo: "monda@gmail.com",
    telefono: "3567806753",
    nombre_usuario: "Nandy2607",
    documento_identidad: "1239092184034",
    direccion: "cra.2 #114A-410",
    created_at: "2025-10-26T05:39:58.058056-05:00",
  },
  {
    id: "2",
    nombre: "Yazmina Yepes",
    rol: "Reclutador",
    correo: "yazmina@gmail.com",
    telefono: "3005671234",
    nombre_usuario: "YazYepes",
    documento_identidad: "987654321",
    direccion: "Cl. 45 #10-12",
    created_at: "2025-10-27T09:15:22.431000-05:00",
  },
  {
    id: "3",
    nombre: "Carlos Ruiz",
    rol: "Reclutador",
    correo: "carlos.ruiz@empresa.com",
    telefono: "3001234567",
    nombre_usuario: "CarlosR",
    documento_identidad: "456789123",
    direccion: "Av. 68 #45-12",
    created_at: "2025-10-28T14:22:10.123456-05:00",
  },
];
