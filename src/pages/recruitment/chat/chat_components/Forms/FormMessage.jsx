// chat_components/FormMessage.jsx
// Este componente se usa para mostrar formularios dentro de los mensajes del bot

import { DatosPostulacionForm } from "./DatosPostulacionForm";
import { CandidatoForm } from "./CandidatoForm";
import { useChatStore } from "../../stores/useChatStore";

export function FormMessage() {
  const { currentStep } = useChatStore();

  if (currentStep === "form-datos-postulacion") {
    return <DatosPostulacionForm />;
  }

  if (currentStep === "phase-2") {
    return <CandidatoForm />;
  }

  return null;
}
