// chat_components/ActionButtonArea.jsx
import { useChatStore } from "../stores/useChatStore";
import {
  InitialMenuButtons,
  UploadCvButtons,
  ContinueForm,
} from "./ActionButtonComponents";

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

      case "upload-cv":
        return <UploadCvButtons />;

      case "form-datos-postulacion":
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case "form-candidato":
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case "form-detalles-personales":
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case "form-informacion-academica":
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case "form-referencias-personales":
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case "form-datos-generales":
        return <ContinueForm isFormValid={validateCurrentForm} />;

      case "form-tallas":
        return <ContinueForm isFormValid={validateCurrentForm} />;

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
