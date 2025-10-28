import { Avatar, AvatarFallback } from "@/ui/avatar";
import { useEffect, useRef } from "react";
import { useChatStore } from "./stores/useChatStore";
import { FormMessage } from "./chat_components/Forms/FormMessage";
import { VACANCY_COVERTATION_PHASES } from "./const/Phases";

export function MessageList() {
  const {
    messages,
    isProcessing,
    currentStep,
    submissionStatus,
    submissionMessage,
  } = useChatStore();
  const messagesEndRef = useRef(null);
  const showForm =
    currentStep === VACANCY_COVERTATION_PHASES.form_datos_postulacion ||
    currentStep === VACANCY_COVERTATION_PHASES.form_candidato ||
    currentStep === VACANCY_COVERTATION_PHASES.form_detalles_personales ||
    currentStep === VACANCY_COVERTATION_PHASES.form_informacion_familiar ||
    currentStep === VACANCY_COVERTATION_PHASES.form_informacion_academica ||
    currentStep === VACANCY_COVERTATION_PHASES.form_informacion_laboral ||
    currentStep === VACANCY_COVERTATION_PHASES.form_referencias_personales ||
    currentStep === VACANCY_COVERTATION_PHASES.form_datos_generales ||
    currentStep === VACANCY_COVERTATION_PHASES.form_datos_economicos ||
    currentStep === VACANCY_COVERTATION_PHASES.form_tallas ||
    currentStep === VACANCY_COVERTATION_PHASES.form_resumen;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing, submissionStatus]);

  return (
    <div
      className="flex-1 overflow-y-auto space-y-4 pb-4 px-4 scroll-smooth"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div className="space-y-4 pt-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.type === "bot" && <BotAvatar />}
            <MessageBubble message={message} />
          </div>
        ))}

        {isProcessing && <BotTyping />}

        {showForm && !isProcessing && (
          <>
            {/* EL FORMULARIO */}
            <div className="flex items-start gap-2 justify-start">
              <BotAvatar />
              <div className="max-w-[90%] w-full">
                <FormMessage />
              </div>
            </div>

            {/* MENSAJE DE ESTADO DEBAJO DEL FORMULARIO */}
            {submissionStatus && (
              <div className="flex items-start gap-2 justify-start animate-fade-in">
                <BotAvatar />
                <SubmissionStatusMessage
                  status={submissionStatus}
                  message={submissionMessage}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}

function BotTyping() {
  return (
    <div className="flex items-end gap-2 justify-start">
      <Avatar className="w-10 h-10 border-2 border-[#44BBA4] shadow-md">
        <AvatarFallback className="bg-[#44BBA4] text-white font-semibold">
          D
        </AvatarFallback>
      </Avatar>
      <div className="bg-white border-2 border-[#15616D]/10 text-[#15616D] rounded-2xl rounded-bl-none px-5 py-3 shadow-md">
        <div className="flex gap-1">
          <span
            className="w-2 h-2 bg-[#44BBA4] rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 bg-[#44BBA4] rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 bg-[#44BBA4] rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }) {
  return (
    <div
      className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-md ${
        message.type === "user"
          ? "bg-[#44BBA4] text-white rounded-br-none"
          : "bg-white border-2 border-[#15616D]/10 text-[#15616D] rounded-bl-none"
      }`}
    >
      {typeof message.content === "string" ? (
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      ) : (
        <div className="text-sm leading-relaxed">{message.content}</div>
      )}
      <div
        className={`text-xs mt-2 ${
          message.type === "user" ? "text-white/70" : "text-[#15616D]/50"
        }`}
      >
        {message.timestamp.toLocaleTimeString("es-CO", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}

function SubmissionStatusMessage({ status, message }) {
  const statusStyles = {
    sending: "border-blue-200 text-blue-900 bg-blue-50",
    success: "border-green-200 text-green-900 bg-green-50",
    error: "border-red-200 text-red-900 bg-red-50",
  };

  return (
    <div
      className={`max-w-[80%] rounded-2xl rounded-bl-none px-5 py-3 shadow-md border-2 ${
        statusStyles[status] || statusStyles.error
      }`}
    >
      <div className="text-sm leading-relaxed">{message}</div>
    </div>
  );
}

function BotAvatar() {
  return (
    <Avatar className="w-10 h-10 border-2 border-[#44BBA4] shadow-md flex-shrink-0">
      <AvatarFallback className="bg-[#44BBA4] text-white font-semibold">
        D
      </AvatarFallback>
    </Avatar>
  );
}
