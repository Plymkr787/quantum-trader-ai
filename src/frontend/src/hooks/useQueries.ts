import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { PredictionResult, HistoryRecord, HealthStatus } from "../backend.d";

export function useGetHealth() {
  const { actor, isFetching } = useActor();
  return useQuery<HealthStatus>({
    queryKey: ["health"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getHealth();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetPredictionHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<HistoryRecord[]>({
    queryKey: ["predictionHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPredictionHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSupportedSymbols() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["supportedSymbols"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSupportedSymbols();
    },
    enabled: !!actor && !isFetching,
    staleTime: Infinity,
  });
}

export function usePredict() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<PredictionResult, Error, { symbol: string; timeframe: string }>({
    mutationFn: async ({ symbol, timeframe }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.predict(symbol, timeframe);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["predictionHistory"] });
      queryClient.invalidateQueries({ queryKey: ["health"] });
    },
  });
}

export function useClearHistory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.clearHistory();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["predictionHistory"] });
      queryClient.invalidateQueries({ queryKey: ["health"] });
    },
  });
}
