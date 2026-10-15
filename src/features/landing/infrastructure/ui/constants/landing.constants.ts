import type {
  TechnologyI,
  DeployLogLineI,
} from "@landing/infrastructure/ui/interfaces/LandingI";

export const INSTALL_CMD = "npm i -g @deploykit/cli && deploykit install";

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

/** Líneas emitidas por la consola de deploy del hero. */
export const DEPLOY_LOG: DeployLogLineI[] = [
  { text: "→ Detected Nixpacks · Node.js 20", tone: "dim" },
  { text: "↑ Building image  layers 12/12", tone: "info" },
  { text: "✓ Pushed  ghcr.io/you/app:sha-9f2c", tone: "ok" },
  { text: "↻ Rolling out  replicas 2/2 healthy", tone: "info" },
  { text: "✓ Certificate issued · Let's Encrypt", tone: "ok" },
  { text: "● Live  https://app.yourdomain.com", tone: "ok" },
];

/** Etapas de la línea de estado del pipeline del hero. */
export const PIPELINE_STAGES = ["git push", "build", "deploy", "live"] as const;
