import { content } from "../content.ts";
import { Escribinos } from "./Escribinos.tsx";
import { Etiqueta } from "./Etiqueta.tsx";
import { Reveal } from "./Reveal.tsx";

export function Jornada() {
  return (
    <section id="jornada" className="seccion" aria-labelledby="titulo-jornada">
      <Reveal>
        <div className="contenedor">
          <Etiqueta>{content.jornada.etiqueta}</Etiqueta>
          <h2 id="titulo-jornada" className="titulo">
            {content.jornada.titulo}
          </h2>
          <p className="bajada">{content.jornada.bajada}</p>
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
            <div className="tarjeta-jornada lg:order-2">
              <ul>
                {content.jornada.datos.map((dato) => (
                  <li key={dato} className={dato.startsWith("ARS") ? "dato-precio" : "dato"}>
                    {dato}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:order-1">
              <h3 className="subtitulo">{content.jornada.llevanTitulo}</h3>
              <ul className="mt-4 flex flex-col gap-3 border-l border-borde pl-4">
                {content.jornada.llevan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-8">
                <Escribinos />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
