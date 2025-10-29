// stores/useChatStore.js
import { create } from "zustand";
import { VACANCY_COVERTATION_PHASES } from "../const";
import { uploadCV, countExtractedFields } from "../services/apiServices";
import { useFormDataStore } from "./useFormDataStore";

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

const VACANCY_FLOW_PHASES = [
  { id: VACANCY_COVERTATION_PHASES.upload_cv },
  { id: VACANCY_COVERTATION_PHASES.form_datos_postulacion },
  { id: VACANCY_COVERTATION_PHASES.form_candidato },
  { id: VACANCY_COVERTATION_PHASES.form_detalles_personales },
  { id: VACANCY_COVERTATION_PHASES.form_informacion_familiar },
  { id: VACANCY_COVERTATION_PHASES.form_informacion_academica },
  { id: VACANCY_COVERTATION_PHASES.form_informacion_laboral },
  { id: VACANCY_COVERTATION_PHASES.form_referencias_personales },
  { id: VACANCY_COVERTATION_PHASES.form_datos_generales },
  { id: VACANCY_COVERTATION_PHASES.form_datos_economicos },
  { id: VACANCY_COVERTATION_PHASES.form_tallas },
  { id: VACANCY_COVERTATION_PHASES.form_resumen },
];

const APPOINTMENT_FLOW_PHASES = [
  { id: "verify-info", name: "Verificar Información" },
  { id: "select-date", name: "Seleccionar Nueva Fecha" },
];

// ============================================
// STORE
// ============================================

