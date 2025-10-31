import { useQuery } from "@tanstack/react-query";
import { candidatesApi } from "../api/candidatesApi";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { STALE_TIME } from "@/lib/react-query/cache";

export function useCandidates({
  page,
  limit,
  order,
  cargo,
  status = "pendiente",
}) {
  return useQuery({
    queryKey: queryKeys.candidates.list({ page, limit, order, cargo, status }),
    queryFn: () =>
      candidatesApi.getCandidates({
        page,
        limit,
        order,
        cargo,
        status,
      }),
    staleTime: STALE_TIME,
    keepPreviousData: true,
  });
}
