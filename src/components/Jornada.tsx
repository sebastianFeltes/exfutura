import { content } from "../content.ts";
import { Etiqueta } from "./Etiqueta.tsx";
import { Foto } from "./Foto.tsx";
import { Icono } from "./Icono.tsx";
import { Numero } from "./Numero.tsx";
import { Reveal } from "./Reveal.tsx";

export function Jornada() {
  const { jornada } = content;
  const hayFoto = __IMAGENES__[jornada.imagen] === true;

  return (
    <section id="jornada" className="seccion fondo-ibelick on-noche con-grano" data-tema="noche" aria-labelledby="titulo-jornada">
      <Reveal>
        <div className="contenedor">
          <Etiqueta noche>{jornada.etiqueta}</Etiqueta>
          <h2 id="titulo-jornada" className="titulo titulo-noche">
            {jornada.titulo}
          </h2>
          <div className="franja">
            {jornada.datos.map((dato) => (
              <div key={dato.unidad} className="dato-grande">
                <Numero valor={dato.valor} />
                <p className="dato-unidad">{dato.unidad}</p>
                {dato.detalle ? <p className="dato-detalle">{dato.detalle}</p> : null}
              </div>
            ))}
          </div>
          <div className="jornada-cuerpo">
            <div>
              <h3 className="subtitulo subtitulo-noche">{jornada.llevanTitulo}</h3>
              <ul className="llevan cascada">
                {jornada.llevan.map((item) => (
                  <li key={item.texto}>
                    <span className="icono-caja icono-noche">
                      <Icono nombre={item.icono} />
                    </span>
                    <p>{item.texto}</p>
                  </li>
                ))}
              </ul>
            </div>
            {hayFoto ? (
              <Foto
                archivo={jornada.imagen}
                alt={jornada.alt}
                width={jornada.ancho}
                height={jornada.alto}
                fallback={false}
                className="jornada-foto"
              />
            ) : null}
          </div>
          <p className="destacado">{jornada.destacado}</p>
        </div>
      </Reveal>
    </section>
  );
}
