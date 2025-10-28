import { useQuery } from "@tanstack/react-query";
import { candidatesApi } from "../api/candidatesApi";

export function useCandidates({
  page,
  limit,
  order,
  cargo,
  status = "pendiente",
}) {
  return useQuery({
    queryKey: ["candidates", page, limit, order, cargo, status],
    queryFn: () =>
      candidatesApi.getCandidates({
        page,
        limit,
        order,
        cargo,
        status,
      }),
  });
}
