import { useState } from "react";
import { content } from "../content.ts";
import { Etiqueta } from "./Etiqueta.tsx";
import { Reveal } from "./Reveal.tsx";

type Caso = (typeof content.casos.items)[number];

function Marco({ caso }: { caso: Caso }) {
  const [visible, setVisible] = useState(__CASO_IMAGEN__);
  const src = `${import.meta.env.BASE_URL}casos/${caso.archivo}`;

  return (
    <figure className="overflow-hidden rounded-[8px] border border-borde bg-borde shadow-suave">
      <figcaption className="flex items-center gap-2 px-3 py-2">
        <span aria-hidden="true" className="flex gap-1">
          <span className="size-2 rounded-full bg-texto-suave" />
          <span className="size-2 rounded-full bg-texto-suave" />
          <span className="size-2 rounded-full bg-texto-suave" />
        </span>
        <span className="font-mono text-[13px] tracking-[0.08em] text-noche uppercase">{caso.nombre}</span>
      </figcaption>
      <div className="relative aspect-video bg-superficie">
        {visible ? (
          <img
            src={src}
            alt={caso.alt}
            width={1280}
            height={720}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
            onError={() => setVisible(false)}
          />
        ) : (
          <p className="absolute inset-0 flex items-center justify-center px-6 text-center">
            {caso.nombre}
          </p>
        )}
      </div>
    </figure>
  );
}

export function Casos() {
  return (
    <section id="casos" className="seccion" aria-labelledby="titulo-casos">
      <Reveal>
        <div className="contenedor">
          <Etiqueta>{content.casos.etiqueta}</Etiqueta>
          <h2 id="titulo-casos" className="titulo">
            {content.casos.titulo}
          </h2>
          <ul className="mt-10 grid gap-10">
            {content.casos.items.map((caso) => (
              <li key={caso.id} className="grid items-center gap-6 lg:grid-cols-2">
                <Marco caso={caso} />
                <div>
                  <h3 className="subtitulo">{caso.nombre}</h3>
                  <p className="mt-3">{caso.descripcion}</p>
                  {caso.url.trim() ? (
                    <a
                      className="enlace mt-4 inline-block"
                      href={caso.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {caso.enlace}
                      <span className="sr-only"> {caso.ventana}</span>
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
