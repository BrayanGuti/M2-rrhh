import { useChatStore as useChat } from "../stores/useChatStore";
import { VACANCY_COVERTATION_PHASES as PHASES } from "../const";
import {
  DatosPostulacionForm as PostulacionForm,
  CandidatoForm as Candidato,
  DetallesPersonalesForm as DetallesPersonales,
  InformacionAcademicaForm as Academica,
  InformacionFamiliarForm as Familiar,
  InformacionLaboralForm as Laboral,
  ReferenciasPersonalesForm as Referencias,
  DatosGeneralesForm as Generales,
  DatosEconomicosForm as Economicos,
  TallasForm as Tallas,
  FormSummary as Resumen,
} from "./Forms";

const FORM_COMPONENTS = {
  [PHASES.form_datos_postulacion]: PostulacionForm,
  [PHASES.form_candidato]: Candidato,
  [PHASES.form_detalles_personales]: DetallesPersonales,
  [PHASES.form_informacion_familiar]: Familiar,
  [PHASES.form_informacion_academica]: Academica,
  [PHASES.form_informacion_laboral]: Laboral,
  [PHASES.form_referencias_personales]: Referencias,
  [PHASES.form_datos_generales]: Generales,
  [PHASES.form_datos_economicos]: Economicos,
  [PHASES.form_tallas]: Tallas,
  [PHASES.form_resumen]: Resumen,
};

export function FormMessage() {
  const { currentStep } = useChat();

  const FormComponent = FORM_COMPONENTS[currentStep];
  return FormComponent ? <FormComponent /> : null;
}
