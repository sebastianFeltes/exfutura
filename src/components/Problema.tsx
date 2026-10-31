import { content } from "../content.ts";
import { Etiqueta } from "./Etiqueta.tsx";
import { LogoFondo } from "./Logo.tsx";
import { Reveal } from "./Reveal.tsx";

export function Problema() {
  return (
    <section id="problema" className="seccion fondo-ibelick-claro" aria-labelledby="titulo-problema">
      <LogoFondo variant="dark" />
      <Reveal>
        <div className="contenedor">
          <Etiqueta>{content.problema.etiqueta}</Etiqueta>
          <h2 id="titulo-problema" className="titulo">
            {content.problema.titulo}
          </h2>
          <ul className="problemas cascada">
            {content.problema.items.map((item) => (
              <li key={item.numero} className="tarjeta tarjeta-problema">
                <span className="numero-fondo" aria-hidden="true">
                  {item.numero}
                </span>
                <h3 className="subtitulo">{item.titulo}</h3>
                <p className="medida">{item.texto}</p>
              </li>
            ))}
          </ul>
          <p className="cierre">{content.problema.cierre}</p>
        </div>
      </Reveal>
    </section>
  );
}
