// @/lib/react-query/queryClient.js

import { QueryClient } from "@tanstack/react-query";
import { STALE_TIME, CACHE_DURATION } from "./cache";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME, // 5 minutos
      cacheTime: CACHE_DURATION, // 10 minutos (deprecated en v5, usar gcTime)
      gcTime: CACHE_DURATION, // Para React Query v5+
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: (failureCount, error) => {
        // No reintentar en errores 4xx
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => {
        // Backoff exponencial: 1s, 2s, 4s, 8s, 16s, máximo 30s
        return Math.min(1000 * 2 ** attemptIndex, 30000);
      },
    },
    mutations: {
      retry: false, // Las mutaciones no se reintentan por defecto
    },
  },
});