export const useChatStore = create((set, get) => ({
  // Estado de la conversación
  currentStep: "initial-menu",
  currentFlow: null, // 'vacancy' | 'appointment' | null
  currentPhase: null,
  currentPhaseIndex: 0,

  // Mensajes
  messages: initialMessages,
  isProcessing: false,

  // Control de navegación
  returningToSummary: false,

  // Estado de envío de aplicación
  submissionStatus: null, // null | 'sending' | 'success' | 'error'
  submissionMessage: null,

  // ==========================================
  // GESTIÓN DE MENSAJES
  // ==========================================

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

  // ==========================================
  // ESTADO DE ENVÍO
  // ==========================================

  setSubmissionStatus: (status, message) =>
    set({ submissionStatus: status, submissionMessage: message }),

  clearSubmissionStatus: () =>
    set({ submissionStatus: null, submissionMessage: null }),

  // ==========================================
  // NAVEGACIÓN ENTRE FASES
  // ==========================================

  setStep: (step) => set({ currentStep: step }),

  setPhase: (phase) => set({ currentPhase: phase }),

  setProcessing: (processing) => set({ isProcessing: processing }),

  /**
   * Obtiene las fases del flujo actual
   * @returns {Array}
   */
  getCurrentFlowPhases: () => {
    const { currentFlow } = get();
    if (currentFlow === "vacancy") return VACANCY_FLOW_PHASES;
    if (currentFlow === "appointment") return APPOINTMENT_FLOW_PHASES;
    return [];
  },

  /**
   * Avanza a la siguiente fase del flujo
   * @returns {boolean} true si avanzó, false si no hay más fases
   */
  moveToNextPhase: () => {
    const { currentPhaseIndex, getCurrentFlowPhases, returningToSummary } =
      get();

    // Si venimos del resumen (modo edición), regresar al resumen
    if (returningToSummary) {
      const phases = getCurrentFlowPhases();
      const resumenIndex = phases.findIndex(
        (p) => p.id === VACANCY_COVERTATION_PHASES.form_resumen
      );

      if (resumenIndex !== -1) {
        set({
          currentPhaseIndex: resumenIndex,
          currentPhase: VACANCY_COVERTATION_PHASES.form_resumen,
          currentStep: VACANCY_COVERTATION_PHASES.form_resumen,
          returningToSummary: false,
        });
        return true;
      }
    }

    // Lógica normal: avanzar a la siguiente fase
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

  /**
   * Salta a una fase específica del flujo
   * @param {string} step - ID de la fase
   */
  setCurrentStep: (step) => {
    const phases = get().getCurrentFlowPhases();
    const phaseIndex = phases.findIndex((p) => p.id === step);

    console.log("Saltando a fase:", step, "Índice:", phaseIndex);

    if (phaseIndex !== -1) {
      set({
        currentPhaseIndex: phaseIndex,
        currentPhase: phases[phaseIndex].id,
        currentStep: phases[phaseIndex].id,
        returningToSummary: true,
      });
    }
  },

  // ==========================================
  // FLUJO: APLICACIÓN A VACANTE
  // ==========================================

  /**
   * Inicia el flujo de aplicación a vacante
   */
  selectVacancy: () => {
    const { addUserMessage, addBotMessage, setStep } = get();

    addUserMessage("Quiero aplicar a una vacante 💼");

    set({
      isProcessing: true,
      currentFlow: "vacancy",
      currentPhase: VACANCY_COVERTATION_PHASES.upload_cv,
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

      setStep(VACANCY_COVERTATION_PHASES.upload_cv);
    }, 1500);
  },

  /**
   * Maneja la subida y procesamiento del CV
   * @param {File} file - Archivo PDF del CV
   */
  handleCVUpload: async (file) => {
    const { addUserMessage, addBotMessage, setProcessing, moveToNextPhase } =
      get();

    addUserMessage(`📄 ${file.name}`);
    setProcessing(true);
    addBotMessage("Perfecto, estoy procesando tu hoja de vida... 🔍");

    try {
      // Subir y procesar CV
      const response = await uploadCV(file);

      if (!response.exito) {
        throw new Error("El servidor no pudo procesar el CV");
      }

      // Aplicar datos extraídos al formulario usando el store de formulario
      const formStore = useFormDataStore.getState();
      formStore.applyExtractedData(
        response.datos_extraidos,
        response.token_subida
      );

      // Contar campos extraídos para mensaje informativo
      const fieldsCount = countExtractedFields(response.datos_extraidos);

      setTimeout(() => {
        addBotMessage(
          <>
            ¡Excelente! 🎉 He procesado tu hoja de vida exitosamente.
            <br />
            <br />
            Pude extraer <strong>{fieldsCount} datos</strong> que te ayudarán a
            completar el formulario más rápido.
          </>
        );

        setTimeout(() => {
          addBotMessage("Ahora continuemos con los siguientes datos...");

          // Avanzar a la siguiente fase después de un momento
          setTimeout(() => {
            const hasNext = moveToNextPhase();
            if (hasNext) {
              addBotMessage("Por favor, completa el siguiente formulario:");
            }
            setProcessing(false);
          }, 1000);
        }, 2000);
      }, 1500);
    } catch (error) {
      console.error("❌ Error al procesar CV:", error);

      setTimeout(() => {
        setProcessing(false);
        addBotMessage(
          <>
            ❌ Lo siento, hubo un problema al procesar tu hoja de vida.
            <br />
            <br />
            <strong>Error:</strong> {error.message}
            <br />
            <br />
            Por favor, intenta subirla nuevamente. Asegúrate de que sea un
            archivo PDF válido y no supere los 10MB.
          </>
        );
      }, 1500);
    }
  },

  /**
   * Permite reintentar la subida del CV
   */
  retryCVUpload: () => {
    const { addBotMessage, setStep } = get();

    addBotMessage("Entendido, por favor sube tu hoja de vida nuevamente. 📄");
    setStep(VACANCY_COVERTATION_PHASES.upload_cv);
  },

  // ==========================================
  // FLUJO: REAGENDAR CITA
  // ==========================================

  /**
   * Inicia el flujo de reagendamiento de cita
   */
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

  // ==========================================
  // RESET Y LIMPIEZA
  // ==========================================

  /**
   * Resetea todo el chat y el formulario a su estado inicial
   */
  resetChat: () => {
    // Resetear también el formulario
    const formStore = useFormDataStore.getState();
    formStore.resetForm();

    set({
      currentStep: "initial-menu",
      currentFlow: null,
      currentPhase: null,
      currentPhaseIndex: 0,
      messages: initialMessages,
      isProcessing: false,
      returningToSummary: false,
      submissionStatus: null,
      submissionMessage: null,
    });

    console.log("🔄 Chat reseteado");
  },
}));
