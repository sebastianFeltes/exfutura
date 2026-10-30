type Props = {
  children: string;
  noche?: boolean;
};

export function Etiqueta({ children, noche = false }: Props) {
  return <p className={noche ? "etiqueta etiqueta-noche" : "etiqueta"}>{children}</p>;
}
