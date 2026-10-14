import { ChevronRight } from "lucide-react";
import { CodeBlock } from "@docs/infrastructure/ui/components/CodeBlock";
import type { DocsSectionContentI } from "@docs/infrastructure/ui/types/docs.module.types";

export const DOCS_CONTENT: Record<string, DocsSectionContentI> = {
  "getting-started": {
    title: "Introduction",
    description:
      "Everything you need to know about DeployKit and how it works.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            What is DeployKit?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit is a self-hosted, open-source PaaS (Platform as a Service)
            that deploys applications, databases, Compose stacks and game
            servers on your own infrastructure. Think of it as your own Vercel
            or Heroku, with full control over your data, no vendor lock-in, and
            no usage limits. Underneath it is plain Docker, Compose and Traefik:
            uninstall DeployKit and your containers keep running.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            This documentation covers DeployKit{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              v0.6.0
            </code>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Key Features
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "Applications",
                desc: "Deploy from GitHub, GitLab, any Git repo, or a Docker image, with rollbacks, replicas, autoscaling and maintenance mode",
                href: "#applications",
              },
              {
                name: "Auto-Detect Builds",
                desc: "Nixpacks, Dockerfile, or Cloud Native Buildpacks, with optional Trivy vulnerability scanning",
                href: "#applications",
              },
              {
                name: "Databases",
                desc: "One-click PostgreSQL, MySQL, MariaDB, MongoDB, and Redis with scheduled backups and restore",
                href: "#databases",
              },
              {
                name: "Compose Stacks & Templates",
                desc: "Run a whole docker-compose.yml as a unit, or install one from the one-click template catalogue",
                href: "#templates",
              },
              {
                name: "Game Servers",
                desc: "Minecraft, Valheim, CS2 and Terraria from a catalogue, with live console, file manager, world backups and mods",
                href: "#game-servers",
              },
              {
                name: "GitHub App",
                desc: "Private repos without personal tokens, commit statuses on every deploy, and PR previews",
                href: "#github-app",
              },
              {
                name: "Webhooks & Previews",
                desc: "Auto-deploy on push from GitHub, GitLab or any CI, plus ephemeral environments for pull requests",
                href: "#webhooks",
              },
              {
                name: "Automatic SSL",
                desc: "Free HTTPS certificates via Let's Encrypt + Traefik for every domain",
                href: "#domains",
              },
              {
                name: "Scheduled Tasks",
                desc: "Cron jobs and one-off commands (migrations, scripts) in isolated containers",
                href: "#scheduled-tasks",
              },
              {
                name: "Monitoring & Alerts",
                desc: "Live and historical CPU, memory and network metrics, alert rules, and persistent searchable logs",
                href: "#monitoring",
              },
              {
                name: "Status Pages",
                desc: "A public, no-login page showing the live state and uptime of the services you choose",
                href: "#status-pages",
              },
              {
                name: "Export & Import",
                desc: "Your whole instance as a YAML file: review it in git, or rebuild it on a new server",
                href: "#export-import",
              },
              {
                name: "Remote Servers",
                desc: "Deploy to other machines over SSH, with a managed SSH key catalogue",
                href: "#servers",
              },
              {
                name: "Role-Based Access",
                desc: "Admin, Operator, and Viewer roles with per-project overrides and a full audit log",
                href: "#users-rbac",
              },
              {
                name: "Notifications",
                desc: "Discord, Slack, Telegram, Email, and Webhook alerts",
                href: "#notifications",
              },
            ].map((feature) => (
              <a
                key={feature.name}
                href={feature.href}
                className="rounded-lg border border-border bg-card p-4 hover:border-primary/40"
              >
                <p className="font-medium text-bright">{feature.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {feature.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Architecture
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            DeployKit is a control plane: a dashboard and an API that drive the
            Docker daemon of one or more machines. It does not run your
            applications inside itself — it tells Docker to run them. A
            production install runs these containers:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "API — Fastify 5 + tRPC 11, Drizzle ORM, BullMQ workers and Socket.IO. It mounts the host's Docker socket to build images and create containers, and is the only component that talks to the database and Docker",
              "Web — React 19 SPA (TanStack Router, TanStack Query, Tailwind CSS) served on the same domain as the API",
              "Traefik v3.6 — Reverse proxy on ports 80/443. Discovers containers by their labels and issues Let's Encrypt certificates. It reads Docker through a read-only socket proxy, never the socket itself",
              "PostgreSQL 16 — Stores all configuration, users, projects, deployment history, metrics and audit data",
              "Redis 7 — Password-protected. Holds the BullMQ queues (deploys, backups, scheduled tasks), refresh tokens and rate-limit counters",
              "Docker socket proxy — Read-only Docker API for Traefik, on an internal network only Traefik can reach",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Your applications, databases and stacks join the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit-network
            </code>{" "}
            Docker network, where Traefik routes to them. Game servers run on a
            separate network,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit-games
            </code>
            , and players connect to their ports directly. Deploys and backups
            are queued and processed by workers; the dashboard follows progress
            in real time over Socket.IO.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            System Requirements
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Linux server (Ubuntu, Debian, RHEL family, or Alpine)",
              "1 vCPU minimum (2+ recommended — image builds are CPU-heavy)",
              "1 GB RAM minimum (2+ GB recommended; a modded Minecraft server alone wants 4–8 GB)",
              "10 GB disk minimum (50+ GB recommended depending on images, data, backups and game worlds)",
              "Ports 80 and 443 open — port 80 is required even if everything ends up on HTTPS, because Let's Encrypt validates over it",
              "Root or sudo access",
              "Node.js 20+ on the server, only to run the installer CLI",
            ].map((req) => (
              <li key={req} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  installation: {
    title: "Installation",
    description: "Install DeployKit on your server in minutes.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Install via the CLI (Recommended)
          </h3>
          <p className="text-muted-foreground mb-4">
            DeployKit is installed and managed with the official{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              @deploykit/cli
            </code>
            . SSH into your VPS (Node.js 20+ required), install it globally and
            run the installer:
          </p>
          <CodeBlock
            language="bash"
            code={`npm install -g @deploykit/cli
sudo deploykit install --domain deploy.example.com --email you@example.com

# Or one-shot, without a global install
sudo npx @deploykit/cli install --domain deploy.example.com --email you@example.com`}
          />
          <p className="text-sm text-muted-foreground mt-3">
            Run{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              sudo deploykit install
            </code>{" "}
            without{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              --domain
            </code>{" "}
            /{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              --email
            </code>{" "}
            in a terminal to be prompted for the dashboard domain, the Let&apos;s
            Encrypt email, and an optional admin email and password. By default
            the latest released version is installed; see the{" "}
            <a href="#cli" className="text-primary hover:underline">
              CLI Reference
            </a>{" "}
            for{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              --tag
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              --branch
            </code>{" "}
            and the other flags.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            What the installer does
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Checks it is running on Linux as root and reports the system specs",
              "Installs Git, Docker and the Docker Compose plugin if they are missing",
              "Clones DeployKit into /opt/deploykit at the selected release",
              "Generates every secret (database password, JWT secrets, encryption key, webhook secret) into /opt/deploykit/.env with mode 600. If a .env already exists, its secrets are kept and only the domain and email are updated",
              "Creates the deploykit-network Docker network and /var/backups/deploykit, builds the images and starts the stack",
              "Waits for the API and, if you passed an admin email and password, tries to create the admin account",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              Redis password (v0.6.0+):
            </span>{" "}
            since v0.6.0 the production Compose file refuses to start without{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              REDIS_PASSWORD
            </code>{" "}
            in{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>
            , and the installer does not generate it yet. If the install stops
            with{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Set REDIS_PASSWORD in .env
            </code>
            , add one (hex only — it goes inside a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              redis://
            </code>{" "}
            URL) and run the same install command again; your generated
            secrets are kept:
          </p>
          <div className="mt-3">
            <CodeBlock
              language="bash"
              code={`echo "REDIS_PASSWORD=$(openssl rand -hex 32)" | sudo tee -a /opt/deploykit/.env
sudo deploykit install --domain deploy.example.com --email you@example.com`}
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Manual Installation
          </h3>
          <p className="text-muted-foreground mb-4">
            If you prefer to run the production Compose file yourself:
          </p>
          <CodeBlock
            language="bash"
            code={`# 1. Clone the repository (pick a release tag)
git clone https://github.com/deploykithq/deploykit.git /opt/deploykit
cd /opt/deploykit
git checkout v0.6.0

# 2. Create .env from the production template
cp .env.production .env
# Set DOMAIN and ACME_EMAIL, then replace every CHANGE_ME:
openssl rand -hex 32     # ENCRYPTION_KEY (64 hex chars)
openssl rand -hex 32     # REDIS_PASSWORD (hex only)
openssl rand -hex 24     # DB_PASSWORD (hex: it is embedded in DATABASE_URL)
openssl rand -base64 32  # JWT_SECRET, JWT_REFRESH_SECRET, WEBHOOK_SECRET

# 3. The proxy network is external and must exist first
docker network create deploykit-network

# 4. Build and start everything (migrations run when the API starts)
docker compose -f docker-compose.prod.yml up -d --build`}
          />
          <p className="text-sm text-muted-foreground mt-3">
            Do not set{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEB_URL
            </code>{" "}
            in production — the Compose file derives it as{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              https://$&#123;DOMAIN&#125;
            </code>
            . See{" "}
            <a href="#config" className="text-primary hover:underline">
              Configuration
            </a>{" "}
            for every variable.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            What Gets Installed
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Traefik v3.6 — Reverse proxy on ports 80/443 with automatic Let's Encrypt SSL (HTTP → HTTPS redirect)",
              "Docker socket proxy — Read-only Docker API for Traefik",
              "PostgreSQL 16 — Main database (volume pgdata)",
              "Redis 7 — Password-protected job queue and cache (volume redis-data)",
              "DeployKit API — Node 20 Alpine container with Docker socket access; serves /api, /trpc and /ws on your domain",
              "DeployKit Web — The dashboard, served on the same domain",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Host paths used:{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /opt/deploykit
            </code>{" "}
            (install),{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /var/backups/deploykit
            </code>{" "}
            (database and game-server backups) and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /var/lib/deploykit/compose
            </code>{" "}
            (Compose stack files).
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Post-Installation
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Point an{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              A
            </code>{" "}
            record for your domain at the server&apos;s public IP — Traefik
            requests the certificate on the first request. Then open{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              https://deploy.example.com
            </code>
            . If no admin account was created during install, you&apos;ll see
            a registration form: the first user to register becomes the admin,
            and registration closes after that. Continue with the{" "}
            <a href="#quickstart" className="text-primary hover:underline">
              Quickstart
            </a>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Updating DeployKit
          </h3>
          <CodeBlock
            language="bash"
            code={`# Latest release
sudo deploykit update

# Pin (or roll back to) a specific release
sudo deploykit update --tag v0.6.0

# Manual installs
cd /opt/deploykit && git pull && docker compose -f docker-compose.prod.yml up -d --build`}
          />
          <p className="text-sm text-muted-foreground mt-3">
            Database migrations run automatically when the API container
            starts, and it refuses to start if they fail. Upgrading to v0.6.0
            from an earlier version requires adding{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              REDIS_PASSWORD
            </code>{" "}
            to{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            first (see above).
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Tip:</span> if the API
            container will not start and its logs show{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              relation &quot;users&quot; already exists
            </code>
            , the database was created by an old fallback that left no
            migration bookkeeping. Repair it once with{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              sudo scripts/repair-migration-state.sh
            </code>{" "}
            from{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /opt/deploykit
            </code>
            .
          </p>
        </div>
      </div>
    ),
  },
  quickstart: {
    title: "Quickstart",
    description: "Deploy your first application in a few steps.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            1. Create your admin account
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            When you open the dashboard for the first time and no account
            exists yet, you&apos;ll see a registration form. Enter your email
            and a password (8+ characters) to create the admin account, which
            has full control over the platform. Registration closes after the
            first user: everyone else is invited by an admin from{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Users
            </code>
            . If you passed{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              --admin-email
            </code>{" "}
            to the installer and it succeeded, just log in.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            2. Follow the Welcome checklist
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The dashboard shows a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Welcome to DeployKit
            </code>{" "}
            card until you deploy your first application or database. It walks
            you through three steps:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Connect a server — click “Use local server” to register the machine DeployKit runs on (admins only), or add a remote server over SSH from Servers",
              "Create a project — projects group related applications, databases, stacks and game servers, and carry their own member roles",
              "Deploy from a template — “Browse templates” opens the one-click catalogue of databases, self-hosted apps and full stacks",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            3. Add an application
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            To deploy your own code instead of a template, open the project and
            click{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Add Application
            </code>
            . Pick the source (GitHub, GitLab, any Git URL, or a Docker image),
            the branch, the build type (Nixpacks for auto-detection,
            Dockerfile, or Buildpacks), the target server, and the port your
            app listens on. If a GitHub App is connected you can pick the
            repository from a list — private repos included, no access token
            needed. The same project page also has{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Add Database
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Add Stack
            </code>{" "}
            and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              New game server
            </code>
            .
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Port binding:</span>{" "}
            your app must listen on the port you configure and bind to{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              0.0.0.0
            </code>
            , not{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              localhost
            </code>
            . An app that only listens on localhost inside its container is
            unreachable through Traefik — the most common reason a deploy
            succeeds but the site does not load.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">4. Deploy</h3>
          <p className="text-muted-foreground leading-relaxed">
            Click{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Deploy
            </code>{" "}
            on the application page. DeployKit clones the repository, builds a
            Docker image, starts the container with Traefik labels for routing,
            and runs the health check. Follow the build logs in real time from
            the Deployments tab. Then add a domain to the application and
            point its DNS at the server — the certificate is issued
            automatically.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Tip:</span> for
            github.com repositories, register a{" "}
            <a href="#github-app" className="text-primary hover:underline">
              GitHub App
            </a>{" "}
            in Settings so every push deploys automatically, deploys report a
            commit status, and pull requests get preview environments. For
            GitLab or any other CI, use{" "}
            <a href="#webhooks" className="text-primary hover:underline">
              webhooks
            </a>
            .
          </p>
        </div>
      </div>
    ),
  },
  applications: {
    title: "Applications",
    description:
      "Create, configure, deploy, scale, and operate applications built from Git or pulled from a registry.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Source Types
          </h3>
          <p className="text-muted-foreground mb-4">
            Create an application from your project page with{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              New Application
            </code>
            . The{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Source
            </code>{" "}
            field accepts:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "GitHub",
                desc: "Pick a repository through the GitHub App (when one is configured), or use a repository URL with an optional access token for private repos.",
              },
              {
                name: "GitLab",
                desc: "Repository URL with an optional GitLab access token for private repos.",
              },
              {
                name: "Git (any)",
                desc: "Any Git repository reachable over HTTPS, with optional token authentication.",
              },
              {
                name: "Docker Image",
                desc: "Deploy an existing image from a registry. Nothing is built — the image is pulled on every deploy.",
              },
            ].map((source) => (
              <div
                key={source.name}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="font-medium text-bright">{source.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {source.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            When an application is connected through the GitHub App, it is
            cloned with a short-lived installation credential (no token is
            stored for the app), pushes and pull requests arrive without a
            per-repo webhook, and DeployKit can report commit statuses back to
            GitHub. You can switch an existing app between the GitHub App and a
            URL + token from the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              General
            </code>{" "}
            tab (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Change repository
            </code>{" "}
            /{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Connect through the GitHub App instead
            </code>
            ). Without the App, copy the webhook URL shown in the General tab
            into your repository&apos;s webhook settings to auto-deploy on push.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            For a Docker Image source, the image reference (for example{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ghcr.io/acme/api:1.4.0
            </code>
            ) is stored in the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Repository URL
            </code>{" "}
            field of the General tab.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Port and Networking
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Set{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Port
            </code>{" "}
            to the port your process listens on inside the container (default{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              3000
            </code>
            ). With at least one domain, Traefik routes traffic to that port
            and nothing is published on the host. Without a domain, the same
            port is published on the host (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              host:port → container:port
            </code>
            ), so two apps without domains cannot share a port. Domains are
            managed from the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Domains
            </code>{" "}
            tab — an app can have several; see{" "}
            <span className="text-bright">Domains &amp; SSL</span>.
          </p>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mt-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-bright font-medium">Tip:</span> your app
              must listen on the configured port and bind to{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                0.0.0.0
              </code>
              , not{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                localhost
              </code>
              . A process bound to localhost starts fine but is unreachable
              from Traefik.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Build Strategies
          </h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-bright">
                Nixpacks (auto-detect, default)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Detects your language and framework and builds an image with no
                configuration. Override the detected start command with{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  Start Command
                </code>{" "}
                (Nixpacks only). If Nixpacks fails or is not installed, the
                build automatically falls back to the Dockerfile strategy. A
                Nixpacks build times out after 10 minutes.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-bright">Dockerfile</p>
              <p className="text-sm text-muted-foreground mt-1">
                Uses your own Dockerfile. Set{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  Dockerfile Path
                </code>{" "}
                relative to the repo root (or to the Root Directory), without a{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  ./
                </code>{" "}
                prefix; the path must stay inside the build context. If no
                Dockerfile exists, DeployKit generates one for common stacks:
                Go, Python, Next.js, static SPAs (Vite, CRA, Vue, Angular,
                Svelte) and Node servers. For Node servers it runs your{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  start
                </code>{" "}
                script, so multi-step commands like{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  prisma migrate deploy &amp;&amp; node dist/index.js
                </code>{" "}
                run in full.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-bright">Buildpacks</p>
              <p className="text-sm text-muted-foreground mt-1">
                Cloud Native Buildpacks via{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  pack build
                </code>
                . Good for projects that follow standard conventions.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mt-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-bright font-medium">Remote servers:</span>{" "}
              apps deployed to a remote server are cloned and built on that
              server with{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                docker build
              </code>{" "}
              using the repository&apos;s Dockerfile. Nixpacks, Buildpacks and
              Dockerfile auto-generation only run for apps on the local server,
              so make sure the repo ships a Dockerfile when targeting a remote
              server.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Monorepo Support
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Deploy applications from subdirectories by setting the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Root Directory
            </code>{" "}
            (for example{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              apps/web
            </code>
            ). DeployKit uses that directory as the build context. When it
            generates a Dockerfile for a workspace member, it detects the
            package manager (lock files, then{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              pnpm-workspace.yaml
            </code>{" "}
            or the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              packageManager
            </code>{" "}
            field) and builds the package together with its workspace
            dependencies.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Environment Variables
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Manage environment variables from the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Environment
            </code>{" "}
            tab of your application, in{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              KEY=VALUE
            </code>{" "}
            format, one per line. Values are masked until you click{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Reveal
            </code>
            . All variables are encrypted at rest using AES-256-GCM and
            injected into the container at runtime. Changes take effect on the
            next deploy.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For security, environment variables are{" "}
            <span className="text-bright">
              not passed as Docker build arguments
            </span>{" "}
            — build args leak into image layers and are readable via{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker inspect
            </code>
            . Instead, before each build DeployKit writes your app&apos;s
            variables to a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            file at the root of the build context, so frameworks that inline
            variables at build time (Vite, Create React App, Next.js) can pick
            them up.
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            {[
              "Nixpacks / Buildpacks — the generated .env sits at the build context root, where most frameworks read it automatically. No extra setup needed.",
              "Custom Dockerfile — your Dockerfile must COPY the generated .env into the build stage before the build step runs; otherwise build-time variables are silently missing.",
              "Monorepos — the .env is written at the context root (the repo root when Root Directory is empty). Copy it into the app subdirectory: frameworks like Vite read env files from the app directory, not the monorepo root.",
              "Check your .dockerignore — if it excludes .env, the Docker daemon drops the generated file from the build context and build-time variables never arrive.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mb-3">
            Example for a Vite app in a pnpm monorepo (build context = repo
            root):
          </p>
          <CodeBlock
            language="dockerfile"
            code={`# DeployKit writes your app's env vars to a .env at the context root.
# The ".env*" glob keeps local builds working when no .env exists.
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .env* ./

COPY apps/web apps/web
# Vite reads env files from the app directory, not the monorepo root
RUN if [ -f .env ]; then cp .env apps/web/.env; fi
RUN pnpm --filter web build`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Persistent Volumes
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Add mounts under{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Persistent Volumes
            </code>{" "}
            in the General tab (up to 20). The source can be an absolute host
            path or a Docker named volume, and the container path must be
            absolute. An optional{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              :ro
            </code>{" "}
            suffix mounts it read-only. Volumes persist across deploys,
            rollbacks and replicas.
          </p>
          <CodeBlock
            language="bash"
            code={`/srv/myapp/uploads:/app/uploads      # bind mount from the host
myapp-data:/var/lib/data             # Docker named volume
/srv/myapp/config:/app/config:ro     # read-only`}
          />
          <ul className="space-y-2 text-muted-foreground mt-4">
            {[
              "Bind mounts of sensitive host directories (such as /etc, /proc, /sys, /dev, /boot, /root) and paths containing '..' are rejected.",
              "Paths that the image declares with a VOLUME directive and that you did not mount are automatically covered by a stable named volume (dk-<app>-<path>), so their data survives redeploys instead of landing in a fresh anonymous volume each time.",
              "After the container starts, DeployKit inspects its real mounts. If a configured volume is missing, the deploy fails loudly rather than letting writes go to the container filesystem, where the next redeploy would wipe them.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Health Checks
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            After the container starts, DeployKit can check that your app is
            actually serving. Choose the type in the General tab:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "HTTP — sends a GET to the configured path (default /) on the app's first domain, or on localhost:<port> when it has no domain. 2xx and 3xx responses count as healthy; redirects are not followed.",
              "TCP — checks that the port accepts connections. Useful for non-HTTP services.",
              "None — skips the check; the app is marked running as soon as the container starts.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Configure timeout (default 5 s), interval (default 10 s) and
            retries (default 6). With{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Fail deploy if health check does not pass
            </code>{" "}
            enabled, a failing check marks the deployment as failed; otherwise
            it only logs a warning and the container keeps running.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Resource Limits
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Under{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Resources
            </code>
            , set a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              CPU (cores)
            </code>{" "}
            limit (0.1 to 8) and a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Memory (MB)
            </code>{" "}
            limit (64 to 32768) per container. Leave them empty for no limit.
            Limits apply to every replica and take effect on the next deploy.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Replicas and Autoscaling
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Set{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Replicas
            </code>{" "}
            (1 to 10) to run several identical containers; Traefik load
            balances between them. The General tab shows the live state of
            each instance.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Enable{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Autoscaling
            </code>{" "}
            to adjust the replica count by average load across running
            replicas, within{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Min replicas
            </code>{" "}
            and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Max replicas
            </code>
            . Set a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              CPU target %
            </code>{" "}
            (relative to the CPU limit, or to one core if no limit is set)
            and/or a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Memory target %
            </code>
            ; leave a target empty to ignore that metric. Scaling happens live,
            without a rebuild.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Load is evaluated every 30 seconds.",
              "Scale up: one replica is added after load stays above the target for 1 minute.",
              "Scale down: one replica is removed only after load stays below half the target for 5 minutes.",
              "After any scaling action there is a 180-second cooldown.",
              "Autoscaling currently works for apps on the local server only.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mt-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-bright font-medium">
                Replicas need a domain.
              </span>{" "}
              Without a domain the app publishes a fixed host port, which a
              second container cannot bind, so DeployKit deploys a single
              instance (the deploy log says{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                Replicas require a domain
              </code>
              ). The Replicas and Autoscaling fields stay disabled until the app
              has a domain. If autoscaling &quot;does nothing&quot;, check this
              first.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Maintenance Mode
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Click{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Maintenance
            </code>{" "}
            in the application header to show a maintenance page on all of the
            app&apos;s domains, with an optional message (up to 500
            characters). Your app is not stopped or redeployed: a small
            maintenance container takes over the app&apos;s domains in Traefik,
            and turning it off restores traffic immediately.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Every URL returns HTTP 503 with Retry-After, so caches and uptime monitors never treat the page as up.",
              "The page shows since when the app is in maintenance, adapts to light/dark mode and English/Spanish, and reloads itself once the app is back.",
              "Maintenance survives deploys. You can deploy, stop or scale the app behind it and check it before reopening; it only ends when you click Turn off.",
              "Use Edit message to change the text while it is active. Domains added during maintenance are covered too.",
              "The app needs at least one domain, and you need the operator role on the project. Works on remote servers too.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Logs</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Container logs are collected continuously for every running
            container, whether or not anyone has the dashboard open. The{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Logs
            </code>{" "}
            tab has two modes:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Live — streams the container's output in real time.",
              "History — searches persisted logs by text and filters by level (error, warn, info, debug, fatal). Levels are inferred from the log text on a best-effort basis.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Persisted logs are kept for 7 days by default (set{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              LOG_RETENTION_DAYS
            </code>{" "}
            on the API to change it). Common secrets — tokens such as{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ghp_
            </code>{" "}
            or{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              sk_live_
            </code>
            , Bearer/Basic headers, tokens in Git URLs,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              password=
            </code>{" "}
            pairs and AWS keys — are redacted before logs are stored or
            streamed. Build output for each deploy is in the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Deployments
            </code>{" "}
            tab.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Web Terminal
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Terminal
            </code>{" "}
            tab opens an interactive shell inside the running container from
            your browser (click{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Connect
            </code>
            ; fullscreen is available).
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "The app must be deployed and running.",
              "Requires the operator or admin global role and the operator role on the app's project.",
              "The image must contain /bin/sh, /bin/bash or /bin/ash; images without a shell (e.g. distroless) cannot open a terminal.",
              "Sessions close after 15 minutes of inactivity.",
              "Commands are not recorded. For a one-off command with a stored exit code and output, use the Tasks tab instead.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Rollbacks</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Every deployment records its commit, build logs and the image it
            produced. From the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Deployments
            </code>{" "}
            tab you can roll back to a previous deployment. Nothing is rebuilt:
            DeployKit restarts the app from the stored image, so a rollback
            takes seconds. It appears as a new deployment named{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Rollback to &lt;commit&gt;
            </code>
            . Only the image changes — the app&apos;s current environment
            variables, domains, volumes, limits and replica count are used.
            Rolling back requires the operator role on the project.
          </p>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-bright font-medium">
                Rollback depth is 3.
              </span>{" "}
              A daily cleanup (around 03:00) keeps only the images of each
              app&apos;s 3 most recent successful deployments plus any image in
              use. Older entries still appear in the list but cannot be rolled
              back (
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                No image stored — cannot roll back
              </code>
              ).
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Deploying and Day-to-Day Controls
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Deploy — builds and deploys the app's default branch.",
              "Deploy from branch (the branch button next to Deploy) — deploys any branch once, without changing the app's default branch.",
              "Stop / Start — stops all of the app's containers or starts them again without a rebuild.",
              "Auto-deploy — a push to the default branch triggers a deploy through the GitHub App or the repository webhook (see Webhooks).",
              "Other tabs: Monitoring (CPU/memory metrics), Security (image vulnerability scan results), Tasks (scheduled and one-off commands) and Previews (pull request environments).",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Deployment Pipeline
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            When you trigger a deployment, the following happens:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "A deployment record is created with status 'queued' and the request returns immediately.",
              "Deploys of the same app run one at a time; a new deploy waits until the previous one finishes.",
              "The repository is cloned (shallow, chosen branch) using the GitHub App credential or the stored token — or, for Docker Image sources, the image is pulled.",
              "Env vars are decrypted and written to a .env file at the build context root, so build-time variables reach the build.",
              "The image is built with the selected strategy and tagged deploykit/<app>:<commit>. On remote servers, clone and build happen on that server.",
              "Optionally, the image is scanned for vulnerabilities (advisory only — a scan never blocks a deploy).",
              "DeployKit re-reads the app's settings, so config changes saved during the build (env, domains, volumes, limits) are applied.",
              "All old containers of the app are stopped and removed, then the new container(s) start with Traefik routing labels, configured volumes and resource limits.",
              "The real mounts are verified and the health check runs (if configured).",
              "The deployment status is updated, notifications are sent and, with the GitHub App, a commit status is reported.",
              "Build and deploy logs stream to the dashboard in real time.",
            ].map((step) => (
              <li key={step} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  databases: {
    title: "Databases",
    description:
      "One-click managed databases with encrypted credentials, scheduled backups and one-click restore.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Supported Engines
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            DeployKit runs the official image of each engine. The version is
            fixed per engine:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "PostgreSQL 16",
                desc: "postgres:16-alpine, port 5432",
              },
              {
                name: "MySQL 8",
                desc: "mysql:8, port 3306",
              },
              {
                name: "MariaDB 11",
                desc: "mariadb:11, port 3306",
              },
              {
                name: "MongoDB 7",
                desc: "mongo:7, port 27017, optional replica set (rs0)",
              },
              {
                name: "Redis 7",
                desc: "redis:7-alpine, port 6379",
              },
            ].map((db) => (
              <div
                key={db.name}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="font-medium text-bright">{db.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{db.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Creating a Database
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            From your project page, open{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              New Database
            </code>
            , pick a name, a type and the target server. For MongoDB you can
            tick{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Enable Replica Set
            </code>
            . Creating a database requires the Operator or Admin role on the
            project.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "The container is named dk-<name> and its data lives in the Docker volume dk-<name>-data",
              "The user is admin with a generated password, stored encrypted (AES-256-GCM); the initial database is named after the database",
              "Redis is created without a password — it is only reachable from inside the Docker network",
              "MongoDB replica sets get a keyfile and rs.initiate() automatically, so transactions and change streams work",
              "Each database has Connection, Backups, Monitoring, Logs and Tasks tabs — metrics, persistent logs and alert rules work exactly as for applications",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Connecting from Your Apps
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Databases are <strong>not exposed to the internet</strong>: they
            get no domain, no Traefik route and no published host port. They
            live on the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit-network
            </code>{" "}
            Docker network and are reached by the internal hostname{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              dk-&lt;name&gt;
            </code>{" "}
            from applications running on the same server. Copy the connection
            string from the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Connection
            </code>{" "}
            tab into an environment variable of your app:
          </p>
          <CodeBlock
            language="bash"
            code={`# PostgreSQL
postgresql://admin:<password>@dk-mydb:5432/mydb

# MySQL / MariaDB
mysql://admin:<password>@dk-mydb:3306/mydb

# MongoDB (replicaSet=rs0 is added when the replica set is enabled)
mongodb://admin:<password>@dk-mydb:27017/mydb?authSource=admin

# Redis
redis://dk-mydb:6379`}
          />
          <p className="text-muted-foreground leading-relaxed mt-4">
            Only project Operators and Admins can see the connection string and
            password; Viewers see a restricted notice instead. There is no
            option to publish a database port. For ad-hoc work (a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              VACUUM
            </code>
            , a one-off query) use the database&apos;s Tasks tab: commands run
            in the engine&apos;s client image with{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DK_DB_HOST
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DK_DB_USER
            </code>{" "}
            and the password already injected.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Scheduled Backups
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            In the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Backups
            </code>{" "}
            tab, switch on automatic backups, choose a schedule (daily at 2:00
            AM, every 6 or 12 hours, weekly or monthly) and a retention period,
            then click{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Save Config
            </code>
            . The schedule takes effect immediately — no restart needed.{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Backup Now
            </code>{" "}
            queues a manual backup at any time.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Engine</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Method
                  </th>
                  <th className="px-4 py-2 font-medium text-bright">File</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  ["PostgreSQL", "pg_dump, gzipped", ".sql.gz"],
                  ["MySQL / MariaDB", "mysqldump, gzipped", ".sql.gz"],
                  ["MongoDB", "mongodump --archive --gzip", ".archive.gz"],
                  ["Redis", "BGSAVE, then copy of dump.rdb", ".rdb"],
                ].map(([engine, method, file]) => (
                  <tr key={engine}>
                    <td className="px-4 py-2 text-foreground">{engine}</td>
                    <td className="px-4 py-2">{method}</td>
                    <td className="px-4 py-2 font-mono text-xs">{file}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="space-y-2 text-muted-foreground mt-4">
            {[
              "Files are written to /var/backups/deploykit/<database-name>/ on the host (bind-mounted into the API container)",
              "Retention is in days (1–365, default 7): after each successful backup, files older than the retention period are deleted",
              "Schedules run on the API container's clock, which is UTC by default",
              "Each backup fires a backup.completed or backup.failed notification, and manual backups and config changes are recorded in the audit log",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Restoring a Backup
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The Backups tab lists every file with its size and age. Use the
            restore button next to a backup and confirm; delete removes the file
            permanently. Restoring and deleting backups require the Operator or
            Admin role on the project.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "PostgreSQL and MySQL/MariaDB replay the SQL dump into the existing database — objects that already exist can conflict, so restore into an empty database when in doubt",
              "MongoDB restores with --drop, replacing the collections contained in the archive",
              "Redis backups are listed and kept on disk, but the dashboard offers no restore button for them",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Stopping and Deleting
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Operators can stop and start a database. Deleting it requires the
            Admin role on the project and removes the container and its backup
            schedule; the data volume{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              dk-&lt;name&gt;-data
            </code>{" "}
            and the backup files on disk are kept. A database imported from a
            configuration manifest has no container yet: the first{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Start
            </code>{" "}
            provisions it with the stored password, so existing connection
            strings keep working.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Note:</span> Backups
            and restores run through the Docker daemon of the DeployKit host,
            so they only work for databases on the local server. Also, the
            password is baked into the volume on first start — if you delete a
            database and create a new one with the same name, the old volume is
            reused with the old password. Remove the volume with{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker volume rm dk-&lt;name&gt;-data
            </code>{" "}
            first if you want a clean start.
          </p>
        </div>
      </div>
    ),
  },
  domains: {
    title: "Domains & SSL",
    description:
      "Route custom domains to your apps through Traefik, with automatic Let's Encrypt certificates.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Adding Domains to an Application
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            In the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Domains
            </code>{" "}
            tab of an application, click{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Add Domain
            </code>{" "}
            and enter the hostname and the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Container Port
            </code>{" "}
            your app listens on. Adding or removing domains requires the
            Operator or Admin role on the project.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "An application can have as many domains as you like — root domains, subdomains, or both (example.com and www.example.com)",
              "Each domain has its own container port, so one container can serve different ports on different hostnames",
              "Hostnames must be valid FQDNs; they are lowercased automatically",
              "Domains added from the dashboard always use HTTPS",
              "Changes take effect on the next deploy — routing labels are set when the container is created, so redeploy after adding or removing a domain",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            DNS Configuration
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Point each domain at the public IP of the server the app runs on,
            then add it in DeployKit:
          </p>
          <CodeBlock
            language="bash"
            code={`# Root domain
A      example.com       → YOUR_SERVER_IP

# Subdomain
A      api.example.com   → YOUR_SERVER_IP
# or
CNAME  api.example.com   → example.com`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Automatic SSL with Let&apos;s Encrypt
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Traefik v3 obtains and renews a certificate for every HTTPS domain
            using the Let&apos;s Encrypt HTTP challenge. Plain HTTP requests on
            port 80 are redirected to HTTPS. For a certificate to be issued:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "The domain's DNS must already resolve to the server",
              "Ports 80 and 443 must be open — port 80 is required for the challenge even though traffic is then redirected",
              "Wildcard certificates (*.example.com) cannot be obtained with the HTTP challenge; each hostname gets its own certificate",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            How Routing Works
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            When a container is deployed, DeployKit attaches Traefik labels to
            it: one router and one service per domain, with each router bound
            explicitly to its own service. Traefik picks the labels up and
            routes the hostname to the right container and port. Nothing is
            exposed unless it has a domain.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "With a domain: no host port is published, and replicas are load-balanced by Traefik",
              "Without a domain: the app's port is published on the host and only one instance runs — replicas require a domain",
              "Maintenance mode answers on the app's domains, so it needs at least one",
              "Compose stacks have their own domains: each domain targets one service of the stack (and can add a path prefix)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              Several domains returning 404?
            </span>{" "}
            Before v0.5.0, an app or stack service with two or more domains
            produced Traefik routers that were not bound to a service, so
            Traefik dropped all of them (its log shows{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              cannot be linked automatically with multiple Services
            </code>
            ) while the dashboard still showed the app as running. This is
            fixed, but labels are baked in when the container is created:{" "}
            <strong>redeploy</strong> any app or stack that already had several
            domains after upgrading.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            The Dashboard&apos;s Own Domain
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The panel is routed the same way. In production, set{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DOMAIN
            </code>{" "}
            and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ACME_EMAIL
            </code>{" "}
            in your{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>
            . The API answers on{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /api
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /trpc
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /socket.io
            </code>{" "}
            and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /ws
            </code>{" "}
            of that host; everything else goes to the dashboard.
          </p>
          <CodeBlock
            language="bash"
            code={`DOMAIN=panel.yourdomain.com
ACME_EMAIL=you@yourdomain.com
# WEB_URL is derived automatically as https://\${DOMAIN}`}
          />
          <p className="text-muted-foreground leading-relaxed mt-4">
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEB_URL
            </code>{" "}
            — the public URL of the instance, used for CORS, WebSockets and the
            GitHub App&apos;s webhook and callback URLs — is set to{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              https://DOMAIN
            </code>{" "}
            by{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker-compose.prod.yml
            </code>
            ; you don&apos;t set it yourself. If you later change{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DOMAIN
            </code>
            , a GitHub App registered earlier still points at the old URL and
            must be updated or registered again.
          </p>
        </div>
      </div>
    ),
  },
  servers: {
    title: "Servers",
    description:
      "Connect local and remote Docker hosts, manage the SSH keys DeployKit uses to reach them, and keep their disks clean.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Server Types
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-bright">Local Server</p>
              <p className="text-sm text-muted-foreground mt-1">
                The machine where DeployKit itself runs, driven through the
                local Docker socket. Register it with{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  Add Local Server
                </code>{" "}
                on the Servers page. Only one local server can exist.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-bright">Remote Server</p>
              <p className="text-sm text-muted-foreground mt-1">
                Any Linux host DeployKit can reach over SSH. Applications,
                databases and stacks can be deployed to it; DeployKit runs the
                Docker commands there through an SSH key from the SSH Keys
                catalogue.
              </p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Servers are instance-wide infrastructure: adding, editing, removing
            servers and installing Docker require the global Admin role.
            Operators can run health checks.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">SSH Keys</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Since v0.3.0, SSH keys live in their own catalogue instead of being
            pasted into each server. Open{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              SSH Keys
            </code>{" "}
            in the sidebar (Admin only) and click{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Add SSH Key
            </code>
            . You can either:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            {[
              "Generate a new key pair — RSA 4096 or ED25519 — directly in the dialog",
              "Import one of your own keys by pasting its private key (OpenSSH or PEM); the public key and SHA256 fingerprint are derived from it automatically",
              "Give the key a name and an optional description so you can tell keys apart",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Copy the <strong>public</strong> key into the remote user&apos;s{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ~/.ssh/authorized_keys
            </code>
            , then pick the key when you add the server. One key can be shared
            by several servers.
          </p>
          <CodeBlock
            language="bash"
            code={`# On the remote server, as the user DeployKit will connect with
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo "ssh-ed25519 AAAA... deploykit" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys`}
          />
          <ul className="space-y-2 text-muted-foreground mt-4">
            {[
              "The private key is shown only once, when you create it. It is encrypted at rest with AES-256-GCM and never returned by the API again — download it from the dialog if you want a copy",
              "Only RSA and ED25519 keys are supported. Passphrase-protected keys are rejected, because DeployKit cannot unlock them",
              "A key that is still attached to a server cannot be deleted; the error lists the servers to detach first",
              "Creating, renaming and deleting keys is recorded in the audit log",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              Upgrading from v0.2 or earlier:
            </span>{" "}
            v0.3.0 changed how remote servers are connected. On the first start
            after upgrading, the database migration moves each server&apos;s
            stored private key into the SSH Keys catalogue as{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Migrated — &lt;server name&gt;
            </code>{" "}
            and attaches it to that server. A server whose key could not be
            migrated shows{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              No SSH key
            </code>{" "}
            and cannot be reached until it has one: create a key, then remove
            and re-add the server with it (see Removing a Server below for what
            happens to its services).
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Adding a Remote Server
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            On the Servers page click{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Add Server
            </code>{" "}
            and fill in:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Server Name — a friendly identifier, e.g. production-1",
              "Host / IP — IP address or hostname of the server",
              "SSH Port — defaults to 22",
              "Username — defaults to root",
              "SSH Key — required; chosen from the SSH Keys catalogue (create one first if the list is empty)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            What the Remote Server Needs
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "SSH reachable from the DeployKit host, with the key's public half in authorized_keys",
              "git — repositories are cloned on the remote server itself",
              "Docker — or let DeployKit install it for you (see below)",
              "Either the root user, or a user that can run sudo without a password prompt: for any user other than root, DeployKit prefixes its Docker commands with sudo",
              "Enough disk for images and build contexts; builds run in /tmp/deploykit-builds and are cleaned up afterwards",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Health Checks and Server Info
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Click{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Check health
            </code>{" "}
            on a server card to test the SSH connection and Docker. The server
            is marked{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              connected
            </code>{" "}
            (SSH and Docker work),{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              disconnected
            </code>{" "}
            (SSH works, Docker missing) or{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              error
            </code>{" "}
            (SSH failed). The card then shows the OS, CPU cores, total RAM and
            disk, the number of containers, the Docker version and when the
            server was last checked, plus the applications and databases
            deployed on it. Health checks run when you trigger them; there is no
            background polling of servers.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Docker Auto-Install
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            If the health check finds that SSH works but Docker is missing, the
            card offers{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Install Docker
            </code>
            . DeployKit runs the official install script from{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              get.docker.com
            </code>
            , enables and starts the Docker service, and adds a non-root user to
            the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker
            </code>{" "}
            group. It needs root or sudo access and can take a few minutes. Run
            a health check afterwards to verify.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Remote Deployments
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            When an application targets a remote server, the deploy worker
            clones the repository on that machine over SSH, builds the image
            there with{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker build
            </code>
            , starts the container and removes the build directory. Logs are
            streamed back to the dashboard in real time. Differences from local
            deployments:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Remote builds always use the application's Dockerfile (Dockerfile path setting); Nixpacks and Buildpacks builds run only on the local server",
              "The Trivy vulnerability scan is skipped, because the image lives on the remote daemon",
              "DeployKit does not install a reverse proxy on remote servers — containers get the same Traefik labels, but routing domains to them needs a Traefik instance on that host",
              "Game servers run only on the local server",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Image Cleanup
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Every deployment leaves a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit/*
            </code>{" "}
            image behind. Every night at 03:00, DeployKit prunes them on all
            servers, keeping the last 3 successful deployment images per app so
            rollbacks keep working. Admins can also run it on demand with{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Clean images
            </code>{" "}
            on the Servers page, choosing how many images to keep per app (1–20)
            and optionally doing a dry run first to preview what would be
            removed.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Removing a Server
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Removing a server from DeployKit does not stop or delete what is
            running on it. Applications, databases, stacks and game servers that
            pointed to it are kept, but lose their server assignment. The SSH key
            stays in the catalogue and can be deleted separately once no server
            uses it.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              Firewall warning:
            </span>{" "}
            Docker bypasses{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ufw
            </code>
            . Any port DeployKit publishes on a host — a database with an
            external port, an application host port, a game server port — is
            reachable from the internet even if{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ufw status
            </code>{" "}
            says it is blocked, because Docker inserts its own iptables rules
            ahead of ufw&apos;s. DeployKit does not manage ufw or iptables. Filter
            traffic in your cloud provider&apos;s firewall (Hetzner Cloud
            Firewall, AWS Security Groups…), or add rules to the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DOCKER-USER
            </code>{" "}
            chain (for example with ufw-docker). Do not disable Docker&apos;s
            iptables integration — it breaks container networking.
          </p>
        </div>
      </div>
    ),
  },
  templates: {
    title: "Templates & Compose Stacks",
    description:
      "Deploy whole docker-compose.yml stacks, or one-click templates from the public catalogue.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Compose Stacks
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A stack is a complete{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker-compose.yml
            </code>{" "}
            deployed as one unit, next to your applications and databases. There
            is no build step: deploying a stack is a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker compose up
            </code>{" "}
            on the target server. Each stack gets its own detail page with{" "}
            <span className="text-bright">
              General, Compose, Environment, Domains, Deployments, Logs,
              Terminal, Monitoring
            </span>{" "}
            and <span className="text-bright">Tasks</span> tabs, so logs,
            metrics and the terminal work per service inside the stack.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            To create one, open a project, go to the{" "}
            <span className="text-bright">Stacks</span> section and click{" "}
            <span className="text-bright">Add Stack</span>. Give it a name
            (lowercase letters, numbers and hyphens) and paste your Compose
            file. The name becomes the Compose project name{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              dk-&lt;name&gt;
            </code>
            , which prefixes every container, network and volume of the stack.
            A pasted stack is not started automatically: add your domains, then
            click <span className="text-bright">Redeploy</span>.
          </p>
          <CodeBlock
            language="yaml"
            code={`services:
  app:
    image: nginx:alpine
    restart: unless-stopped
    expose:
      - "80"`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            What DeployKit Changes in Your Compose File
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Your YAML is stored exactly as you wrote it. At deploy time
            DeployKit applies a few changes in memory only:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Ownership labels are added to every service — this is how logs, metrics and the terminal find the stack's containers.",
              "container_name is removed, so the same stack or template can be deployed twice without name collisions.",
              "Services with a domain get Traefik routing labels and join the shared deploykit-network. Their published ports are converted to expose, since Traefik reaches them over that network.",
              "Services without a domain are left alone and are only reachable from inside the stack (by service name).",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Prefer{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              expose
            </code>{" "}
            over{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ports
            </code>{" "}
            and skip{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              container_name
            </code>
            . Never write Traefik labels yourself — DeployKit injects them.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Domains, Environment and Volumes
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Domains — in the Domains tab pick the Service, the Container port and the Domain (optionally a path). One service can have several domains. Tick “Request an HTTPS certificate” only when the domain already resolves to this server.",
              "Environment — variables are encrypted at rest and written to a .env file next to the Compose file, so ${VAR} references in your YAML are filled in by Compose itself.",
              "Volumes — named volumes and relative bind mounts work as in plain Compose. Stack files live under /var/lib/deploykit/compose, one directory per stack.",
              "Redeploy — editing the Compose file, environment or domains is saved immediately but only applied on the next Redeploy, which re-pulls images and recreates the containers.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Warning:</span>{" "}
            Deleting a stack (project admins only) runs{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker compose down --volumes
            </code>{" "}
            and removes its directory — the stack&apos;s named volumes and their
            data are deleted with it. Back up anything you need first.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            One-Click Templates
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The <span className="text-bright">Templates</span> page in the
            sidebar lists ready-made stacks from the public{" "}
            <a
              href="https://github.com/deploykithq/deploykit-templates"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              deploykit-templates
            </a>{" "}
            catalogue — databases, self-hosted apps and full stacks. Search by
            name or filter by tag, then click a card to deploy it. Deploying a
            template creates a normal Compose stack that you manage like any
            other.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The deploy dialog asks for:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Name — names the stack and every container in it.",
              "Domain (optional) — the hostname the template is served on. Leave it empty and DeployKit generates one (see below).",
              "Project — when you open the dialog from the Templates page rather than from a project.",
              "Server — where the stack runs.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Templates never ship credentials. Passwords, keys and tokens are
            generated fresh on your server for every deployment and stored
            encrypted in the stack&apos;s environment. The deployment starts
            immediately, and the result dialog shows the stack&apos;s URLs and
            the generated credentials.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Tip:</span> Copy the{" "}
            <span className="text-bright">Generated credentials</span> right
            away — that dialog is the only time they are shown in full. Later
            they are only visible in the stack&apos;s Environment tab to users
            allowed to view secrets.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Generated Hostnames
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            So that a template works without any DNS setup, an empty domain is
            generated in this order:
          </p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Source</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Hostname
                  </th>
                  <th className="px-4 py-2 font-medium text-bright">HTTPS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  [
                    "TEMPLATES_BASE_DOMAIN",
                    "<name>-<random>.<base domain> — a wildcard domain you point at this server",
                    "Yes (Let's Encrypt)",
                  ],
                  [
                    "Server IP (remote servers) or PUBLIC_IP (local server)",
                    "<name>-<random>.<ip>.sslip.io",
                    "No, plain HTTP",
                  ],
                  [
                    "Neither available",
                    "Deploy fails and asks you to enter a domain",
                    "—",
                  ],
                ].map(([source, host, https]) => (
                  <tr key={source}>
                    <td className="px-4 py-2 font-mono text-xs text-foreground">
                      {source}
                    </td>
                    <td className="px-4 py-2">{host}</td>
                    <td className="px-4 py-2">{https}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Set these in the DeployKit{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            and restart. sslip.io hostnames cannot get certificates, so for
            production either enter your own domain or configure{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              TEMPLATES_BASE_DOMAIN
            </code>
            .
          </p>
          <CodeBlock
            language="bash"
            code={`# /opt/deploykit/.env
TEMPLATES_BASE_DOMAIN=apps.example.com   # *.apps.example.com -> this server
PUBLIC_IP=203.0.113.10                    # fallback for sslip.io hostnames`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            The Template Catalogue
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            No template is bundled inside DeployKit: the catalogue is fetched at
            runtime from{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              TEMPLATES_REGISTRY_URL
            </code>{" "}
            (by default the raw GitHub URL of deploykit-templates). New
            templates published there appear on every instance within about an
            hour, with no DeployKit upgrade. You can point this variable at your
            own fork; it must be a public http(s) address — private and
            loopback addresses are rejected.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "The catalogue is re-read at most once an hour, and the last valid copy is cached for 30 days.",
              "If the registry is unreachable, the Templates page keeps working from that cached copy and shows a notice with the time it was fetched.",
              "Only an instance that has never reached the registry shows an empty page, explaining that the registry cannot be reached — check the server's outbound internet access or TEMPLATES_REGISTRY_URL.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Writing Your Own Template
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A template is a directory in the catalogue with a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker-compose.yml
            </code>
            , a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              template.json
            </code>{" "}
            (metadata, variables, domains, env and config-file mounts) and an
            optional logo. Variables use generator helpers such as{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"${domain}"}
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"${password:32}"}
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"${base64:64}"}
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"${uuid}"}
            </code>{" "}
            or{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"${jwt:<secretVar>:<role>}"}
            </code>
            ; domains, env and mounts then reference those variables by name.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Warning:</span> There
            are two different{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"${...}"}
            </code>{" "}
            syntaxes. Generator helpers like{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"${password:32}"}
            </code>{" "}
            only work inside{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              template.json
            </code>
            . Inside{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker-compose.yml
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"${VAR}"}
            </code>{" "}
            is plain Compose interpolation from the stack&apos;s .env — a helper
            written there silently becomes an empty string. Use{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"$${"}
            </code>{" "}
            in template.json when a literal{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"${"}
            </code>{" "}
            must survive.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Onboarding
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            On a fresh instance the dashboard shows a{" "}
            <span className="text-bright">Welcome to DeployKit</span> checklist:{" "}
            <span className="text-bright">Connect a server</span> (admins can
            click <span className="text-bright">Use local server</span>),{" "}
            <span className="text-bright">Create a project</span>, and{" "}
            <span className="text-bright">Deploy from a template</span>, which
            opens the Templates page. It disappears once the instance has its
            first application or database.
          </p>
        </div>
      </div>
    ),
  },
  "scheduled-tasks": {
    title: "Scheduled Tasks",
    description:
      "Run cron jobs and one-off commands (migrations, scripts, queries) against your apps, stacks and databases.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Overview</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A task is a named, repeatable command on one service, with an{" "}
            <span className="text-bright">optional</span> cron schedule. Use it
            for things like{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              php artisan schedule:run
            </code>{" "}
            every minute, a nightly cleanup, or a saved{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              php artisan migrate --force
            </code>{" "}
            you run by hand after deploys. Unlike the web terminal, every run is
            recorded with its output, exit code, duration and who started it.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Tasks live in the <span className="text-bright">Tasks</span> tab of
            every application, Compose stack and database. The tab has three
            parts: the task list, a{" "}
            <span className="text-bright">Run a command</span> box for one-off
            commands, and the <span className="text-bright">Run history</span>.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Creating a Task
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Click <span className="text-bright">New task</span> and fill in:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "Name",
                desc: "A label for the list and the history, e.g. “Run migrations”.",
              },
              {
                name: "Service",
                desc: "Stacks only — which Compose service the command runs in.",
              },
              {
                name: "Command",
                desc: "Up to 4,000 characters. Runs through /bin/sh -lc, so &&, pipes and globs work.",
              },
              {
                name: "Schedule",
                desc: "A preset (every minute, every 5 minutes, hourly, daily at 2:00, weekly), Custom…, or “No schedule (run manually)”.",
              },
              {
                name: "Time zone",
                desc: "Any IANA zone (e.g. Europe/Madrid). Defaults to UTC.",
              },
              {
                name: "Timeout (seconds)",
                desc: "1 to 86,400; default 300. The container is killed when it expires.",
              },
            ].map((field) => (
              <div
                key={field.name}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="font-medium text-bright">{field.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {field.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            While you type a schedule the form previews the next run times, so
            you can check the time zone before saving. Each task in the list has{" "}
            <span className="text-bright">Run now</span>,{" "}
            <span className="text-bright">Edit</span>,{" "}
            <span className="text-bright">Enable/Disable</span> and{" "}
            <span className="text-bright">Delete</span> actions. Disabling
            stops the schedule without deleting the task; you can still run it
            manually. Schedule changes take effect immediately — no restart
            needed.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Cron Syntax
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Schedules use standard 5-field cron:{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              minute hour day-of-month month day-of-week
            </code>
            . Seconds fields and shortcuts such as{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              @daily
            </code>{" "}
            are rejected, and the smallest interval is one minute.
          </p>
          <CodeBlock
            language="bash"
            code={`* * * * *      # every minute
*/15 * * * *   # every 15 minutes
0 3 * * *      # every day at 03:00 (in the task's time zone)
30 8 * * 1-5   # weekdays at 08:30
0 0 1 * *      # first day of every month at midnight`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Where Commands Run
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Every run starts a{" "}
            <span className="text-bright">new, temporary container</span> from
            the service&apos;s image and removes it when the command exits. It
            never executes inside the running container, so a migration works
            even while the app is stopped, a long job does not steal resources
            from the container serving traffic, and replicas are never an issue.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Target</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    How it runs
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  [
                    "Application",
                    "The app's current image with its environment variables, volumes, CPU/memory limits and the deploykit-network. The app must have been deployed at least once.",
                  ],
                  [
                    "Stack service",
                    "docker compose run --rm --no-deps for the chosen service: environment, volumes and networks come from the stack, and the other services are not started.",
                  ],
                  [
                    "Database",
                    "The database's client image (psql, mysql, redis-cli, mongosh…) on the shared network. The data volume is not mounted.",
                  ],
                ].map(([target, how]) => (
                  <tr key={target}>
                    <td className="px-4 py-2 font-medium text-foreground">
                      {target}
                    </td>
                    <td className="px-4 py-2">{how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
            Database tasks receive{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DK_DB_HOST
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DK_DB_PORT
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DK_DB_USER
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DK_DB_NAME
            </code>{" "}
            and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DK_DB_PASSWORD
            </code>
            . For PostgreSQL, MySQL/MariaDB and Redis the password is also set
            in{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              PGPASSWORD
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              MYSQL_PWD
            </code>{" "}
            or{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              REDISCLI_AUTH
            </code>
            , so the client never needs it on the command line. MongoDB has no
            such variable — pass{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              $DK_DB_PASSWORD
            </code>{" "}
            to mongosh yourself.
          </p>
          <CodeBlock
            language="bash"
            code={`# PostgreSQL database task
psql -h "$DK_DB_HOST" -U "$DK_DB_USER" -d "$DK_DB_NAME" -c "VACUUM ANALYZE;"`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            One-Off Commands
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Type a command in <span className="text-bright">Run a command</span>
            , optionally change its timeout, and click{" "}
            <span className="text-bright">Run</span>. It runs exactly like a
            task (new container, same environment) without being saved, and
            appears in the Run history. Output streams live into a{" "}
            <span className="text-bright">Command output</span> dialog that you
            can reopen later from the history.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Run History and Behaviour
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Each run ends as success (exit code 0), failed, timed_out or skipped, with its exit code, duration and trigger (schedule or manual).",
              "No overlap: if the previous run of the same task is still going, the new one is recorded as skipped instead of running. An every-minute job can never pile up.",
              "Timeouts kill the container and append “[deploykit] Command timed out and was killed.” to the output.",
              "Only the last 64 KB of output is stored — the tail, where errors usually are. Longer output is marked as truncated.",
              "The 50 most recent runs are kept per task (and per service for one-off commands). History survives deleting the task.",
              "A run captures the command and timeout at start, so editing a task never changes a run already in progress. Runs cannot be cancelled.",
              "Up to 3 runs execute at the same time across the instance; further runs wait in the queue.",
              "Failed and timed-out runs fire the Task Failed notification event — enable it in your project's notification channels.",
              "On remote servers, output arrives when the command finishes rather than line by line.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Permissions
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Running a command is as powerful as the terminal, so creating,
            editing, deleting and running tasks requires the{" "}
            <span className="text-bright">Operator</span> (or Admin){" "}
            <span className="text-bright">global</span> role{" "}
            <span className="text-bright">and</span> Operator access to the
            project. Any project member can see the task list and run history,
            but the command <span className="text-bright">output</span> is only
            visible to project Operators and Admins, since it can contain
            secrets such as connection strings. All task changes and runs are
            written to the audit log.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Gotchas:</span> The
            image needs a POSIX shell at{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /bin/sh
            </code>{" "}
            — scratch and distroless images cannot run tasks. Task containers
            publish no ports and never restart, so a command that should keep
            running belongs in a service, not a task. In a stack, the{" "}
            <span className="text-bright">Run a command</span> box always uses
            the first service in the Compose file; create a task to pick
            another service.
          </p>
        </div>
      </div>
    ),
  },
  "preview-deployments": {
    title: "Preview Deployments",
    description:
      "Automatic ephemeral environments for pull requests and merge requests.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            How Preview Deployments Work
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Preview deployments create an isolated copy of your application for
            each pull request (GitHub) or merge request (GitLab). When a PR is
            opened, DeployKit builds and deploys its head branch as a separate
            application with its own container and URL, redeploys it on every
            new push to the PR, and removes it when the PR is closed.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Enabling Previews
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "In the application's General tab, check 'Auto-deploy pull requests as preview environments' and save",
              "Optionally set a Base domain such as example.com — each PR then gets pr-<number>.example.com (e.g. pr-42.example.com)",
              "Create a wildcard DNS record (*.example.com) pointing to the server that runs the app",
              "Make sure PR events reach DeployKit: automatic with the GitHub App; otherwise enable 'Pull requests' (GitHub) or 'Merge request events' (GitLab) on the repository webhook",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Webhook setup is covered in{" "}
            <a href="#webhooks" className="text-primary hover:underline">
              Webhooks &amp; CI/CD
            </a>
            . Applications connected through the{" "}
            <a href="#github-app" className="text-primary hover:underline">
              GitHub App
            </a>{" "}
            receive PR events only through the App.
          </p>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Heads up:</span>{" "}
            preview domains are served over plain HTTP — wildcard certificates
            would need a DNS challenge. Previews also copy the parent&apos;s
            environment variables as-is, so a preview of a production app runs
            with production secrets and connects to the same databases. Use a
            staging application as the parent if that is not acceptable.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Lifecycle
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Event</th>
                  <th className="px-4 py-2 font-medium text-bright">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  [
                    "PR opened / reopened, MR opened / reopened",
                    "Preview app created and deployed",
                  ],
                  [
                    "New commits pushed to the PR / MR",
                    "Existing preview updated to the new head and redeployed",
                  ],
                  [
                    "PR closed or merged, MR closed or merged",
                    "Container stopped and preview app deleted",
                  ],
                ].map(([event, result]) => (
                  <tr key={event}>
                    <td className="px-4 py-2 text-foreground">{event}</td>
                    <td className="px-4 py-2">{result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Previews are driven only by PR / MR events — regular push events
            never deploy a preview app.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Parent-Child Relationship
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            A preview is a regular application linked to its parent and named{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              &lt;app-name&gt;-pr&lt;number&gt;
            </code>
            . When it is created it copies from the parent:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Repository, build type, Dockerfile path and root directory",
              "Environment variables and port",
              "Target server and health check settings",
              "Source credentials — the GitHub App connection if the parent has one (no secret is stored on the preview), otherwise the parent's access token",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Volumes, resource limits, replicas, autoscaling and the parent&apos;s
            domains are not copied. Changes to the parent apply only to
            previews created afterwards. Previews are never included in a
            configuration export.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            GitHub App: PR Comments and Commit Statuses
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            When the parent is connected through the GitHub App, DeployKit keeps
            one comment on the pull request — &quot;Deploying preview&quot;,
            then &quot;Preview ready&quot; with the URL (or &quot;Preview
            failed&quot;) and a link to the deployment logs, and &quot;Preview
            removed&quot; when the PR is closed. Redeploys edit that comment
            instead of posting new ones. Each preview deploy also publishes a
            commit status under the parent&apos;s context (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit/&lt;parent name&gt;
            </code>
            ), so branch protection sees one stable check per application.
            Without the App, previews work the same but nothing is reported
            back to GitHub.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Managing Previews
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            The{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Previews
            </code>{" "}
            tab of the parent application lists active previews with their PR
            number, branch, status, URL and last commit. Operators can delete a
            preview from there; this stops its container immediately, but the
            next push to an open PR creates it again.
          </p>
        </div>
      </div>
    ),
  },
  "github-app": {
    title: "GitHub App",
    description:
      "Connect GitHub repositories without access tokens, with automatic webhooks, commit statuses and PR comments.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Why Use the GitHub App
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            DeployKit can reach a private repository in two ways: an access
            token pasted into the application (works with GitHub, GitLab, Gitea
            or any HTTPS git server), or a GitHub App registered on your
            instance. For github.com the App is the recommended path:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "No long-lived token is stored — each clone uses an installation token that expires after one hour and only sees the repositories you granted",
              "You pick account → repository → branch from a list instead of pasting a URL",
              "Pushes and pull requests arrive automatically — there is no per-repository webhook to configure",
              "Repositories are tracked by their numeric GitHub id, so renaming or transferring a repo does not break auto-deploy",
              "Every deploy is reported back on the commit as a status, and preview deployments comment their URL on the pull request",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Both paths can coexist: applications that are not connected keep
            using their access token and repository webhook.
          </p>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              Before you start — WEB_URL must be public:
            </span>{" "}
            the App&apos;s webhook URL (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              &lt;WEB_URL&gt;/api/webhooks/github
            </code>
            ) and redirect URL (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              &lt;WEB_URL&gt;/settings/github/callback
            </code>
            ) are built from{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEB_URL
            </code>
            , never from the request&apos;s Host header. Registration fails if{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEB_URL
            </code>{" "}
            is unset or points at localhost / a private address. The production
            compose file derives it as{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              https://$&#123;DOMAIN&#125;
            </code>
            ; for local development, point it at a tunnel (cloudflared, ngrok).
            Both URLs are frozen into the App when it is created — if you
            later change{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DOMAIN
            </code>
            , disconnect and register the App again, or edit its URLs on
            GitHub.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Registering the App
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Each DeployKit instance owns its own private App (GitHub has to
            deliver webhooks to <em>your</em> server, so there is no shared
            central App). Registration uses GitHub&apos;s manifest flow — you
            never copy an App ID or private key by hand. Admin role required.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Go to Settings → GitHub App and click Set up (or open /settings/github)",
              "Optionally set an App name (default: \"DeployKit - <your host>\" — App names are unique across GitHub) and an Organization to create it under; leave it empty for your personal account. Creating it in an organization needs owner rights there",
              "Click Register on GitHub and confirm the creation on GitHub",
              "GitHub redirects back to DeployKit, which exchanges the one-time code for the App credentials and stores them encrypted",
              "Click Install the App and choose the account or organization that owns your repositories",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Already created an App manually? Expand{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Already created an App? Connect it manually
            </code>{" "}
            and paste its App ID, private key (.pem) and webhook secret.
            DeployKit verifies the credentials against GitHub before saving.
            The App&apos;s webhook URL must point at this instance and it needs
            the permissions listed below.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Installations and Repository Access
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The GitHub App page lists every account where the App is
            installed, whether it has access to all or selected repositories,
            and flags suspended installations. From there you can:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Install on an account — install the App on another user or organization",
              "Configure — open GitHub to change which repositories the installation can see",
              "Test connection — verify the stored credentials still work",
              "Refresh installations — re-sync the installation list from GitHub",
              "Disconnect — remove the App from DeployKit (the App itself stays on GitHub)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Installing, uninstalling and changing repository selection on
            GitHub are picked up automatically through webhook events. Prefer
            granting <strong>selected repositories</strong> over all of them —
            it limits what the App&apos;s private key can reach.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Connecting an Application
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            When creating an application, or from{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              General → Source
            </code>{" "}
            on an existing one (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Connect through the GitHub App instead
            </code>
            ), pick the account, repository and branch from the lists. A
            connected app shows a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              GitHub App
            </code>{" "}
            badge and no access token field. Listing installations and
            repositories requires the operator role on the project.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Auto-Deploy
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            The App subscribes to <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">push</code>{" "}
            and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              pull_request
            </code>
            . A push deploys every connected application whose repository and
            branch match; matching uses the installation plus GitHub&apos;s
            numeric repository id, never the URL. If the repository still has
            an old hand-made webhook, its duplicate delivery is ignored for
            connected apps, so a push never deploys twice — but you can safely
            delete that webhook. See{" "}
            <a href="#webhooks" className="text-primary hover:underline">
              Webhooks &amp; CI/CD
            </a>
            .
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Commit Statuses
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            For connected applications, DeployKit publishes a GitHub commit
            status on the deployed commit — for webhook-triggered and manual
            deploys alike:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "pending — when the deploy is queued and while it builds",
              "success — when the new container is healthy",
              "failure — when any step fails",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            The status context is{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit/&lt;app name&gt;
            </code>{" "}
            and its link opens the application in your panel, so you can use it
            as a required check in branch protection. Preview deployments
            report under their parent&apos;s context, so branch protection sees
            one stable check per application. Statuses are best-effort: if
            GitHub is unreachable the deploy still succeeds. They are on by
            default; set{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              commitStatusEnabled: false
            </code>{" "}
            via the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              application.update
            </code>{" "}
            API to turn them off for one app.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Preview Deployments and PR Comments
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            With{" "}
            <a
              href="#preview-deployments"
              className="text-primary hover:underline"
            >
              preview deployments
            </a>{" "}
            enabled on a connected application, each pull request gets its own
            environment and DeployKit keeps a single comment on the PR —
            &quot;Deploying preview&quot;, then &quot;Preview ready&quot; with
            the URL (or &quot;Preview failed&quot;) and a link to the deployment
            logs, and finally &quot;Preview removed&quot; when the PR is closed.
            Redeploys edit the same comment instead of posting new ones.
            Previews inherit the parent&apos;s App connection, so they store no
            credentials of their own.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Permissions
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The App requests only what these features need:
          </p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">
                    Permission
                  </th>
                  <th className="px-4 py-2 font-medium text-bright">Access</th>
                  <th className="px-4 py-2 font-medium text-bright">Used for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  ["Metadata", "Read", "Listing repositories and branches"],
                  ["Contents", "Read", "Cloning private repositories"],
                  ["Commit statuses", "Write", "Reporting deploy results"],
                  ["Pull requests", "Write", "Posting the preview comment"],
                ].map(([perm, access, use]) => (
                  <tr key={perm}>
                    <td className="px-4 py-2 font-mono text-xs text-foreground">
                      {perm}
                    </td>
                    <td className="px-4 py-2">{access}</td>
                    <td className="px-4 py-2">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-3">
            It never asks for checks, workflows, administration or issues
            permissions.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Disconnecting and Uninstalling
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Disconnecting the App in DeployKit leaves connected applications without credentials until you reconnect or give them an access token — you are asked to confirm if any app uses it",
              "Uninstalling the App from an account on GitHub never deletes applications: they become disconnected and fall back to their access token, or fail with a clear error",
              "The App is never included in a configuration export — it is tied to this instance's webhook URL. On import, applications are re-linked to the local installation that can see their repository",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  notifications: {
    title: "Notifications",
    description:
      "Send deploy, backup and task events to Discord, Slack, Telegram, email or any webhook.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Supported Channels
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "Discord",
                desc: "Webhook URL. Messages are sent as colored embeds with the event details.",
              },
              {
                name: "Slack",
                desc: "Incoming webhook URL. Messages use Slack blocks with the event details.",
              },
              {
                name: "Telegram",
                desc: "Bot Token and Chat ID of the chat or channel the bot posts to.",
              },
              {
                name: "Email (Resend)",
                desc: "Recipient(s) (comma-separated), your Resend API Key, and an optional From address.",
              },
              {
                name: "Webhook",
                desc: "Any public http(s) URL, with an optional HMAC Secret to sign the payload.",
              },
            ].map((channel) => (
              <div
                key={channel.name}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="font-medium text-bright">{channel.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {channel.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Webhook, Discord and Slack URLs must point to a public address —
            private, loopback and link-local targets are rejected.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Adding a Channel
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Open the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Notifications
            </code>{" "}
            section of a project and add a channel: give it a name, pick the
            type, fill in its fields and tick the events it should receive (a
            new channel defaults to deploy success and failure). Use{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Send Test
            </code>{" "}
            to check the configuration before relying on it. Channels can be
            edited, disabled and re-enabled without deleting them.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Events</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            These events are currently delivered to channels:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "deploy.success — An application or Compose stack deployed successfully",
              "deploy.failed — An application or Compose stack deployment failed",
              "backup.completed — A database or game server backup finished",
              "backup.failed — A database or game server backup failed",
              "task.failed — A scheduled task or one-off command exited non-zero or timed out",
            ].map((event) => (
              <div
                key={event}
                className="rounded-lg border border-border bg-card/50 px-3 py-2"
              >
                <code className="text-xs font-mono text-primary">
                  {event.split(" — ")[0]}
                </code>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {event.split(" — ")[1]}
                </p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            The event list also shows{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              app.stopped
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              app.error
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              health_check.failed
            </code>{" "}
            and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              alert.fired
            </code>
            , but nothing emits them to channels yet. Metric alerts are
            delivered through the destination configured on each alert rule —
            see Monitoring.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Webhook Payload
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Webhook channels receive a JSON{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              POST
            </code>
            . When a secret is set, the raw body is signed with HMAC-SHA256 in
            the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              X-DeployKit-Signature
            </code>{" "}
            header:
          </p>
          <CodeBlock
            language="json"
            code={`// X-DeployKit-Signature: sha256=<hex digest>
{
  "source": "deploykit",
  "event": "deploy.failed",
  "timestamp": "2026-10-14T09:30:00.000Z",
  "data": {
    "title": "...",
    "message": "...",
    "projectId": "...",
    "applicationName": "...",
    "error": "..."
  }
}`}
          />
          <p className="text-muted-foreground leading-relaxed mt-4">
            The fields inside{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              data
            </code>{" "}
            beyond title, message and projectId depend on the event.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Project and Instance-wide Channels
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            A channel belongs to a project and only receives that
            project&apos;s events, so production and staging can alert different
            places. A channel created through the API without a project is
            instance-wide and receives events from every project. Managing
            project channels requires the global Operator or Admin role plus
            the Operator or Admin role on the project; instance-wide channels
            require the global Operator or Admin role. Channel settings can
            contain tokens and API keys, so Viewers cannot read them.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Note:</span> A
            notification that fails to send is logged and skipped — it never
            fails the deployment, backup or task that triggered it. If a
            channel goes quiet, check it with Send Test.
          </p>
        </div>
      </div>
    ),
  },
  "users-rbac": {
    title: "Users & RBAC",
    description:
      "Two layers of roles: a global role for the instance and a role per project.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            How Access Works
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Every user has a <strong>global role</strong> (Admin, Operator or
            Viewer) and, separately, a <strong>project role</strong> on each
            project they are a member of. The global role governs
            instance-wide actions; the project role governs everything inside
            a project. Project membership is required: a global Operator or
            Viewer who is not a member of a project cannot see it at all, and
            the project does not appear in their list.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Global Roles
          </h3>
          <div className="space-y-3">
            {[
              {
                role: "Admin",
                desc: "Superuser. Is Admin on every project automatically (this cannot be lowered per project). The only role that can manage users, servers and SSH keys, delete projects, read the audit log, register the GitHub App, export or import the whole instance, and change instance settings.",
              },
              {
                role: "Operator",
                desc: "Can create projects (and becomes Admin of the projects they create) and create or edit alert rules (deleting them is Admin-only). Required, together with a project role of Operator or Admin, to edit project settings and the status page, open a web terminal, define or run scheduled tasks, manage notification channels, and use game server consoles, files and mods.",
              },
              {
                role: "Viewer",
                desc: "The default for new users. No instance-wide permissions. What they can do inside a project depends entirely on their project role — but actions that also require a global Operator role (project settings, terminal, tasks, notifications, game server console and files) stay off-limits even if they are project Operators.",
              },
            ].map((item) => (
              <div
                key={item.role}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="font-medium text-bright">{item.role}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Project Roles
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Each level includes everything from the level above it in this
            table:
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Role</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Can do in the project
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  [
                    "Viewer",
                    "See the project, its applications, stacks, databases and game servers, with their deployments, logs, metrics, backups lists and task runs. Environment variable values, connection strings, task output and game server files are hidden.",
                  ],
                  [
                    "Operator",
                    "Create, configure, deploy, roll back, start and stop apps, stacks, databases and game servers; edit environment variables and domains; manage backups (including restore); toggle maintenance mode; read secrets, task output and export the project configuration.",
                  ],
                  [
                    "Admin",
                    "Delete applications, stacks, databases and game servers, and add, change or remove project members.",
                  ],
                ].map(([role, desc]) => (
                  <tr key={role}>
                    <td className="px-4 py-2 font-medium text-foreground">
                      {role}
                    </td>
                    <td className="px-4 py-2">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            When a user without access to a project requests one of its
            resources, the API answers &quot;not found&quot; rather than
            &quot;forbidden&quot;, so ids from other projects reveal nothing.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Managing Users and Members
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "The first account registered on a fresh instance becomes the global Admin; after that, public registration is closed",
              "Global Admins create users, change their global role, reset their passwords and delete them from the Users page (you cannot change your own role or delete yourself)",
              "Project Admins add existing users to a project with a role, change it, or remove them from the Members section of the project page",
              "Global Admins cannot be added as members — they already have Admin on every project",
              "Every user can change their own password and email from the Settings page",
              "Role changes take effect on the next request; the role is read from the database, never from the token",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Example:</span> to let
            a contractor deploy one app without seeing anything else, create
            them as a global Viewer and add them as Operator on that project
            only. They can deploy and configure that project&apos;s apps, but cannot open a
            terminal or run tasks — that needs a global Operator role as well.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Authentication
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit uses JWT authentication with short-lived access tokens
            (15 minutes) and refresh tokens (7 days). Refresh tokens are stored
            in Redis and rotated — each use issues a new one and revokes the
            old. Passwords are hashed with bcrypt and must be at least 8
            characters. Login and registration are limited to 10 attempts per
            minute per IP.
          </p>
        </div>
      </div>
    ),
  },
  monitoring: {
    title: "Monitoring",
    description:
      "Live and historical metrics, persistent searchable logs, threshold alerts, and image vulnerability scanning.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Container Metrics
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Monitoring
            </code>{" "}
            tab of every application, database, Compose stack and game server
            shows four charts:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "CPU Usage — average with a peak envelope. Measured like docker stats, so a container using several cores can go above 100%",
              "Memory Usage — bytes in use against the container's memory limit",
              "Disk Usage — the container's writable layer plus its volumes (sampled every 5 minutes, because it is expensive for Docker to compute)",
              "Network — inbound and outbound traffic as a rate (bytes/s)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Every running container is sampled every 30 seconds and the newest
            values are pushed to open dashboards over Socket.IO. For a Compose
            stack, the charts show the total across all of its running
            containers. If the service has open alerts, a banner above the
            charts shows them.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Metrics History
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Samples are rolled up into PostgreSQL every minute, so the charts
            keep history across restarts. Pick a range above the charts:{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              1h
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              6h
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              24h
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              7d
            </code>{" "}
            or{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              30d
            </code>
            . Ranges up to 24 hours use 1-minute resolution, and longer ranges
            use 1-hour resolution.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">
                    Resolution
                  </th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Kept for
                  </th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Environment variable
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  ["1 minute", "48 hours", "METRICS_RAW_RETENTION_HOURS"],
                  ["1 hour", "90 days", "METRICS_HISTORY_RETENTION_DAYS"],
                ].map(([res, kept, env]) => (
                  <tr key={res}>
                    <td className="px-4 py-2">{res}</td>
                    <td className="px-4 py-2">{kept}</td>
                    <td className="px-4 py-2 font-mono text-xs text-foreground">
                      {env}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Logs</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Logs
            </code>{" "}
            tab has two modes:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Live — streams stdout and stderr from the running container in real time",
              "History — searches the stored logs by text, level (error, warn, info, debug, fatal) and time range, 100 lines per page",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Logs are collected from every running container all the time,
            whether or not anyone has the tab open. They are kept for 7 days.
            Set{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              LOG_RETENTION_DAYS
            </code>{" "}
            to change this. Before a line is stored, DeployKit removes
            secrets such as tokens with a known prefix (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ghp_
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              sk-
            </code>
            , …), Bearer and Basic headers,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              password=
            </code>{" "}
            and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              secret=
            </code>{" "}
            pairs, AWS keys and long hex strings. Lines longer than 8 KB are
            cut. The log level is a best guess from the line&apos;s text, so
            don&apos;t rely on it for anything critical.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Build Logs</h3>
          <p className="text-muted-foreground leading-relaxed">
            Build and deploy output is streamed to the dashboard during a
            deployment and stored with each deployment record. The same
            secret redaction applies to it.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Alerts</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Alerts
            </code>{" "}
            page in the sidebar shows alert events and the rules that create
            them. Click{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              New rule
            </code>{" "}
            to create a rule with these settings:
          </p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Field</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  ["Service", "An application or a database"],
                  ["Metric", "CPU %, Memory %, Net RX, Net TX"],
                  ["Condition", "Greater than / Less than"],
                  ["Threshold", "A whole number from 0 to 100"],
                  [
                    "Notification channel",
                    "In-app, Slack (incoming webhook URL) or Webhook (any URL)",
                  ],
                  ["Cooldown", "1–1440 minutes, default 15"],
                ].map(([field, opts]) => (
                  <tr key={field}>
                    <td className="px-4 py-2 font-medium text-foreground">
                      {field}
                    </td>
                    <td className="px-4 py-2">{opts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="space-y-2 text-muted-foreground mt-4">
            {[
              "Each rule is checked against every 30-second sample. When the threshold is crossed, DeployKit records an event and sends a notification. It doesn't fire again for that rule until the cooldown has passed.",
              "An event resolves automatically on the first sample that is back inside the threshold. Use \"Show resolved\" to see past events.",
              "Every alert appears as a toast in the dashboard, whichever channel you pick. Slack and Webhook also send the alert to that URL. The webhook body has event \"alert.fired\".",
              "Viewing alerts requires no special role. Operators can create, edit and disable rules. Only admins can delete them.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Each alert rule has its own channel. Alert rules don&apos;t use the
            project notification channels described in{" "}
            <span className="text-foreground">Notifications</span>, which
            handle deploy and backup events.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Note:</span> Net
            RX/TX rules compare the container&apos;s total byte counter since
            it started, not a rate. Because thresholds stop at 100, a
            &quot;Greater than&quot; network rule fires almost at once. Use
            CPU and memory rules for meaningful alerts.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Vulnerability Scanning
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            DeployKit can scan each built image for known CVEs with{" "}
            <span className="text-foreground">Trivy</span>. The scan runs
            after the build and before the container is deployed. Scanning is
            advisory: a scan that finds problems, fails or times out never
            blocks the deploy.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Global default: SCAN_ENABLED=true turns scanning on for every app. If the variable isn't set, scanning is off. The sample .env.example sets it to true.",
              "Per app: General tab → Security Scanning → \"Use server default\", \"Always scan\" or \"Never scan\".",
              "Results: a severity badge on each deployment in the Deployments tab, and a full report in the Security tab. The report shows counts for Critical, High, Medium, Low and Unknown, plus each CVE with its package, installed version and fixed version. You can filter by severity and search by CVE, package or title.",
              "Trivy runs as a temporary aquasec/trivy container. Its vulnerability database is cached in the deploykit-trivy-cache volume, so only the first scan downloads it.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Optional overrides:{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              TRIVY_IMAGE
            </code>{" "}
            (default{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              aquasec/trivy:latest
            </code>
            ),{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              TRIVY_CACHE_VOLUME
            </code>{" "}
            (default{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit-trivy-cache
            </code>
            ) and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              TRIVY_TIMEOUT_SECONDS
            </code>{" "}
            (default{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              300
            </code>
            ).
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Local server only:</span>{" "}
            metrics, alerts, persistent logs and vulnerability scans currently
            work only for services running on the DeployKit host&apos;s own
            Docker daemon. For deployments to a remote server, the scan is
            marked{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              skipped
            </code>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Interactive Terminal
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            The{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Terminal
            </code>{" "}
            tab opens an interactive shell in your running container from the
            browser. It uses xterm.js over Socket.IO, so you can debug and
            troubleshoot without SSH.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Container Status
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Each application displays its current status:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { status: "Running", desc: "Container is up" },
              { status: "Building", desc: "Deployment in progress" },
              { status: "Idle", desc: "Never deployed" },
              { status: "Stopped", desc: "Container was stopped" },
              { status: "Error", desc: "Last build or deploy failed" },
            ].map((item) => (
              <div
                key={item.status}
                className="rounded-lg border border-border bg-card/50 px-3 py-2"
              >
                <code className="text-xs font-mono text-primary">
                  {item.status}
                </code>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  "status-pages": {
    title: "Status Pages",
    description:
      "Publish a public, no-login page with the live state and uptime of a project's applications.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Overview</h3>
          <p className="text-muted-foreground leading-relaxed">
            Each project can publish one status page. Anyone with the link can
            open it without logging in. It lists only the applications you
            choose to show, and only their name, status and uptime. Nothing is
            published by default.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Publishing a Status Page
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Open the project and expand the Status Page section",
              "Check \"Enable public status page\" and enter a slug. The slug must be unique across the instance and can use only lowercase letters, numbers and hyphens (up to 80 characters)",
              "Optionally set a title. If you leave it empty, the page uses the project name",
              "Click Save, then under \"Applications shown publicly\" tick each application to list",
              "Use the View link to open the published page",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Enabling the page and choosing applications both require the
            Operator role on the project. An application is listed only when
            the page is enabled and the application is ticked.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Public URL</h3>
          <CodeBlock
            code={`https://<your-dashboard-domain>/status/<slug>`}
            language="text"
          />
          <p className="text-sm text-muted-foreground mt-3">
            The page refreshes every 30 seconds. If the page is disabled or
            the slug doesn&apos;t exist, visitors see &quot;Status page not
            found&quot;.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            What the Page Shows
          </h3>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              {
                status: "Operational",
                desc: "Application is running and has no open alerts",
              },
              {
                status: "Degraded",
                desc: "Application is running but has at least one open alert",
              },
              {
                status: "Down",
                desc: "Application is not in the running state",
              },
            ].map((item) => (
              <div
                key={item.status}
                className="rounded-lg border border-border bg-card/50 px-3 py-2"
              >
                <code className="text-xs font-mono text-primary">
                  {item.status}
                </code>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mt-3">
            A banner at the top sums up the page: &quot;All systems
            operational&quot;, &quot;Some systems degraded&quot; or
            &quot;Major outage&quot; when any application is down. Each
            application also shows its uptime for the last 24 hours, 7 days and
            90 days.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            How Uptime Is Calculated
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit doesn&apos;t send external health probes. Uptime comes
            from the stored metrics instead: an hour with recorded metrics
            counts as an hour the application was up, because a stopped
            container produces no metrics. New applications are measured only
            from their first recorded sample, so a recent launch doesn&apos;t
            lower the 90-day figure. Values are rounded to one decimal. When
            there is no data yet, the page shows{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              —
            </code>
            .
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Note:</span> Status
            pages list applications only, not databases or Compose stacks.
            While an application is being redeployed it shows as Down. Uptime
            and the Degraded state come from metrics and alerts, which are
            collected only for services on the local server. For an
            application on a remote server, uptime shows{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              —
            </code>
            .
          </p>
        </div>
      </div>
    ),
  },
  "game-servers": {
    title: "Game Servers",
    description:
      "Run dedicated game servers — Minecraft, Valheim, Counter-Strike 2, Terraria — with a console, file manager, world backups and one-click mods.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            What Is a Game Server?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Introduced in v0.6.0, a game server is a third kind of service in a
            project, next to applications and compose stacks. It has no build
            and no domains: DeployKit runs a ready-made container image
            described by a <strong>game definition</strong>, publishes its ports
            directly on the host, keeps the world in Docker volumes, and gives
            you a live console, a file manager, scheduled world backups and
            (for supported games) mods and modpacks. Each server also gets the
            usual Logs and Monitoring tabs.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Game Definitions
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Games are not bundled with DeployKit. They are fetched at runtime
            from the public template catalogue (the same registry as templates,
            set by{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              TEMPLATES_REGISTRY_URL
            </code>
            ) and cached, so the instance needs outbound access to it. Each
            definition declares the image, ports, settings form, volumes,
            console type, stop behaviour, backup scope and minimum memory. When
            you create a server, its definition is copied into it: later changes
            to the catalogue only affect new servers. The catalogue currently
            offers:
          </p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Game</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Default ports
                  </th>
                  <th className="px-4 py-2 font-medium text-bright">Console</th>
                  <th className="px-4 py-2 font-medium text-bright">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  [
                    "Minecraft: Java Edition",
                    "25565/tcp",
                    "RCON",
                    "Vanilla, Paper, Fabric or Forge; Java 8–25; mods, plugins and modpacks. Min 1.5 GB RAM",
                  ],
                  [
                    "Valheim",
                    "2456–2457/udp",
                    "None",
                    "Downloads ~1 GB from Steam on first start. Min 2 GB RAM",
                  ],
                  [
                    "Counter-Strike 2",
                    "27015 udp + tcp",
                    "RCON",
                    "Downloads ~60 GB on first start; internet play needs a Steam Game Server Login Token. Min 2 GB RAM",
                  ],
                  [
                    "Terraria",
                    "7777/tcp",
                    "stdin",
                    "Vanilla dedicated server; world generated on first start. Min 1 GB RAM",
                  ],
                ].map(([game, ports, consoleType, notes]) => (
                  <tr key={game}>
                    <td className="px-4 py-2 text-foreground">{game}</td>
                    <td className="px-4 py-2 font-mono text-xs">{ports}</td>
                    <td className="px-4 py-2">{consoleType}</td>
                    <td className="px-4 py-2">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Each game also shows its own notes on the server&apos;s General tab
            — read them, they cover game-specific quirks such as which settings
            are rewritten on every start.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Creating a Game Server
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            From your project page click{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              New game server
            </code>
            , pick a game from the catalogue and fill in the form:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Server name — lowercase letters, digits and hyphens, up to 41 characters, unique across the whole instance. It names the container (dk-gs-<name>) and its volumes",
              "Start from — for games with modpacks, either the plain game or a modpack (see Mods and Modpacks)",
              "Settings — the game's own form (e.g. EULA, server type, version, MOTD, passwords). Fields such as the world seed or world name are fixed after creation",
              "Ports — host ports for each game port (see below)",
              "Memory — a hard limit between 256 MB and 64 GB; the API rejects less than the game's minimum. For Minecraft the JVM heap is set to 75% of it",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Secret fields left blank (such as the RCON password) are generated
            for you and shown <strong>once</strong> after creation — copy them
            then. Afterwards they are stored encrypted and only visible to
            project members who may view secrets. The server then provisions in
            the background; its status moves through{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              provisioning
            </code>{" "}
            to{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              running
            </code>
            . If Docker fails, the server shows{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              error
            </code>{" "}
            with the reason, and Start retries. The first start of most games
            downloads server files and can take minutes.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Creating a game server requires Operator access on the project
            (starting from a modpack is refused for users whose global role is
            Viewer).
            Changing settings on the Settings tab recreates the container, so a
            running server restarts and disconnects its players. Deleting a game
            server requires project Admin; by default its world volumes and
            backups are kept on the host unless you tick{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Also delete world data and backups
            </code>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Ports</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Players connect straight to a port on the host — often UDP — not
            through Traefik. The form pre-fills each port with the game&apos;s
            default host port, and you can change it at creation or later in
            Settings.
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            {[
              "If a host port is already taken (by another game server, any published container port, or a port DeployKit itself uses such as 22, 80, 443, 5432 or 6379), the API refuses it and suggests a free port",
              "Suggestions come from GAME_PORT_RANGE (default 20000-40000); set this variable on the API to use another range",
              "The same number can be used once for TCP and once for UDP",
              "Some Steam games (Valheim, CS2) listen on the same port number inside the container as on the host, and Valheim's query port is always the game port + 1",
              "The General tab shows the address players connect to. Set PUBLIC_IP on the DeployKit server so it can show the full address, not just the port",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">
                Open the ports in your provider&apos;s firewall:
              </span>{" "}
              Docker bypasses{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                ufw
              </code>
              , so a game port is reachable from the internet even if ufw says
              it is blocked — and a ufw allow rule is not what makes it work.
              Open (or restrict) each port in your cloud provider&apos;s firewall
              with the correct protocol, TCP or UDP. Cloudflare&apos;s proxy does
              not carry game traffic either, so these ports are exposed directly.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Console</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The Console tab shows the server output live and, while the server
            is running, lets you type commands (with ↑/↓ history). Output from
            your commands is shown to everyone watching the console. How the
            command reaches the game depends on its definition:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "RCON (Minecraft, CS2) — sent over the internal game network; the RCON port is never published on the host, and its password is generated per server",
              "stdin (Terraria) — written to the server process's standard input",
              "exec — run through an injector inside the container, never through a shell",
              "None (Valheim) — the game has no remote console, so the Console tab is hidden",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Commands are a single line of up to 1000 characters, limited to 20
            commands every 10 seconds per user and server, and every command is
            recorded in the audit log. Sending commands requires the Operator
            global role <strong>and</strong> Operator access on the project — a
            console command can load a plugin, which is code. Stopping a server
            sends the game&apos;s own stop command first (e.g.{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              stop
            </code>{" "}
            or{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              exit
            </code>
            ) so the world is saved, and only falls back to a signal if it does
            not exit in time.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Files</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The Files tab browses the server&apos;s volumes, whether the server is
            running or stopped. You can open and edit text files (up to 1 MB;
            larger or binary files are downloaded instead), create folders,
            rename, delete, upload and download files or whole folders. Common
            config files (such as{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              server.properties
            </code>
            ) have shortcuts at the top.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Uploads are limited by GAME_UPLOAD_MAX_BYTES (256 MB by default)",
              "Reading and downloading files requires permission to view secrets (Operator or Admin on the project), because config files contain passwords",
              "Writing, uploading, renaming and deleting requires the Operator global role and Operator access on the project — an uploaded .jar is code",
              "Paths are confined to the volume; DeployKit works on files through a short-lived helper container, never directly on the host",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mt-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Tip:</span> If the
              panel sits behind Cloudflare, its free plan caps requests at 100
              MB, so larger uploads fail regardless of{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                GAME_UPLOAD_MAX_BYTES
              </code>
              .
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            World Backups
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The Backups tab takes compressed snapshots of the world (the paths
            the game definition marks for backup — e.g. only{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              worlds_local/
            </code>{" "}
            for Valheim, only the cfg folder for CS2). Backups can be triggered
            manually or scheduled with a cron preset or a custom cron
            expression.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Retention is a number of backups (1–100, default 7), not days — worlds are large",
              "If the game has a console, saving is paused and flushed during the backup (e.g. save-off / save-all flush / save-on for Minecraft) so the snapshot is consistent",
              "Restore stops the server, replaces the backed-up paths and starts it again if it was running. By default it first takes a safety backup of the current world",
              "Backups can be downloaded from the list; completed and failed backups trigger the usual backup notifications",
              "Backups and restores run one at a time per instance, so a queued backup may wait for another to finish",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mt-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Warning:</span>{" "}
              Archives are stored on the same disk as the server, under{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                /var/backups/deploykit/@games/
              </code>
              . If that disk fails, the backups go with it — copy them off the
              machine.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Mods and Modpacks
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Games whose definition supports mods get a Mods tab — today that is
            Minecraft: Java Edition, with mods (Fabric, Forge) and plugins
            (Paper) from Modrinth and CurseForge. DeployKit keeps the list with
            each version pinned; the game image downloads the files when the
            container is rebuilt.
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            {[
              "Add mods by searching a catalogue (results are filtered to your server's loader and game version) or by pasting a link or id",
              "Changes are pending until you click Apply & restart, which takes a backup and recreates the container. Removing or disabling a mod, or changing the modpack, always forces that backup — and if the backup fails, nothing is applied",
              "Start a new server from a Modrinth or CurseForge modpack, or set one later; the modpack decides the server type and game version",
              "Check for updates compares your pinned versions with the catalogues",
              "Jars uploaded by hand to mods/ or plugins/ from the Files tab still work and are listed under On disk",
              "Adding, updating or removing mods and applying changes requires the Operator global role and Operator access on the project",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Modrinth works without configuration. CurseForge search and installs
            need an API key, and Steam Workshop search needs a Steam Web API
            key: an Admin adds them in{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Settings → Game mods
            </code>
            . Keys are validated against the provider before saving, stored
            encrypted, and only their last 4 characters are ever shown.
          </p>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Gotchas:</span> A
              modpack sets the Minecraft version but not the Java version —
              pick the matching Java tag yourself (current releases need Java
              25). If the server follows the latest Minecraft version while its
              mods are pinned, the next game release will break them; the Mods
              tab warns you to set a fixed version. Client-only Modrinth projects
              are listed but cannot be installed.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Isolation and Hardening
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Mods and plugins are third-party code running inside the container,
            so game servers are more locked down than applications:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "They run only on their own Docker network, deploykit-games — they cannot reach DeployKit's internal network (Postgres, Redis, your applications), and your applications cannot reach their RCON ports. The API joins this network on start-up to reach RCON",
              "no-new-privileges is set, the NET_RAW, MKNOD, AUDIT_WRITE, SYS_CHROOT, SETFCAP and SETPCAP capabilities are dropped, and each container is limited to 2048 processes",
              "Memory is a hard limit on the container",
              "Game servers on the same instance can see each other on deploykit-games; their RCON is protected by a per-server password",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            v0.6.0 also hardened the rest of the stack: Traefik now reads Docker
            through a read-only socket proxy, every service runs with
            no-new-privileges, and Redis requires a password — production
            installs must set{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              REDIS_PASSWORD
            </code>{" "}
            in{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            or the stack will not start.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Limitations
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Game servers run only on the local server; remote servers are rejected",
              "The catalogue is fetched from the template registry; if it is unreachable and nothing is cached, no game can be created",
              "Server names share the dk-gs- prefix with other services: an application or database named gs-<x> occupies the container name dk-gs-<x>. DeployKit refuses to touch a container it does not own and asks you to rename the game server",
              "Valheim has no console, so stopping and backups rely on a signal and the game's own save on shutdown; crossplay is not enabled",
              "Only RAM can be sized from the dashboard; disk usage is not limited, and some games download tens of GB on first start",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  cli: {
    title: "CLI Reference",
    description:
      "Install, update, and manage your DeployKit instance from the command line.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Overview</h3>
          <p className="text-muted-foreground leading-relaxed">
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              @deploykit/cli
            </code>{" "}
            is the official Node CLI for installing and operating a DeployKit
            instance: install, update, status, logs, restart and uninstall. It
            manages the DeployKit stack itself, not your applications — those
            are managed from the dashboard or the{" "}
            <a href="#api" className="text-primary hover:underline">
              API
            </a>
            . It only runs on Linux (it refuses to run on macOS or Windows), so
            connect to your VPS via SSH and run it there.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Install</h3>
          <CodeBlock
            language="bash"
            code={`# Global install
npm install -g @deploykit/cli

# Or one-shot via npx
sudo npx @deploykit/cli install --domain deploy.example.com --email you@example.com`}
          />
          <p className="text-sm text-muted-foreground mt-3">
            Requirements: Linux VPS (Ubuntu, Debian, RHEL, Alpine), Node.js
            &gt;= 20, root or sudo access, and ports 80/443 reachable from the
            internet. Every command except{" "}
            <code className="font-mono text-xs">status</code> and{" "}
            <code className="font-mono text-xs">logs</code> must run as root.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            deploykit install
          </h3>
          <p className="text-muted-foreground mb-4">
            Bootstraps DeployKit on the current machine: installs Git, Docker
            and Docker Compose if missing, clones the selected release to{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /opt/deploykit
            </code>
            , generates secrets into{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            (or keeps an existing one, updating only the domain and email),
            builds and starts every service, and optionally creates the admin
            account.
          </p>
          <CodeBlock
            language="bash"
            code={`sudo deploykit install \\
  --domain deploy.example.com \\
  --email you@example.com \\
  --admin-email admin@example.com \\
  --admin-password mypassword123`}
          />
          <p className="text-sm text-muted-foreground mt-3">
            Omitting <code className="font-mono text-xs">--domain</code> or{" "}
            <code className="font-mono text-xs">--email</code> in a TTY drops
            into interactive prompts. If the admin account cannot be created
            automatically, the installer says so — open the dashboard and
            register; the first user becomes admin.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Flag</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Description
                  </th>
                  <th className="px-4 py-2 font-medium text-bright">Default</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  ["--domain <domain>", "Dashboard domain (required)", "—"],
                  ["--email <email>", "Let's Encrypt email (required)", "—"],
                  ["--admin-email <email>", "Pre-create admin account", "—"],
                  [
                    "--admin-password <pwd>",
                    "Admin password, min 8 chars",
                    "—",
                  ],
                  ["--dir <path>", "Install directory", "/opt/deploykit"],
                  [
                    "--tag <tag>",
                    "Install a specific release, e.g. v0.6.0 (the v is optional)",
                    "latest release",
                  ],
                  [
                    "--branch <branch>",
                    "Install from a Git branch instead of a release",
                    "—",
                  ],
                ].map(([flag, desc, def]) => (
                  <tr key={flag}>
                    <td className="px-4 py-2 font-mono text-xs text-foreground">
                      {flag}
                    </td>
                    <td className="px-4 py-2">{desc}</td>
                    <td className="px-4 py-2 font-mono text-xs">{def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            By default the CLI installs the highest released semver tag
            (pre-releases are ignored). An unknown{" "}
            <code className="font-mono text-xs">--tag</code> fails immediately
            and lists the tags that exist; if the repository has no release at
            all, it falls back to{" "}
            <code className="font-mono text-xs">master</code>.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              REDIS_PASSWORD:
            </span>{" "}
            DeployKit v0.6.0 requires{" "}
            <code className="font-mono text-xs">REDIS_PASSWORD</code> in{" "}
            <code className="font-mono text-xs">.env</code>, which the CLI does
            not generate yet. If an install or update stops with{" "}
            <code className="font-mono text-xs">
              Set REDIS_PASSWORD in .env
            </code>
            , run{" "}
            <code className="font-mono text-xs">
              echo &quot;REDIS_PASSWORD=$(openssl rand -hex 32)&quot; | sudo
              tee -a /opt/deploykit/.env
            </code>{" "}
            and re-run the command.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            deploykit update
          </h3>
          <p className="text-muted-foreground mb-4">
            Moves the installation to the latest release, rebuilds the images,
            restarts the stack and waits for the API. Database migrations run
            automatically on API startup. Takes the same{" "}
            <code className="font-mono text-xs">--tag</code> and{" "}
            <code className="font-mono text-xs">--branch</code> flags as{" "}
            <code className="font-mono text-xs">install</code>, so you can pin
            or roll back to a release.
          </p>
          <CodeBlock
            language="bash"
            code={`sudo deploykit update                 # latest release
sudo deploykit update --tag v0.6.0    # pin (or roll back) to a release
sudo deploykit update --branch master # track unreleased code`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            deploykit status
          </h3>
          <p className="text-muted-foreground mb-4">
            Lists the DeployKit containers via{" "}
            <code className="font-mono text-xs">docker compose ps</code>.
          </p>
          <CodeBlock language="bash" code="deploykit status" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            deploykit logs
          </h3>
          <p className="text-muted-foreground mb-4">
            Follows live logs from every DeployKit service (
            <code className="font-mono text-xs">docker compose logs -f</code>).
            Useful when debugging a failed deploy or a misbehaving worker.
          </p>
          <CodeBlock language="bash" code="deploykit logs" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            deploykit restart
          </h3>
          <p className="text-muted-foreground mb-4">
            Restarts every DeployKit service in place (
            <code className="font-mono text-xs">docker compose restart</code>).
            A restart does not pick up changes to{" "}
            <code className="font-mono text-xs">.env</code> — to apply those,
            recreate the containers with{" "}
            <code className="font-mono text-xs">
              docker compose -f docker-compose.prod.yml up -d --build
            </code>{" "}
            from <code className="font-mono text-xs">/opt/deploykit</code> (see{" "}
            <a href="#config" className="text-primary hover:underline">
              Configuration
            </a>
            ).
          </p>
          <CodeBlock language="bash" code="sudo deploykit restart" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            deploykit uninstall
          </h3>
          <p className="text-muted-foreground mb-4">
            Stops the stack with{" "}
            <code className="font-mono text-xs">docker compose down -v</code>,
            removes the DeployKit images and deletes the install directory.
            Without <code className="font-mono text-xs">--yes</code> it asks
            you to type <code className="font-mono text-xs">yes</code>, and
            refuses to run non-interactively.{" "}
            <code className="font-mono text-xs">--delete-data</code> also
            deletes the backups in{" "}
            <code className="font-mono text-xs">/var/backups/deploykit</code>.
            Docker, user-deployed containers and{" "}
            <code className="font-mono text-xs">deploykit-network</code> are
            never touched.
          </p>
          <CodeBlock
            language="bash"
            code={`sudo deploykit uninstall --yes
sudo deploykit uninstall --yes --delete-data`}
          />
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mt-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Warning:</span>{" "}
              <code className="font-mono text-xs">down -v</code> removes the
              stack&apos;s named volumes — including the PostgreSQL database
              and Redis data — even without{" "}
              <code className="font-mono text-xs">--delete-data</code>. Export
              your configuration (Settings → Configuration export and import)
              and copy your backups off the server before uninstalling.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Global Flags
          </h3>
          <p className="text-muted-foreground mb-4">
            Every subcommand accepts{" "}
            <code className="font-mono text-xs">--dir &lt;path&gt;</code> to
            point at a non-default install location, and{" "}
            <code className="font-mono text-xs">--help</code> to print usage:
          </p>
          <CodeBlock
            language="bash"
            code={`deploykit --help
deploykit install --help
deploykit --version`}
          />
        </div>
      </div>
    ),
  },
  api: {
    title: "API Reference",
    description:
      "The tRPC API that powers the dashboard, plus the REST and Socket.IO endpoints around it.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            tRPC Architecture
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit&apos;s API is built with tRPC 11 on Fastify 5. The
            dashboard uses exactly the same procedures you can call, with input
            validated by Zod schemas shared between client and server. Everything
            is served on your panel domain:
          </p>
          <ul className="space-y-2 text-muted-foreground mt-3">
            {[
              "Procedures live under /trpc/<router>.<procedure>, e.g. /trpc/application.deploy",
              "Queries are GET requests with the input as URL-encoded JSON in ?input=",
              "Mutations are POST requests with a JSON body; Content-Type: application/json is mandatory (other types get 415)",
              "No data transformer is used: inputs and outputs are plain JSON, and successful responses are wrapped as {\"result\":{\"data\":...}}",
              "Request bodies are capped at 1 MiB (4 MiB for config.import)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Authentication
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Requests are authenticated with a JWT access token in the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Authorization
            </code>{" "}
            header. There are no separate API keys — scripts log in as a user
            and act with that user&apos;s role. Access tokens last 15 minutes
            and refresh tokens 7 days; every refresh returns a new pair and
            invalidates the old refresh token.
          </p>
          <CodeBlock
            language="bash"
            code={`# Log in — returns { user, accessToken, refreshToken }
curl -s https://deploy.example.com/trpc/auth.login \\
  -H 'Content-Type: application/json' \\
  -d '{"email":"admin@example.com","password":"..."}'

# Query: list your projects
curl -s https://deploy.example.com/trpc/project.list \\
  -H "Authorization: Bearer $ACCESS_TOKEN"

# Query with input
curl -s -G https://deploy.example.com/trpc/application.byId \\
  --data-urlencode 'input={"id":"<application-uuid>"}' \\
  -H "Authorization: Bearer $ACCESS_TOKEN"

# Mutation: trigger a deploy
curl -s https://deploy.example.com/trpc/application.deploy \\
  -H "Authorization: Bearer $ACCESS_TOKEN" \\
  -H 'Content-Type: application/json' \\
  -d '{"id":"<application-uuid>"}'

# Refresh when the access token expires
curl -s https://deploy.example.com/trpc/auth.refresh \\
  -H 'Content-Type: application/json' \\
  -d '{"refreshToken":"<refresh_token>"}'`}
          />
          <p className="text-sm text-muted-foreground mt-3">
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              auth.login
            </code>{" "}
            and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              auth.register
            </code>{" "}
            are limited to 10 requests per minute per IP, and all API routes to
            200 per minute.{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              auth.register
            </code>{" "}
            only works while the instance has no users.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Access Levels
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Each procedure is public, authenticated, operator-only or
            admin-only by global role. Most project resources (applications,
            databases, stacks, game servers) are open to any authenticated user
            at the procedure level and then checked against the caller&apos;s
            role in the owning project: non-members get{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              NOT_FOUND
            </code>
            , members without enough rights get{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              FORBIDDEN
            </code>
            . Running code (tasks, game console, file writes, mods) needs both
            a global operator role and operator rights in the project. See{" "}
            <a href="#users-rbac" className="text-primary hover:underline">
              Users &amp; RBAC
            </a>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Available Routers
          </h3>
          <div className="space-y-3">
            {[
              {
                router: "auth",
                desc: "Registration, login, logout, token refresh, profile",
                procedures:
                  "hasUsers, register, login, refresh (public) · me, logout, changePassword, updateProfile",
              },
              {
                router: "project",
                desc: "Projects that group apps, databases, stacks and game servers",
                procedures:
                  "list, byId · create, update, updateStatusPage (operator) · delete (admin)",
              },
              {
                router: "projectMember",
                desc: "Per-project role management",
                procedures:
                  "list, add, updateRole, remove, myRole, availableUsers",
              },
              {
                router: "application",
                desc: "Application lifecycle: config, env vars, domains, deploys, rollback, previews, maintenance",
                procedures:
                  "byId, create, update, delete, updateEnvVars, addDomain, removeDomain, deploy, deployBranch, rollback, start, stop, setMaintenance, logs, stats, instances, deployments, listPreviews, deletePreview",
              },
              {
                router: "database",
                desc: "Database provisioning, backups and restore",
                procedures:
                  "byId, create, delete, start, stop, stats, updateBackupConfig, triggerBackup, listBackups, deleteBackup, restoreBackup",
              },
              {
                router: "compose",
                desc: "Docker Compose stacks",
                procedures:
                  "list, byId, containers, containerLogs, deployments, create, deployFromTemplate, updateComposeFile, updateEnvVars, addDomain, removeDomain, deploy, stop, start, restart, delete",
              },
              {
                router: "template",
                desc: "One-click template catalogue",
                procedures:
                  "list, byId · import (operator) · registry, refreshCatalog (admin)",
              },
              {
                router: "gameServer",
                desc: "Game servers, with nested catalog, files, backups and mods routers",
                procedures:
                  "listByProject, byId, stats, create, update, start, stop, restart, delete, consoleSend · catalog.{list, byId, refresh} · files.{list, read, write, mkdir, delete, rename} · backups.{list, create, restore, delete, updateConfig} · mods.{sources, sourcesForGame, search, searchModpacks, versions, list, checkUpdates, add, update, remove, setModpack, applyChanges}",
              },
              {
                router: "task",
                desc: "Scheduled tasks and one-off commands",
                procedures:
                  "list, previewCron, runs, runOutput · create, update, delete, runNow, runAdHoc (operator)",
              },
              {
                router: "server",
                desc: "Servers: SSH connections, Docker setup, image cleanup",
                procedures:
                  "list, byId · testConnection, healthCheck (operator) · create, createLocal, update, delete, installDocker, pruneImages, pruneImagesAll (admin)",
              },
              {
                router: "sshKey",
                desc: "SSH key catalogue (admin only)",
                procedures: "list, byId, generate, create, update, delete",
              },
              {
                router: "github",
                desc: "GitHub App registration, installations and repositories",
                procedures:
                  "status, listInstallations, listRepositories, listBranches · startManifest, completeManifest, connectExisting, test, syncInstallation, syncInstallations, disconnect (admin)",
              },
              {
                router: "config",
                desc: "Configuration export and import as YAML (all mutations)",
                procedures:
                  "exportInstance, import (admin) · exportProject (project operator)",
              },
              {
                router: "metrics",
                desc: "Metric history and alert rules",
                procedures:
                  "history, timeseries, listRules, recentEvents, alertStats · createRule, updateRule (operator) · deleteRule (admin)",
              },
              {
                router: "logs",
                desc: "Persistent log search",
                procedures: "search",
              },
              {
                router: "notification",
                desc: "Notification channels",
                procedures:
                  "list, byId, availableEvents · create, update, delete, toggle, test (operator)",
              },
              {
                router: "user",
                desc: "User management and role assignment (admin only)",
                procedures: "list, create, updateRole, resetPassword, delete",
              },
              {
                router: "audit",
                desc: "Audit log querying (admin only)",
                procedures: "list, stats",
              },
              {
                router: "settings",
                desc: "Instance settings: CurseForge / Steam API keys (admin only)",
                procedures: "modKeys.status, modKeys.set",
              },
              {
                router: "dashboard",
                desc: "Overview statistics",
                procedures: "summary",
              },
              {
                router: "status",
                desc: "Public status page data (no login)",
                procedures: "getPublic",
              },
            ].map((item) => (
              <div
                key={item.router}
                className="rounded-lg border border-border bg-card p-4"
              >
                <code className="text-sm font-mono font-semibold text-primary">
                  {item.router}
                </code>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.desc}
                </p>
                <p className="text-xs text-dim mt-2 font-mono">
                  Procedures: {item.procedures}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            REST Endpoints
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            A few endpoints sit outside tRPC: Git provider webhooks (verified by
            signature or token, see{" "}
            <a href="#webhooks" className="text-primary hover:underline">
              Webhooks
            </a>
            ; limited to 120 requests per minute per IP) and streamed game
            server file transfers (Bearer token, project access checked).
          </p>
          <div className="space-y-2 mt-3">
            {[
              {
                method: "POST",
                path: "/api/webhooks/github",
                desc: "GitHub push/PR events (X-Hub-Signature-256)",
              },
              {
                method: "POST",
                path: "/api/webhooks/gitlab",
                desc: "GitLab push/MR events (X-Gitlab-Token)",
              },
              {
                method: "POST",
                path: "/api/webhooks/generic",
                desc: "Any CI (X-Webhook-Token)",
              },
              {
                method: "POST",
                path: "/api/game-servers/:id/files/upload",
                desc: "Upload a file (operator)",
              },
              {
                method: "GET",
                path: "/api/game-servers/:id/files/download",
                desc: "Download a file or folder",
              },
              {
                method: "GET",
                path: "/api/game-servers/:id/backups/:backupId/download",
                desc: "Download a world backup",
              },
            ].map((ep) => (
              <div
                key={ep.path}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
              >
                <span className="rounded px-2 py-0.5 font-mono text-xs font-bold bg-primary/10 text-primary">
                  {ep.method}
                </span>
                <code className="text-sm font-mono text-foreground break-all">
                  {ep.path}
                </code>
                <span className="ml-auto text-xs text-muted-foreground hidden sm:inline">
                  {ep.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Real-Time Events (Socket.IO)
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Socket.IO is served at path{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /ws
            </code>{" "}
            and authenticates with the access token passed as{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              auth.token
            </code>{" "}
            in the handshake. Clients join rooms with{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              subscribe:deployment
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              subscribe:logs
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              subscribe:metrics
            </code>{" "}
            and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              subscribe:task-run
            </code>{" "}
            (each checked against project access) and receive events such as{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploy:status
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploy:log
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              container:log
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              metrics:update
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              task:status
            </code>{" "}
            and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              alert:fired
            </code>
            . The web terminal also runs over this connection. Only{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEB_URL
            </code>{" "}
            is accepted as an origin.
          </p>
        </div>
      </div>
    ),
  },
  config: {
    title: "Configuration",
    description:
      "Instance-level configuration is done through environment variables in .env.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Where configuration lives
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            A production install reads{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /opt/deploykit/.env
            </code>
            . The installer generates it for you; for a manual install, start
            from{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env.production
            </code>
            .{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker-compose.prod.yml
            </code>{" "}
            builds some variables itself —{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DATABASE_URL
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              REDIS_URL
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEB_URL
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              NODE_ENV=production
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              API_PORT=4000
            </code>{" "}
            and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              COMPOSE_ROOT
            </code>{" "}
            — and those values win over anything you put in{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>
            . Every other variable is read from the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            file that is copied into the API image when it is built.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              Applying changes:
            </span>{" "}
            after editing{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>
            , rebuild and recreate the containers —{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              cd /opt/deploykit &amp;&amp; docker compose -f
              docker-compose.prod.yml up -d --build
            </code>
            . A plain{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit restart
            </code>{" "}
            does not pick up the new values.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Required Environment Variables
          </h3>
          <CodeBlock
            language="bash"
            code={`# Panel domain and Let's Encrypt email (production)
DOMAIN=panel.yourdomain.com
ACME_EMAIL=you@example.com

# PostgreSQL — production builds DATABASE_URL from these
DB_USER=deploykit
DB_PASSWORD=<openssl rand -hex 24>
DB_NAME=deploykit

# Redis password — required in production since v0.6.0.
# Hex only: it is embedded in redis://:<password>@redis:6379
REDIS_PASSWORD=<openssl rand -hex 32>

# JWT signing secrets (openssl rand -base64 32)
JWT_SECRET=<your-jwt-secret>
JWT_REFRESH_SECRET=<your-refresh-secret>

# AES-256-GCM key for secrets at rest (openssl rand -hex 32)
ENCRYPTION_KEY=<64-character-hex-string>

# Development / external services only — production sets these itself
DATABASE_URL=postgresql://user:password@localhost:5432/deploykit
REDIS_URL=redis://localhost:6379`}
          />
          <p className="text-sm text-muted-foreground mt-3">
            With{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              NODE_ENV=production
            </code>{" "}
            the API refuses to start if{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              JWT_SECRET
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              JWT_REFRESH_SECRET
            </code>{" "}
            or{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ENCRYPTION_KEY
            </code>{" "}
            is missing, shorter than 32 characters, or still contains a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              CHANGE_ME
            </code>{" "}
            placeholder; in development it only warns.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Warning:</span> never
            change{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ENCRYPTION_KEY
            </code>{" "}
            once data exists. Env vars, source tokens, SSH keys and other
            stored secrets are encrypted with it, and become unreadable under a
            new key. Keep a copy of your{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            somewhere safe.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Public URL (WEB_URL)
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEB_URL
            </code>{" "}
            is the public URL of your instance. CORS and Socket.IO origins,
            the links DeployKit puts on GitHub commit statuses, and the webhook
            and redirect URLs registered in a GitHub App are all built from it.
            DeployKit never derives it from the request&apos;s{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Host
            </code>{" "}
            header, which a client controls.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            In production you do not set it: the Compose file derives it as{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              https://$&#123;DOMAIN&#125;
            </code>
            , because Traefik serves the dashboard and the API on the same
            host. In development it defaults to{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              http://localhost:5173
            </code>
            ; to register a GitHub App from a dev machine, point it at a public
            tunnel (cloudflared, ngrok) — the App&apos;s webhook URL must be
            reachable by GitHub.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Changing DOMAIN:</span>{" "}
            a GitHub App keeps the webhook URL it was registered with. If you
            change{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DOMAIN
            </code>{" "}
            after registering one, disconnect and register the App again (or
            edit its URLs on GitHub), or pushes stop triggering deploys.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Optional Environment Variables
          </h3>
          <CodeBlock
            language="bash"
            code={`# Default HMAC secret for GitHub/GitLab webhooks and the generic webhook
# (X-Webhook-Token). Without it, GitLab webhooks — and GitHub webhooks for
# apps with no per-app secret and no GitHub App — are rejected.
# Optional for GitHub once a GitHub App is registered.
WEBHOOK_SECRET=<openssl rand -base64 32>

# Set to "true" ONLY when every request reaches the API through a trusted
# proxy that sets X-Forwarded-For. Otherwise the header is ignored, so
# clients cannot spoof their IP in rate limits and audit logs. Default: false
TRUST_PROXY=false

# "production" enables HSTS and the fail-fast secret check (set by the prod compose)
NODE_ENV=development

# API port (default 3001; production fixes it to 4000 behind Traefik)
API_PORT=3001

# Docker socket path — auto-detected; override only if non-standard
DOCKER_SOCKET=/var/run/docker.sock

# Retention
AUDIT_RETENTION_DAYS=90             # audit log entries (pruned daily at 04:00)
LOG_RETENTION_DAYS=7                # persistent container logs
METRICS_RAW_RETENTION_HOURS=48      # 1-minute metric samples
METRICS_HISTORY_RETENTION_DAYS=90   # 1-hour metric rollups
LOG_BUFFER_MAX=5000                 # log lines buffered before writing; excess is dropped`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Compose Stacks &amp; Templates
          </h3>
          <CodeBlock
            language="bash"
            code={`# Where stack directories live. Must be bind-mounted from the host at the
# SAME absolute path (production fixes it to /var/lib/deploykit/compose).
COMPOSE_ROOT=/var/lib/deploykit/compose

# Wildcard domain pointing at this host, used for template hostnames when
# you don't supply one (*.apps.yourdomain.com). The only option that can
# get a real Let's Encrypt certificate.
TEMPLATES_BASE_DOMAIN=apps.yourdomain.com

# Fallback without a wildcard domain: this host's public IPv4. Templates get
# <name>-<rand>.<ip>.sslip.io hostnames — no DNS setup, but plain HTTP only.
PUBLIC_IP=203.0.113.10

# Template registry. Point it at a fork or private mirror to publish your own
# blueprints. If unreachable, the catalogue bundled in the image is used.
TEMPLATES_REGISTRY_URL=https://raw.githubusercontent.com/deploykithq/deploykit-templates/master`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Game Servers
          </h3>
          <CodeBlock
            language="bash"
            code={`# Host port range DeployKit suggests free ports from when a game's default
# port is taken. Players connect straight to these ports — open them in your
# provider's firewall.
GAME_PORT_RANGE=20000-40000

# Largest file the game server Files tab accepts as an upload, in bytes (256 MiB)
GAME_UPLOAD_MAX_BYTES=268435456`}
          />
          <p className="text-sm text-muted-foreground mt-3">
            CurseForge and Steam API keys are not environment variables: an
            admin sets them in{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Settings → Game mods
            </code>
            , where they are stored encrypted. Likewise, the GitHub App is
            registered from{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Settings → GitHub App
            </code>{" "}
            — the old{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              GITHUB_CLIENT_ID
            </code>{" "}
            /{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              GITHUB_CLIENT_SECRET
            </code>{" "}
            variables are no longer used.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Vulnerability Scanning (Trivy)
          </h3>
          <CodeBlock
            language="bash"
            code={`# Scan built images by default. Only the exact value "true" enables it;
# unset means off. Each application can override this in its General tab.
SCAN_ENABLED=true

TRIVY_IMAGE=aquasec/trivy:latest            # scanner image
TRIVY_CACHE_VOLUME=deploykit-trivy-cache    # volume caching the vulnerability DB
TRIVY_TIMEOUT_SECONDS=300                   # per-scan timeout`}
          />
          <p className="text-sm text-muted-foreground mt-3">
            Scans are advisory — results are recorded on the deployment and
            never block it — and run for applications on the local server only.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Security Configuration
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            DeployKit includes built-in security features that are configured
            automatically:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Rate Limiting — Global: 200 req/min per IP on /trpc and /api; login and register: 10 req/min; webhooks: 120 req/min",
              "Request size — 1 MiB per request body, except the configuration import (4 MiB)",
              "Encryption — Env vars, tokens, SSH keys and integration credentials encrypted with AES-256-GCM",
              "Security Headers — X-Content-Type-Options, X-Frame-Options, Referrer-Policy, a strict CSP, and HSTS in production",
              "Secret Redaction — Build logs automatically scrub tokens, passwords, and keys",
              "CORS — Only WEB_URL is allowed, for both the API and Socket.IO",
              "Isolation — Redis requires a password, Traefik reads Docker through a read-only proxy, and every production container runs with no-new-privileges",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Development Setup
          </h3>
          <CodeBlock
            language="bash"
            code={`# Requires Node.js 20+, pnpm 9+ and Docker
pnpm install
cp .env.example .env   # fill in the secrets

# Start PostgreSQL, Redis and Traefik
docker compose up -d

# Apply migrations, then start API + Web in dev mode
pnpm db:migrate
pnpm dev

# Or start individually
pnpm dev:api   # API on :3001
pnpm dev:web   # Web on :5173

# Other commands
pnpm db:studio    # Open Drizzle Studio GUI
pnpm build        # Production build
pnpm lint         # Type check all packages
pnpm clean        # Remove dist/ directories`}
          />
          <p className="text-sm text-muted-foreground mt-3">
            Do not run{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              pnpm db:generate
            </code>{" "}
            or{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              drizzle-kit push
            </code>
            : the generator compares against an outdated baseline and produces
            a broken migration. New migrations are written by hand as SQL.
          </p>
        </div>
      </div>
    ),
  },
  "export-import": {
    title: "Export & Import",
    description:
      "Export your instance's configuration as YAML to review it in git, clone it to another server, or rebuild after losing a host.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Overview</h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit can describe your whole instance — or a single project —
            as a YAML manifest. Keep it in git to review infrastructure
            changes, apply it on a new host to clone the setup, or use it to
            restore after losing a server. Exports are deterministic: keys are
            sorted, so re-exporting an unchanged instance produces an identical
            file and git diffs show only real changes.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            This is configuration, not data. Database contents, volumes and
            game worlds are not included — use{" "}
            <a href="#databases" className="text-primary hover:underline">
              database backups
            </a>{" "}
            for those.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Two files: configuration and secrets
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "Configuration manifest",
                kind: "deploykit/instance-config",
                desc: "Projects, members (by email), applications, databases, Compose stacks with their Compose files, domains, env vars, scheduled tasks, backup schedules and status page settings. Credentials are withheld and listed by name only. Safe to commit to a private repository.",
              },
              {
                name: "Secrets file",
                kind: "deploykit/instance-secrets",
                desc: "The withheld values, in plain text: secret env vars and build args, database passwords, repository access tokens, per-app webhook secrets and sensitive stack mount files. Only produced when you ask for it. Never commit it.",
              },
            ].map((doc) => (
              <div
                key={doc.name}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="font-medium text-bright">{doc.name}</p>
                <p className="text-xs text-dim mt-1 font-mono">
                  kind: {doc.kind}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {doc.desc}
                </p>
              </div>
            ))}
          </div>
          <CodeBlock
            language="yaml"
            code={`version: 1
kind: deploykit/instance-config
exportedAt: "2026-10-14T10:00:00.000Z"
projects:
  - name: shop
    applications:
      - name: storefront
        sourceType: github
        repositoryUrl: https://github.com/acme/storefront
        branch: main
        buildType: nixpacks
        port: 3000
        env:
          NODE_ENV: production
          API_BASE_URL: https://api.acme.com
        withheldSecrets:
          - STRIPE_SECRET_KEY
          - sourceToken
        domains:
          - domain: shop.acme.com
            port: 3000
            https: true`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            What counts as a secret
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Env vars are withheld from the configuration file when any of these
            match:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "The name contains PASS, PWD, SECRET, TOKEN, KEY, CRED, PRIVATE, SALT, SIGNING, CIPHER or DSN",
              "The value looks like a credential: a URL with user:password@, a PEM private key, a JWT, or a known token prefix (ghp_, sk_, xoxb-, AKIA…, glpat-, and others)",
              "The value looks generated: 32+ characters, no spaces, and at least three character classes",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Names ending in{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              _URL
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              _HOST
            </code>{" "}
            or{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              _ENDPOINT
            </code>{" "}
            stay in the manifest unless the value itself carries credentials —
            they are exactly what you want to review. Database passwords,
            repository tokens, webhook secrets, sensitive build args and stack
            mount contents are always withheld.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Review before you push:</span>{" "}
            the configuration file still contains every Compose file and the
            name of every env var. The detection is deliberately broad, but
            check the file before committing it to a public repository.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Never exported
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Servers and SSH keys — resources reference servers by name",
              "The GitHub App — its credentials belong to the instance and its webhook URL. Applications carry their GitHub repository id, and the import re-links them to a matching installation on the target",
              "Users — members are matched by email on import; users are never created",
              "Game servers, notification channels and alert rules",
              "Runtime state: container status and ids, deployment history, maintenance mode, preview environments, and the last run of each task",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Exporting from the dashboard
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Whole instance (admins): Settings → Configuration export and import → “Export configuration” downloads deploykit-config-<date>.yaml; “Export secrets” downloads deploykit-secrets-<date>.yaml",
              "One project (project operators and admins): the “Export” button on the project page downloads that project's configuration, without secrets",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            If a value cannot be decrypted (for example after an{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ENCRYPTION_KEY
            </code>{" "}
            change), it is skipped and listed under the export&apos;s warnings.
            Every export is recorded in the audit log as{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              config.export
            </code>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Importing</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Admins import from{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Settings → Configuration export and import → Import
            </code>
            :
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "“Choose manifest” and, optionally, “Choose secrets file”",
              "Optionally tick “Run on the local host when a server named in the file does not exist here”",
              "Click Preview to see the plan — nothing is written yet",
              "Click Import to apply exactly that plan",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            The plan lists every item as{" "}
            <span className="text-bright">to create</span>,{" "}
            <span className="text-bright">already there</span>,{" "}
            <span className="text-bright">skipped</span> (with a reason, such
            as an unknown member email) or{" "}
            <span className="text-bright">blocking</span>. Any blocking error
            disables Import: the import runs as a single transaction, because
            half a restore is worse than none. The plan also shows warnings,
            withheld values with nothing to restore, and container name
            conflicts.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Conflict behaviour
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            An import creates what is missing and never modifies what already
            exists. Resources are matched by name (case-insensitive):
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Existing project — kept as is, but its contents are still walked: re-applying a manifest after adding an app creates just that app",
              "Existing application, database or stack — left untouched, including its domains, env vars and tasks. Adding a domain or cron job to something that already runs is a change, not a missing resource",
              "Domain already routed on this instance — skipped",
              "Two existing projects (or servers) with the same name — blocking error until you rename one",
              "Status page slug already in use — the project is imported with its status page disabled",
              "Server named in the file does not exist — blocking error by default, or the resource runs on the local host if you ticked the option",
              "Missing database password — a new one is generated (warning: anything holding the old connection string must be updated)",
              "Applications linked to a GitHub App — re-linked to the one installation here that can see the repository; otherwise they fall back to their repository URL with a warning",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              Container name conflicts:
            </span>{" "}
            containers are named{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              dk-&lt;name&gt;
            </code>{" "}
            after the resource, and a deploy replaces any container that
            already has that name. If the plan reports a conflict, deploying
            the imported resource would replace the existing one — rename one
            of them first.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            After importing
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Nothing is deployed: the import writes configuration, not
            containers. Imported applications and stacks wait for a Deploy,
            and imported databases for their first Start. Scheduled tasks and
            database backup schedules are registered immediately. Each applied
            import is recorded in the audit log as{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              config.import
            </code>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Using the API
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            There is no CLI command for export or import; script it through
            the{" "}
            <a href="#api" className="text-primary hover:underline">
              API
            </a>{" "}
            instead. All three procedures are mutations (POST), so responses
            that may contain secrets are never cached.
          </p>
          <CodeBlock
            language="bash"
            code={`# Export the instance (admin). Returns { manifest, secrets, warnings, counts };
# manifest and secrets are YAML strings (secrets is null unless requested).
curl -s https://deploy.example.com/trpc/config.exportInstance \\
  -H "Authorization: Bearer $ACCESS_TOKEN" \\
  -H 'Content-Type: application/json' \\
  -d '{"includeSecrets":false}'

# Export one project (project operator or admin)
curl -s https://deploy.example.com/trpc/config.exportProject \\
  -H "Authorization: Bearer $ACCESS_TOKEN" \\
  -H 'Content-Type: application/json' \\
  -d '{"projectId":"<project-uuid>","includeSecrets":false}'

# Import (admin). dryRun defaults to true and returns the plan;
# send the same request with "dryRun": false to apply it.
curl -s https://deploy.example.com/trpc/config.import \\
  -H "Authorization: Bearer $ACCESS_TOKEN" \\
  -H 'Content-Type: application/json' \\
  -d "$(jq -n --rawfile m deploykit-config.yaml --rawfile s deploykit-secrets.yaml \\
        '{manifest: $m, secrets: $s, dryRun: true, onMissingServer: "fail"}')"`}
          />
          <p className="text-sm text-muted-foreground mt-3">
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              onMissingServer
            </code>{" "}
            is{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              &quot;fail&quot;
            </code>{" "}
            (default) or{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              &quot;local&quot;
            </code>
            . Limits: 2 MB for the manifest and 500 KB for the secrets file.
          </p>
        </div>
      </div>
    ),
  },
  webhooks: {
    title: "Webhooks & CI/CD",
    description:
      "Automatic deployments triggered by Git pushes, pull requests and CI pipelines.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            How Auto-Deploy Works
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            When DeployKit receives a push event, it looks for applications
            whose repository and branch match and queues a deployment for each
            one — exactly as if you had clicked Deploy. Pull request / merge
            request events create, update and clean up{" "}
            <a
              href="#preview-deployments"
              className="text-primary hover:underline"
            >
              preview deployments
            </a>
            . Preview apps themselves are never matched by push events. If
            nothing matches, the endpoint answers with an explanatory message
            rather than an error.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Endpoints</h3>
          <div className="space-y-2">
            {[
              {
                method: "POST",
                path: "/api/webhooks/github",
                desc: "HMAC signature in X-Hub-Signature-256",
              },
              {
                method: "POST",
                path: "/api/webhooks/gitlab",
                desc: "Token in X-Gitlab-Token",
              },
              {
                method: "POST",
                path: "/api/webhooks/generic",
                desc: "Token in X-Webhook-Token",
              },
            ].map((ep) => (
              <div
                key={ep.path}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
              >
                <span className="rounded px-2 py-0.5 font-mono text-xs font-bold bg-primary/10 text-primary">
                  {ep.method}
                </span>
                <code className="text-sm font-mono text-foreground">
                  {ep.path}
                </code>
                <span className="ml-auto text-xs text-muted-foreground hidden sm:inline">
                  {ep.desc}
                </span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Requests that fail verification get a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              401
            </code>
            . All three endpoints share a rate limit of 120 requests per minute
            per IP.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            GitHub: Use the GitHub App
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            For github.com, the recommended setup is the{" "}
            <a href="#github-app" className="text-primary hover:underline">
              GitHub App
            </a>
            . It registers its own webhook, so connected applications need no
            per-repository webhook at all — the application&apos;s{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Webhook
            </code>{" "}
            section simply says it is handled by the App. App deliveries are
            verified with the App&apos;s own webhook secret, and you also get
            commit statuses and PR comments.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            GitHub: Repository Webhook
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Without the App, add a webhook in your repository under{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Settings → Webhooks
            </code>
            . The URL is also shown in the application&apos;s General tab:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Payload URL: https://your-deploykit-domain/api/webhooks/github",
              "Content type: application/json",
              "Secret: the WEBHOOK_SECRET from your .env file",
              "Events: 'Pushes', plus 'Pull requests' for preview deployments",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Apps without the App connection are matched by repository URL
            (case, a trailing slash and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .git
            </code>{" "}
            are ignored) and branch. A repository webhook keeps working after
            you register a GitHub App — both secrets are accepted. If you later
            connect the app through the App, the old webhook&apos;s duplicate
            delivery is ignored (connected apps match only by installation and
            repository id), so a push never deploys twice; you can delete it.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            GitLab Webhooks
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            In your GitLab project, go to{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Settings → Webhooks
            </code>{" "}
            and add:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "URL: https://your-deploykit-domain/api/webhooks/gitlab",
              "Secret token: the WEBHOOK_SECRET from your .env file",
              "Triggers: 'Push events', plus 'Merge request events' for preview deployments",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Opening, updating or reopening a merge request deploys its preview;
            merging or closing it removes the preview.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Generic Webhook (CI, Bitbucket, Gitea, scripts)
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Any system can trigger a deploy by posting a push-style JSON payload
            to{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /api/webhooks/generic
            </code>{" "}
            with an{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              X-Webhook-Token
            </code>{" "}
            header. The branch comes from{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ref
            </code>{" "}
            and the repository from{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              repository.clone_url
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              repository.html_url
            </code>{" "}
            or{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              repository.links.html.href
            </code>{" "}
            (Bitbucket). Every application matching that URL and branch is
            deployed — including apps connected through the GitHub App.
          </p>
          <CodeBlock
            language="bash"
            code={`curl -X POST https://your-deploykit-domain/api/webhooks/generic \\
  -H "Content-Type: application/json" \\
  -H "X-Webhook-Token: $DEPLOYKIT_WEBHOOK_TOKEN" \\
  -d '{
    "ref": "refs/heads/main",
    "repository": { "clone_url": "https://github.com/acme/web.git" }
  }'`}
          />
          <p className="text-muted-foreground leading-relaxed mt-3">
            The token is either the global{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEBHOOK_SECRET
            </code>{" "}
            or an application&apos;s own webhook secret. A per-app secret (16–200
            characters) is set through the API with{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              application.update
            </code>{" "}
            (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              webhookSecret
            </code>
            ); once set, that app only deploys with its own secret, so you can
            hand a CI pipeline access to one app and rotate it without touching
            the global secret. Optional fields{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              after
            </code>{" "}
            /{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              head_commit.id
            </code>{" "}
            and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              head_commit.message
            </code>{" "}
            label the deployment; the deploy always builds the branch head.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Deploying from CI/CD
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Auto-deploy on push usually makes CI integration unnecessary. To
            deploy only after tests pass, make sure the application does not
            also receive push events (no repository webhook, and not connected
            through the GitHub App — connected apps deploy on every push), then
            call the generic endpoint as the last CI step:
          </p>
          <CodeBlock
            language="yaml"
            code={`# .github/workflows/deploy.yml
name: Deploy after tests
on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test
      - name: Trigger DeployKit deployment
        run: |
          curl -fsS -X POST https://panel.yourdomain.com/api/webhooks/generic \\
            -H "Content-Type: application/json" \\
            -H "X-Webhook-Token: $\{{ secrets.DEPLOYKIT_WEBHOOK_TOKEN }}" \\
            -d '{"ref":"$\{{ github.ref }}","after":"$\{{ github.sha }}","repository":{"clone_url":"$\{{ github.server_url }}/$\{{ github.repository }}.git"}}'`}
          />
          <p className="text-muted-foreground leading-relaxed mt-3">
            You can also call the tRPC API with a user session: log in with{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              auth.login
            </code>{" "}
            and call{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              application.deploy
            </code>{" "}
            with the app id. The user needs the operator role on the project,
            access tokens expire after 15 minutes, and a deploy already in
            progress returns a conflict.
          </p>
          <CodeBlock
            language="bash"
            code={`TOKEN=$(curl -s -X POST https://panel.yourdomain.com/trpc/auth.login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"ci@example.com","password":"..."}' \\
  | jq -r '.result.data.accessToken')

curl -X POST https://panel.yourdomain.com/trpc/application.deploy \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"id":"your-app-id"}'`}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Webhook Security
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "GitHub: HMAC-SHA256 of the exact request bytes, checked against the GitHub App's webhook secret or WEBHOOK_SECRET (either is accepted)",
              "GitLab: X-Gitlab-Token compared with WEBHOOK_SECRET",
              "Generic: X-Webhook-Token compared with the app's own secret or WEBHOOK_SECRET; without a valid token the endpoint never reveals whether a repository matched",
              "All comparisons are constant-time; with no secret configured, deliveries are rejected (fail-closed)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEBHOOK_SECRET
            </code>{" "}
            becomes optional once a GitHub App is registered, but keep it for
            GitLab, the generic endpoint and any hand-made repository webhooks.
          </p>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              Push not deploying?
            </span>{" "}
            Check the delivery in your Git provider (GitHub: Settings → Webhooks
            → Recent Deliveries). A{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              401
            </code>{" "}
            means the secret does not match — and because the GitHub signature
            is computed over the raw body, anything between GitHub and DeployKit
            that rewrites the request body will also break it. A{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              200
            </code>{" "}
            with &quot;No applications found&quot; means the repository URL or
            branch configured in DeployKit does not match the push.
          </p>
        </div>
      </div>
    ),
  },
  "audit-logs": {
    title: "Audit Logs",
    description:
      "An instance-wide record of who did what, kept for a configurable number of days.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            What Gets Logged
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Actions users take in the dashboard or through the API are
            recorded (deploys triggered automatically by Git webhooks are not),
            grouped by area:
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Area</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  [
                    "Authentication",
                    "login, logout, register, change password, update profile",
                  ],
                  [
                    "Projects & members",
                    "create, update, status page update, delete; member add, role change, remove",
                  ],
                  [
                    "Applications",
                    "create, update, delete, deploy (including rollbacks), start, stop, env var changes, domain add/remove, maintenance on/off",
                  ],
                  [
                    "Databases",
                    "create, delete, start, stop, backup, restore, backup config changes",
                  ],
                  [
                    "Compose stacks",
                    "create, update, delete, deploy, start, stop, restart, env var changes, domain add/remove",
                  ],
                  [
                    "Scheduled tasks",
                    "create, update, delete, run now, one-off command",
                  ],
                  [
                    "Game servers",
                    "create, update, start, stop, restart, delete, console commands, file write/upload/delete/rename/mkdir, backups and restores, mod changes",
                  ],
                  [
                    "Instance",
                    "users, servers, SSH keys, notification channels, GitHub App (create, delete, sync), configuration export/import, instance settings",
                  ],
                ].map(([area, actions]) => (
                  <tr key={area}>
                    <td className="px-4 py-2 font-medium text-foreground">
                      {area}
                    </td>
                    <td className="px-4 py-2">{actions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Secret values are never written to the log: changing an instance
            setting records the key name, not its value, and a configuration
            export records the scope and whether secrets were included.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Log Details
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Each entry includes:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "User — the user's ID and email at the time of the action",
              "Action — e.g. application.deploy or database.restore",
              "Resource — type, ID and name of what was affected",
              "Metadata — extra context as JSON (e.g. the domain added, the backup file restored)",
              "IP address of the request",
              "Timestamp",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Entries are not linked to live records, so they survive the deletion
            of the user or resource they refer to — the stored email and
            resource name stay readable.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Viewing & Filtering
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            The{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Audit Log
            </code>{" "}
            page is available to global Admins only — it spans every project.
            It shows event counts for the last 24 hours and 7 days and deploys
            in the last 7 days, and lets you search by user, resource or
            action, filter by resource type and action, and expand an entry to
            see its metadata. Results are paginated, 50 per page.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Client IPs:</span>{" "}
            the IP comes from{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              X-Forwarded-For
            </code>{" "}
            only when{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              TRUST_PROXY=true
            </code>
            ; otherwise the address of the direct peer is recorded, which
            behind Traefik is the proxy itself. Enable it only behind a trusted
            proxy, or clients could write any IP they like into the log. The
            stock{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker-compose.prod.yml
            </code>{" "}
            does not pass this variable to the API container — add it to the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              api
            </code>{" "}
            service&apos;s{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              environment
            </code>{" "}
            block.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Retention & Cleanup
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Once a day, around 04:00 server time, entries older than{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              AUDIT_RETENTION_DAYS
            </code>{" "}
            (default: 90) are deleted. The value is read when the API starts.
            With the stock{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker-compose.prod.yml
            </code>
            , setting it in{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            alone has no effect: add{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              AUDIT_RETENTION_DAYS: $&#123;AUDIT_RETENTION_DAYS:-90&#125;
            </code>{" "}
            to the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              api
            </code>{" "}
            service&apos;s environment and recreate the container.
          </p>
        </div>
      </div>
    ),
  },
};
