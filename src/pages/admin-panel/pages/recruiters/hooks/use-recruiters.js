import { useState } from "react";

const MOCK_RECRUITERS = [
  {
    nombre: "Hernan Melo",
    rol: "Reclutador",
    correo: "monda@gmail.com",
    telefono: "3567806753",
    nombre_usuario: "Nandy2607",
    documento_identidad: "1239092184034",
    direccion: "cra.2 #114A-410",
    created_at: "2025-10-26T05:39:58.058056-05:00",
  },
  {
    nombre: "Yazmina Yepes",
    rol: "Reclutador",
    correo: "yazmina@gmail.com",
    telefono: "3005671234",
    nombre_usuario: "YazYepes",
    documento_identidad: "987654321",
    direccion: "Cl. 45 #10-12",
    created_at: "2025-10-27T09:15:22.431000-05:00",
  },
];

export function useRecruiters() {
  const [recruiters, setRecruiters] = useState(MOCK_RECRUITERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  const openViewModal = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedRecruiter(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecruiter(null);
  };

  const deleteRecruiter = (recruiter) => {
    setRecruiters((prev) =>
      prev.filter(
        (r) => r.documento_identidad !== recruiter.documento_identidad
      )
    );
  };

  const createRecruiter = (newRecruiter) => {
    setRecruiters((prev) => [...prev, newRecruiter]);
    closeModal();
  };

  return {
    recruiters,
    isModalOpen,
    modalMode,
    selectedRecruiter,
    openViewModal,
    openCreateModal,
    closeModal,
    deleteRecruiter,
    createRecruiter,
  };
}
