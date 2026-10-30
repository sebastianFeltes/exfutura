import { content } from "../content.ts";
import { Etiqueta } from "./Etiqueta.tsx";
import { Icono } from "./Icono.tsx";
import { Reveal } from "./Reveal.tsx";

export function Servicios() {
  return (
    <section id="servicios" className="seccion" aria-labelledby="titulo-servicios">
      <Reveal>
        <div className="contenedor">
          <Etiqueta>{content.servicios.etiqueta}</Etiqueta>
          <h2 id="titulo-servicios" className="titulo">
            {content.servicios.titulo}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {content.servicios.items.map((servicio, indice) => (
              <li
                key={servicio.titulo}
                className={`tarjeta p-6 ${indice < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
              >
                <Icono nombre={servicio.icono} />
                <h3 className="subtitulo mt-4">{servicio.titulo}</h3>
                <p className="mt-2">{servicio.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
