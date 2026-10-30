import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "../lib/motion.ts";

type Props = {
  children: ReactNode;
};

export function Reveal({ children }: Props) {
  const reducido = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducido) return;
    const elemento = ref.current;
    if (!elemento || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((entrada) => entrada.isIntersecting)) {
          setVisible(true);
          observador.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [reducido]);

  if (reducido) return <div>{children}</div>;

  return (
    <div ref={ref} data-animated="true" className={visible ? "reveal revelado" : "reveal"}>
      {children}
    </div>
  );
}
