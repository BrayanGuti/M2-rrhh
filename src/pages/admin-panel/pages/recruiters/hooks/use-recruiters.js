import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchRecruiters,
  createRecruiter as createRecruiterApi,
  deleteRecruiter as deleteRecruiterApi,
} from "../services/recruiters-service";
import { DEBUG_MODE } from "@/const/config";

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
    queryKey: ["recruiters"],
    queryFn: fetchRecruiters,
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
      queryClient.invalidateQueries({ queryKey: ["recruiters"] });

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
    onSuccess: () => {
      // Invalidar y refetch
      queryClient.invalidateQueries({ queryKey: ["recruiters"] });

      if (DEBUG_MODE) {
        console.log("🔧 [DEBUG MODE] Recruiter deleted successfully");
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
  };

  // Abrir modal de creación
  const openCreateModal = () => {
    setSelectedRecruiter(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  // Cerrar modal principal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecruiter(null);
  };

  // Abrir modal de eliminación
  const openDeleteModal = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setIsDeleteModalOpen(true);
  };

  // Cerrar modal de eliminación
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedRecruiter(null);
  };

  // Crear reclutador
  const createRecruiter = async (recruiterData) => {
    try {
      await createMutation.mutateAsync(recruiterData);
      closeModal();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  // Eliminar reclutador
  const deleteRecruiter = async (recruiter) => {
    await deleteMutation.mutateAsync(recruiter.id);
    closeDeleteModal();
    return { success: true };
  };

  return {
    recruiters,
    isLoading,
    error,
    isModalOpen,
    isDeleteModalOpen,
    modalMode,
    selectedRecruiter,
    openViewModal,
    openCreateModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
    deleteRecruiter,
    createRecruiter,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
