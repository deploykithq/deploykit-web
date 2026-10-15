---
title: "A self-hosted Heroku alternative: deploy with git push on your own VPS"
description: "How to get the Heroku and Vercel git-push experience on a server you control, with automatic builds, SSL and databases — and no per-app platform bill."
slug: self-hosted-heroku-alternative
date: 2026-10-15
tags: [self-hosting, heroku, docker, tutorial]
author: DeployKit Team
---

Platforms like Heroku and Vercel made one idea mainstream: **push to git and your app is live**. The trade-off is that you rent that convenience per app, per seat and per gigabyte, on infrastructure you don't control.

A self-hosted PaaS gives you the same workflow on a server you own. This post walks through what that means in practice and how to set it up with [DeployKit](/docs).

## Why self-host your deployments?

- **Predictable cost.** One VPS runs many apps and databases. The bill doesn't grow with every new service.
- **No vendor lock-in.** Underneath it's plain Docker, Compose and Traefik. Uninstall the platform and your containers keep running.
- **Your data stays yours.** Databases, logs and environment variables live on your own disks.

## What you need

- A Linux VPS with a public IP (2 GB of RAM is a comfortable start).
- A domain whose DNS you can edit.
- Node.js 20+ on the server, only to run the installer CLI.

## 1. Install DeployKit on the server

SSH into the server and run the installer:

```bash
npm i -g @deploykit/cli && deploykit install
```

The installer sets up the dashboard behind Traefik, which issues Let's Encrypt certificates automatically for every domain you add. The [installation guide](/docs/installation) covers the requirements and options in detail.

## 2. Connect a repository

From the dashboard, create an application and link a GitHub or GitLab repository. DeployKit registers the webhook for you, so every push to the selected branch triggers a deploy.

You don't need a Dockerfile: Nixpacks detects Node.js, Python, Go, Ruby, Rust and more, and builds the image. If you already have a `Dockerfile`, DeployKit uses it instead.

## 3. Push to deploy

```bash
git push origin main
```

DeployKit detects the stack, builds the image, starts the container and routes your domain to it with HTTPS. Build and runtime logs stream live to the dashboard, and if a release goes wrong you can roll back to any previous deployment in one click.

## 4. Add a database

PostgreSQL, MySQL, MariaDB, MongoDB and Redis are one click away, with scheduled backups and one-click restore. Connection strings go into your app as environment variables, encrypted at rest.

## Heroku vs. a self-hosted PaaS

| | Heroku-style PaaS | Self-hosted with DeployKit |
| --- | --- | --- |
| Cost model | Per app / dyno | Your server, any number of apps |
| Where data lives | Provider | Your own disks |
| Lock-in | Platform-specific | Plain Docker underneath |
| Git-push deploys | Yes | Yes |

## Next steps

Read the [quickstart](/docs/quickstart) to deploy your first app, or browse the [full documentation](/docs) to explore preview deployments, scheduled tasks and multi-server setups.
