import { useEffect, useState } from "react";
import { content } from "../content.ts";
import { Escribinos } from "./Escribinos.tsx";
import { Logo } from "./Logo.tsx";

export function Header() {
  const [abierto, setAbierto] = useState(false);
  const [activa, setActiva] = useState("");

  useEffect(() => {
    const nodos = content.nav
      .map((item) => document.getElementById(item.id))
      .filter((nodo): nodo is HTMLElement => nodo instanceof HTMLElement);
    if (nodos.length === 0 || typeof IntersectionObserver === "undefined") return;
    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((entrada) => entrada.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiva(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    nodos.forEach((nodo) => observador.observe(nodo));
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    if (!abierto) return;
    function cerrar(evento: KeyboardEvent) {
      if (evento.key === "Escape") setAbierto(false);
    }
    document.addEventListener("keydown", cerrar);
    return () => document.removeEventListener("keydown", cerrar);
  }, [abierto]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-borde bg-superficie">
      <div className="contenedor flex h-16 items-center gap-3">
        <a href="#contenido" aria-label={content.inicio} className="rounded-[8px]">
          <span aria-hidden="true">
            <Logo variant="horizontal" fondo="claro" />
          </span>
        </a>
        <nav
          id="menu-principal"
          aria-label={content.menuPrincipal}
          className={abierto ? "menu abierto" : "menu"}
        >
          <ul className="flex flex-col gap-1 min-[1100px]:flex-row min-[1100px]:items-center min-[1100px]:justify-end">
            {content.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={activa === item.id ? "location" : undefined}
                  className={activa === item.id ? "nav-link nav-link-activa" : "nav-link"}
                  onClick={() => setAbierto(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="menu-cta">
              <Escribinos />
            </li>
          </ul>
        </nav>
        <button
          type="button"
          className="menu-boton"
          aria-expanded={abierto}
          aria-controls="menu-principal"
          onClick={() => setAbierto((valor) => !valor)}
        >
          <span className="sr-only">{abierto ? content.menuCerrar : content.menuAbrir}</span>
          <span className="menu-barras" aria-hidden="true" />
        </button>
        <div className="cta-escritorio">
          <Escribinos />
        </div>
      </div>
    </header>
  );
}
