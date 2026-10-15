---
title: "Un Dockerfile que funciona a la primera: puertos, variables de entorno y health checks en DeployKit"
description: "El build pasa, el contenedor corre y la app no responde. Las reglas de puerto, dirección de escucha y variables que arreglan casi todo despliegue fallido."
slug: dockerfile-que-funciona-a-la-primera
date: 2026-10-15
tags: [docker, dockerfile, tutorial, solución-de-problemas]
author: Equipo de DeployKit
---

El log del build está en verde. El contenedor dice **running**. Abres tu dominio y te encuentras un `502 Bad Gateway`, o el navegador se queda cargando hasta que salta el timeout.

Es la forma más habitual en que falla un primer despliegue, y casi nunca es un bug de tu app. Unas pocas reglas sobre **puertos, direcciones de escucha y variables de entorno** deciden si el tráfico llega o no a tu contenedor. En este artículo vemos cada una, con Dockerfiles que puedes copiar.

## Cómo llega el tráfico a tu contenedor

Cuando añades un dominio, DeployKit enruta las peticiones a través de Traefik:

```text
navegador ──HTTPS──▶ Traefik (:443) ──▶ tu contenedor (:<puerto del dominio>)
```

Traefik y tu app están en la misma red de Docker (`deploykit-network`). Traefik reenvía cada petición al **puerto configurado en el dominio**, dentro del contenedor. No se publica ningún puerto en el host.

Sin dominio, DeployKit publica en el host el `port` de la app (`port:port`). Si ese campo está vacío, no se publica nada y no hay forma de llegar a la app.

Todo lo que sigue sale de este esquema.

## Regla 1: escucha en `0.0.0.0`, no en `localhost`

Un proceso que escucha en `127.0.0.1` solo acepta conexiones desde dentro de su propio contenedor. Traefik se conecta desde otro contenedor, así que la conexión se rechaza, aunque la app haya arrancado bien y sus logs parezcan normales.

```js
// ❌ Arranca bien, pero Traefik no llega a ella
app.listen(3000, "127.0.0.1");

// ✅ Accesible desde la red de Docker
app.listen(3000, "0.0.0.0");
```

Algunos frameworks escuchan en localhost por defecto. Revisa el tuyo:

| Stack | Cómo escuchar en todas las interfaces |
| --- | --- |
| Express / Fastify | `listen(3000, "0.0.0.0")` / `listen({ port: 3000, host: "0.0.0.0" })` |
| Vite preview / Astro / Nuxt | `--host 0.0.0.0` o `HOST=0.0.0.0` |
| Next.js standalone | `ENV HOSTNAME=0.0.0.0` |
| Uvicorn / Gunicorn | `--host 0.0.0.0` / `--bind 0.0.0.0:8000` |
| Servidor de desarrollo de Django | `runserver 0.0.0.0:8000` (en producción, usa Gunicorn) |
| Go `net/http` | `":8080"` (un host vacío ya significa todas las interfaces) |
| Rails / Puma | `-b 0.0.0.0` |

## Regla 2: elige un puerto fijo y pon el mismo número en DeployKit

Heroku, Render y plataformas parecidas inyectan una variable `PORT` y esperan que tu app escuche en ella. **DeployKit no inyecta `PORT`.** Funciona al revés: tú eliges el puerto y se lo dices a DeployKit.

```js
// Funciona gracias al valor por defecto, no porque DeployKit defina PORT
const port = Number(process.env.PORT ?? 3000);
```

Después, pon ese mismo número en el campo **port** del dominio (o en el puerto de la app, si no tiene dominio). Si prefieres que el código siga leyendo `PORT`, añade tú mismo `PORT=3000` como variable de entorno de la app.

`EXPOSE` en el Dockerfile es solo documentación. El enrutado usa los puertos configurados en DeployKit, así que conviene que `EXPOSE` coincida, pero por sí solo no cambia nada.

Una comprobación rápida antes de cada primer despliegue:

> Mi app escucha en `0.0.0.0:<N>`. ¿El puerto del dominio (o de la app) es `<N>`?

## Regla 3: los sitios estáticos escuchan en el puerto 80

Si DeployKit genera el Dockerfile de una SPA estática (Vite, Create React App, Vue, Angular, Svelte), construye el sitio y lo sirve con **nginx en el puerto 80**. Poner el puerto del dominio en `3000` o `5173` por costumbre es un error clásico. Para un build estático, el puerto es el `80`.

## Regla 4: ruta del `Dockerfile` sin `./` delante

Indica **Dockerfile Path** relativo al contexto de build y sin `./`:

```text
✅ Dockerfile
✅ docker/Dockerfile.prod
❌ ./Dockerfile
```

En un monorepo, configura **Root Directory** (por ejemplo `apps/api`). Pasa a ser el contexto de build, y la ruta del Dockerfile es relativa a él.

## Regla 5: las migraciones van en el comando de arranque

