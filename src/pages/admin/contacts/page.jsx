import { QueryClientProvider } from "@tanstack/react-query";
import { CandidatesListView } from "../Adminhome/page";
import { queryClient } from "../Adminhome/config/queryClient";

export default function AdminContactedPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <CandidatesListView status="contacto" endpoint="contactos" />
    </QueryClientProvider>
  );
}
