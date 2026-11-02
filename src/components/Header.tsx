import { useEffect, useState } from "react";
import { content } from "../content.ts";
import { Logo } from "./Logo.tsx";

export function Header() {
  const [abierto, setAbierto] = useState(false);
  const [activa, setActiva] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [clara, setClara] = useState(false);

  useEffect(() => {
    function alScroll() {
      setScrolled(window.scrollY > 8);
      const marca = 72;
      let tema = "noche";
      for (const nodo of document.querySelectorAll<HTMLElement>("[data-tema]")) {
        const caja = nodo.getBoundingClientRect();
        if (caja.top <= marca && caja.bottom > marca) {
          tema = nodo.dataset.tema ?? "noche";
          break;
        }
      }
      setClara(tema === "claro");

      const ancla = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
      const marcaSeccion = (Number.isFinite(ancla) ? ancla : 88) + 12;
      let seccion = "";
      for (const item of content.nav) {
        const nodo = document.getElementById(item.id);
        if (!nodo) continue;
        const caja = nodo.getBoundingClientRect();
        if (caja.height > 0 && caja.top <= marcaSeccion) seccion = item.id;
      }
      setActiva(seccion);
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
  let headerClase = "header on-noche";
  if (clara) headerClase = "header header-claro";
  else if (solido) headerClase = "header header-scroll on-noche";

  return (
    <header className={headerClase}>
      <div className="contenedor flex min-h-16 items-center gap-3 py-2">
        <a href="#inicio" aria-label={content.inicio} className="rounded-full">
          <Logo variant={clara ? "dark" : "light"} />
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
