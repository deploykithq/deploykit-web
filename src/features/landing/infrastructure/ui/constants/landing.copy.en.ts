import type { LandingCopyI } from "@landing/infrastructure/ui/interfaces/LandingI";

export const LANDING_COPY_EN: LandingCopyI = {
  meta: {
    title: "DeployKit — Deploy your apps on your own server",
    description:
      "Open source, self-hosted PaaS platform to deploy applications, databases and services on your infrastructure. No vendor lock-in.",
  },
  hero: {
    tags: ["open-source paas", "self-hosted", "mit"],
    titleLine1: "your own cloud,",
    titleHighlight: "one git push",
    titleEnd: "away",
    lead:
      "DeployKit runs apps, databases and services on your own servers — with auto-builds, SSL, real-time logs and backups. The open alternative to Vercel and Heroku, with zero vendor lock-in.",
    readDocs: "read the docs →",
    star: "★ star on github",
    pipelineLabel: "Example deploy session",
    deploying: "↻ deploying",
    healthy: "● healthy",
  },
  install: {
    label: "install",
    copy: "[ copy ]",
    copied: "✓ copied",
    ariaLabel: (cmd) => `Copy install command: ${cmd}`,
  },
  tech: {
    label: "builds anything nixpacks detects",
    meta: (n) => `${n} runtimes`,
  },
  stats: {
    label: "spec sheet",
    meta: "verifiable in the repo",
    items: [
      { label: "capabilities", value: "16", note: "built in, four pillars" },
      { label: "databases", value: "5", note: "postgres · mysql · mongo · redis · mariadb" },
      { label: "encryption", value: "AES-256-GCM", note: "env vars encrypted at rest" },
      { label: "license", value: "MIT", note: "open source, self-hosted" },
    ],
  },
  features: {
    label: "features",
    meta: (n) => `${n} entries`,
    title: "Everything a service needs, from ship to govern",
    intro:
      "Sixteen built-in capabilities across four pillars — the whole lifecycle of a deployment, managed from one dashboard.",
    pillars: [
      {
        id: "ship",
        index: "01",
        label: "Ship",
        tagline: "From git push to a running container, automatically.",
        features: [
          { title: "App Deployments", description: "Deploy from GitHub, GitLab, any Git repo, or a Docker image." },
          {
            title: "Auto-Build",
            description: "Nixpacks auto-detection, Dockerfile, or Cloud Native Buildpacks.",
            tag: "Nixpacks",
          },
          { title: "Auto-Deploy", description: "GitHub & GitLab webhooks trigger a deploy on every push." },
          { title: "Preview Deployments", description: "Every PR gets an isolated environment on its own subdomain." },
          { title: "Rollbacks", description: "One-click rollback to any previous deployment." },
        ],
      },
      {
        id: "data",
        index: "02",
        label: "Data",
        tagline: "Stateful services, provisioned and protected.",
        features: [
          {
            title: "Databases",
            description: "One-click PostgreSQL, MySQL, MongoDB, Redis and MariaDB instances.",
            tag: "5 engines",
          },
          { title: "Automated Backups", description: "Scheduled backups with retention policies and one-click restore." },
          { title: "Environment Variables", description: "Managed in the UI, encrypted at rest.", tag: "AES-256-GCM" },
        ],
      },
      {
        id: "operate",
        index: "03",
        label: "Operate",
        tagline: "See everything, run it anywhere.",
        features: [
          {
            title: "Real-Time Logs",
            description: "Build, deploy and container logs streamed live over Socket.IO.",
            tag: "Socket.IO",
          },
          { title: "Monitoring", description: "CPU, memory and network stats per container." },
          { title: "Domains & SSL", description: "Automatic Let's Encrypt certificates via Traefik." },
          { title: "Remote Servers", description: "Deploy to additional servers over SSH from one dashboard." },
        ],
      },
      {
        id: "govern",
        index: "04",
        label: "Govern",
        tagline: "Control who does what, and keep the receipts.",
        features: [
          { title: "Role-Based Access", description: "Admin, Operator and Viewer roles with project-level overrides." },
          { title: "Audit Logs", description: "Full action history with automatic retention cleanup." },
          { title: "Multi-Project", description: "Organize services into logical projects." },
          {
            title: "Notifications",
            description: "Discord, Slack, Telegram, Email and Webhook channels.",
            tag: "5 channels",
          },
        ],
      },
    ],
  },
  howItWorks: {
    label: "workflow",
    meta: (n) => `${n} steps`,
    title: "Four steps to production",
    steps: [
      {
        step: "01",
        title: "Install on your server",
        description: "One command installs DeployKit on any VPS, behind Traefik with auto-SSL.",
        command: "npm i -g @deploykit/cli && deploykit install",
      },
      {
        step: "02",
        title: "Connect your repo",
        description: "Link a GitHub or GitLab repository and DeployKit wires up the webhook.",
        command: "deploykit link github.com/you/app",
      },
      {
        step: "03",
        title: "Push to deploy",
        description: "DeployKit detects your stack, builds the image and ships it.",
        command: "git push origin main",
      },
      {
        step: "04",
        title: "It's live",
        description: "Your app is online with SSL, a custom domain and monitoring included.",
        command: "https://app.yourdomain.com",
        kind: "output",
      },
    ],
  },
  demo: {
    label: "live demo",
    title: "From repo to running — in minutes",
    caption: "demo.mp4 — deploykit dashboard",
    playing: "● playing",
    stopped: "■ stopped",
    play: "▶ play demo",
    playLabel: "Play demo",
  },
  testimonials: {
    label: "field reports",
    title: "Teams that left the rent behind",
    items: [
      {
        quote: "We migrated 10 services off Heroku to our own box in a weekend. The git-push flow just worked.",
        author: "Carlos M.",
        role: "CTO at a gaming startup",
      },
      {
        quote:
          "git push and everything comes up with automatic SSL. That's exactly the experience we wanted to self-host.",
        author: "Ana R.",
        role: "Lead Developer",
      },
      {
        quote: "Self-hosted, open source and no recurring platform bill. For a small team there's nothing better.",
        author: "Diego L.",
        role: "Indie Hacker",
      },
    ],
  },
  cta: {
    label: "[07] get started",
    title: "Own your deploys today",
    lead: "Open source, self-hosted, no limits. One command on any VPS and you're running.",
    github: "view on github →",
    docs: "read the docs",
  },
};
