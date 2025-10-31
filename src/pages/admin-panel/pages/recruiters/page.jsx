import { RecruitersList } from "./components/recruiters-list";
import { RecruiterModal } from "./components/recruiter-modal";
import { DeleteRecruiterModal } from "./components/deleteRecruiterModal";
import { useRecruiters } from "./hooks/use-recruiters";
import { DEBUG_MODE } from "@/const/config";

export default function ReclutadoresPage() {
  const {
    recruiters,
    isLoading,
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
    isCreating,
  } = useRecruiters();

  if (DEBUG_MODE) {
    console.log("🔧 [DEBUG MODE] ReclutadoresPage render:", {
      recruitersCount: recruiters.length,
      isLoading,
      isModalOpen,
      isDeleteModalOpen,
      modalMode,
    });
  }

  const handleDelete = async (recruiter) => {
    openDeleteModal(recruiter);
  };

  const handleCreate = async (newRecruiter) => {
    return await createRecruiter(newRecruiter);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Reclutadores</h1>
            <p className="text-gray-600 mt-1">
              Gestiona los reclutadores del sistema
            </p>
          </div>
          {!isLoading && (
            <div className="text-sm text-gray-500">
              Total: {recruiters.length} reclutador
              {recruiters.length !== 1 ? "es" : ""}
            </div>
          )}
        </div>

        <RecruitersList
          recruiters={recruiters}
          onViewDetails={openViewModal}
          onDelete={handleDelete}
          onAddNew={openCreateModal}
          isLoading={isLoading}
        />
      </div>

      <RecruiterModal
        isOpen={isModalOpen}
        mode={modalMode}
        recruiter={selectedRecruiter}
        onClose={closeModal}
        onCreate={handleCreate}
        isCreating={isCreating}
      />

      <DeleteRecruiterModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        recruiter={selectedRecruiter}
        onDelete={deleteRecruiter}
      />
    </>
  );
}
