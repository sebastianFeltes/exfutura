import { useSyncExternalStore } from "react";

const consulta = "(prefers-reduced-motion: reduce)";

function reducidoAhora(): boolean {
  if (typeof window.matchMedia !== "function") return false;
  return window.matchMedia(consulta).matches;
}

function suscribir(callback: () => void) {
  const media = window.matchMedia(consulta);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(suscribir, reducidoAhora, () => false);
}
