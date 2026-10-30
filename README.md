# Exfutura

Sitio de una página para pymes de Berisso y La Plata. Vite, React, TypeScript y Tailwind. Se publica en GitHub Pages, en [exfutura.net.ar](https://exfutura.net.ar).

```sh
pnpm install
pnpm dev
pnpm test
pnpm lint
pnpm build
```

## Configuración

Todo lo que cambia de un entorno a otro está en `src/config.ts`. Si un valor queda vacío, esa pieza no se muestra.

| Campo | Qué hace |
| --- | --- |
| `email` | Destino de los mailto. Vacío: no hay botones de contacto ni formulario. |
| `fotoSobreMi` | Ruta en `public`, por ejemplo `/fotos/sebastian.jpg`. Vacío: monograma SF. |
| `formacion` | Párrafo extra en Sobre mí. Vacío: no se muestra. |
| `razonSocial` | Se agrega al lado del copyright. Vacío: no se muestra. |
| `elNinoHoyUrl` | Link de El Niño Hoy. Vacío: el caso queda sin enlace. |

La captura del caso va en `public/casos/el-nino-hoy.png`. Si el archivo no está, se ve el marco del navegador con el nombre. Para sumar un caso, agregá un objeto al array `casos.items` en `src/content.ts`.

Cuando el dominio ya resuelva, podés cambiar `email` por `hola@exfutura.net.ar` y redirigir esa casilla al Gmail.

## GitHub Pages

En el repositorio: Settings → Pages → Source: GitHub Actions.

Cada push a `main` corre `.github/workflows/deploy.yml`: instala con `pnpm install --frozen-lockfile`, ejecuta los tests, arma `dist` y lo publica. `public/CNAME` deja el dominio en `exfutura.net.ar`.

## DNS de exfutura.net.ar

Registros A del apex a las IPs de GitHub Pages:

- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

CNAME de `www` a `<usuario>.github.io`.

Cuando el certificado quede emitido, activar Enforce HTTPS.
