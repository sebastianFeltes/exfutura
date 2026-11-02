import { config } from "../config.ts";
import { content } from "../content.ts";
import { Etiqueta } from "./Etiqueta.tsx";
import { Reveal } from "./Reveal.tsx";

export function Quien() {
  const foto = config.fotoSebastian.trim();
  const formacion = config.formacion.trim();
  const hayFoto = Boolean(foto) && __IMAGENES__["sebastian.webp"] === true;
  const { quien } = content;

  return (
    <section id="quien" className="seccion fondo-ibelick-blanco" data-tema="claro" aria-labelledby="titulo-quien">
      <Reveal>
        <div className="contenedor quien">
          {hayFoto ? (
            <img
              src={`${import.meta.env.BASE_URL}${foto.replace(/^\//, "")}`}
              alt={quien.altFoto}
              width={800}
              height={800}
              className="foto-perfil"
            />
          ) : (
            <span className="monograma" aria-hidden="true">
              {quien.monograma}
            </span>
          )}
          <div>
            <Etiqueta>{quien.etiqueta}</Etiqueta>
            <h2 id="titulo-quien" className="titulo">
              {quien.titulo}
            </h2>
            <p className="medida mt-4">{quien.texto}</p>
            {formacion ? <p className="medida mt-4">{formacion}</p> : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
