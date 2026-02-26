import { useActor } from "./useActor";

export function useBackend() {
  const { actor } = useActor();

  if (!actor) {
    throw new Error("Actor not available");
  }

  return actor;
}
