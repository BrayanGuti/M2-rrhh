// chat_components/FormMessage.jsx
// Este componente se usa para mostrar formularios dentro de los mensajes del bot

import { DatosPostulacionForm } from "./DatosPostulacionForm";
import { CandidatoForm } from "./CandidatoForm";
import { useChatStore } from "../../stores/useChatStore";
import { VACANCY_COVERTATION_PHASES } from "../../const/Phases";
import { DetallesPersonalesForm } from "./DetallesPersonalesForm";
import { InformacionAcademicaForm } from "./InformacionAcademicaForm";

export function FormMessage() {
  const { currentStep } = useChatStore();

  if (currentStep === VACANCY_COVERTATION_PHASES.form_datos_postulacion) {
    return <DatosPostulacionForm />;
  }

  if (currentStep === VACANCY_COVERTATION_PHASES.form_candidato) {
    return <CandidatoForm />;
  }

  if (currentStep === VACANCY_COVERTATION_PHASES.form_detalles_personales) {
    return <DetallesPersonalesForm />;
  }
  if (currentStep === VACANCY_COVERTATION_PHASES.form_informacion_academica) {
    return <InformacionAcademicaForm />;
  }
  if (currentStep === VACANCY_COVERTATION_PHASES.form_referencias_personales) {
    return <div>Formulario de Referencias Personales (próximamente)</div>;
  }
  if (currentStep === VACANCY_COVERTATION_PHASES.form_datos_generales) {
    return <div>Formulario de Datos Generales (próximamente)</div>;
  }
  if (currentStep === VACANCY_COVERTATION_PHASES.form_tallas) {
    return <div>Formulario de Tallas (próximamente)</div>;
  }

  if (currentStep === VACANCY_COVERTATION_PHASES.form_informacion_familiar) {
    return <div>Formulario de Información Familiar (próximamente)</div>;
  }

  if (currentStep === VACANCY_COVERTATION_PHASES.form_informacion_laboral) {
    return <div>Formulario de Información Laboral (próximamente)</div>;
  }
  if (currentStep === VACANCY_COVERTATION_PHASES.form_datos_economicos) {
    return <div>Formulario de Datos Económicos (próximamente)</div>;
  }
  if (currentStep === VACANCY_COVERTATION_PHASES.form_tallas) {
    return <div>Formulario de Tallas (próximamente)</div>;
  }

  return null;
}
