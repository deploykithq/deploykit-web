---
title: "Nixpacks vs Dockerfile vs Buildpacks: which build method to choose on DeployKit"
description: "DeployKit can build your app three ways. How each one works, what it's good at, where it breaks, and a simple rule for picking the right one per app."
slug: nixpacks-vs-dockerfile-vs-buildpacks
date: 2026-10-15
tags: [docker, nixpacks, buildpacks, dockerfile, guide]
author: DeployKit Team
---

Every app on DeployKit becomes a Docker image before it runs. How that image gets built is up to you, through the app's **build type**:

- **Nixpacks** (the default): detects your stack and builds the image with no configuration.
- **Dockerfile**: uses your own Dockerfile, or generates one if the repo doesn't have it.
- **Buildpacks**: Cloud Native Buildpacks, the Heroku way of building apps.

All three produce a normal image that runs the same way afterwards. The difference is how much you have to write, how much control you get, and what happens when detection guesses wrong.

## Nixpacks: zero configuration

[Nixpacks](https://nixpacks.com) looks at your repository, works out the language and framework (Node.js, Python, Go, Ruby, Rust, PHP, Java and more), installs the right toolchain and builds an image. You push code and it works, as long as your project follows the usual conventions.

**What DeployKit adds on top:**

- **Start Command.** If Nixpacks picks the wrong command to start your app, set your own in the app settings. It's passed to Nixpacks as the start command and only applies to this build type.
- **Automatic fallback.** If Nixpacks fails, or isn't installed on the server, DeployKit doesn't give up: it falls back to the Dockerfile strategy, using your `Dockerfile` if there is one or generating one if not. The build log says when this happens.
- **A 10-minute limit.** A Nixpacks build that runs longer is stopped.

**Where it breaks:**

- **Multi-step launches.** Detection may pick `node index.js` when you need `prisma migrate deploy && node dist/index.js`. Put the whole chain in your `start` script or in Start Command.
- **Anything unusual.** System libraries, a non-standard layout or a build step Nixpacks doesn't know about. You can describe them in a `nixpacks.toml` at the root of the repo, but at that point a Dockerfile is often clearer.
- **Its future.** Railway, which created Nixpacks, now focuses on its successor, Railpack, and Nixpacks gets little new development. It works well for what it already supports. Just don't expect it to keep up with every new framework.

To see what Nixpacks will detect before you deploy, run `nixpacks plan .` locally.

## Dockerfile: full control

With a Dockerfile, the build does exactly what you wrote: base image, system packages, build steps, user, start command. Nothing is guessed. That's why it's our recommendation for anything that matters in production.

**What you get:**

- **Reproducible builds.** The same Dockerfile gives the same image, on your laptop, in CI and on the server.
- **Small images.** A multi-stage build ships only the compiled output and production dependencies.
- **Good caching.** Copy the lock file and install dependencies before copying the source, and Docker reuses that layer until your dependencies change.
- **Remote servers.** Apps deployed to a [remote server](/docs/servers) are built there from the repo's Dockerfile. Nixpacks, Buildpacks and Dockerfile generation only run on the local server, so a Dockerfile is required for remote deploys.

**No Dockerfile yet? DeployKit writes one.** If the build type is Dockerfile and none exists at the configured path, DeployKit detects the stack and generates one:

| Detected | Generated image | Default port |
| --- | --- | --- |
| `go.mod` | Static Go binary on Alpine | 8080 |
| `requirements.txt` / `pyproject.toml` | Python 3.12 running `uvicorn main:app` | 8000 |
| Next.js | Standalone server (`output: "standalone"`) | 3000 |
| Vite, CRA, Vue, Angular, Svelte | Static build served by nginx | 80 |
| Any other Node.js server | Runs your `start` script | 3000 |

If you set a port on the app, the generated Dockerfile uses it instead of the default. Treat the generated file as a starting point: the Python one assumes a FastAPI or Starlette app in `main.py`, so Django or Flask need their own Dockerfile. In a monorepo, it detects your package manager and builds the package together with its workspace dependencies.

**Where it breaks:** almost always in the same few places. The app binds to `localhost`, the port doesn't match, or build-time variables never reach the build. Our [guide to a Dockerfile that works the first time](/blog/dockerfile-that-works-first-time) covers each of them.

## Buildpacks: the Heroku way

Cloud Native Buildpacks turn source code into an image by convention. DeployKit runs `pack build` with the `heroku/builder:24` builder, so if your app ran on Heroku, it probably builds here unchanged.

**What you get:**

- **Heroku conventions.** A `Procfile` with a `web:` process, language versions declared the Heroku way (`engines` in `package.json`, `.python-version`, the Ruby version in the `Gemfile`) and the usual dependency files.
- **A maintained base.** The builder and its run image are kept up to date by the Heroku buildpacks project.

**Where it breaks:**

- **No fallback.** If the buildpack build fails, the deploy fails. There's no switch to another strategy.
- **Same 10-minute limit** as Nixpacks.
- **Larger images** than a hand-written multi-stage Dockerfile, and less control over what goes into them.
- **Local server only**, like Nixpacks.

## Environment variables work the same way in all three

DeployKit never passes your environment variables as Docker build args, because they would be readable in the image metadata. Instead, before every build it writes them to a `.env` file at the root of the build context, and at runtime it sets them as the container's environment.

- **Nixpacks and Buildpacks** pick up the `.env` automatically. Nothing to do.
- **Your own Dockerfile** has to copy it into the build stage before the build step (`COPY . .` does) and must not exclude it in `.dockerignore`. Otherwise variables like `VITE_*` or `NEXT_PUBLIC_*` are silently missing from the bundle.

## Side by side

| | Nixpacks | Dockerfile | Buildpacks |
| --- | --- | --- | --- |
| Setup | None | Write one, or let DeployKit generate it | None if you follow the conventions |
| Control | Low (`nixpacks.toml`, Start Command) | Full | Low |
| Image size | Medium to large | As small as you make it | Large |
| If the build fails | Falls back to the Dockerfile strategy | Deploy fails | Deploy fails |
| Remote servers | No | Yes | No |
| Start command | Detected, or Start Command | Your `CMD` | `Procfile` |
| Best for | Prototypes, standard apps | Production, monorepos, anything custom | Apps coming from Heroku |

## Which one should you pick?

A simple rule that works for most teams:

1. **Starting out, or a standard app?** Leave the default, **Nixpacks**. If it builds and runs correctly, you're done.
2. **Coming from Heroku with a `Procfile`?** Try **Buildpacks** first. It's the shortest path.
3. **Going to production, deploying to a remote server, or detection got it wrong?** Switch to **Dockerfile**. Start from the generated one if it helps, commit it to the repo, and own it from then on.

Moving from Nixpacks to a Dockerfile is a small change: commit the Dockerfile, set the build type to Dockerfile and the path to `Dockerfile` (without a leading `./`), and redeploy. If anything goes wrong, you can roll back to the previous deployment in one click.

The [applications guide](/docs/applications) documents every build setting, including Root Directory for monorepos and optional vulnerability scanning with Trivy.
