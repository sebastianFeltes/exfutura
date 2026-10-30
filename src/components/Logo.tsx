import { useReducedMotion } from "../lib/motion.ts";
import { content } from "../content.ts";

type Props = {
  variant?: "horizontal" | "isotipo" | "monocromo";
  fondo?: "noche" | "claro";
};

export function Logo({ variant = "horizontal", fondo = "claro" }: Props) {
  const reducido = useReducedMotion();
  const monocromo = variant === "monocromo";
  const trazo = monocromo ? "text-current" : fondo === "noche" ? "text-acento" : "text-noche";
  const palabra = monocromo ? "text-current" : fondo === "noche" ? "text-fondo" : "text-noche";

  return (
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 32 32" className={`h-8 w-8 shrink-0 ${trazo}`} aria-hidden="true">
        <path
          d="M2.5 7 L12.5 25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="square"
        />
        <path
          d="M2.5 25 L5.7 19.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="square"
        />
        <path
          d="M9.3 12.8 L12.5 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="square"
          pathLength={1}
          className={reducido ? undefined : "logo-abertura"}
        />
        <path
          d="M28.5 7 H17.5 V25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M17.5 16 H24.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="square"
        />
      </svg>
      {variant !== "isotipo" ? <span className={`marca ${palabra}`}>{content.marca}</span> : null}
    </span>
  );
}
