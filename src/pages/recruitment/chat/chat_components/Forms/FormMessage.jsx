// chat_components/FormMessage.jsx
// Este componente se usa para mostrar formularios dentro de los mensajes del bot

import { DatosPostulacionForm } from "./DatosPostulacionForm";
import { CandidatoForm } from "./CandidatoForm";
import { useChatStore } from "../../stores/useChatStore";
import { VACANCY_COVERTATION_PHASES } from "../../const/Phases";
import { DetallesPersonalesForm } from "./DetallesPersonalesForm";

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
  return null;
}
