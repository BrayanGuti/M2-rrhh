import { RecruitersList } from "./components/recruiters-list";
import { RecruiterModal } from "./components/recruiter-modal";
import { useRecruiters } from "./hooks/use-recruiters";
import { AdminLayout } from "../../layout/Layout";

export default function ReclutadoresPage() {
  const {
    recruiters,
    isModalOpen,
    modalMode,
    selectedRecruiter,
    openViewModal,
    openCreateModal,
    closeModal,
    deleteRecruiter,
    createRecruiter,
  } = useRecruiters();

  const handleDelete = (recruiter) => {
    deleteRecruiter(recruiter);
  };

  const handleCreate = (newRecruiter) => {
    createRecruiter(newRecruiter);
  };

  return (
    <AdminLayout>
      <RecruitersList
        recruiters={recruiters}
        onViewDetails={openViewModal}
        onDelete={handleDelete}
        onAddNew={openCreateModal}
      />

      <RecruiterModal
        isOpen={isModalOpen}
        mode={modalMode}
        recruiter={selectedRecruiter}
        onClose={closeModal}
        onCreate={handleCreate}
      />
    </AdminLayout>
  );
}
