// chat_components/ActionButtonArea.jsx
import { useChatStore } from "../stores/useChatStore";
import {
  InitialMenuButtons,
  UploadCvButtons,
  ContinueForm,
  SubmitApplicationButton,
} from "./ActionButtonComponents";
import { VACANCY_COVERTATION_PHASES } from "../const/Phases";

export function ActionButtonArea() {
  const { currentStep } = useChatStore();

  /**
   * Función de validación que será pasada a ContinueForm
   * Cada formulario expone su propia validación en window.__validateCurrentForm
   */
  const validateCurrentForm = () => {
    // Verificar si existe una función de validación expuesta
    if (typeof window.__validateCurrentForm === "function") {
      return window.__validateCurrentForm();
    }

    // Si no hay validador, permitir continuar
    console.warn(`No hay validador registrado para: ${currentStep}`);
    return true;
  };

  const renderButtons = () => {
    switch (currentStep) {
      case "initial-menu":
        return <InitialMenuButtons />;

      case VACANCY_COVERTATION_PHASES.upload_cv:
        return <UploadCvButtons />;

      case VACANCY_COVERTATION_PHASES.form_datos_postulacion:
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case VACANCY_COVERTATION_PHASES.form_candidato:
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case VACANCY_COVERTATION_PHASES.form_detalles_personales:
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case VACANCY_COVERTATION_PHASES.form_informacion_academica:
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case VACANCY_COVERTATION_PHASES.form_referencias_personales:
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case VACANCY_COVERTATION_PHASES.form_datos_generales:
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case VACANCY_COVERTATION_PHASES.form_tallas:
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case VACANCY_COVERTATION_PHASES.form_informacion_familiar:
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case VACANCY_COVERTATION_PHASES.form_informacion_laboral:
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case VACANCY_COVERTATION_PHASES.form_datos_economicos:
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case VACANCY_COVERTATION_PHASES.form_resumen:
        return <SubmitApplicationButton />;

      default:
        return null;
    }
  };

  return (
    <div className="p-4 border-t-2 border-[#15616D]/10 bg-white">
      {renderButtons()}
    </div>
  );
}
