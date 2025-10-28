import { useState, useEffect } from "react";
import { AdminLayout } from "../layout/Layout";
import { Filters } from "./components/Filters";
import { CandidatesTable } from "./components/CandidatesTable";
import { useCandidates } from "./hooks/useCandidates";
import { FILTER_CONSTANTS, CANDIDATES_STATUS_CONFIG } from "./constants";
import { POSITIONS } from "../../../const/Positions";

export function CandidatesListView({ status = "pendiente" }) {
  const config = CANDIDATES_STATUS_CONFIG[status];

  const [cargoFilter, setCargoFilter] = useState(
    FILTER_CONSTANTS.DEFAULT_CARGO
  );
  const [ordenFilter, setOrdenFilter] = useState(
    FILTER_CONSTANTS.DEFAULT_ORDER
  );
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useCandidates({
    page: currentPage,
    limit: FILTER_CONSTANTS.ITEMS_PER_PAGE,
    order: ordenFilter,
    cargo: cargoFilter,
    status,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [cargoFilter, ordenFilter]);

  const handleCargoChange = (newCargo) => {
    setCargoFilter(newCargo);
  };

  const handleOrdenChange = (newOrden) => {
    setOrdenFilter(newOrden);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AdminLayout>
      <Filters
        cargoFilter={cargoFilter}
        ordenFilter={ordenFilter}
        onCargoChange={handleCargoChange}
        onOrdenChange={handleOrdenChange}
        positions={POSITIONS}
      />
      <CandidatesTable
        candidates={data?.data}
        isLoading={isLoading}
        isError={isError}
        currentPage={currentPage}
        metadata={data?.metadatos}
        onPageChange={handlePageChange}
        config={config}
      />
    </AdminLayout>
  );
}

// Página de pendientes
export default function AdminHomePage() {
  return <CandidatesListView status="pendiente" />;
}
