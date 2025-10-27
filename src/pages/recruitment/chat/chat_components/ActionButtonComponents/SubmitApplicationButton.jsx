// chat_components/ActionButtonComponents/SubmitApplicationButton.jsx
import { useState } from "react";
import { Button } from "../../../../../ui/button";
import { useFormDataStore } from "../../stores/useFormDataStore";
import { useChatStore } from "../../stores/useChatStore";
import { Send } from "lucide-react";

export default function SubmitApplicationButton() {
  const { validateAllSections, submitApplication, resetForm } =
    useFormDataStore();
  const { addBotMessage, setStep, setSubmissionStatus, clearSubmissionStatus } =
    useChatStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Validar todo antes de enviar
    const validation = validateAllSections();

    if (!validation.isValid) {
      // Scroll al primer error
      setTimeout(() => {
        const firstError = document.querySelector('[class*="border-red"]');
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);

      // Mostrar error de validación DEBAJO del formulario
      setSubmissionStatus(
        "error",
        <>
          ❌ <strong>No puedo enviar tu aplicación todavía.</strong>
          <br />
          <br />
          Por favor, corrige los {validation.totalErrors} error(es)
          encontrado(s) en las secciones marcadas en rojo antes de continuar.
        </>
      );

      return;
    }

    setIsSubmitting(true);

    // Limpiar mensajes previos y mostrar "enviando"
    clearSubmissionStatus();
    setSubmissionStatus(
      "sending",
      <>
        📤 Perfecto, estoy enviando tu aplicación...
        <br />
        <br />
        Por favor espera un momento.
      </>
    );

    try {
      const result = await submitApplication();

      if (result.success) {
        setTimeout(() => {
          // Mostrar éxito
          setSubmissionStatus(
            "success",
            <>
              ✅ <strong>¡Aplicación enviada con éxito!</strong>
              <br />
              <br />
              Tu solicitud ha sido recibida y será revisada por nuestro equipo
              de Recursos Humanos.
              <br />
              <br />
              Te contactaremos pronto. ¡Gracias por tu interés en{" "}
              <strong>Hotel El Dorado</strong>! 🎉
            </>
          );

          // Después de 3 segundos, limpiar el mensaje de éxito y continuar
          setTimeout(() => {
            clearSubmissionStatus(); // Limpiar el mensaje de éxito
            addBotMessage(
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-300 bg-white shadow-[0_4px_10px_rgba(16,185,129,0.2)]">
                <div className="flex items-center justify-center w-10 h-10 bg-emerald-500 text-white rounded-full shadow-md">
                  <span className="text-lg font-bold">✓</span>
                </div>

                <div className="leading-tight">
                  <div className="font-semibold text-emerald-700 text-base">
                    ¡Formulario completado!
                  </div>
                  <div className="text-sm text-emerald-600">
                    Tu aplicación fue enviada correctamente 🎉
                  </div>
                </div>
              </div>
            );

            addBotMessage("¿Hay algo más en lo que te pueda ayudar?");
            resetForm();
            setStep("initial-menu");
          }, 3000);
        }, 1500);
      } else {
        // Error al enviar
        setTimeout(() => {
          setSubmissionStatus(
            "error",
            <>
              ❌ <strong>Hubo un problema al enviar tu aplicación.</strong>
              <br />
              <br />
              Error: {result.error}
              <br />
              <br />
              Por favor, intenta nuevamente. Si el problema persiste, contacta
              con soporte.
            </>
          );
          setIsSubmitting(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error inesperado al enviar:", error);
      setTimeout(() => {
        setSubmissionStatus(
          "error",
          <>
            ❌ <strong>Error inesperado.</strong>
            <br />
            <br />
            No se pudo conectar con el servidor. Por favor, verifica tu conexión
            a internet e intenta nuevamente.
          </>
        );
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <div className="flex w-full">
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full h-full bg-gradient-to-r from-[#44BBA4] to-[#3aa18e] hover:from-[#3aa18e] hover:to-[#2d8c7a] text-white font-bold px-6 py-4 rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl active:scale-[0.98]"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-3">
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
            Enviando aplicación...
          </span>
        ) : (
          <span className="flex items-center gap-3">
            <Send size={20} />
            Enviar Aplicación
          </span>
        )}
      </Button>
    </div>
  );
}
