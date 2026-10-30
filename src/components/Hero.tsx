import { content } from "../content.ts";
import { Escribinos } from "./Escribinos.tsx";
import { Etiqueta } from "./Etiqueta.tsx";

export function Hero() {
  return (
    <section className="hero on-noche" aria-labelledby="titulo-hero">
      <div className="contenedor">
        <Etiqueta noche>{content.hero.etiqueta}</Etiqueta>
        <h1 id="titulo-hero" className="titulo-hero">
          {content.hero.titulo}
        </h1>
        <p className="bajada bajada-noche">{content.hero.bajada}</p>
        <div className="acciones">
          <Escribinos />
          <a className="btn btn-siempre btn-secundario btn-secundario-noche" href="#jornada">
            {content.verJornada}
          </a>
        </div>
        <p className="mt-4 text-[16px] leading-6 text-fondo">{content.hero.compromiso}</p>
      </div>
    </section>
  );
}
