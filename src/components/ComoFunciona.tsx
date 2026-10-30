import { content } from "../content.ts";
import { Etiqueta } from "./Etiqueta.tsx";
import { Reveal } from "./Reveal.tsx";

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="seccion" aria-labelledby="titulo-pasos">
      <Reveal>
        <div className="contenedor">
          <Etiqueta>{content.pasos.etiqueta}</Etiqueta>
          <h2 id="titulo-pasos" className="titulo">
            {content.pasos.titulo}
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {content.pasos.items.map((paso, indice) => (
              <li key={paso.titulo} className="border-t-2 border-acento pt-4">
                <p className="etiqueta">{String(indice + 1).padStart(2, "0")}</p>
                <h3 className="subtitulo">{paso.titulo}</h3>
                <p className="mt-2">{paso.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
