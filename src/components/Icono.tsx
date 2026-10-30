import type { ComponentType, SVGProps } from "react";
import type { Icono as Nombre } from "../content.ts";
import Calculator from "lucide-react/icons/calculator";
import ClipboardCheck from "lucide-react/icons/clipboard-check";
import CodeXml from "lucide-react/icons/code-xml";
import House from "lucide-react/icons/house";
import LockKeyhole from "lucide-react/icons/lock-keyhole";
import ShieldCheck from "lucide-react/icons/shield-check";
import Stethoscope from "lucide-react/icons/stethoscope";
import Store from "lucide-react/icons/store";
import Workflow from "lucide-react/icons/workflow";

type IconoComponente = ComponentType<SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>;

const iconos: Record<Nombre, IconoComponente> = {
  calculator: Calculator,
  house: House,
  stethoscope: Stethoscope,
  store: Store,
  "shield-check": ShieldCheck,
  "lock-keyhole": LockKeyhole,
  "clipboard-check": ClipboardCheck,
  workflow: Workflow,
  "code-xml": CodeXml,
};

type Props = {
  nombre: Nombre;
};

export function Icono({ nombre }: Props) {
  const Dibujo = iconos[nombre];
  return <Dibujo aria-hidden="true" size={24} strokeWidth={1.5} className="text-noche" />;
}
