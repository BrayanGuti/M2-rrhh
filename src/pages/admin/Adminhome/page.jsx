import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { AdminLayout } from "../layout/Layout";
import { Filters } from "./components/Filters";
import { PendingCandidatesList } from "./components/CandidatesTable";
import { useCandidates } from "./hooks/useCandidates";
import { FILTER_CONSTANTS } from "./constants/filters";
import { POSITIONS } from "../../../const/Positions";
import { queryClient } from "./config/queryClient";

export function CandidatesListView({
  status = "pendiente",
  endpoint = "pendientes",
}) {
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
    endpoint,
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
      <PendingCandidatesList
        candidates={data?.data}
        isLoading={isLoading}
        isError={isError}
        currentPage={currentPage}
        metadata={data?.metadatos}
        onPageChange={handlePageChange}
      />
    </AdminLayout>
  );
}

// Página de pendientes
export default function AdminHomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <CandidatesListView status="pendiente" endpoint="pendientes" />
    </QueryClientProvider>
  );
}
