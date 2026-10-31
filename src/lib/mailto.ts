import { config } from "../config.ts";

export const jornadaAsunto = "Jornada de seguridad e IA";

export function mailtoJornada(cuerpo: string): string {
  if (!config.email.trim()) return "";
  return `mailto:${config.email}?subject=${encodeURIComponent(jornadaAsunto)}&body=${encodeURIComponent(cuerpo)}`;
}
