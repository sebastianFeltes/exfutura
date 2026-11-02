type Props = {
  variant?: "dark" | "light";
};

export function Logo({ variant = "dark" }: Props) {
  const archivo = variant === "light" ? "exfutura-claro.svg" : "exfutura.svg";

  return (
    <img
      src={`${import.meta.env.BASE_URL}logo/${archivo}`}
      alt=""
      width={176}
      height={32}
      className="logo-archivo"
    />
  );
}
