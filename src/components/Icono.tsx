import type { ComponentType, SVGProps } from "react";
import type { Icono as Nombre } from "../content.ts";
import FileWarning from "lucide-react/icons/file-warning";
import KeyRound from "lucide-react/icons/key-round";
import MailWarning from "lucide-react/icons/mail-warning";
import PackageX from "lucide-react/icons/package-x";
import Sparkles from "lucide-react/icons/sparkles";

type IconoComponente = ComponentType<SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>;

const iconos: Record<Nombre, IconoComponente> = {
  "mail-warning": MailWarning,
  "file-warning": FileWarning,
  "package-x": PackageX,
  "key-round": KeyRound,
  sparkles: Sparkles,
};

type Props = {
  nombre: Nombre;
};

export function Icono({ nombre }: Props) {
  const Dibujo = iconos[nombre];
  return <Dibujo aria-hidden="true" size={22} strokeWidth={1.5} />;
}
