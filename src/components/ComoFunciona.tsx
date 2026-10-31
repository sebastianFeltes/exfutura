import { content } from "../content.ts";
import { Etiqueta } from "./Etiqueta.tsx";
import { LogoFondo } from "./Logo.tsx";
import { Reveal } from "./Reveal.tsx";

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="seccion fondo-ibelick-blanco" aria-labelledby="titulo-pasos">
      <LogoFondo variant="dark" />
      <Reveal>
        <div className="contenedor">
          <Etiqueta>{content.pasos.etiqueta}</Etiqueta>
          <h2 id="titulo-pasos" className="titulo">
            {content.pasos.titulo}
          </h2>
          <ol className="pasos cascada">
            {content.pasos.items.map((paso) => (
              <li key={paso.numero}>
                <p className="paso-numero">{paso.numero}</p>
                <h3 className="subtitulo">{paso.titulo}</h3>
                <p className="medida">{paso.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
