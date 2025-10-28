// pages/CandidatesDetailPage.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../ui/button";
import { useCandidateDetail } from "./hooks/useCandidateData";
import {
  CandidatesAllToggles,
  MainInfoCard,
  ActionButtons,
} from "./components/PageParts";
import { CandidateLayoutState } from "./components/GlobalComponents";
import {
  DebugBanner,
  ScheduleInterviewDialog,
  ErrorBanner,
} from "./components/helpers";
import { DEBUG_MODE } from "../../../const/config.js";

export default function CandidatesDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [openSections, setOpenSections] = useState([]);

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

  const handleAccept = () => setIsScheduleDialogOpen(true);
  const handleSaveContact = () => console.log("💾 Guardado como contacto");
  const handleReject = () => console.log("❌ Candidato rechazado");
  const handleScheduleInterview = () => {
    console.log("📅 Cita agendada");
    setIsScheduleDialogOpen(false);
  };

  const candidateData = basic.data;
  const candidatoNombre = candidateData?.candidato?.nombre_completo;

  return (
    <CandidateLayoutState loading={basic.isLoading} error={basic.error}>
      {DEBUG_MODE && <DebugBanner />}

      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-700 hover:bg-gray-100 rounded-xl"
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
        />

        <ActionButtons
          handleReject={handleReject}
          handleSaveContact={handleSaveContact}
          handleAccept={handleAccept}
        />
      </div>

      <ScheduleInterviewDialog
        isScheduleDialogOpen={isScheduleDialogOpen}
        setIsScheduleDialogOpen={setIsScheduleDialogOpen}
        candidateData={candidateData}
        handleScheduleInterview={handleScheduleInterview}
      />
    </CandidateLayoutState>
  );
}
