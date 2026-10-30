import { content } from "../content.ts";
import { Etiqueta } from "./Etiqueta.tsx";
import { Icono } from "./Icono.tsx";
import { Reveal } from "./Reveal.tsx";

export function Problema() {
  return (
    <section id="problema" className="seccion" aria-labelledby="titulo-problema">
      <Reveal>
        <div className="contenedor">
          <Etiqueta>{content.problema.etiqueta}</Etiqueta>
          <h2 id="titulo-problema" className="titulo">
            {content.problema.titulo}
          </h2>
          <p className="bajada">{content.problema.bajada}</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {content.problema.rubros.map((rubro) => (
              <li key={rubro.titulo} className="tarjeta p-6">
                <Icono nombre={rubro.icono} />
                <h3 className="subtitulo mt-4">{rubro.titulo}</h3>
                <p className="mt-2">{rubro.texto}</p>
              </li>
            ))}
          </ul>
          <p role="note" className="aviso-riesgo mt-8">
            {content.problema.cierre}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
