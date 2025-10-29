import { DatosPostulacionForm } from "./DatosPostulacionForm/DatosPostulacionForm";
import { CandidatoForm } from "./CandidatoForm/CandidatoForm";
import { useChatStore } from "../../stores/useChatStore";
import { VACANCY_COVERTATION_PHASES } from "../../const";
import { DetallesPersonalesForm } from "./DetallesPersonalesForm/DetallesPersonalesForm";
import { InformacionAcademicaForm } from "./InformacionAcademicaForm/InformacionAcademicaForm";
import { InformacionFamiliarForm } from "./InformacionFamiliarForm/InformacionFamiliarForm";
import { InformacionLaboralForm } from "./InformacionLaboralForm/InformacionLaboralForm";
import { ReferenciasPersonalesForm } from "./ReferenciasPersonalesForm/ReferenciasPersonalesForm";
import { DatosGeneralesForm } from "./DatosGeneralesForm/DatosGeneralesForm";
import { DatosEconomicosForm } from "./DatosEconomicosForm/DatosEconomicosForm";
import { TallasForm } from "./TallasForm/TallasForm";
import { FormSummary } from "./FormSummary/FormSummary";

export function FormMessage() {
  const { currentStep } = useChatStore();
  console.log("Current Step:", currentStep);

  if (currentStep === VACANCY_COVERTATION_PHASES.form_datos_postulacion) {
    return <DatosPostulacionForm />;
  }

  if (currentStep === VACANCY_COVERTATION_PHASES.form_candidato) {
    return <CandidatoForm />;
  }

  if (currentStep === VACANCY_COVERTATION_PHASES.form_detalles_personales) {
    return <DetallesPersonalesForm />;
  }

  if (currentStep === VACANCY_COVERTATION_PHASES.form_informacion_familiar) {
    return <InformacionFamiliarForm />;
  }

  if (currentStep === VACANCY_COVERTATION_PHASES.form_informacion_academica) {
    return <InformacionAcademicaForm />;
  }

  if (currentStep === VACANCY_COVERTATION_PHASES.form_informacion_laboral) {
    return <InformacionLaboralForm />;
  }

  if (currentStep === VACANCY_COVERTATION_PHASES.form_referencias_personales) {
    return <ReferenciasPersonalesForm />;
  }
  if (currentStep === VACANCY_COVERTATION_PHASES.form_datos_generales) {
    return <DatosGeneralesForm />;
  }

  if (currentStep === VACANCY_COVERTATION_PHASES.form_datos_economicos) {
    return <DatosEconomicosForm />;
  }
  if (currentStep === VACANCY_COVERTATION_PHASES.form_tallas) {
    return <TallasForm />;
  }

  if (currentStep === VACANCY_COVERTATION_PHASES.form_resumen) {
    return <FormSummary />;
  }

  return null;
}
