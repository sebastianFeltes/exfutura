import { useState } from "react";

type Props = {
  archivo: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  fallback?: boolean;
};

export function Foto({
  archivo,
  alt,
  width,
  height,
  priority = false,
  className = "",
  fallback = true,
}: Props) {
  const existe = __IMAGENES__[archivo] === true;
  const [ok, setOk] = useState(existe);

  if (!ok) {
    if (!fallback) return null;
    return <div className={`foto-fallback ${className}`} aria-hidden="true" />;
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}img/${archivo}`}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`foto ${className}`}
      onError={() => setOk(false)}
    />
  );
}
