// pages/CandidatesDetailPage.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/ui/button.jsx";
import { useCandidateDetail } from "./hooks/useCandidateData.js";
import { useCandidateActions } from "./hooks/useCandidateActions.js";
import {
  CandidatesAllToggles,
  MainInfoCard,
  ActionButtons,
} from "./components/PageParts/index.js";
import { CandidateLayoutState } from "./components/GlobalComponents/index.js";
import {
  DebugBanner,
  ScheduleInterviewDialog,
  ErrorBanner,
} from "./components/helpers/index.js";
import { ActionResultModal } from "./components/helpers/actionResultModal.jsx";
import { DEBUG_MODE } from "@/const/config.js";

export default function CandidatesDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [openSections, setOpenSections] = useState([]);

  // Hook para obtener datos del candidato
  const {
    basic,
    cv,
    detalles,
    familiar,
    academica,
    laboral,
    referencias,
    generales,
    economicos,
    tallas,
    errorCount,
    retrySection,
    retryAllFailed,
  } = useCandidateDetail(id);

  // Hook para manejar las acciones del candidato
  const {
    handleReject,
    handleSaveContact,
    isRejecting,
    isSaving,
    isAccepting,
    isAnyActionLoading,
    modalState,
    closeModal,
  } = useCandidateActions(id);

  // Manejador para abrir el diálogo de agendar entrevista
  const handleAccept = () => {
    setIsScheduleDialogOpen(true);
  };

  const handleScheduleInterview = () => {
    console.log("📅 Cita agendada");
    setIsScheduleDialogOpen(false);
    // Aquí podrías llamar a handleAcceptAction() si el endpoint ya está implementado
  };

  const candidateData = basic.data;
  const candidatoNombre =
    candidateData?.candidato?.nombre_completo || "el candidato";
  const candidatoCargo = candidateData?.datos_postulacion?.puesto_aspirado;

  return (
    <CandidateLayoutState loading={basic.isLoading} error={basic.error}>
      {DEBUG_MODE && <DebugBanner />}

      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-700 hover:bg-gray-100 rounded-xl"
        disabled={isAnyActionLoading}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>

      <div className="space-y-6">
        {/* Banner de errores globales */}
        <ErrorBanner errorCount={errorCount} onRetryAll={retryAllFailed} />

        <MainInfoCard
          datosPostulacion={candidateData?.datos_postulacion}
          candidato={candidateData?.candidato}
        />

        <CandidatesAllToggles
          openSections={openSections}
          setOpenSections={setOpenSections}
          cv={cv}
          detalles={detalles}
          familiar={familiar}
          academica={academica}
          laboral={laboral}
          referencias={referencias}
          generales={generales}
          economicos={economicos}
          tallas={tallas}
          retrySection={retrySection}
          candidatoNombre={candidatoNombre}
          candidatoCargo={candidatoCargo}
        />

        <ActionButtons
          handleReject={handleReject}
          handleSaveContact={handleSaveContact}
          handleAccept={handleAccept}
          isRejecting={isRejecting}
          isSaving={isSaving}
          isAccepting={isAccepting}
          isAnyActionLoading={isAnyActionLoading}
          candidateName={candidatoNombre}
        />
      </div>

      {/* Modal de resultados de acciones */}
      <ActionResultModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        status={modalState.status}
        action={modalState.action}
        candidateName={modalState.candidateName}
        errorMessage={modalState.errorMessage}
      />

      <ScheduleInterviewDialog
        isScheduleDialogOpen={isScheduleDialogOpen}
        setIsScheduleDialogOpen={setIsScheduleDialogOpen}
        candidateData={candidateData}
        handleScheduleInterview={handleScheduleInterview}
      />
    </CandidateLayoutState>
  );
}
