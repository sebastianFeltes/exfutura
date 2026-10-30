import { content } from "../content.ts";
import { mailtoLlamada } from "../lib/mailto.ts";

type Props = {
  bloque?: boolean;
};

export function Escribinos({ bloque = false }: Props) {
  const href = mailtoLlamada();
  if (!href) return null;
  return (
    <a className={`btn btn-primario ${bloque ? "btn-bloque" : "btn-siempre"}`} href={href}>
      {content.cta}
    </a>
  );
}
