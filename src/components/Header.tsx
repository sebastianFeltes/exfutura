import { useEffect, useState } from "react";
import { content } from "../content.ts";
import { Logo } from "./Logo.tsx";

export function Header() {
  const [abierto, setAbierto] = useState(false);
  const [activa, setActiva] = useState("");
  const [scrolled, setScrolled] = useState(false);

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
    function alScroll() {
      setScrolled(window.scrollY > 8);
    }
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  useEffect(() => {
    if (!abierto) return;
    function cerrar(evento: KeyboardEvent) {
      if (evento.key === "Escape") setAbierto(false);
    }
    document.addEventListener("keydown", cerrar);
    return () => document.removeEventListener("keydown", cerrar);
  }, [abierto]);

  const solido = scrolled || abierto;

  return (
    <header className={solido ? "header header-scroll on-noche" : "header on-noche"}>
      <div className="contenedor flex min-h-16 items-center gap-3 py-2">
        <a href="#inicio" aria-label={content.inicio} className="rounded-full">
          <Logo variant="light" />
        </a>
        <nav id="menu-principal" aria-label={content.menuPrincipal} className={abierto ? "menu abierto" : "menu"}>
          <ul className="flex flex-col items-start gap-2 min-[1100px]:flex-row min-[1100px]:items-center min-[1100px]:justify-end">
            {content.nav.map((item) => {
              const contacto = item.id === "contacto";
              const clase = [
                "nav-link",
                contacto ? "nav-contacto" : "",
                !contacto && activa === item.id ? "nav-link-activa" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={activa === item.id ? "location" : undefined}
                    className={clase}
                    onClick={() => setAbierto(false)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
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
      </div>
    </header>
  );
}
