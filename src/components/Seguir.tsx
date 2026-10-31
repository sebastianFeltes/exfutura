import { content } from "../content.ts";
import { Etiqueta } from "./Etiqueta.tsx";
import { LogoFondo } from "./Logo.tsx";
import { Reveal } from "./Reveal.tsx";

export function Seguir() {
  return (
    <section id="seguir" className="seccion fondo-ibelick-claro" aria-labelledby="titulo-seguir">
      <LogoFondo variant="dark" />
      <Reveal>
        <div className="contenedor">
          <Etiqueta>{content.seguir.etiqueta}</Etiqueta>
          <h2 id="titulo-seguir" className="titulo">
            {content.seguir.titulo}
          </h2>
          <ul className="seguir cascada">
            {content.seguir.items.map((item) => (
              <li key={item.titulo} className="tarjeta tarjeta-seguir">
                <p className="medida">
                  <strong>{item.titulo}</strong> {item.texto}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
