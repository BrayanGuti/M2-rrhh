// chat_components/Forms/FormSummary.jsx
import { useState, useEffect } from "react";
import { useFormDataStore } from "../../../stores/useFormDataStore";
import { useChatStore } from "../../../stores/useChatStore";
import {
  ChevronDown,
  ChevronUp,
  Edit2,
  CheckCircle,
  AlertCircle,
  Briefcase,
  User,
  Home,
  Users,
  GraduationCap,
  Building,
  Phone,
  Info,
  DollarSign,
  Shirt,
} from "lucide-react";

export function FormSummary() {
  const { formData, validateAllSections } = useFormDataStore();
  const { setCurrentStep } = useChatStore();
  const [validationResults, setValidationResults] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    // Validar todo al montar
    const results = validateAllSections();
    setValidationResults(results);

    // Auto-expandir todas las secciones inicialmente
    const allExpanded = {};
    SECTIONS_CONFIG.forEach((section) => {
      allExpanded[section.key] = true;
    });
    setExpandedSections(allExpanded);
  }, []);

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleEdit = (phaseKey) => {
    setCurrentStep(phaseKey);
  };

  const hasErrors = (phaseKey) => {
    return (
      validationResults?.errorsBySections?.[phaseKey] &&
      Object.keys(validationResults.errorsBySections[phaseKey]).length > 0
    );
  };

  const getErrorCount = (phaseKey) => {
    const errors = validationResults?.errorsBySections?.[phaseKey];
    return errors ? Object.keys(errors).length : 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#44BBA4]/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#15616D]/10">
        <CheckCircle className="text-[#44BBA4]" size={32} />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#15616D]">
            Resumen de tu Aplicación
          </h3>
          <p className="text-xs text-[#15616D]/60">
            Revisa toda la información antes de enviar
          </p>
        </div>
      </div>

      {/* Alerta de validación */}
      {validationResults && !validationResults.isValid && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
            <div>
              <p className="text-sm font-semibold text-red-800 mb-1">
                Se encontraron {validationResults.totalErrors} sección(es) con
                errores
              </p>
              <p className="text-xs text-red-700">
                Por favor, corrige los errores antes de enviar tu aplicación.
                Las secciones con errores están marcadas en rojo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Secciones */}
      <div className="space-y-4">
        {SECTIONS_CONFIG.map((section) => (
          <SummaryCard
            key={section.key}
            section={section}
            data={formData[section.dataKey]}
            isExpanded={expandedSections[section.key]}
            hasErrors={hasErrors(section.phaseKey)}
            errorCount={getErrorCount(section.phaseKey)}
            onToggle={() => toggleSection(section.key)}
            onEdit={() => handleEdit(section.phaseKey)}
          />
        ))}
      </div>

      {/* Mensaje final */}
      {validationResults?.isValid && (
        <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" size={24} />
            <p className="text-sm text-green-800">
              ✅ <strong>¡Todo listo!</strong> Tu aplicación está completa y sin
              errores. Puedes enviarla ahora.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  section,
  data,
  isExpanded,
  hasErrors,
  errorCount,
  onToggle,
  onEdit,
}) {
  const Icon = section.icon;

  return (
    <div
      className={`border-2 rounded-lg overflow-hidden transition-all ${
        hasErrors
          ? "border-red-300 bg-red-50/50"
          : "border-[#15616D]/10 bg-gray-50"
      }`}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Icon
              className={hasErrors ? "text-red-500" : "text-[#44BBA4]"}
              size={24}
            />
            <div className="flex-1">
              <h4
                className={`font-semibold ${
                  hasErrors ? "text-red-700" : "text-[#15616D]"
                }`}
              >
                {section.title}
              </h4>
              {hasErrors && (
                <p className="text-xs text-red-600 mt-0.5">
                  ⚠️ {errorCount} error(es) encontrado(s)
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="p-2 hover:bg-[#44BBA4]/10 rounded-lg transition-colors"
              title="Editar sección"
            >
              <Edit2 size={18} className="text-[#44BBA4]" />
            </button>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-[#15616D]/10 rounded-lg transition-colors"
            >
              {isExpanded ? (
                <ChevronUp size={20} className="text-[#15616D]" />
              ) : (
                <ChevronDown size={20} className="text-[#15616D]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Contenido expandible */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-[#15616D]/10">
          <div className="pt-4 space-y-2">{section.renderContent(data)}</div>
        </div>
      )}
    </div>
  );
}

// Componente auxiliar para mostrar campos
function Field({ label, value, isArray = false }) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (isArray && Array.isArray(value)) {
    if (value.length === 0) return null;
    return (
      <div className="text-sm">
        <span className="text-[#15616D]/60">{label}:</span>
        <span className="text-[#15616D] ml-2 font-medium">
          {value.join(", ")}
        </span>
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <div className="text-sm">
        <span className="text-[#15616D]/60">{label}:</span>
        <span className="text-[#15616D] ml-2 font-medium">
          {value ? "Sí" : "No"}
        </span>
      </div>
    );
  }

  return (
    <div className="text-sm">
      <span className="text-[#15616D]/60">{label}:</span>
      <span className="text-[#15616D] ml-2 font-medium">{value}</span>
    </div>
  );
}

// Configuración de secciones
const SECTIONS_CONFIG = [
  {
    key: "datos_postulacion",
    dataKey: "datos_postulacion",
    phaseKey: "form-datos-postulacion",
    title: "Datos de Postulación",
    icon: Briefcase,
    renderContent: (data) => (
      <>
        <Field label="Puesto aspirado" value={data?.puesto_aspirado} />
        <Field
          label="Sueldo deseado"
          value={
            data?.sueldo_deseado
              ? new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(data.sueldo_deseado)
              : null
          }
        />
        <Field label="Fecha de solicitud" value={data?.fecha_solicitud} />
      </>
    ),
  },
  {
    key: "candidato",
    dataKey: "candidato",
    phaseKey: "form-candidato",
    title: "Información Personal",
    icon: User,
    renderContent: (data) => (
      <>
        <Field label="Nombre completo" value={data?.nombre_completo} />
        <Field label="Correo electrónico" value={data?.correo_electronico} />
        <Field label="Teléfono móvil" value={data?.telefono_movil} />
        <Field label="Documento" value={data?.documento_identidad} />
        <Field label="Expedida en" value={data?.expedida_en} />
        <Field label="Edad" value={data?.edad} />
        <Field label="Lugar de nacimiento" value={data?.lugar_nacimiento} />
        <Field label="Fecha de nacimiento" value={data?.fecha_nacimiento} />
      </>
    ),
  },
  {
    key: "detalles_personales",
    dataKey: "detalles_personales",
    phaseKey: "form-detalles-personales",
    title: "Detalles Personales",
    icon: Home,
    renderContent: (data) => (
      <>
        <Field label="Estado civil" value={data?.estado_civil} />
        <Field label="Número de hijos" value={data?.numero_hijos} />
        <Field label="Tipo de vivienda" value={data?.tipo_vivienda} />
        <Field
          label="Valor arriendo"
          value={
            data?.valor_arriendo
              ? new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(data.valor_arriendo)
              : null
          }
        />
        <Field label="Dirección" value={data?.direccion_vivienda} />
        <Field label="Barrio" value={data?.barrio} />
        <Field label="Con quién vive" value={data?.con_quien_vive} />
        <Field label="EPS" value={data?.eps} />
        <Field label="Libreta militar" value={data?.libreta_militar_numero} />
      </>
    ),
  },
  {
    key: "informacion_familiar",
    dataKey: "informacion_familiar",
    phaseKey: "form-informacion-familiar",
    title: "Información Familiar",
    icon: Users,
    renderContent: (data) => (
      <>
        {data?.conyuge?.nombre && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-[#44BBA4] mb-1">
              Cónyuge:
            </p>
            <Field label="Nombre" value={data.conyuge.nombre} />
            <Field label="Edad" value={data.conyuge.edad} />
            <Field label="Ocupación" value={data.conyuge.ocupacion} />
          </div>
        )}
        {data?.hijos && data.hijos.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-[#44BBA4] mb-1">
              Hijos ({data.hijos.length}):
            </p>
            {data.hijos.map((hijo, i) => (
              <div key={i} className="ml-2 mb-1">
                <Field
                  label={`${i + 1}.`}
                  value={`${hijo.nombre}, ${hijo.edad} años, ${hijo.ocupacion}`}
                />
              </div>
            ))}
          </div>
        )}
        {data?.padres && data.padres.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-[#44BBA4] mb-1">Padres:</p>
            {data.padres.map((padre, i) => (
              <div key={i} className="ml-2 mb-1">
                {padre.nombre && (
                  <Field
                    label={i === 0 ? "Padre" : "Madre"}
                    value={`${padre.nombre}, ${padre.edad} años, ${padre.ocupacion}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        {data?.hermanos && data.hermanos.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-[#44BBA4] mb-1">
              Hermanos ({data.hermanos.length}):
            </p>
            {data.hermanos.map((hermano, i) => (
              <div key={i} className="ml-2 mb-1">
                <Field
                  label={`${i + 1}.`}
                  value={`${hermano.nombre}, ${hermano.edad} años, ${hermano.ocupacion}`}
                />
              </div>
            ))}
          </div>
        )}
      </>
    ),
  },
  {
    key: "informacion_academica",
    dataKey: "informacion_academica",
    phaseKey: "form-informacion-academica",
    title: "Información Académica",
    icon: GraduationCap,
    renderContent: (data) => (
      <>
        <Field label="Formación" value={data?.formacion} />
        <Field label="Título obtenido" value={data?.titulo_obtenido} />
        <Field label="Año de terminación" value={data?.anio_terminacion} />
        <Field
          label="Otros estudios"
          value={data?.otros_estudios}
          isArray={true}
        />
        <Field
          label="Estudio actual"
          value={data?.estudio_actual}
          isArray={true}
        />
      </>
    ),
  },
  {
    key: "informacion_laboral",
    dataKey: "informacion_laboral",
    phaseKey: "form-informacion-laboral",
    title: "Experiencia Laboral",
    icon: Building,
    renderContent: (data) => (
      <>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((exp, i) => (
            <div
              key={i}
              className="mb-3 pb-3 border-b border-[#15616D]/10 last:border-0"
            >
              <p className="text-xs font-semibold text-[#44BBA4] mb-1">
                Experiencia {i + 1}:
              </p>
              <Field label="Empresa" value={exp.nombre} />
              <Field label="Cargo" value={exp.cargo} />
              <Field label="Años de experiencia" value={exp.experiencia} />
              <Field label="Motivo de retiro" value={exp.motivo_retiro} />
            </div>
          ))
        ) : (
          <p className="text-sm text-[#15616D]/60">Sin experiencia laboral</p>
        )}
      </>
    ),
  },
  {
    key: "referencias_personales",
    dataKey: "referencias_personales",
    phaseKey: "form-referencias-personales",
    title: "Referencias Personales",
    icon: Phone,
    renderContent: (data) => (
      <>
        {Array.isArray(data) &&
          data.map((ref, i) => (
            <div
              key={i}
              className="mb-3 pb-3 border-b border-[#15616D]/10 last:border-0"
            >
              <p className="text-xs font-semibold text-[#44BBA4] mb-1">
                Referencia {i + 1}:
              </p>
              <Field label="Nombre" value={ref.nombre} />
              <Field label="Teléfono" value={ref.telefono_celular} />
              <Field label="Ocupación" value={ref.ocupacion} />
              <Field label="Tiempo de conocerlo" value={ref.tiempo_conocerlo} />
            </div>
          ))}
      </>
    ),
  },
  {
    key: "datos_generales",
    dataKey: "datos_generales",
    phaseKey: "form-datos-generales",
    title: "Datos Generales",
    icon: Info,
    renderContent: (data) => (
      <>
        <Field
          label="¿Cómo se enteró del empleo?"
          value={data?.como_se_entero_empleo}
        />
        <Field
          label="¿Tiene familiares en la empresa?"
          value={data?.tiene_familiares_empresa}
        />
        <Field
          label="¿Lo recomienda alguien?"
          value={data?.lo_recomienda_alguien}
        />
        <Field
          label="¿Ha trabajado con nosotros?"
          value={data?.ha_trabajado_con_nosotros}
        />
        <Field label="¿Puede viajar?" value={data?.puede_viajar} />
        <Field
          label="¿Dispuesto a cambiar de residencia?"
          value={data?.dispuesto_cambiar_residencia}
        />
        <Field
          label="Fecha de disponibilidad"
          value={data?.fecha_disponibilidad}
        />
      </>
    ),
  },
  {
    key: "datos_economicos",
    dataKey: "datos_economicos",
    phaseKey: "form-datos-economicos",
    title: "Datos Económicos",
    icon: DollarSign,
    renderContent: (data) => (
      <>
        <Field
          label="¿Tiene otros ingresos?"
          value={data?.tiene_otros_ingresos}
        />
        <Field label="¿Cónyuge trabaja?" value={data?.conyuge_trabaja} />
        <Field
          label="¿Tiene automóvil propio?"
          value={data?.tiene_automovil_propio}
        />
        <Field label="¿Tiene deudas?" value={data?.tiene_deudas} />
        <Field
          label="Gastos mensuales"
          value={
            data?.gastos_mensuales
              ? new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(data.gastos_mensuales)
              : null
          }
        />
      </>
    ),
  },
  {
    key: "tallas",
    dataKey: "tallas",
    phaseKey: "form-tallas",
    title: "Tallas de Uniforme",
    icon: Shirt,
    renderContent: (data) => (
      <>
        <Field label="Camisa/Blusa" value={data?.talla_camisa_blusa} />
        <Field label="Pantalón" value={data?.talla_pantalon} />
        <Field label="Calzado" value={data?.talla_calzado} />
      </>
    ),
  },
];
