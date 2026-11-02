import { useState, type FormEvent } from "react";
import { config } from "../config.ts";
import { content } from "../content.ts";
import { mailtoJornada } from "../lib/mailto.ts";

type Campo = (typeof content.contacto.campos)[number]["id"] | "mensaje";
type Valores = Record<Campo, string>;
type Errores = Partial<Record<Campo, string>>;
type Aviso = "ok" | "error" | null;

const vacio: Valores = {
  nombre: "",
  empresa: "",
  personas: "",
  mensaje: "",
};

function validar(valores: Valores): Errores {
  const mensajes = content.contacto.validacion;
  const errores: Errores = {};
  if (!valores.nombre.trim()) errores.nombre = mensajes.nombre;
  if (!valores.empresa.trim()) errores.empresa = mensajes.empresa;
  if (!valores.personas.trim()) errores.personas = mensajes.personas;
  if (!valores.mensaje.trim()) errores.mensaje = mensajes.mensaje;
  return errores;
}

function abrirCorreo(href: string): boolean {
  try {
    const enlace = document.createElement("a");
    enlace.href = href;
    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();
    return true;
  } catch {
    return false;
  }
}

export function Formulario() {
  const [valores, setValores] = useState<Valores>(vacio);
  const [errores, setErrores] = useState<Errores>({});
  const [envio, setEnvio] = useState<Aviso>(null);
  const email = config.email.trim();

  function onSubmit(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const encontrados = validar(valores);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) {
      setEnvio(null);
      return;
    }
    const cuerpo = [
      `Nombre: ${valores.nombre.trim()}`,
      `Empresa: ${valores.empresa.trim()}`,
      `Cantidad de personas: ${valores.personas.trim()}`,
      `Mensaje: ${valores.mensaje.trim()}`,
    ].join("\n");
    const href = mailtoJornada(cuerpo);
    if (!href || !abrirCorreo(href)) {
      setEnvio("error");
      return;
    }
    setEnvio("ok");
  }

  if (!email) return null;

  return (
    <div className="pie-formulario">
      <h2 id="titulo-contacto" className="titulo titulo-noche">
        {content.contacto.titulo}
      </h2>
      <p className="bajada bajada-noche">{content.contacto.bajada}</p>
      <form className="formulario" noValidate onSubmit={onSubmit}>
        {content.contacto.campos.map((campo) => {
          const error = errores[campo.id];
          const errorId = `error-${campo.id}`;
          return (
            <div key={campo.id}>
              <label className="campo-etiqueta" htmlFor={campo.id}>
                {campo.etiqueta}
              </label>
              <input
                id={campo.id}
                name={campo.id}
                className="campo"
                type={campo.tipo}
                autoComplete={campo.autoComplete}
                value={valores[campo.id]}
                required
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                onChange={(evento) => {
                  const valor = evento.target.value;
                  setValores((actual) => ({ ...actual, [campo.id]: valor }));
                }}
              />
              {error ? (
                <p id={errorId} className="campo-error">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
        <div>
          <label className="campo-etiqueta" htmlFor={content.contacto.mensaje.id}>
            {content.contacto.mensaje.etiqueta}
          </label>
          <textarea
            id={content.contacto.mensaje.id}
            name={content.contacto.mensaje.id}
            className="campo campo-area"
            value={valores.mensaje}
            required
            aria-invalid={errores.mensaje ? true : undefined}
            aria-describedby={errores.mensaje ? "error-mensaje" : undefined}
            onChange={(evento) => {
              const valor = evento.target.value;
              setValores((actual) => ({ ...actual, mensaje: valor }));
            }}
          />
          {errores.mensaje ? (
            <p id="error-mensaje" className="campo-error">
              {errores.mensaje}
            </p>
          ) : null}
        </div>
        <button type="submit" className="btn btn-siempre btn-primario">
          {content.contacto.enviar}
        </button>
        {envio === "ok" ? <p role="status">{content.contacto.ok}</p> : null}
        {envio === "error" ? (
          <p role="alert">
            {content.contacto.error} {email}.
          </p>
        ) : null}
      </form>
      <p className="pie-aviso">{content.contacto.aviso}</p>
    </div>
  );
}
