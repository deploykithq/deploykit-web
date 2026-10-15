---
title: "Una alternativa autoalojada a Vercel para Next.js: SSR, previews y HTTPS en tu propio servidor"
description: "Ejecuta Next.js en tu VPS con despliegues por git push, HTTPS automático y una preview por cada pull request. Qué se mantiene de Vercel y qué no."
slug: alternativa-vercel-autoalojada-nextjs
date: 2026-10-15
tags: [nextjs, vercel, autoalojamiento, tutorial]
author: Equipo de DeployKit
---

Vercel es el sitio más cómodo para ejecutar Next.js. Haces push, construye la app y cada pull request tiene su propia URL. Eso sí, la factura crece con los usuarios del equipo, el ancho de banda y las invocaciones de funciones, y tu app corre en una infraestructura que no controlas.

Next.js no necesita Vercel. `next start`, o el servidor standalone que puede generar, es un proceso normal de Node.js que funciona en cualquier sitio. En este artículo desplegamos una app de Next.js en tu propio servidor con [DeployKit](/es/docs) y reconstruimos las partes del flujo de Vercel que de verdad se usan: despliegues con git push, HTTPS, variables de entorno y preview deployments.

## Qué vas a tener al final

- Cada push a `main` construye y despliega producción.
- Tu dominio servido por HTTPS, con un certificado de Let's Encrypt emitido automáticamente.
- Cada pull request desplegada en su propia URL, como `pr-42.example.com`, que se elimina al cerrar la PR.
- Logs de build y de ejecución en el panel, y rollbacks con un clic.

Si aún no tienes DeployKit instalado, la [guía de la alternativa autoalojada a Heroku](/es/blog/alternativa-heroku-autoalojada) lo explica en unos minutos.

## 1. Activa la salida standalone

El modo standalone hace que `next build` genere un servidor mínimo (`.next/standalone/server.js`) con solo las dependencias que necesita, lo que mantiene la imagen pequeña:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
```

## 2. Elige cómo construir

**Sin Dockerfile.** Elige el tipo de build Dockerfile y deja el repositorio sin él. DeployKit detecta Next.js y genera un Dockerfile multi-stage que ejecuta `server.js` desde la salida standalone en el puerto `3000`. Depende de `output: "standalone"` y copia la carpeta `public/`, así que asegúrate de que existen las dos.

**Con tu propio Dockerfile.** Es la opción recomendada cuando la app crece, porque controlas cada paso:

```dockerfile
# syntax=docker/dockerfile:1
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# Copia también el .env que escribe DeployKit, para incrustar los NEXT_PUBLIC_*
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

Hay dos líneas que importan más que el resto:

- **`HOSTNAME=0.0.0.0`.** El servidor standalone escucha en lo que diga `HOSTNAME`, y Docker define `HOSTNAME` con el ID del contenedor por defecto. Con `0.0.0.0` el servidor escucha en todas las interfaces, así que Traefik siempre puede llegar a él.
- **`COPY . .` antes de `npm run build`.** Trae el archivo `.env` que genera DeployKit (lo vemos ahora).

Pon `Dockerfile` como Dockerfile Path, sin `./` delante. En un monorepo, configura Root Directory con la carpeta de la app, por ejemplo `apps/web`.

## 3. Variables de entorno: build y ejecución

Aquí es donde tropiezan la mayoría de migraciones desde Vercel. Next.js tiene dos tipos de variables:

| Variable | Cuándo se lee | Dónde acaba |
| --- | --- | --- |
| `NEXT_PUBLIC_*` | Durante `next build` | Incrustada en el JavaScript que recibe el navegador |
| Todas las demás | En ejecución, en el servidor | Solo en el proceso de Node.js |

DeployKit inyecta las variables de tu app en los dos sitios: como un archivo `.env` en la raíz del contexto de build antes de construir, y como entorno del contenedor en ejecución. Nunca se pasan como build args de Docker, porque quedarían legibles en los metadatos de la imagen.

De ahí salen dos cosas:

- Tu Dockerfile tiene que copiar ese `.env` a la etapa de build antes de `next build`. `COPY . .` lo hace, siempre que `.dockerignore` **no excluya `.env`**.
- Cambiar un valor `NEXT_PUBLIC_*` requiere un **build nuevo**, no basta con reiniciar, porque el valor anterior está incrustado en el bundle. Las variables de servidor se aplican en el siguiente despliegue.

