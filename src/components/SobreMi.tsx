import { config } from "../config.ts";
import { content } from "../content.ts";
import { Etiqueta } from "./Etiqueta.tsx";
import { Reveal } from "./Reveal.tsx";

export function SobreMi() {
  const foto = config.fotoSobreMi.trim();
  const formacion = config.formacion.trim();

  return (
    <section id="sobre-mi" className="seccion" aria-labelledby="titulo-sobre-mi">
      <Reveal>
        <div className="contenedor">
          <Etiqueta>{content.sobreMi.etiqueta}</Etiqueta>
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            {foto ? (
              <img
                src={foto}
                alt={content.sobreMi.altFoto}
                width={112}
                height={112}
                className="foto-perfil"
              />
            ) : (
              <span className="monograma" aria-hidden="true">
                {content.sobreMi.monograma}
              </span>
            )}
            <div>
              <h2 id="titulo-sobre-mi" className="titulo">
                {content.sobreMi.titulo}
              </h2>
              <p className="mt-4 max-w-3xl">{content.sobreMi.texto}</p>
              {formacion ? <p className="mt-4 max-w-3xl">{formacion}</p> : null}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
