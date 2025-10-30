import {
  Heart, // Corazón para Cónyuge
  Users, // Personas para Hijos/Hermanos
  Home, // Casa o Familia para Padres (podrías usar "User" o "Users" si prefieres)
  Info, // Icono de información general
  User,
} from "lucide-react"; // Se asume que usas lucide-react (o similar como Feather/Heroicons)

// Componente auxiliar para mostrar un campo de información
const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 mb-0.5 uppercase tracking-wider">
      {label}
    </p>
    <p className="font-medium text-gray-800 text-sm">{value || "—"}</p>
  </div>
);

// Componente principal mejorado
export function InformacionFamiliar({ informacion }) {
  // 1. Manejo inicial de la ausencia de información
  if (!informacion) {
    return (
      <div className="flex items-center text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <Info className="w-5 h-5 mr-3 text-gray-400" />
        <p className="text-sm">Sin información familiar registrada.</p>
      </div>
    );
  }

  // 2. Validación de datos con validaciones más concisas
  const isValidEntry = (entry) =>
    entry && (entry.nombre || entry.edad || entry.ocupacion);

  const conyugeValido =
    informacion.conyuge && isValidEntry(informacion.conyuge);

  const hijosValidos = informacion.hijos?.filter(isValidEntry) || [];
  const padresValidos = informacion.padres?.filter(isValidEntry) || [];
  const hermanosValidos = informacion.hermanos?.filter(isValidEntry) || [];

  const hasData =
    conyugeValido ||
    hijosValidos.length > 0 ||
    padresValidos.length > 0 ||
    hermanosValidos.length > 0;

  // 3. Manejo si la información existe, pero todos los campos están vacíos
  if (!hasData) {
    return (
      <div className="flex items-center text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <Info className="w-5 h-5 mr-3 text-gray-400" />
        <p className="text-sm">Sin información detallada registrada.</p>
      </div>
    );
  }

  // Componente de tarjeta para un miembro de la familia (Hijos, Padres, Hermanos)
  const FamilyMemberCard = ({ member, index }) => (
    <div
      key={index}
      className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm transition hover:shadow-md"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DetailItem label="Nombre" value={member.nombre} />
        <DetailItem
          label="Edad"
          value={member.edad ? `${member.edad} años` : null}
        />
        <DetailItem label="Ocupación" value={member.ocupacion} />
      </div>
    </div>
  );

  // 4. Renderizado principal
  return (
    <div className="space-y-8">
      {/* Cónyuge - Sección destacada con color principal */}
      {conyugeValido && (
        <SectionContainer title="Cónyuge" icon={Heart} iconColor="text-red-500">
          <div className="bg-red-50 rounded-xl p-5 border border-red-200 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DetailItem label="Nombre" value={informacion.conyuge.nombre} />
              <DetailItem
                label="Edad"
                value={
                  informacion.conyuge.edad
                    ? `${informacion.conyuge.edad} años`
                    : null
                }
              />
              <DetailItem
                label="Ocupación"
                value={informacion.conyuge.ocupacion}
              />
            </div>
          </div>
        </SectionContainer>
      )}

      {/* Padres */}
      {padresValidos.length > 0 && (
        <SectionContainer
          title={`Padres (${padresValidos.length})`}
          icon={Home}
          iconColor="text-blue-500"
        >
          <div className="space-y-4">
            {padresValidos.map((padre, index) => (
              <FamilyMemberCard key={index} member={padre} />
            ))}
          </div>
        </SectionContainer>
      )}

      {/* Hijos */}
      {hijosValidos.length > 0 && (
        <SectionContainer
          title={`Hijos (${hijosValidos.length})`}
          icon={Users}
          iconColor="text-teal-600"
        >
          <div className="space-y-4">
            {hijosValidos.map((hijo, index) => (
              <FamilyMemberCard key={index} member={hijo} />
            ))}
          </div>
        </SectionContainer>
      )}

      {/* Hermanos */}
      {hermanosValidos.length > 0 && (
        <SectionContainer
          title={`Hermanos (${hermanosValidos.length})`}
          icon={User}
          iconColor="text-purple-500"
        >
          <div className="space-y-4">
            {hermanosValidos.map((hermano, index) => (
              <FamilyMemberCard key={index} member={hermano} />
            ))}
          </div>
        </SectionContainer>
      )}
    </div>
  );
}

const SectionContainer = ({ title, icon: Icon, iconColor, children }) => (
  <div>
    <div className="flex items-center mb-4">
      <Icon className={`w-5 h-5 mr-3 ${iconColor}`} />
      <h3 className="font-bold text-gray-900 text-lg tracking-tight">
        {title}
      </h3>
    </div>
    {children}
  </div>
);
