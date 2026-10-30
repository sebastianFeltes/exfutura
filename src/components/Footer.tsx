import { config } from "../config.ts";
import { content } from "../content.ts";
import { Logo } from "./Logo.tsx";

export function Footer() {
  const email = config.email.trim();
  const razon = config.razonSocial.trim();

  return (
    <footer className="pie on-noche">
      <div className="contenedor seccion">
        <div aria-hidden="true">
          <Logo variant="horizontal" fondo="noche" />
        </div>
        <p className="mt-6 text-[17px] leading-7">
          {content.marca} · {content.pie.lugar}
          {email ? (
            <>
              {" · "}
              <a className="enlace" href={`mailto:${email}`}>
                {email}
              </a>
            </>
          ) : null}
        </p>
        <p className="mt-2 text-[16px] leading-6">
          {content.pie.derechos}
          {razon ? ` ${razon}` : null}
        </p>
      </div>
    </footer>
  );
}
