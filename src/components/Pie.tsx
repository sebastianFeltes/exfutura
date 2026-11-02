import Mail from "lucide-react/icons/mail";
import MapPin from "lucide-react/icons/map-pin";
import { config } from "../config.ts";
import { content } from "../content.ts";
import { Formulario } from "./Formulario.tsx";

export function Pie() {
  const email = config.email.trim();
  const instagram = config.instagram.trim();
  const razon = config.razonSocial.trim();

  return (
    <footer id="contacto" className="pie on-noche" data-tema="noche" aria-labelledby="titulo-contacto">
      <div className="contenedor pie-cuerpo">
        <Formulario />
        <div className="pie-datos">
          <img
            src={`${import.meta.env.BASE_URL}logo/exfutura-icono.svg`}
            alt="Exfutura"
            width={64}
            height={64}
            className="logo-marca"
          />
          <p className="pie-dato">
            <MapPin aria-hidden="true" size={18} strokeWidth={1.5} />
            {content.pie.lugar}
          </p>
          {email ? (
            <a className="enlace pie-dato" href={`mailto:${email}`}>
              <Mail aria-hidden="true" size={18} strokeWidth={1.5} />
              {email}
            </a>
          ) : null}
          {instagram ? (
            <a
              className="enlace pie-dato"
              href={instagram}
              rel="noopener noreferrer"
              target="_blank"
              aria-label={`Instagram, ${content.pie.instagram}`}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
              </svg>
              {content.pie.instagram}
            </a>
          ) : null}
          <p className="pie-dato">{content.pie.desarrollo}</p>
          <p className="pie-dato">
            {content.pie.derechos}
            {razon ? ` ${razon}` : null}
          </p>
        </div>
      </div>
    </footer>
  );
}
