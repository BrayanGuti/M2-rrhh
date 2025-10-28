import { DEBUG_MODE } from "../../../../const/config";

const MOCK_CANDIDATES = [
  {
    id_postulacion: 1001,
    nombre_completo: "Juan Pérez García",
    puesto_aspirado: "Recepcionista",
    correo: "juan.perez@email.com",
    fecha_solicitud: "2025-01-15",
  },
  {
    id_postulacion: 1002,
    nombre_completo: "María González López",
    puesto_aspirado: "Camarera",
    correo: "maria.gonzalez@email.com",
    fecha_solicitud: "2025-01-14",
  },
  {
    id_postulacion: 1003,
    nombre_completo: "Carlos Rodríguez Martínez",
    puesto_aspirado: "Chef",
    correo: "carlos.rodriguez@email.com",
    fecha_solicitud: "2025-01-13",
  },
  {
    id_postulacion: 1004,
    nombre_completo: "Ana Martínez Sánchez",
    puesto_aspirado: "Gerente de Piso",
    correo: "ana.martinez@email.com",
    fecha_solicitud: "2025-01-12",
  },
  {
    id_postulacion: 1005,
    nombre_completo: "Luis Hernández Torres",
    puesto_aspirado: "Recepcionista",
    correo: "luis.hernandez@email.com",
    fecha_solicitud: "2025-01-11",
  },
  {
    id_postulacion: 1006,
    nombre_completo: "Carmen Díaz Ruiz",
    puesto_aspirado: "Camarera",
    correo: "carmen.diaz@email.com",
    fecha_solicitud: "2025-01-10",
  },
  {
    id_postulacion: 1007,
    nombre_completo: "Pedro Sánchez Gómez",
    puesto_aspirado: "Botones",
    correo: "pedro.sanchez@email.com",
    fecha_solicitud: "2025-01-09",
  },
  {
    id_postulacion: 1008,
    nombre_completo: "Laura Fernández Castro",
    puesto_aspirado: "Recepcionista",
    correo: "laura.fernandez@email.com",
    fecha_solicitud: "2025-01-08",
  },
  {
    id_postulacion: 1009,
    nombre_completo: "Miguel Ángel Ruiz",
    puesto_aspirado: "Seguridad",
    correo: "miguel.ruiz@email.com",
    fecha_solicitud: "2025-01-07",
  },
  {
    id_postulacion: 1010,
    nombre_completo: "Isabel Torres Moreno",
    puesto_aspirado: "Camarera",
    correo: "isabel.torres@email.com",
    fecha_solicitud: "2025-01-06",
  },
  {
    id_postulacion: 1011,
    nombre_completo: "Francisco López Díaz",
    puesto_aspirado: "Chef",
    correo: "francisco.lopez@email.com",
    fecha_solicitud: "2025-01-05",
  },
  {
    id_postulacion: 1012,
    nombre_completo: "Rosa María Jiménez",
    puesto_aspirado: "Recepcionista",
    correo: "rosa.jimenez@email.com",
    fecha_solicitud: "2025-01-04",
  },
  {
    id_postulacion: 1013,
    nombre_completo: "Antonio García Pérez",
    puesto_aspirado: "Botones",
    correo: "antonio.garcia@email.com",
    fecha_solicitud: "2025-01-03",
  },
  {
    id_postulacion: 1014,
    nombre_completo: "Elena Martín Sánchez",
    puesto_aspirado: "Gerente de Piso",
    correo: "elena.martin@email.com",
    fecha_solicitud: "2025-01-02",
  },
  {
    id_postulacion: 1015,
    nombre_completo: "José Luis Romero",
    puesto_aspirado: "Seguridad",
    correo: "jose.romero@email.com",
    fecha_solicitud: "2025-01-01",
  },
  {
    id_postulacion: 1016,
    nombre_completo: "Patricia Navarro Gil",
    puesto_aspirado: "Recepcionista",
    correo: "patricia.navarro@email.com",
    fecha_solicitud: "2024-12-31",
  },
  {
    id_postulacion: 1017,
    nombre_completo: "Javier Morales Cruz",
    puesto_aspirado: "Camarera",
    correo: "javier.morales@email.com",
    fecha_solicitud: "2024-12-30",
  },
  {
    id_postulacion: 1018,
    nombre_completo: "Cristina Vega Ortiz",
    puesto_aspirado: "Chef",
    correo: "cristina.vega@email.com",
    fecha_solicitud: "2024-12-29",
  },
  {
    id_postulacion: 1019,
    nombre_completo: "Roberto Campos Luna",
    puesto_aspirado: "Botones",
    correo: "roberto.campos@email.com",
    fecha_solicitud: "2024-12-28",
  },
  {
    id_postulacion: 1020,
    nombre_completo: "Silvia Ramos Herrera",
    puesto_aspirado: "Recepcionista",
    correo: "silvia.ramos@email.com",
    fecha_solicitud: "2024-12-27",
  },
];

