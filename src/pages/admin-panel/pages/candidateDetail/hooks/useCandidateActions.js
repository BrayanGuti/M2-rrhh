// hooks/useCandidateActions.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEBUG_MODE } from "@/const/config";
import { token } from "../../../config/AuthToken.js";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

/**
 * Simula respuestas del servidor en modo DEBUG
 * Incluye delays y posibilidad de error aleatorio
 */
const simulateApiResponse = async (action) => {
  // Delay aleatorio entre 800ms y 2000ms para simular red
  const delay = Math.random() * 1200 + 800;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // 20% de probabilidad de error para testing
  const shouldFail = Math.random() < 0.2;

  if (shouldFail) {
    throw new Error(`Error simulado en modo DEBUG para acción: ${action}`);
  }

  return {
    ok: true,
    status: 200,
    json: async () => ({ exito: true }),
  };
};

/**
 * Custom hook para manejar las acciones de candidatos (rechazar, guardar contacto, aceptar)
 * @param {string} candidatoId - ID del candidato
 * @returns {Object} - Funciones y estados para las acciones
 */
export function useCandidateActions(candidatoId) {
  const navigate = useNavigate();

  const [loadingStates, setLoadingStates] = useState({
    rejecting: false,
    saving: false,
    accepting: false,
  });

  // Estado para el modal de resultados
  const [modalState, setModalState] = useState({
    isOpen: false,
    status: null, // 'success' | 'error'
    action: null, // 'rechazar' | 'contacto'
    candidateName: "",
    errorMessage: "",
  });

  /**
   * Cierra el modal y redirige si fue exitoso
   */
  const closeModal = () => {
    const wasSuccess = modalState.status === "success";

    setModalState({
      isOpen: false,
      status: null,
      action: null,
      candidateName: "",
      errorMessage: "",
    });

    // Solo redirige si fue exitoso
    if (wasSuccess) {
      navigate("/admin");
    }
  };

  /**
   * Rechaza un candidato
   * DELETE /api/candidatos/pendientes/{id}/rechazar
   */
  const handleReject = async (candidateName = "el candidato") => {
    console.log("Rechazar candidato:", candidatoId);
    if (!candidatoId) {
      setModalState({
        isOpen: true,
        status: "error",
        action: "rechazar",
        candidateName,
        errorMessage: "ID de candidato no válido",
      });
      return;
    }

    setLoadingStates((prev) => ({ ...prev, rejecting: true }));

    try {
      let response;

      if (DEBUG_MODE) {
        console.log("🔧 DEBUG MODE: Simulando rechazo de candidato");
        response = await simulateApiResponse("rechazar");
      } else {
        response = await fetch({
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.exito) {
        setModalState({
          isOpen: true,
          status: "success",
          action: "rechazar",
          candidateName,
          errorMessage: "",
        });
      } else {
        throw new Error("La operación no fue exitosa");
      }
    } catch (error) {
      console.error("Error al rechazar candidato:", error);
      setModalState({
        isOpen: true,
        status: "error",
        action: "rechazar",
        candidateName,
        errorMessage:
          error.message ||
          "Error al rechazar el candidato. Intenta nuevamente.",
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, rejecting: false }));
    }
  };

  /**
   * Guarda un candidato como contacto
   * PATCH /api/candidatos/pendientes/{id}/contacto
   */
  const handleSaveContact = async (candidateName = "el candidato") => {
    if (!candidatoId) {
      setModalState({
        isOpen: true,
        status: "error",
        action: "contacto",
        candidateName,
        errorMessage: "ID de candidato no válido",
      });
      return;
    }

    setLoadingStates((prev) => ({ ...prev, saving: true }));

    try {
      let response;

      if (DEBUG_MODE) {
        console.log("🔧 DEBUG MODE: Simulando guardar como contacto");
        response = await simulateApiResponse("contacto");
      } else {
        response = await fetch(
          `${API_BASE_URL}/api/candidatos/pendientes/${candidatoId}/contacto`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              estado: "pendiente",
            }),
          }
        );
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.exito) {
        setModalState({
          isOpen: true,
          status: "success",
          action: "contacto",
          candidateName,
          errorMessage: "",
        });
      } else {
        throw new Error("La operación no fue exitosa");
      }
    } catch (error) {
      console.error("Error al guardar contacto:", error);
      setModalState({
        isOpen: true,
        status: "error",
        action: "contacto",
        candidateName,
        errorMessage:
          error.message ||
          "Error al guardar como contacto. Intenta nuevamente.",
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, saving: false }));
    }
  };

  /**
   * Acepta un candidato
   * TODO: Implementar endpoint cuando esté disponible
   */
  const handleAccept = async () => {
    setLoadingStates((prev) => ({ ...prev, accepting: true }));

    try {
      // TODO: Implementar llamada al endpoint de aceptar
      console.log("TODO: Implementar endpoint de aceptar candidato");

      // Simulación temporal - remover cuando se implemente el endpoint
      await new Promise((resolve) => setTimeout(resolve, 500));

      // No se implementa modal aquí porque se usa el diálogo de agendar entrevista
      console.log("Funcionalidad en desarrollo");
    } catch (error) {
      console.error("Error al aceptar candidato:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, accepting: false }));
    }
  };

  return {
    handleReject,
    handleSaveContact,
    handleAccept,
    isRejecting: loadingStates.rejecting,
    isSaving: loadingStates.saving,
    isAccepting: loadingStates.accepting,
    isAnyActionLoading: Object.values(loadingStates).some((state) => state),
    // Estado del modal
    modalState,
    closeModal,
  };
}
