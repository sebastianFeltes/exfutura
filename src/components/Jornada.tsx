import { content } from "../content.ts";
import { Etiqueta } from "./Etiqueta.tsx";
import { LogoFondo } from "./Logo.tsx";
import { Foto } from "./Foto.tsx";
import { Icono } from "./Icono.tsx";
import { Numero } from "./Numero.tsx";
import { Reveal } from "./Reveal.tsx";

export function Jornada() {
  const { jornada } = content;

  return (
    <section id="jornada" className="seccion fondo-ibelick on-noche con-grano" aria-labelledby="titulo-jornada">
      <LogoFondo variant="light" />
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
                <p className="dato-linea">
                  {"prefijo" in dato && dato.prefijo ? <span className="dato-prefijo">{dato.prefijo} </span> : null}
                  <span className="dato-unidad">{dato.unidad}</span>
                </p>
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
            <Foto
              archivo={jornada.imagen}
              alt={jornada.alt}
              width={jornada.ancho}
              height={jornada.alto}
              className="jornada-foto"
            />
          </div>
          <p className="destacado">{jornada.destacado}</p>
        </div>
      </Reveal>
    </section>
  );
}
