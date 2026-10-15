---
title: "A Dockerfile that works the first time: ports, env vars and health checks on DeployKit"
description: "The build succeeds, the container is running, and the app is still unreachable. The port, bind-address and env-var rules that fix most failed first deploys."
slug: dockerfile-that-works-first-time
date: 2026-10-15
tags: [docker, dockerfile, tutorial, troubleshooting]
author: DeployKit Team
---

The build log is green. The container says **running**. You open your domain and get a `502 Bad Gateway`, or the browser just spins until it times out.

This is the most common way a first deploy goes wrong, and it's almost never a bug in your app. A few rules about **ports, bind addresses and environment variables** decide whether traffic reaches your container at all. This post goes through each one, with Dockerfiles you can copy.

## How traffic reaches your container

When you attach a domain, DeployKit routes requests through Traefik:

```text
browser ──HTTPS──▶ Traefik (:443) ──▶ your container (:<domain port>)
```

Traefik and your app sit on the same Docker network (`deploykit-network`). Traefik forwards each request to the **port set on the domain**, inside the container. No host port is published.

Without a domain, DeployKit publishes the app's `port` on the host instead (`port:port`). If that field is empty, nothing is published and the app can't be reached at all.

Everything below follows from this picture.

## Rule 1: listen on `0.0.0.0`, not `localhost`

A process bound to `127.0.0.1` only accepts connections from inside its own container. Traefik connects from a different container, so the connection is refused, even though the app started fine and its logs look healthy.

```js
// ❌ Starts fine, but Traefik can't reach it
app.listen(3000, "127.0.0.1");

// ✅ Reachable on the Docker network
app.listen(3000, "0.0.0.0");
```

Some frameworks bind to localhost by default. Check yours:

| Stack | How to bind to all interfaces |
| --- | --- |
| Express / Fastify | `listen(3000, "0.0.0.0")` / `listen({ port: 3000, host: "0.0.0.0" })` |
| Vite preview / Astro / Nuxt | `--host 0.0.0.0` or `HOST=0.0.0.0` |
| Next.js standalone | `ENV HOSTNAME=0.0.0.0` |
| Uvicorn / Gunicorn | `--host 0.0.0.0` / `--bind 0.0.0.0:8000` |
| Django dev server | `runserver 0.0.0.0:8000` (use Gunicorn in production) |
| Go `net/http` | `":8080"` (an empty host already means all interfaces) |
| Rails / Puma | `-b 0.0.0.0` |

## Rule 2: pick a fixed port and set the same number in DeployKit

Heroku, Render and similar platforms inject a `PORT` variable and expect your app to listen on it. **DeployKit doesn't inject `PORT`.** It's the other way around: you choose the port and tell DeployKit.

```js
// This works because of the fallback, not because DeployKit sets PORT
const port = Number(process.env.PORT ?? 3000);
```

Then put that same number in the domain's **port** field (or the app's port, if it has no domain). If you'd rather keep the code reading `PORT`, add `PORT=3000` as an environment variable on the app yourself.

`EXPOSE` in your Dockerfile is only documentation. Routing uses the ports set in DeployKit, so a matching `EXPOSE` is good practice but changes nothing on its own.

A quick check before every first deploy:

> My app listens on `0.0.0.0:<N>`. Is the domain port (or app port) set to `<N>`?

## Rule 3: static sites listen on port 80

If DeployKit generates a Dockerfile for a static SPA (Vite, Create React App, Vue, Angular, Svelte), it builds the site and serves it with **nginx on port 80**. Setting the domain port to `3000` or `5173` out of habit is a classic mistake. For a static build, the port is `80`.

## Rule 4: `Dockerfile` path without a leading `./`

Set **Dockerfile Path** relative to the build context, without `./`:

```text
✅ Dockerfile
✅ docker/Dockerfile.prod
❌ ./Dockerfile
```

