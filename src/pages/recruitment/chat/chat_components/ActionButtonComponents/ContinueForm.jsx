// chat_components/ActionButtonComponents/ContinueForm.jsx
import { useState } from "react";
import { Button } from "../../../../../ui/button";
import { useChatStore } from "../../stores/useChatStore";
import { useFormDataStore } from "../../stores/useFormDataStore";

export default function ContinueForm({ isFormValid }) {
  const { moveToNextPhase } = useChatStore();
  const { formData } = useFormDataStore();
  const [isValidating, setIsValidating] = useState(false);

  const handleContinue = () => {
    setIsValidating(true);

    // Ejecutar validación
    if (isFormValid) {
      const isValid = isFormValid();

      if (!isValid) {
        setIsValidating(false);

        // Scroll al primer error
        setTimeout(() => {
          const firstError = document.querySelector(".border-red-500");
          if (firstError) {
            firstError.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);

        return;
      }
    }

    // Si es válido, continuar a la siguiente fase
    console.log("✅ Formulario válido. Datos actuales:", formData);
    moveToNextPhase();
    setIsValidating(false);
  };

  return (
    <div className="flex w-full">
      <Button
        onClick={handleContinue}
        disabled={isValidating}
        className="w-full h-full bg-[#44BBA4] hover:bg-[#3aa18e] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:scale-[0.98]"
      >
        {isValidating ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Validando...
          </span>
        ) : (
          "Continuar"
        )}
      </Button>
    </div>
  );
}