Las variables se guardan cifradas y aparecen ocultas en el panel hasta que las revelas.

## 4. Añade tu dominio

En la pestaña Domains de la app, añade `app.example.com` con **puerto `3000`** y HTTPS activado. Apunta el registro DNS `A` del dominio a tu servidor. Traefik obtiene el certificado de Let's Encrypt automáticamente y redirige HTTP a HTTPS.

El puerto tiene que coincidir con el que escucha el servidor. DeployKit no inyecta una variable `PORT`, así que el `PORT=3000` del Dockerfile y el puerto del dominio deben ser el mismo. La [guía del Dockerfile](/es/blog/dockerfile-que-funciona-a-la-primera) explica por qué importa.

Para un health check ligero, añade un route handler y configura `/api/health` como ruta del health check:

```ts
// app/api/health/route.ts
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ ok: true });
}
```

## 5. Preview deployments para cada pull request

Es la función de Vercel que más echan de menos los equipos, y DeployKit tiene un equivalente:

1. En la pestaña General de la app, activa **Auto-deploy pull requests as preview environments**.
2. Indica un **Base domain**, por ejemplo `example.com`. Cada PR se sirve entonces en `pr-<número>.example.com`.
3. Crea un registro DNS comodín, `*.example.com`, que apunte al servidor.
4. Conecta el repositorio a través de la [GitHub App](/es/docs/github-app), para que los eventos de PR lleguen sin configurar un webhook a mano.

Cuando se abre una PR, DeployKit despliega su rama como una app aparte. Cada push nuevo la vuelve a desplegar, y al fusionar o cerrar la PR se elimina. Con la GitHub App, DeployKit mantiene un único comentario en la PR ("Deploying preview" y después "Preview ready" con la URL) y publica un commit status que la protección de ramas puede exigir.

Dos avisos antes de activarlo:

- **Las previews copian las variables de entorno de la app padre.** Una preview de tu app de producción se ejecuta con los secretos y la base de datos de producción. Crea una app de staging y activa las previews en esa.
- **Los dominios de preview se sirven por HTTP plano**, porque un certificado comodín necesita un DNS challenge. Para revisar cambios de interfaz es suficiente. Si tu app usa cookies `Secure`, ten en cuenta que el login puede comportarse distinto ahí.

La [documentación de preview deployments](/es/docs/preview-deployments) recoge el ciclo de vida completo.

## Qué se mantiene de Vercel y qué no

| Función | En tu propio servidor |
| --- | --- |
| SSR, Server Components, Server Actions, route handlers | ✅ Se ejecutan en el servidor de Node.js |
| Middleware | ✅ Se ejecuta en el servidor de Node.js, no en el edge |
| Optimización de `next/image` | ✅ La hace el propio servidor |
| ISR y `revalidate` | ✅ En una instancia. Con varias réplicas, cada una tiene su propia caché salvo que configures un cache handler compartido |
| Despliegues con git push, rollbacks, previews | ✅ Los pone DeployKit |
| Red edge global y CDN | ❌ Tu app corre en una región. Pon una CDN delante para los recursos cacheables |
| Edge functions en muchas regiones | ❌ Todo se ejecuta donde está tu servidor |
| Almacenamiento y analítica propios de Vercel | ❌ Sustitúyelos por una base de datos, almacenamiento de objetos o analítica autoalojados |

Si la mayoría de tus usuarios están en una región y tu app son sobre todo páginas renderizadas en servidor y APIs, un VPS bien dimensionado suele bastar. Si sirves a todo el mundo y dependes mucho de la caché en el edge, mantén una CDN delante de tu servidor.

## Escalar cuando lo necesites

- **Réplicas**: ejecuta varios contenedores tras el mismo dominio y Traefik reparte la carga entre ellos. Las réplicas necesitan un dominio.
- **Autoescalado**: fija un mínimo y un máximo de réplicas y deja que DeployKit las añada o quite según la carga.
- **Límites de recursos**: limita CPU y memoria por app, para que una app ruidosa no deje sin recursos al resto del servidor.

## Siguientes pasos

- [Guía de aplicaciones](/es/docs/applications): todas las opciones de build y ejecución.
- [Preview deployments](/es/docs/preview-deployments) y la [GitHub App](/es/docs/github-app).
- [Un Dockerfile que funciona a la primera](/es/blog/dockerfile-que-funciona-a-la-primera), si algo de lo anterior no te funciona.
