// stores/useChatStore.js
import { create } from "zustand";
import { VACANCY_COVERTATION_PHASES } from "../const/Phases";

// Mensaje inicial de bienvenida
const initialMessages = [
  {
    id: "welcome-1",
    type: "bot",
    content: (
      <>
        ¡Hola! 👋 Soy <strong>Dori</strong>, el asistente virtual del{" "}
        <strong>Hotel El Dorado</strong>.
        <br />
        <br />
        Estoy aquí para ayudarte. ¿En qué te puedo ayudar hoy?
      </>
    ),
    timestamp: new Date(),
  },
];

// Definición de fases lineales para cada flujo
const VACANCY_COVERTATION_PHASES_FLOW = [
  { id: VACANCY_COVERTATION_PHASES.upload_cv },
  { id: VACANCY_COVERTATION_PHASES.form_datos_postulacion },
  { id: VACANCY_COVERTATION_PHASES.form_candidato },
  { id: VACANCY_COVERTATION_PHASES.form_detalles_personales },
  { id: VACANCY_COVERTATION_PHASES.form_informacion_academica },
  { id: VACANCY_COVERTATION_PHASES.form_referencias_personales },
  { id: VACANCY_COVERTATION_PHASES.form_datos_generales },
  { id: VACANCY_COVERTATION_PHASES.form_tallas },
  // Aquí irán más fases cuando las implementes
];

const APPOINTMENT_PHASES = [
  { id: "verify-info", name: "Verificar Información" },
  { id: "select-date", name: "Seleccionar Nueva Fecha" },
  // Aquí irán más fases cuando las implementes
];

export const useChatStore = create((set, get) => ({
  // Estado actual del chat
  currentStep: "initial-menu",
  currentFlow: null, // 'vacancy' o 'appointment'
  currentPhase: null, // Fase actual dentro del flujo
  currentPhaseIndex: 0, // Índice de la fase actual
  messages: initialMessages,
  isProcessing: false,

  // === FUNCIONES PARA MENSAJES ===

  addBotMessage: (content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `bot-${Date.now()}-${Math.random()}`,
          type: "bot",
          content,
          timestamp: new Date(),
        },
      ],
    })),

  addUserMessage: (content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `user-${Date.now()}-${Math.random()}`,
          type: "user",
          content,
          timestamp: new Date(),
        },
      ],
    })),

  // === FUNCIONES PARA NAVEGACIÓN ===

  setStep: (step) => set({ currentStep: step }),

  setPhase: (phase) => set({ currentPhase: phase }),

  setProcessing: (processing) => set({ isProcessing: processing }),

  // Obtener las fases del flujo actual
  getCurrentFlowPhases: () => {
    const { currentFlow } = get();
    if (currentFlow === "vacancy") return VACANCY_COVERTATION_PHASES_FLOW;
    if (currentFlow === "appointment") return APPOINTMENT_PHASES;
    return [];
  },

  // Avanzar a la siguiente fase
  moveToNextPhase: () => {
    const { currentPhaseIndex, getCurrentFlowPhases } = get();
    const phases = getCurrentFlowPhases();
    const nextIndex = currentPhaseIndex + 1;

    if (nextIndex < phases.length) {
      set({
        currentPhaseIndex: nextIndex,
        currentPhase: phases[nextIndex].id,
        currentStep: phases[nextIndex].id,
      });
      return true;
    }
    return false; // No hay más fases
  },

  // === MANEJO DE FLUJO DE VACANTES ===

  selectVacancy: () => {
    const { addUserMessage, addBotMessage, setStep } = get();

    addUserMessage("Quiero aplicar a una vacante 💼");

    set({
      isProcessing: true,
      currentFlow: "vacancy",
      currentPhase: "upload-cv",
      currentPhaseIndex: 0,
    });

    setTimeout(() => {
      set({ isProcessing: false });
      addBotMessage(
        <>
          ¡Perfecto! Para comenzar tu aplicación, necesito que subas tu hoja de
          vida. 📄
          <br />
          <br />
          Esto me permitirá extraer información importante y agilizar el
          proceso.
        </>
      );

      setStep("upload-cv");
    }, 1500);
  },

  // Maneja la subida del CV
  handleCVUpload: async (file) => {
    const {
      addUserMessage,
      addBotMessage,
      setProcessing,
      setStep,
      moveToNextPhase,
    } = get();

    addUserMessage(`📄 ${file.name}`);
    setProcessing(true);
    addBotMessage("Perfecto, estoy procesando tu hoja de vida... 🔍");

    // Simular delay para mejor UX
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // Importar la función uploadCV
      const { uploadCV } = await import("../services/apiServices");

      const response = await uploadCV(file);

      // Guardar datos extraídos
      set({
        extractedCVData: response.datos_extraidos,
        uploadToken: response.token_subida,
        isProcessing: false,
      });

      setTimeout(() => {
        addBotMessage(
          <>
            ¡Excelente! 🎉 He procesado tu hoja de vida exitosamente.
            <br />
            <br />
            Pude extraer información importante que te ayudará a completar el
            formulario más rápido.
          </>
        );

        setTimeout(() => {
          addBotMessage("Ahora continuemos con los siguientes datos...");

          // Avanzar a la siguiente fase
          setTimeout(() => {
            const hasNext = moveToNextPhase();
            if (hasNext) {
              addBotMessage("Por favor, completa el siguiente formulario:");
            }
          }, 1000);
        }, 2000);
      }, 1000);
    } catch (error) {
      console.error("Error al subir CV:", error);
      set({ isProcessing: false });

      addBotMessage(
        <>
          ❌ Lo siento, hubo un problema al procesar tu hoja de vida.
          <br />
          <br />
          Por favor, intenta subirla nuevamente. Asegúrate de que sea un archivo
          PDF válido.
        </>
      );

      // Mantener en la fase de upload-cv para que pueda reintentar
      setStep("upload-cv");
    }
  },

  // Reintentar subida de CV
  retryCVUpload: () => {
    const { addBotMessage, setStep } = get();

    addBotMessage("Entendido, por favor sube tu hoja de vida nuevamente. 📄");
    setStep("upload-cv");
  },

  // === MANEJO DE FLUJO DE CITAS ===

  selectAppointment: () => {
    const { addUserMessage, addBotMessage, setStep } = get();

    addUserMessage("Quiero reagendar mi cita 📅");

    set({
      isProcessing: true,
      currentFlow: "appointment",
      currentPhase: "verify-info",
      currentPhaseIndex: 0,
    });

    setTimeout(() => {
      set({ isProcessing: false });
      addBotMessage(
        <>
          Lo siento, esta funcionalidad aún no está disponible. 🚧
          <br />
          <br />
          Estamos trabajando en ella. Por favor, inténtalo más tarde.
        </>
      );

      setTimeout(() => {
        addBotMessage("¿Hay algo más en lo que te pueda ayudar?");
        setStep("initial-menu");
        set({ currentFlow: null, currentPhase: null, currentPhaseIndex: 0 });
      }, 2000);
    }, 1500);
  },

  // === RESET ===

  resetChat: () => {
    // También resetear el formulario al resetear el chat
    const { useFormDataStore } = import("./useFormDataStore");
    useFormDataStore.getState().resetForm();

    set({
      currentStep: "initial-menu",
      currentFlow: null,
      currentPhase: null,
      currentPhaseIndex: 0,
      messages: initialMessages,
      isProcessing: false,
    });
  },
}));
