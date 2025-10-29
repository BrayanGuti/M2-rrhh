import { useEffect } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

/**
 * Modal de resultado de acción (estilo corporate)
 */
export function ActionResultModal({
  isOpen,
  onClose,
  status,
  action,
  candidateName,
  errorMessage,
}) {
  const isSuccess = status === "success";

  useEffect(() => {
    if (isOpen && isSuccess) {
      const timer = setTimeout(() => onClose(), 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isSuccess, onClose]);

  if (!isOpen) return null;

  const actionText = {
    rechazar: {
      title: isSuccess ? "Candidato Rechazado" : "Error al Rechazar",
      description: isSuccess
        ? `${candidateName} ha sido rechazado correctamente.`
        : `No se pudo rechazar a ${candidateName}.`,
    },
    contacto: {
      title: isSuccess ? "Contacto Guardado" : "Error al Guardar",
      description: isSuccess
        ? `${candidateName} fue guardado en tus contactos.`
        : `No se pudo guardar a ${candidateName}.`,
    },
  };

  const content = actionText[action] || actionText.contacto;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isSuccess
              ? "bg-gray-50 border-gray-100"
              : "bg-red-50 border-red-100"
          }`}
        >
          <h3
            className={`text-lg font-semibold ${
              isSuccess ? "text-gray-800" : "text-red-700"
            }`}
          >
            {content.title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Icono central */}
        <div className="flex justify-center mt-6">
          {isSuccess ? (
            <CheckCircle2 className="w-14 h-14 text-emerald-500" />
          ) : (
            <XCircle className="w-14 h-14 text-red-500" />
          )}
        </div>

        {/* Contenido */}
        <div className="text-center px-6 py-6">
          <p className="text-gray-700 mb-2">{content.description}</p>

          {!isSuccess && errorMessage && (
            <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {isSuccess && (
            <div className="mt-6">
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 animate-[shrink_2.5s_linear_forwards]"
                  style={{ animation: "shrink 2.5s linear forwards" }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Redirigiendo automáticamente...
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
