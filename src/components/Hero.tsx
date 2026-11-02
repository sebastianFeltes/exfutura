import { content } from "../content.ts";
import { Etiqueta } from "./Etiqueta.tsx";
import { Foto } from "./Foto.tsx";
import HeroX from "./HeroX.tsx";

export function Hero() {
  const { hero, cta, verJornada } = content;

  return (
    <section id="inicio" className="hero on-noche con-grano fondo-ibelick" data-tema="noche" aria-labelledby="titulo-hero">
      {__IMAGENES__[hero.imagen] ? (
        <>
          <Foto
            archivo={hero.imagen}
            alt={hero.alt}
            width={1600}
            height={1000}
            priority
            fallback={false}
            className="hero-fondo"
          />
          <div className="hero-velo" aria-hidden="true" />
        </>
      ) : null}
      <div className="contenedor hero-contenido">
        <HeroX />
        <div className="hero-copia">
          <Etiqueta noche>{hero.etiqueta}</Etiqueta>
          <h1 id="titulo-hero" className="titulo-hero">
            {hero.titulo.map((parte) =>
              parte.acento ? (
                <span key={parte.texto} className="degradado">
                  {parte.texto}
                </span>
              ) : (
                <span key={parte.texto}>{parte.texto}</span>
              ),
            )}
          </h1>
          <p className="bajada bajada-noche">{hero.bajada}</p>
          <div className="acciones">
            <a className="btn btn-siempre btn-primario" href="#contacto">
              {cta}
            </a>
            <a className="enlace-texto" href="#jornada">
              {verJornada}
            </a>
          </div>
          <p className="hero-nota">{hero.nota}</p>
        </div>
      </div>
    </section>
  );
}