// Generar más candidatos si es necesario
const generateMockCandidates = (count) => {
  const nombres = [
    "Juan",
    "María",
    "Carlos",
    "Ana",
    "Luis",
    "Carmen",
    "Pedro",
    "Laura",
    "Miguel",
    "Isabel",
  ];
  const apellidos = [
    "García",
    "Rodríguez",
    "Martínez",
    "López",
    "Hernández",
    "González",
    "Pérez",
    "Sánchez",
    "Díaz",
    "Torres",
  ];
  const cargos = [
    "Recepcionista",
    "Camarera",
    "Chef",
    "Gerente de Piso",
    "Botones",
    "Seguridad",
  ];

  const candidates = [...MOCK_CANDIDATES];

  for (let i = MOCK_CANDIDATES.length; i < count; i++) {
    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const apellido1 = apellidos[Math.floor(Math.random() * apellidos.length)];
    const apellido2 = apellidos[Math.floor(Math.random() * apellidos.length)];
    const cargo = cargos[Math.floor(Math.random() * cargos.length)];

    const fecha = new Date();
    fecha.setDate(fecha.getDate() - i);

    candidates.push({
      id_postulacion: 1001 + i,
      nombre_completo: `${nombre} ${apellido1} ${apellido2}`,
      puesto_aspirado: cargo,
      correo: `${nombre.toLowerCase()}.${apellido1.toLowerCase()}${i}@email.com`,
      fecha_solicitud: fecha.toISOString().split("T")[0],
    });
  }

  return candidates;
};

const ALL_MOCK_DATA = generateMockCandidates(124);
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

// 🔧 DEBUG MODE: Cambiar a false para usar API real

const mockApiCall = async ({ page, limit, order, cargo }) => {
  // Agregar status aquí
  // Simular tiempo de carga (1-2 segundos)
  const loadingTime = 1000;
  await new Promise((resolve) => setTimeout(resolve, loadingTime));

  // Filtrar por cargo
  let filteredData = [...ALL_MOCK_DATA];
  if (cargo && cargo !== "todos") {
    filteredData = filteredData.filter((c) => c.puesto_aspirado === cargo);
  }

  // Ordenar
  filteredData.sort((a, b) => {
    const dateA = new Date(a.fecha_solicitud).getTime();
    const dateB = new Date(b.fecha_solicitud).getTime();
    return order === "DESC" ? dateB - dateA : dateA - dateB;
  });

  // Paginar
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / limit);

  return {
    exito: true,
    metadatos: {
      pagina_actual: page,
      elementos_por_pagina: limit,
      total_elementos: filteredData.length,
      total_paginas: totalPages,
      siguiente_pagina_url:
        page < totalPages
          ? `/api/postulantes?pagina=${page + 1}&limite=${limit}`
          : null,
      pagina_anterior_url:
        page > 1 ? `/api/postulantes?pagina=${page - 1}&limite=${limit}` : null,
    },
    data: paginatedData,
  };
};

export const candidatesApi = {
  getCandidates: async ({
    page = 1,
    limit = 8,
    order = "DESC",
    cargo = "",
    status = "pendiente",
  }) => {
    const params = new URLSearchParams({
      pagina: page.toString(),
      limite: limit.toString(),
      direccion: order,
      estado: status,
    });

    if (cargo && cargo !== "todos") {
      params.append("cargo", cargo);
    }

    const url = `${API_BASE_URL}/api/candidatos/?${params.toString()}`;
    console.log(`🔧 DEBUG MODE: Usando URL: ${url}`);

    if (DEBUG_MODE) {
      console.log("🔧 DEBUG MODE: Usando datos simulados");
      return mockApiCall({ page, limit, order, cargo, status });
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTAiLCJyb2xfaWQiOiIxIiwiaWF0IjoxNzYxNjIzNTU2LCJleHAiOjE3NjE2NTIzNTZ9.3ZeAjOC8D6SkUjGO6BVbQBRLgJGZhLgK2J858B3gYmI",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener candidatos");
    }

    return response.json();
  },
};
