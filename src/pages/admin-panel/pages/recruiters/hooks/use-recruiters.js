import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchRecruiters,
  createRecruiter as createRecruiterApi,
  deleteRecruiter as deleteRecruiterApi,
} from "../services/recruiters-service";
import { DEBUG_MODE } from "@/const/config";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { STALE_TIME } from "@/lib/react-query/cache";

/**
 * Hook para gestión completa de reclutadores
 * Incluye CRUD operations y manejo de modales
 */
export function useRecruiters() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // "view" | "create"
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  // Query para obtener reclutadores
  const {
    data: recruiters = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.recruiters.lists(),
    queryFn: fetchRecruiters,
    staleTime: STALE_TIME,
  });

  if (DEBUG_MODE) {
    console.log("🔧 [DEBUG MODE] Recruiters state:", {
      recruiters,
      isLoading,
      error,
    });
  }

  // Mutation para crear reclutador
  const createMutation = useMutation({
    mutationFn: createRecruiterApi,
    onSuccess: (newRecruiter) => {
      // Invalidar y refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.recruiters.all });

      if (DEBUG_MODE) {
        console.log(
          "🔧 [DEBUG MODE] Recruiter created successfully:",
          newRecruiter
        );
      }
    },
    onError: (error) => {
      if (DEBUG_MODE) {
        console.error("🔧 [DEBUG MODE] Error creating recruiter:", error);
      }
    },
  });

  // Mutation para eliminar reclutador
  const deleteMutation = useMutation({
    mutationFn: deleteRecruiterApi,
    onSuccess: (_, deletedId) => {
      // Invalidar y refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.recruiters.all });

      if (DEBUG_MODE) {
        console.log(
          "🔧 [DEBUG MODE] Recruiter deleted successfully:",
          deletedId
        );
      }
    },
    onError: (error) => {
      if (DEBUG_MODE) {
        console.error("🔧 [DEBUG MODE] Error deleting recruiter:", error);
      }
    },
  });

  // Abrir modal de visualización
  const openViewModal = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setModalMode("view");
    setIsModalOpen(true);

    if (DEBUG_MODE) {
      console.log("🔧 [DEBUG MODE] Opening view modal for:", recruiter);
    }
  };

  // Abrir modal de creación
  const openCreateModal = () => {
    setSelectedRecruiter(null);
    setModalMode("create");
    setIsModalOpen(true);

    if (DEBUG_MODE) {
      console.log("🔧 [DEBUG MODE] Opening create modal");
    }
  };

  // Cerrar modal principal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecruiter(null);

    if (DEBUG_MODE) {
      console.log("🔧 [DEBUG MODE] Closing main modal");
    }
  };

  // Abrir modal de eliminación
  const openDeleteModal = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setIsDeleteModalOpen(true);

    if (DEBUG_MODE) {
      console.log("🔧 [DEBUG MODE] Opening delete modal for:", recruiter);
    }
  };

  // Cerrar modal de eliminación
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedRecruiter(null);

    if (DEBUG_MODE) {
      console.log("🔧 [DEBUG MODE] Closing delete modal");
    }
  };

  // Crear reclutador
  const createRecruiter = async (recruiterData) => {
    try {
      if (DEBUG_MODE) {
        console.log(
          "🔧 [DEBUG MODE] Creating recruiter with data:",
          recruiterData
        );
      }

      await createMutation.mutateAsync(recruiterData);
      closeModal();
      return { success: true };
    } catch (error) {
      if (DEBUG_MODE) {
        console.error("🔧 [DEBUG MODE] Failed to create recruiter:", error);
      }
      return { success: false, error };
    }
  };

  // Eliminar reclutador
  const deleteRecruiter = async (recruiter) => {
    try {
      if (DEBUG_MODE) {
        console.log("🔧 [DEBUG MODE] Deleting recruiter:", recruiter);
      }

      await deleteMutation.mutateAsync(recruiter.id);
      closeDeleteModal();
      return { success: true };
    } catch (error) {
      if (DEBUG_MODE) {
        console.error("🔧 [DEBUG MODE] Failed to delete recruiter:", error);
      }
      return { success: false, error };
    }
  };

  return {
    // Data
    recruiters,
    isLoading,
    error,

    // Modal state
    isModalOpen,
    isDeleteModalOpen,
    modalMode,
    selectedRecruiter,

    // Modal actions
    openViewModal,
    openCreateModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,

    // CRUD operations
    createRecruiter,
    deleteRecruiter,

    // Loading states
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
