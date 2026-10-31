import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "../lib/motion.ts";

type V4 = [number, number, number, number];

const VERTICES: V4[] = Array.from({ length: 16 }, (_, indice) => [
  indice & 1 ? 1 : -1,
  indice & 2 ? 1 : -1,
  indice & 4 ? 1 : -1,
  indice & 8 ? 1 : -1,
]);

const ARISTAS: Array<[number, number]> = [];

for (let origen = 0; origen < VERTICES.length; origen += 1) {
  for (let destino = origen + 1; destino < VERTICES.length; destino += 1) {
    const a = VERTICES[origen];
    const b = VERTICES[destino];
    const cambios =
      (a[0] !== b[0] ? 1 : 0) +
      (a[1] !== b[1] ? 1 : 0) +
      (a[2] !== b[2] ? 1 : 0) +
      (a[3] !== b[3] ? 1 : 0);
    if (cambios === 1) ARISTAS.push([origen, destino]);
  }
}

const ANGULO_QUIETO = 0.72;

function proyectar(vertice: V4, angulo: number) {
  const [x, y, z, w] = vertice;
  const c1 = Math.cos(angulo);
  const s1 = Math.sin(angulo);
  const c2 = Math.cos(angulo * 0.63);
  const s2 = Math.sin(angulo * 0.63);
  const x1 = x * c1 - w * s1;
  const w1 = x * s1 + w * c1;
  const y1 = y * c2 - z * s2;
  const z1 = y * s2 + z * c2;
  const escalaW = 3.1 / (3.1 - w1);
  const x2 = x1 * escalaW;
  const y2 = y1 * escalaW;
  const z2 = z1 * escalaW;
  const escalaZ = 4.2 / (4.2 - z2);

  return {
    x: 100 + x2 * escalaZ * 34,
    y: 100 + y2 * escalaZ * 34,
    z: z2,
  };
}

export function Teseracto() {
  const reducido = useReducedMotion();
  const lineas = useRef<Array<SVGLineElement | null>>([]);

  useLayoutEffect(() => {
    const dibujar = (angulo: number) => {
      const puntos = VERTICES.map((vertice) => proyectar(vertice, angulo));
      let cerca = -Infinity;
      let lejos = Infinity;
      for (const punto of puntos) {
        cerca = Math.max(cerca, punto.z);
        lejos = Math.min(lejos, punto.z);
      }
      const rango = cerca - lejos || 1;

      ARISTAS.forEach(([origen, destino], indice) => {
        const linea = lineas.current[indice];
        const a = puntos[origen];
        const b = puntos[destino];
        if (!linea || !a || !b) return;
        const profundidad = ((a.z + b.z) / 2 - lejos) / rango;
        linea.setAttribute("x1", a.x.toFixed(2));
        linea.setAttribute("y1", a.y.toFixed(2));
        linea.setAttribute("x2", b.x.toFixed(2));
        linea.setAttribute("y2", b.y.toFixed(2));
        linea.setAttribute("stroke-opacity", (0.34 + profundidad * 0.66).toFixed(3));
      });
    };

    if (reducido || typeof requestAnimationFrame !== "function") {
      dibujar(ANGULO_QUIETO);
      return;
    }

    let cuadro = 0;
    const inicio = performance.now();
    const loop = (ahora: number) => {
      dibujar(ANGULO_QUIETO + (ahora - inicio) / 5200);
      cuadro = requestAnimationFrame(loop);
    };
    cuadro = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(cuadro);
  }, [reducido]);

  return (
    <svg className="teseracto" viewBox="0 0 200 200" aria-hidden="true">
      {ARISTAS.map(([origen, destino], indice) => (
        <line
          key={`${origen}-${destino}`}
          ref={(nodo) => {
            lineas.current[indice] = nodo;
          }}
          stroke="#14B8A6"
          strokeWidth="1.35"
          strokeLinecap="square"
        />
      ))}
    </svg>
  );
}
