import { useReducedMotion } from "../lib/motion.ts";

type Props = {
  variant?: "dark" | "light";
};

export function LogoFondo({ variant = "light" }: Props) {
  const reducido = useReducedMotion();

  return (
    <div className={reducido ? "logo-fondo" : "logo-fondo logo-fondo-anim"} aria-hidden="true">
      <Logo variant={variant} />
    </div>
  );
}

export function Logo({ variant = "dark" }: Props) {
  if (__LOGO__) {
    return (
      <img
        src={`${import.meta.env.BASE_URL}logo/${__LOGO__}`}
        alt=""
        width={160}
        height={32}
        className="logo-archivo"
      />
    );
  }

  const resto = variant === "light" ? "text-fondo" : "text-noche";

  return (
    <span className={`marca ${resto}`}>
      e<span className="text-acento">x</span>futura
    </span>
  );
}
