---
title: "A self-hosted Vercel alternative for Next.js: SSR, previews and HTTPS on your own server"
description: "Run Next.js on your own VPS with git-push deploys, automatic HTTPS and a preview per pull request. What carries over from Vercel, and what doesn't."
slug: self-hosted-vercel-alternative-nextjs
date: 2026-10-15
tags: [nextjs, vercel, self-hosting, tutorial]
author: DeployKit Team
---

Vercel is the most comfortable place to run Next.js. You push, it builds, and every pull request gets its own URL. The bill grows with seats, bandwidth and function invocations, though, and your app runs on infrastructure you don't control.

Next.js itself doesn't need Vercel. `next start`, or the standalone server it can generate, is a regular Node.js process that runs anywhere. In this post we deploy a Next.js app to your own server with [DeployKit](/docs) and rebuild the parts of the Vercel workflow people actually use: git-push deploys, HTTPS, environment variables and preview deployments.

## What you'll end up with

- Every push to `main` builds and deploys production.
- Your domain served over HTTPS, with a Let's Encrypt certificate issued automatically.
- Every pull request deployed to its own URL, such as `pr-42.example.com`, and removed when the PR closes.
- Build and runtime logs in the dashboard, plus one-click rollbacks.

If DeployKit isn't installed yet, the [self-hosted Heroku alternative guide](/blog/self-hosted-heroku-alternative) covers it in a few minutes.

## 1. Enable standalone output

Standalone mode makes `next build` produce a minimal server (`.next/standalone/server.js`) with only the dependencies it needs, which keeps the image small:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
```

## 2. Choose how to build

**Without a Dockerfile.** Choose the Dockerfile build type and leave the repo without one. DeployKit detects Next.js and generates a multi-stage Dockerfile that runs `server.js` from the standalone output on port `3000`. It relies on `output: "standalone"` and copies the `public/` folder, so make sure both exist.

**With your own Dockerfile.** This is the recommended option once the app grows, because you control every step:

```dockerfile
# syntax=docker/dockerfile:1
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# Also copies the .env DeployKit writes, so NEXT_PUBLIC_* gets inlined
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

Two lines matter more than the rest:

- **`HOSTNAME=0.0.0.0`.** The standalone server binds to whatever `HOSTNAME` says, and Docker sets `HOSTNAME` to the container ID by default. Setting it to `0.0.0.0` makes the server listen on every interface, so Traefik can always reach it.
- **`COPY . .` before `npm run build`.** It brings in the `.env` file DeployKit generates (more on that below).

Set the Dockerfile Path to `Dockerfile`, without a leading `./`. In a monorepo, set Root Directory to the app's folder, for example `apps/web`.

## 3. Environment variables: build time vs runtime

This is where most Vercel migrations trip. Next.js has two kinds of variables:

| Variable | When it's read | Where it ends up |
| --- | --- | --- |
| `NEXT_PUBLIC_*` | During `next build` | Inlined into the JavaScript sent to the browser |
| Everything else | At runtime, on the server | Only in the Node.js process |

DeployKit injects your app's variables in both places: as a `.env` file at the root of the build context before the build, and as the container's environment at runtime. They're never passed as Docker build args, which would leave them readable in the image metadata.

Two things follow:

- Your Dockerfile has to copy that `.env` into the build stage before `next build`. `COPY . .` does it, as long as `.dockerignore` **doesn't exclude `.env`**.
- Changing a `NEXT_PUBLIC_*` value needs a **new build**, not just a restart, because the old value is baked into the bundle. Server-only variables are picked up on the next deploy.

Variables are encrypted at rest and masked in the dashboard until you reveal them.

## 4. Add your domain

In the app's Domains tab, add `app.example.com` with **port `3000`** and HTTPS on. Point the domain's DNS `A` record at your server. Traefik obtains the Let's Encrypt certificate automatically and redirects HTTP to HTTPS.

The port must match the one the server listens on. DeployKit doesn't inject a `PORT` variable, so the `PORT=3000` in the Dockerfile and the domain port have to agree. The [Dockerfile guide](/blog/dockerfile-that-works-first-time) explains why this matters.

For a cheap health check, add a route handler and set `/api/health` as the health check path:

```ts
// app/api/health/route.ts
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ ok: true });
}
```

## 5. Preview deployments for every pull request

This is the Vercel feature teams miss most, and DeployKit has an equivalent:

1. In the app's General tab, enable **Auto-deploy pull requests as preview environments**.
2. Set a **Base domain**, for example `example.com`. Each PR is then served at `pr-<number>.example.com`.
3. Create a wildcard DNS record, `*.example.com`, pointing to the server.
4. Connect the repository through the [GitHub App](/docs/github-app), so PR events arrive without configuring a webhook by hand.

When a PR is opened, DeployKit deploys its branch as a separate app. Every new push redeploys it, and merging or closing the PR deletes it. With the GitHub App, DeployKit keeps a single comment on the PR ("Deploying preview", then "Preview ready" with the URL) and reports a commit status that branch protection can require.

Two caveats before you turn it on:

- **Previews copy the parent's environment variables.** A preview of your production app runs with production secrets and the production database. Create a staging app and enable previews on that one instead.
- **Preview domains are served over plain HTTP**, because a wildcard certificate needs a DNS challenge. That's fine for reviewing UI changes. If your app sets `Secure` cookies, plan for login flows to behave differently there.

The [preview deployments docs](/docs/preview-deployments) cover the whole lifecycle.

## What carries over from Vercel, and what doesn't

| Feature | On your own server |
| --- | --- |
| SSR, Server Components, Server Actions, route handlers | ✅ They run on the Node.js server |
| Middleware | ✅ Runs in the Node.js server, not at the edge |
| `next/image` optimization | ✅ Handled by the server itself |
| ISR and `revalidate` | ✅ On one instance. With several replicas, each one keeps its own cache unless you configure a shared cache handler |
| Git-push deploys, rollbacks, previews | ✅ Provided by DeployKit |
| Global edge network and CDN | ❌ Your app runs in one region. Put a CDN in front for cached assets |
| Edge functions in many regions | ❌ Everything runs where your server is |
| Vercel-specific storage and analytics | ❌ Swap for a self-hosted database, object storage or analytics |

If most of your users are in one region and your app is mostly server-rendered pages and APIs, a single well-sized VPS is usually enough. If you serve the whole world and depend heavily on edge caching, keep a CDN in front of your server.

## Scaling when you need it

- **Replicas**: run several containers behind the same domain, and Traefik load-balances between them. Replicas need a domain.
- **Autoscaling**: set minimum and maximum replicas and let DeployKit add or remove them based on load.
- **Resource limits**: cap CPU and memory per app, so one noisy app can't starve the rest of the server.

## Next steps

- [Applications guide](/docs/applications): every build and runtime setting.
- [Preview deployments](/docs/preview-deployments) and the [GitHub App](/docs/github-app).
- [A Dockerfile that works the first time](/blog/dockerfile-that-works-first-time), if anything above doesn't answer.
