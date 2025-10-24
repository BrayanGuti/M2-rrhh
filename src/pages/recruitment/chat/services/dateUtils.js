/**
 * Convierte una fecha a ISO 8601 con zona horaria de Bogotá (UTC-5)
 */
export function toISO8601Bogota(date) {
  const d = typeof date === "string" ? new Date(date) : date;

  // Crear fecha en zona horaria de Bogotá (UTC-5)
  const bogotaOffset = -5 * 60; // -5 horas en minutos
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const bogotaTime = new Date(utc + bogotaOffset * 60000);

  // Formato ISO 8601 completo (para uso interno o logs)
  const year = bogotaTime.getFullYear();
  const month = String(bogotaTime.getMonth() + 1).padStart(2, "0");
  const day = String(bogotaTime.getDate()).padStart(2, "0");
  const hours = String(bogotaTime.getHours()).padStart(2, "0");
  const minutes = String(bogotaTime.getMinutes()).padStart(2, "0");
  const seconds = String(bogotaTime.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}-05:00`;
}

/**
 * Obtiene la fecha actual en formato "YYYY-MM-DD" para inputs <input type="date">
 */
export function getCurrentDateISO() {
  const d = new Date();
  const bogotaOffset = -5 * 60; // -5 horas
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const bogotaTime = new Date(utc + bogotaOffset * 60000);

  const year = bogotaTime.getFullYear();
  const month = String(bogotaTime.getMonth() + 1).padStart(2, "0");
  const day = String(bogotaTime.getDate()).padStart(2, "0");

  // ✅ Solo la parte de la fecha
  return `${year}-${month}-${day}`;
}