In a monorepo, set **Root Directory** (for example `apps/api`). It becomes the build context, and the Dockerfile path is relative to it.

## Rule 5: put migrations in the start command

Auto-detection gets the start command right for simple apps, but it can miss multi-step launches. Don't rely on it to run your migrations. Put every step in your `start` script:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "prisma migrate deploy && node dist/index.js"
  }
}
```

The Dockerfile then runs `CMD ["npm", "start"]` and the whole chain runs on every container start. For one-off jobs that shouldn't run on every start, use a [scheduled task](/docs/scheduled-tasks) instead.

## Rule 6: environment variables at build time and at runtime

DeployKit injects your app's environment variables twice:

- **At build time**, as a `.env` file written to the root of the build context. Frameworks that inline variables into the bundle (`VITE_*`, `NEXT_PUBLIC_*`, `REACT_APP_*`) read it there.
- **At runtime**, as the container's environment.

Variables are deliberately **not** passed as `--build-arg`, because build args end up in the image metadata, where anyone with `docker inspect` can read them. That has two consequences for your Dockerfile:

1. **Copy the `.env` into the build stage before the build step.** `COPY . .` does this for you. If you copy files one by one, add `COPY .env* ./` before `RUN npm run build`.
2. **Don't exclude `.env` in `.dockerignore`.** If you do, Docker drops the generated file and build-time variables never arrive. The build doesn't fail, the values are just missing from your bundle.

For non-secret values that only your Dockerfile needs, such as a version string, use the app's **Build Args** and declare a matching `ARG`. Never put secrets there.

## Rule 7: a health check that answers fast

After starting the container, DeployKit runs a health check. The default is an HTTP `GET /` every 10 seconds, with a 5-second timeout and 6 retries. Any **2xx or 3xx** counts as healthy, and redirects aren't followed.

- If `/` is slow (a server-rendered page that queries the database), add a cheap endpoint such as `/healthz` and set it as the health check path.
- For workers with no HTTP server, set the type to **TCP** or **None**.
- With **Health check required** on, a failed check fails the deploy. With it off, you only get a warning.

```js
app.get("/healthz", (_req, res) => res.status(200).send("ok"));
```

## A Node.js Dockerfile that follows every rule

```dockerfile
# syntax=docker/dockerfile:1
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
# Copies the source *and* the .env DeployKit generates
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

In the app code, listen on `0.0.0.0:3000`. In DeployKit, set the domain port to `3000` and the health check path to `/healthz`.

## A Python (FastAPI) Dockerfile

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

Domain port: `8000`.

## The checklist

Before your first deploy:

1. The app binds to **`0.0.0.0`** on a fixed port.
2. The domain port (or app port) is set to **that same port**.
3. A static SPA uses port **80**.
4. **Dockerfile Path** has no leading `./`, and **Root Directory** is set in a monorepo.
5. Migrations and other pre-start steps are part of the **start command**.
6. `.env` is **copied into the build stage** and not excluded by `.dockerignore`.
7. Secrets are in **environment variables**, never in Build Args.
8. The **health check path** returns a 2xx or 3xx quickly.
9. You don't set a restart policy yourself. DeployKit already runs containers with `unless-stopped`.

## If it's still unreachable

- **`502 Bad Gateway`**: Traefik found the container but couldn't connect. It's almost always the bind address (rule 1) or a port mismatch (rule 2).
- **`404 page not found`** in plain text: that's Traefik's own response. No router matches the domain, so check the domain is attached to the app and its DNS points to the server.
- **The deploy fails on the health check**: open the runtime logs. The app is probably still starting, crashing on boot, or the path returns a 4xx or 5xx.
- **Build-time variables are `undefined` in the browser**: see rule 6.

The [applications guide](/docs/applications) covers every build setting, and the [domains guide](/docs/domains) explains routing and certificates in detail. If you don't have DeployKit running yet, start with [the self-hosted Heroku alternative guide](/blog/self-hosted-heroku-alternative).
