import { content } from "../content.ts";
import { Etiqueta } from "./Etiqueta.tsx";
import { Reveal } from "./Reveal.tsx";

export function Preguntas() {
  return (
    <section id="preguntas" className="seccion" aria-labelledby="titulo-preguntas">
      <Reveal>
        <div className="contenedor">
          <Etiqueta>{content.preguntas.etiqueta}</Etiqueta>
          <h2 id="titulo-preguntas" className="titulo">
            {content.preguntas.titulo}
          </h2>
          <div className="mt-8 border-t border-borde">
            {content.preguntas.items.map((item) => (
              <details key={item.pregunta} className="faq" name="faq">
                <summary>{item.pregunta}</summary>
                <p>{item.respuesta}</p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
