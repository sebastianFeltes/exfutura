import { config } from "../config.ts";

export const llamadaAsunto = "Llamada de 15 minutos · Jornada IA segura";

export const llamadaCuerpo =
  "Hola, quiero coordinar una llamada de 15 minutos sobre la jornada de IA segura. Somos [empresa], [cantidad] personas.";

const consultaAsunto = "Consulta · Jornada IA segura";

export function mailtoLlamada(): string {
  if (!config.email.trim()) return "";
  return `mailto:${config.email}?subject=${encodeURIComponent(llamadaAsunto)}&body=${encodeURIComponent(llamadaCuerpo)}`;
}

export function mailtoConsulta(cuerpo: string): string {
  if (!config.email.trim()) return "";
  return `mailto:${config.email}?subject=${encodeURIComponent(consultaAsunto)}&body=${encodeURIComponent(cuerpo)}`;
}