La autodetección acierta con el comando de arranque en apps sencillas, pero puede fallar con arranques de varios pasos. No dependas de ella para ejecutar tus migraciones. Pon todos los pasos en tu script `start`:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "prisma migrate deploy && node dist/index.js"
  }
}
```

El Dockerfile ejecuta entonces `CMD ["npm", "start"]` y la cadena completa se ejecuta en cada arranque del contenedor. Para tareas puntuales que no deben ejecutarse en cada arranque, usa una [tarea programada](/es/docs/scheduled-tasks).

## Regla 6: variables de entorno en el build y en ejecución

DeployKit inyecta las variables de entorno de tu app dos veces:

- **En el build**, como un archivo `.env` escrito en la raíz del contexto de build. Los frameworks que incrustan variables en el bundle (`VITE_*`, `NEXT_PUBLIC_*`, `REACT_APP_*`) lo leen ahí.
- **En ejecución**, como el entorno del contenedor.

Las variables **no** se pasan como `--build-arg`, a propósito: los build args acaban en los metadatos de la imagen, donde cualquiera con `docker inspect` puede leerlos. Eso tiene dos consecuencias para tu Dockerfile:

1. **Copia el `.env` a la etapa de build antes del paso de build.** `COPY . .` ya lo hace. Si copias los archivos uno a uno, añade `COPY .env* ./` antes de `RUN npm run build`.
2. **No excluyas `.env` en `.dockerignore`.** Si lo haces, Docker descarta el archivo generado y las variables de build no llegan nunca. El build no falla: simplemente faltan esos valores en el bundle.

Para valores no secretos que solo necesita el Dockerfile, como una cadena de versión, usa los **Build Args** de la app y declara el `ARG` correspondiente. Nunca pongas secretos ahí.

## Regla 7: un health check que responda rápido

Tras arrancar el contenedor, DeployKit ejecuta un health check. Por defecto es un `GET /` por HTTP cada 10 segundos, con 5 segundos de timeout y 6 reintentos. Cualquier respuesta **2xx o 3xx** cuenta como sana, y las redirecciones no se siguen.

- Si `/` es lento (una página renderizada en el servidor que consulta la base de datos), añade un endpoint ligero como `/healthz` y configúralo como ruta del health check.
- Para workers sin servidor HTTP, pon el tipo en **TCP** o **None**.
- Con **Health check required** activado, si el check falla, falla el despliegue. Desactivado, solo recibes un aviso.

```js
app.get("/healthz", (_req, res) => res.status(200).send("ok"));
```

## Un Dockerfile de Node.js que cumple todas las reglas

```dockerfile
# syntax=docker/dockerfile:1
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
# Copia el código *y* el .env que genera DeployKit
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/prisma ./prisma
EXPOSE 3000
# "start": "prisma migrate deploy && node dist/index.js"
CMD ["npm", "start"]
```

En el código, escucha en `0.0.0.0:3000`. En DeployKit, pon `3000` como puerto del dominio y `/healthz` como ruta del health check.

## Un Dockerfile de Python (FastAPI)

```dockerfile
FROM python:3.12-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000"]
```

Puerto del dominio: `8000`.

## La checklist

Antes de tu primer despliegue:

1. La app escucha en **`0.0.0.0`** en un puerto fijo.
2. El puerto del dominio (o de la app) es **ese mismo puerto**.
3. Una SPA estática usa el puerto **80**.
4. **Dockerfile Path** no lleva `./` delante, y en un monorepo está configurado **Root Directory**.
5. Las migraciones y otros pasos previos forman parte del **comando de arranque**.
6. El `.env` **se copia a la etapa de build** y `.dockerignore` no lo excluye.
7. Los secretos están en **variables de entorno**, nunca en Build Args.
8. La **ruta del health check** devuelve un 2xx o 3xx rápido.
9. No defines tú la política de reinicio. DeployKit ya ejecuta los contenedores con `unless-stopped`.

## Si sigue sin responder

- **`502 Bad Gateway`**: Traefik encontró el contenedor pero no pudo conectarse. Casi siempre es la dirección de escucha (regla 1) o un puerto que no coincide (regla 2).
- **`404 page not found`** en texto plano: es la respuesta del propio Traefik. Ningún router coincide con el dominio, así que comprueba que el dominio está asociado a la app y que su DNS apunta al servidor.
- **El despliegue falla en el health check**: abre los logs de ejecución. Lo más probable es que la app siga arrancando, se caiga al iniciar, o que la ruta devuelva un 4xx o 5xx.
- **Las variables de build salen `undefined` en el navegador**: revisa la regla 6.

La [guía de aplicaciones](/es/docs/applications) recoge todas las opciones de build, y la [guía de dominios](/es/docs/domains) explica en detalle el enrutado y los certificados. Si aún no tienes DeployKit en marcha, empieza por [la guía de la alternativa autoalojada a Heroku](/es/blog/alternativa-heroku-autoalojada).
