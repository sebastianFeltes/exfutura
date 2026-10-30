import { useState, type FormEvent } from "react";
import { config } from "../config.ts";
import { content } from "../content.ts";
import { mailtoConsulta } from "../lib/mailto.ts";
import { Escribinos } from "./Escribinos.tsx";
import { Reveal } from "./Reveal.tsx";

type Campo = (typeof content.contacto.campos)[number]["id"];
type Valores = Record<Campo, string>;
type Errores = Partial<Record<Campo, string>>;
type Aviso = "ok" | "error" | null;

const vacio: Valores = {
  nombre: "",
  empresa: "",
  rubro: "",
  email: "",
  personas: "",
};

function validar(valores: Valores): Errores {
  const mensajes = content.contacto.validacion;
  const errores: Errores = {};
  if (!valores.nombre.trim()) errores.nombre = mensajes.nombre;
  if (!valores.empresa.trim()) errores.empresa = mensajes.empresa;
  if (!valores.rubro.trim()) errores.rubro = mensajes.rubro;
  if (!valores.email.trim()) errores.email = mensajes.email;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valores.email.trim())) {
    errores.email = mensajes.emailInvalido;
  }
  if (!valores.personas.trim()) errores.personas = mensajes.personas;
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

export function Contacto() {
  const [valores, setValores] = useState<Valores>(vacio);
  const [errores, setErrores] = useState<Errores>({});
  const [envio, setEnvio] = useState<Aviso>(null);
  const [copia, setCopia] = useState<Aviso>(null);
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
      `Rubro: ${valores.rubro.trim()}`,
      `Email: ${valores.email.trim()}`,
      `Cantidad de personas: ${valores.personas.trim()}`,
    ].join("\n");
    const href = mailtoConsulta(cuerpo);
    if (!href || !abrirCorreo(href)) {
      setEnvio("error");
      return;
    }
    setEnvio("ok");
  }

  async function copiarEmail() {
    try {
      if (!navigator.clipboard) {
        setCopia("error");
        return;
      }
      await navigator.clipboard.writeText(email);
      setCopia("ok");
    } catch {
      setCopia("error");
    }
  }

  return (
    <section id="contacto" className="seccion" aria-labelledby="titulo-contacto">
      <Reveal>
        <div className="contenedor">
          <h2 id="titulo-contacto" className="titulo">
            {content.contacto.titulo}
          </h2>
          <p className="bajada">{content.contacto.bajada}</p>
          <div className="acciones">
            <Escribinos />
            <a className="btn btn-siempre btn-secundario" href="#formulario">
              {content.ctaSecundario}
            </a>
          </div>
          {email ? (
            <form id="formulario" className="mt-10 max-w-2xl" noValidate onSubmit={onSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                {content.contacto.campos.map((campo) => {
                  const error = errores[campo.id];
                  const errorId = `error-${campo.id}`;
                  return (
                    <div key={campo.id} className={campo.id === "personas" ? "sm:col-span-2" : undefined}>
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
              </div>
              <button type="submit" className="btn btn-siempre btn-primario mt-6">
                {content.contacto.enviar}
              </button>
              {envio === "ok" ? (
                <p role="status" className="mt-4">
                  {content.contacto.ok}
                </p>
              ) : null}
              {envio === "error" ? (
                <p role="alert" className="mt-4">
                  {content.contacto.error} {email}.
                </p>
              ) : null}
              <p className="mt-6 text-[17px] leading-7">
                <span className="select-all">{email}</span>
              </p>
              <button type="button" className="btn btn-siempre btn-secundario mt-3" onClick={() => void copiarEmail()}>
                {content.contacto.copiar}
              </button>
              <p role="status" className="mt-3 min-h-6 text-[16px] leading-6">
                {copia === "ok" ? content.contacto.copiado : null}
                {copia === "error" ? content.contacto.copiaError : null}
              </p>
              <p className="text-[16px] leading-6 text-texto-suave">{content.contacto.aviso}</p>
            </form>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
