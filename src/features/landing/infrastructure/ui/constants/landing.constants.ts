import type {
  PillarI,
  StatI,
  StepI,
  TechnologyI,
  TestimonialI,
  NavLinkI,
  DeployLogLineI,
} from "@landing/infrastructure/ui/types/landing.module.types";

export const NAV_LINKS: NavLinkI[] = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#demo", label: "Demo" },
  { href: "/docs", label: "Docs" },
];

export const GITHUB_URL = "https://github.com/shakarr/deploykit";

/** Latest DeployKit release shown in the footer status line — bump on release. */
export const DEPLOYKIT_VERSION = "v0.6.0";

export const INSTALL_CMD = "npm i -g @deploykit/cli && deploykit install";

/**
 * The 16 product capabilities (from the DeployKit README) grouped into four
 * pillars that describe the lifecycle of a service: ship it, give it data,
 * operate it, govern it.
 */
export const PILLARS: PillarI[] = [
  {
    id: "ship",
    index: "01",
    label: "Ship",
    tagline: "From git push to a running container, automatically.",
    features: [
      {
        title: "App Deployments",
        description: "Deploy from GitHub, GitLab, any Git repo, or a Docker image.",
      },
      {
        title: "Auto-Build",
        description: "Nixpacks auto-detection, Dockerfile, or Cloud Native Buildpacks.",
        tag: "Nixpacks",
      },
      {
        title: "Auto-Deploy",
        description: "GitHub & GitLab webhooks trigger a deploy on every push.",
      },
      {
        title: "Preview Deployments",
        description: "Every PR gets an isolated environment on its own subdomain.",
      },
      {
        title: "Rollbacks",
        description: "One-click rollback to any previous deployment.",
      },
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
        description:
          "One-click PostgreSQL, MySQL, MongoDB, Redis and MariaDB instances.",
        tag: "5 engines",
      },
      {
        title: "Automated Backups",
        description: "Scheduled backups with retention policies and one-click restore.",
      },
      {
        title: "Environment Variables",
        description: "Managed in the UI, encrypted at rest.",
        tag: "AES-256-GCM",
      },
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
      {
        title: "Monitoring",
        description: "CPU, memory and network stats per container.",
      },
      {
        title: "Domains & SSL",
        description: "Automatic Let's Encrypt certificates via Traefik.",
      },
      {
        title: "Remote Servers",
        description: "Deploy to additional servers over SSH from one dashboard.",
      },
    ],
  },
  {
    id: "govern",
    index: "04",
    label: "Govern",
    tagline: "Control who does what, and keep the receipts.",
    features: [
      {
        title: "Role-Based Access",
        description: "Admin, Operator and Viewer roles with project-level overrides.",
      },
      {
        title: "Audit Logs",
        description: "Full action history with automatic retention cleanup.",
      },
      {
        title: "Multi-Project",
        description: "Organize services into logical projects.",
      },
      {
        title: "Notifications",
        description: "Discord, Slack, Telegram, Email and Webhook channels.",
        tag: "5 channels",
      },
    ],
  },
];

export const STATS: StatI[] = [
  { label: "capabilities", value: "16", note: "built in, four pillars" },
  { label: "databases", value: "5", note: "postgres · mysql · mongo · redis · mariadb" },
  { label: "encryption", value: "AES-256-GCM", note: "env vars encrypted at rest" },
  { label: "license", value: "MIT", note: "open source, self-hosted" },
];

export const STEPS: StepI[] = [
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
];

export const TECHNOLOGIES: TechnologyI[] = [
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
  { name: "Ruby", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
];

export const TESTIMONIALS: TestimonialI[] = [
  {
    quote:
      "We migrated 10 services off Heroku to our own box in a weekend. The git-push flow just worked.",
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
    quote:
      "Self-hosted, open source and no recurring platform bill. For a small team there's nothing better.",
    author: "Diego L.",
    role: "Indie Hacker",
  },
];

/** Lines streamed by the hero deploy console. */
export const DEPLOY_LOG: DeployLogLineI[] = [
  { text: "→ Detected Nixpacks · Node.js 20", tone: "dim" },
  { text: "↑ Building image  layers 12/12", tone: "info" },
  { text: "✓ Pushed  ghcr.io/you/app:sha-9f2c", tone: "ok" },
  { text: "↻ Rolling out  replicas 2/2 healthy", tone: "info" },
  { text: "✓ Certificate issued · Let's Encrypt", tone: "ok" },
  { text: "● Live  https://app.yourdomain.com", tone: "ok" },
];

/** Stages of the hero pipeline status line. */
export const PIPELINE_STAGES = ["git push", "build", "deploy", "live"] as const;
