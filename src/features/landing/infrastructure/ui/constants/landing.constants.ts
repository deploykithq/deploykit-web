import {
  GitBranch,
  Shield,
  Database,
  Globe,
  Activity,
  Layers,
  Server,
  Rocket,
  Clock,
  Zap,
} from "lucide-react";
import type {
  FeatureI,
  StatI,
  StepI,
  TechnologyI,
  TestimonialI,
  NavLinkI,
} from "@landing/infrastructure/ui/types/landing.module.types";

export const NAV_LINKS: NavLinkI[] = [
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
  { href: "#how-it-works", label: "How it works" },
  { href: "/docs", label: "Docs" },
];

export const FEATURES: FeatureI[] = [
  {
    icon: GitBranch,
    title: "Git Push to Deploy",
    description:
      "Connect your GitHub repository and deploy automatically with every push via webhooks.",
  },
  {
    icon: Database,
    title: "Databases",
    description:
      "Provision PostgreSQL, MySQL, Redis and more databases with a single click.",
  },
  {
    icon: Globe,
    title: "Domains & SSL",
    description:
      "Set up custom domains with automatic SSL certificates for every service.",
  },
  {
    icon: Shield,
    title: "Self-hosted",
    description:
      "Run on your own server. No vendor lock-in, your data always under your control.",
  },
  {
    icon: Activity,
    title: "Monitoring & Logs",
    description:
      "Real-time logs, configurable health checks and alerts for every application.",
  },
  {
    icon: Layers,
    title: "Nixpacks Builds",
    description:
      "Auto-detection of language and buildpacks. Support for Docker, Node, Python, Go and more.",
  },
];

export const STATS: StatI[] = [
  { icon: Server, value: 500, suffix: "+", label: "Active servers" },
  { icon: Rocket, value: 12000, suffix: "+", label: "Deploys completed" },
  { icon: Database, value: 99.9, suffix: "%", label: "Average uptime", decimals: 1 },
  { icon: Clock, value: 30, suffix: "s", label: "Deploy time" },
];

export const STEPS: StepI[] = [
  {
    icon: Server,
    step: "01",
    title: "Install on your server",
    description: "A single command to install DeployKit on any VPS or dedicated server.",
  },
  {
    icon: GitBranch,
    step: "02",
    title: "Connect your repo",
    description: "Link your GitHub repository and set up the webhook for automatic deploys.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Deploy",
    description: "DeployKit detects your stack, builds the image and deploys your application.",
  },
  {
    icon: Globe,
    step: "04",
    title: "Online!",
    description: "Your app is running with SSL, custom domain and monitoring included.",
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
    quote: "DeployKit allowed us to migrate 10 services from Heroku to our own server in a weekend. Incredible.",
    author: "Carlos M.",
    role: "CTO at a gaming startup",
  },
  {
    quote: "The simplicity of git push and having everything running with automatic SSL is exactly what we needed.",
    author: "Ana R.",
    role: "Lead Developer",
  },
  {
    quote: "Self-hosted, open source and no recurring platform costs. There's nothing better for small teams.",
    author: "Diego L.",
    role: "Indie Hacker",
  },
];
