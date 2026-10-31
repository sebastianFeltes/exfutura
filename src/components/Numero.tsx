import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../lib/motion.ts";

type Props = {
  valor: number;
};

export function Numero({ valor }: Props) {
  const reducido = useReducedMotion();
  const [actual, setActual] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hecho = useRef(false);

  useEffect(() => {
    if (reducido) return;
    const nodo = ref.current;
    if (!nodo || typeof IntersectionObserver === "undefined") {
      setActual(valor);
      return;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((entrada) => entrada.isIntersecting) || hecho.current) return;
        hecho.current = true;
        observador.disconnect();
        const inicio = performance.now();
        const paso = (ahora: number) => {
          const avance = Math.min(1, (ahora - inicio) / 800);
          const curva = 1 - (1 - avance) ** 3;
          setActual(Math.round(curva * valor));
          if (avance < 1) requestAnimationFrame(paso);
        };
        requestAnimationFrame(paso);
      },
      { threshold: 0.6 },
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, [reducido, valor]);

  return (
    <span ref={ref} className="numero">
      {reducido ? valor : actual}
    </span>
  );
}
