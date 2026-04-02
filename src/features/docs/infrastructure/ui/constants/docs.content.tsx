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
            that allows you to deploy applications, databases, and services on
            your own infrastructure. Think of it as your own Vercel or Heroku,
            with full control over your data, no vendor lock-in, and no usage
            limits.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Key Features
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "Multi-Source Deploys",
                desc: "Deploy from GitHub, GitLab, Git repos, or Docker images",
              },
              {
                name: "Auto-Detect Builds",
                desc: "Nixpacks, Dockerfile, and Cloud Native Buildpacks support",
              },
              {
                name: "Database Provisioning",
                desc: "One-click PostgreSQL, MySQL, MariaDB, MongoDB, and Redis",
              },
              {
                name: "Automatic SSL",
                desc: "Free HTTPS certificates via Let's Encrypt + Traefik",
              },
              {
                name: "Preview Deployments",
                desc: "Automatic ephemeral environments for pull requests",
              },
              {
                name: "Real-Time Monitoring",
                desc: "CPU, memory, and network metrics with live logs",
              },
              {
                name: "Role-Based Access",
                desc: "Admin, Operator, and Viewer roles with per-project overrides",
              },
              {
                name: "Notifications",
                desc: "Discord, Slack, Telegram, Email, and Webhook alerts",
              },
            ].map((feature) => (
              <div
                key={feature.name}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="font-medium text-bright">{feature.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Architecture
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            DeployKit is a monorepo with two main applications and a shared
            package:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "API — Fastify 5 backend with tRPC 11 for type-safe communication, Drizzle ORM for PostgreSQL, BullMQ for async job processing, and Socket.IO for real-time updates",
              "Web — React 19 SPA with TanStack Router (file-based routing), TanStack React Query, Zustand for state management, and Tailwind CSS",
              "Shared — Zod schemas and TypeScript types shared between API and Web",
              "Traefik v3 — Reverse proxy that handles HTTP/HTTPS traffic, automatic SSL, and routing to containers",
              "PostgreSQL 16 — Stores all system configuration, users, projects, and audit data",
              "Redis 7 — Powers the BullMQ job queue for deployments, backups, and scheduled tasks",
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
            System Requirements
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Linux server (Ubuntu 20.04+, Debian 11+, CentOS 8+)",
              "1 vCPU minimum (2+ recommended)",
              "1 GB RAM minimum (2+ GB recommended)",
              "10 GB disk minimum (50+ GB recommended depending on apps/data)",
              "Ports 80 and 443 open for HTTP/HTTPS traffic",
              "Root or sudo access",
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
            Quick Install
          </h3>
          <p className="text-muted-foreground mb-4">
            Run the following command on your server. The installer will
            interactively guide you through the setup:
          </p>
          <CodeBlock
            language="bash"
            code="curl -fsSL https://get.deploykit.es | sh"
          />
          <p className="text-sm text-muted-foreground mt-3">
            The installer will prompt you for your domain, SSL email (for Let's
            Encrypt), and optionally an admin email and password. It
            automatically installs Docker, clones DeployKit, generates secrets,
            configures the environment, starts all services, and runs database
            migrations.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Manual Installation
          </h3>
          <p className="text-muted-foreground mb-4">
            If you prefer a step-by-step installation:
          </p>
          <CodeBlock
            language="bash"
            code={`# 1. Clone the repository
git clone https://github.com/deploykit/deploykit.git
cd deploykit

# 2. Copy and configure environment variables
cp .env.example .env
# Edit .env with your settings (see Configuration section)

# 3. Generate required secrets
openssl rand -base64 32  # JWT_SECRET
openssl rand -base64 32  # JWT_REFRESH_SECRET
openssl rand -hex 32     # ENCRYPTION_KEY
openssl rand -base64 32  # WEBHOOK_SECRET

# 4. Start all services with Docker Compose
docker compose -f docker-compose.prod.yml up -d

# 5. Run database migrations
pnpm db:migrate`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            What Gets Installed
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Traefik v3 — Reverse proxy with automatic Let's Encrypt SSL",
              "PostgreSQL 16 — Main database with persistent volume",
              "Redis 7 — Job queue and cache for BullMQ",
              "DeployKit API — Node 20 Alpine container with Docker socket access",
              "DeployKit Web — Static React build served from Nginx",
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
            Post-Installation
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Once the installation is complete, open your browser and navigate to
            your configured domain (e.g.,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              https://panel.yourdomain.com
            </code>
            ). If this is a fresh installation with no existing users, you'll be
            presented with a registration form to create the first admin account.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Updating DeployKit
          </h3>
          <CodeBlock
            language="bash"
            code={`# From the deploykit directory
./update.sh`}
          />
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
            When you access the dashboard for the first time, you'll see a
            registration form. Enter your email and password to create the admin
            account. This account has full control over the platform.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            2. Add a server
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Navigate to{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Servers
            </code>{" "}
            and add your first server. You can add a local server (the machine
            where DeployKit is running) or a remote server via SSH. DeployKit
            will verify Docker is installed and collect system specs (CPU,
            memory, disk).
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            3. Create a project
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Projects are containers that group related applications and
            databases. Go to the dashboard and create your first project with a
            name and optional description.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            4. Create an application
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Inside your project, create a new application. Configure the source
            (GitHub, GitLab, Git URL, or Docker image), select a branch, and
            choose a build strategy (Nixpacks for auto-detection, Dockerfile, or
            Buildpacks). Set the port your app listens on.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            5. Deploy
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Click the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Deploy
            </code>{" "}
            button. DeployKit will clone your repository, build a Docker image,
            start the container with Traefik labels for routing, and run health
            checks. You can watch the entire process in real-time through the
            build logs.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Tip:</span> Enable
            auto-deploy via webhooks so that every push to your main branch
            automatically triggers a new deployment. Configure this in the
            application settings.
          </p>
        </div>
      </div>
    ),
  },
  applications: {
    title: "Applications",
    description:
      "Complete guide to creating, configuring, and deploying applications.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Source Types
          </h3>
          <p className="text-muted-foreground mb-4">
            DeployKit supports multiple source types for your applications:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "GitHub",
                desc: "Connect via repository URL with optional access token for private repos",
              },
              {
                name: "GitLab",
                desc: "Connect via repository URL with optional access token for private repos",
              },
              {
                name: "Generic Git",
                desc: "Any Git repository accessible via URL with optional token authentication",
              },
              {
                name: "Docker Image",
                desc: "Pull and deploy any Docker image directly from a registry",
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
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Build Strategies
          </h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-bright">Nixpacks (Recommended)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Automatically detects your language and framework (Node.js,
                Python, Go, Rust, Ruby, Java, PHP, and more) and generates an
                optimized Dockerfile. No configuration needed in most cases.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-bright">Dockerfile</p>
              <p className="text-sm text-muted-foreground mt-1">
                Use your own Dockerfile for full control over the build process.
                Specify a custom Dockerfile path and build arguments as needed.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-bright">
                Cloud Native Buildpacks
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Alternative auto-detection method using the Buildpacks
                specification. Good for projects that follow standard conventions.
              </p>
            </div>
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
            in the application settings. DeployKit will use that directory as the
            build context.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Environment Variables
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Manage environment variables from the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Env Vars
            </code>{" "}
            tab of your application. All environment variables are encrypted at
            rest using AES-256-GCM and injected into the container at runtime.
            Sensitive values are never stored in plain text.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Volumes
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Configure persistent storage mounts using the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              host:container
            </code>{" "}
            format. Volumes persist across deployments, ensuring your data is not
            lost when a container is replaced.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Health Checks
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            DeployKit supports configurable health checks to ensure your
            application is running correctly:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "HTTP — Sends a GET request to a specified path and expects a 2xx response",
              "TCP — Checks if the container port is accepting connections",
              "Disabled — Skips health checks entirely",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            You can configure the health check path, timeout, interval, retries,
            and whether the check is required for a successful deployment.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Rollbacks
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Every deployment creates a record with commit hash, build logs, and
            the Docker image used. You can roll back to any previous successful
            deployment from the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Deployments
            </code>{" "}
            tab, which will stop the current container and start one with the
            previous image.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Deployment Flow
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            When you trigger a deployment, the following happens:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "A deployment record is created with status 'queued'",
              "A job is added to the BullMQ queue in Redis",
              "The deploy worker clones the repository (or pulls the Docker image)",
              "The image is built using the selected strategy (Nixpacks/Dockerfile/Buildpacks)",
              "The old container is stopped and removed",
              "A new container is started with Traefik labels for routing",
              "Health checks are executed (if configured)",
              "Deployment status is updated and notifications are sent",
              "All logs are streamed in real-time to the dashboard via Socket.IO",
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
    description: "Provision and manage databases with automatic backups.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Supported Databases
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "PostgreSQL",
                desc: "Relational database with full SQL support",
              },
              {
                name: "MySQL",
                desc: "Popular relational database for web applications",
              },
              {
                name: "MariaDB",
                desc: "MySQL-compatible fork with additional features",
              },
              {
                name: "MongoDB",
                desc: "Document database with optional replica set support",
              },
              {
                name: "Redis",
                desc: "In-memory key-value store for caching and queues",
              },
            ].map((db) => (
              <div
                key={db.name}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="font-medium text-bright">{db.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {db.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Creating a Database
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            From your project page, click{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Create Database
            </code>
            . Select the type, version, and target server. DeployKit
            automatically generates a secure password, creates the container, and
            provides you with the connection string in the correct format for
            your database type. You can also deploy databases to remote servers.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Connection Strings
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            DeployKit generates database-specific connection strings
            automatically. You can copy these directly from the database detail
            page and use them as environment variables in your applications.
          </p>
          <CodeBlock
            language="bash"
            code={`# PostgreSQL
postgresql://user:password@host:5432/dbname

# MySQL / MariaDB
mysql://user:password@host:3306/dbname

# MongoDB
mongodb://user:password@host:27017/dbname

# Redis
redis://host:6379`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Automatic Backups
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Enable automatic backups for any database from the database settings.
            Configure a cron schedule and retention period:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Backups are executed by a BullMQ scheduler based on your cron expression",
              "SQL/database dumps are stored in /var/backups/deploykit",
              "Configurable retention period (in days) for automatic cleanup",
              "You can also trigger manual backups at any time",
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
          <p className="text-muted-foreground leading-relaxed">
            From the database detail page, view all available backups and restore
            to any previous backup with one click. This operation requires Admin
            role permissions.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            MongoDB Replica Sets
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            For MongoDB databases, you can optionally enable replica set mode for
            sharding and high availability.
          </p>
        </div>
      </div>
    ),
  },
  domains: {
    title: "Domains & SSL",
    description:
      "Set up custom domains with automatic SSL certificates via Let's Encrypt.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Adding a Custom Domain
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            From the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Domains
            </code>{" "}
            tab of your application, add one or more custom domains. Each domain
            can be mapped to a specific container port if your app exposes
            multiple ports.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Add root domains (e.g., example.com)",
              "Add subdomains (e.g., api.example.com)",
              "Add wildcard domains (e.g., *.example.com) for preview deployments",
              "Map different domains to different container ports",
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
            Automatic SSL with Let's Encrypt
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit uses Traefik v3 as the reverse proxy, which handles SSL
            certificate generation and renewal automatically via Let's Encrypt.
            When you add a domain and enable HTTPS, Traefik obtains a
            certificate and renews it before expiration. No manual configuration
            required.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            DNS Configuration
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Point your domain's DNS records to the IP address of your DeployKit
            server:
          </p>
          <CodeBlock
            language="bash"
            code={`# For root domain
A record: example.com → YOUR_SERVER_IP

# For subdomain
CNAME record: api.example.com → example.com

# For wildcard (preview deployments)
A record: *.example.com → YOUR_SERVER_IP`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            How Routing Works
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            When a container is deployed, DeployKit attaches Traefik labels to it
            with the domain configuration. Traefik automatically picks up these
            labels and creates routing rules, directing incoming traffic on the
            specified domain to the correct container and port.
          </p>
        </div>
      </div>
    ),
  },
  servers: {
    title: "Servers",
    description: "Manage local and remote servers for deploying your applications.",
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
                The machine where DeployKit is running. Uses the local Docker
                socket directly. Ideal for single-server setups.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-bright">Remote Server</p>
              <p className="text-sm text-muted-foreground mt-1">
                Any server accessible via SSH with Docker installed. Allows you
                to deploy applications and databases across multiple machines.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Adding a Remote Server
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            To add a remote server, provide the following information:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Server name — A friendly identifier for the server",
              "Host — IP address or hostname of the server",
              "Port — SSH port (default: 22)",
              "Username — SSH user (typically root or a user with Docker access)",
              "SSH Key — Private key for authentication (encrypted at rest with AES-256-GCM)",
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
          <p className="text-muted-foreground leading-relaxed">
            DeployKit runs health checks on servers to verify Docker installation
            and collect system information including Docker version, total CPU
            cores, memory, and disk space. You can test SSH connectivity at any
            time from the server management page.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Docker Auto-Install
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            If Docker is not installed on a remote server, DeployKit can install
            it for you via SSH. This is useful for quickly provisioning bare
            servers without manual setup.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Remote Deployments
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            When deploying to a remote server, the deploy worker clones the
            repository on the remote machine via SSH, builds the Docker image
            remotely, starts the container, and cleans up build files. Logs are
            streamed back to the dashboard in real-time.
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
            Preview deployments automatically create isolated copies of your
            application for each pull request or merge request. When a PR is
            opened, DeployKit builds and deploys the PR branch as a separate
            container with its own URL, allowing you to test changes before
            merging.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Enabling Previews
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            From the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Previews
            </code>{" "}
            tab of your application, enable preview deployments and configure a
            wildcard domain:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Enable 'Preview Deployments' in the application settings",
              "Set a preview domain (e.g., *.preview.example.com)",
              "Each PR gets a unique URL like pr-123.preview.example.com",
              "Configure a wildcard DNS record pointing to your server",
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
            Parent-Child Relationship
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Preview apps are linked to their parent application. They inherit the
            same build configuration but run as independent containers. Each
            preview tracks the PR number and branch name. When the PR is closed,
            the preview environment can be cleaned up.
          </p>
        </div>
      </div>
    ),
  },
  notifications: {
    title: "Notifications",
    description:
      "Configure alerts for deployments, errors, backups, and more.",
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
                desc: "Send notifications to a Discord channel via webhook URL",
              },
              {
                name: "Slack",
                desc: "Send notifications to a Slack channel via webhook URL",
              },
              {
                name: "Telegram",
                desc: "Send notifications to a Telegram chat via bot token",
              },
              {
                name: "Email",
                desc: "Send email notifications via Resend API integration",
              },
              {
                name: "Webhook",
                desc: "Send HTTP POST requests to any custom endpoint",
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
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Available Events
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Choose which events trigger notifications on each channel:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "deploy.success — Deployment completed successfully",
              "deploy.failed — Deployment failed",
              "app.stopped — Application container stopped",
              "app.error — Application encountered an error",
              "backup.completed — Database backup completed",
              "backup.failed — Database backup failed",
              "health_check.failed — Health check failed",
              "alert.fired — Alert rule condition met",
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
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Global vs Project Channels
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Notification channels can be configured globally (receive alerts from
            all projects) or scoped to a specific project. This allows you to
            send production alerts to one channel and staging alerts to another.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Test Notifications
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            After configuring a notification channel, use the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Test
            </code>{" "}
            button to send a test message and verify your configuration is
            working correctly before relying on it for real alerts.
          </p>
        </div>
      </div>
    ),
  },
  "users-rbac": {
    title: "Users & RBAC",
    description:
      "Manage users and control access with role-based permissions.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Global Roles
          </h3>
          <div className="space-y-3">
            {[
              {
                role: "Admin",
                desc: "Full system access. Can manage users, servers, delete projects/apps/databases, access audit logs, restore backups, and configure all settings.",
              },
              {
                role: "Operator",
                desc: "Can create and manage projects, applications, and databases. Can deploy, configure notifications, manage environment variables and domains. Cannot manage users or servers.",
              },
              {
                role: "Viewer",
                desc: "Read-only access to all resources. Can view projects, applications, databases, logs, and metrics, but cannot make any changes.",
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
            Per-Project Overrides
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Users can have different roles on specific projects. For example, a
            user with the global Viewer role can be given Operator access on a
            particular project, allowing them to deploy and manage applications
            within that project while remaining read-only elsewhere.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            User Management
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Create new users with a specific global role (Admin only)",
              "Update user roles at any time (Admin only)",
              "Add or remove users from projects with specific roles (Admin only)",
              "Reset passwords for other users (Admin only)",
              "Each user can change their own password and update their email",
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
          <p className="text-muted-foreground leading-relaxed">
            DeployKit uses JWT-based authentication with short-lived access
            tokens (15 minutes) and long-lived refresh tokens (7 days). Refresh
            tokens are stored in Redis and support rotation — when a refresh
            token is used, a new one is issued and the old one is revoked.
            Passwords are hashed with bcrypt.
          </p>
        </div>
      </div>
    ),
  },
  monitoring: {
    title: "Monitoring",
    description:
      "Real-time metrics, live logs, and interactive terminal access.",
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
            tab displays real-time metrics for each application and database
            container:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "CPU Usage — Percentage of CPU utilization over time",
              "Memory Usage — Current memory consumption vs. available",
              "Network I/O — Incoming and outgoing network traffic",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Metrics are collected by a scheduler that periodically polls Docker
            container stats and pushed to the dashboard in real-time via
            Socket.IO.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Live Logs
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            The{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Logs
            </code>{" "}
            tab provides real-time log streaming from your containers using
            Socket.IO. Logs are displayed in a terminal emulator (xterm.js) for
            a native terminal experience. You can subscribe and unsubscribe from
            log streams as needed.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Build Logs
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            During deployment, build and deploy logs are streamed in real-time to
            the dashboard. Sensitive values (tokens, passwords, keys) are
            automatically redacted from logs to prevent accidental exposure.
            Historical build logs are stored with each deployment record.
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
            tab gives you interactive shell access to your running containers
            directly from the browser. Powered by xterm.js and Socket.IO, it
            provides a full terminal experience for debugging and
            troubleshooting.
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
              { status: "Running", desc: "Container is active and healthy" },
              { status: "Building", desc: "Deployment in progress" },
              { status: "Idle", desc: "Container is stopped" },
              { status: "Error", desc: "Container failed to start or crashed" },
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
  api: {
    title: "API Reference",
    description:
      "DeployKit uses tRPC for type-safe communication between the web dashboard and the API.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            tRPC Architecture
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit's API is built with tRPC 11, providing end-to-end
            type-safe RPC calls between the React frontend and the Fastify
            backend. All input validation is handled with Zod schemas defined in
            the shared package, ensuring type safety from the client to the
            database.
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
                desc: "Registration, login, logout, token refresh, password management",
                procedures:
                  "hasUsers, register, login, me, refresh, logout, changePassword, updateProfile",
              },
              {
                router: "project",
                desc: "CRUD operations for projects that group apps and databases",
                procedures: "list, byId, create, update, delete",
              },
              {
                router: "application",
                desc: "Full application lifecycle including deploy, rollback, and configuration",
                procedures:
                  "byId, create, update, delete, updateEnvVars, addDomain, removeDomain, deploy, rollback",
              },
              {
                router: "database",
                desc: "Database provisioning, backup, and restore operations",
                procedures:
                  "byId, create, update, delete, startBackup, getBackups, restore",
              },
              {
                router: "server",
                desc: "Server management including SSH connections and Docker setup",
                procedures:
                  "list, byId, create, createLocal, delete, testConnection, healthCheck, installDocker",
              },
              {
                router: "user",
                desc: "User management and role assignment (admin only)",
                procedures: "list, create, updateRole, resetPassword, delete",
              },
              {
                router: "projectMember",
                desc: "Per-project role management for team access control",
                procedures: "list, add, updateRole, remove",
              },
              {
                router: "notification",
                desc: "Notification channel configuration and testing",
                procedures:
                  "list, byId, create, update, delete, toggle, test, availableEvents",
              },
              {
                router: "metrics",
                desc: "Real-time container metrics for apps and databases",
                procedures: "byApplicationId, byDatabaseId",
              },
              {
                router: "audit",
                desc: "Audit log querying and export",
                procedures: "list, export",
              },
              {
                router: "dashboard",
                desc: "Overview statistics and recent activity",
                procedures: "overview",
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
            Authentication
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            API requests are authenticated via JWT tokens sent in the
            Authorization header:
          </p>
          <CodeBlock
            language="bash"
            code={`# Login to get access and refresh tokens
POST /trpc/auth.login
Body: { "email": "admin@example.com", "password": "..." }

# Use the access token in subsequent requests
Authorization: Bearer <access_token>

# Refresh when the access token expires (15 min)
POST /trpc/auth.refresh
Body: { "refreshToken": "<refresh_token>" }`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Real-Time Events (Socket.IO)
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            In addition to tRPC, DeployKit uses Socket.IO for real-time
            communication. Events include deployment status updates, build log
            streaming, container log streaming, and metrics updates. The web
            dashboard subscribes to relevant channels to display live data.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Webhook Endpoints
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit exposes REST endpoints for receiving webhooks from Git
            providers:
          </p>
          <div className="space-y-2 mt-3">
            {[
              {
                method: "POST",
                path: "/api/webhooks/github",
                desc: "GitHub push/PR events",
              },
              {
                method: "POST",
                path: "/api/webhooks/gitlab",
                desc: "GitLab push/MR events",
              },
            ].map((ep) => (
              <div
                key={ep.path}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
              >
                <span className="rounded px-2 py-0.5 font-mono text-xs font-bold bg-blue-500/10 text-blue-400">
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
        </div>
      </div>
    ),
  },
  config: {
    title: "Configuration",
    description:
      "All configuration is done through environment variables.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Required Environment Variables
          </h3>
          <CodeBlock
            language="bash"
            code={`# Database connection
DATABASE_URL=postgresql://user:password@localhost:5432/deploykit

# Redis connection (for BullMQ job queue and token storage)
REDIS_URL=redis://localhost:6379

# JWT secrets (generate with: openssl rand -base64 32)
JWT_SECRET=<your-jwt-secret>
JWT_REFRESH_SECRET=<your-refresh-secret>

# Encryption key for secrets at rest (generate with: openssl rand -hex 32)
ENCRYPTION_KEY=<64-character-hex-string>

# Webhook signature verification (generate with: openssl rand -base64 32)
WEBHOOK_SECRET=<your-webhook-secret>`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Optional Environment Variables
          </h3>
          <CodeBlock
            language="bash"
            code={`# Domain for the DeployKit panel
DOMAIN=panel.yourdomain.com

# Email for Let's Encrypt SSL certificates
ACME_EMAIL=you@example.com

# API and Web ports (defaults: 3001, 5173)
API_PORT=3001
WEB_PORT=5173

# CORS origin for the web dashboard
WEB_URL=http://localhost:5173

# Audit log retention in days (default: 90)
AUDIT_RETENTION_DAYS=90

# Pre-create admin account during installation
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password

# Docker socket path (override if non-standard)
DOCKER_SOCKET=/var/run/docker.sock

# GitHub OAuth (optional, for OAuth login)
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...`}
          />
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
              "Rate Limiting — Global: 200 req/min per IP, Auth endpoints: 10 req/min, Webhooks: 30 req/min",
              "Encryption — All sensitive data (env vars, tokens, SSH keys) encrypted with AES-256-GCM",
              "Security Headers — X-Content-Type-Options, X-Frame-Options, CSP, and more",
              "Secret Redaction — Build logs automatically scrub tokens, passwords, and keys",
              "CORS — Configurable origin (defaults to WEB_URL)",
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
            code={`# Install dependencies
pnpm install

# Start API + Web in dev mode
pnpm dev

# Or start individually
pnpm dev:api   # API on :3001
pnpm dev:web   # Web on :5173

# Database operations
pnpm db:generate  # Generate Drizzle migrations after schema changes
pnpm db:migrate   # Apply pending migrations
pnpm db:studio    # Open Drizzle Studio GUI

# Other commands
pnpm build        # Production build
pnpm lint         # Type check all packages
pnpm clean        # Remove dist/ directories`}
          />
        </div>
      </div>
    ),
  },
  webhooks: {
    title: "Webhooks & CI/CD",
    description:
      "Automatic deployments triggered by Git pushes and pull requests.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            How Auto-Deploy Works
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit receives webhook events from GitHub and GitLab. When a push
            event matches an application's repository URL and branch, a new
            deployment is automatically triggered. This means every push to your
            configured branch results in an automatic deployment.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Setting Up GitHub Webhooks
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            In your GitHub repository settings, add a webhook:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Payload URL: https://your-deploykit-domain/api/webhooks/github",
              "Content type: application/json",
              "Secret: Use the same WEBHOOK_SECRET from your .env file",
              "Events: Select 'Push events' and optionally 'Pull request events' for preview deployments",
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
            Setting Up GitLab Webhooks
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            In your GitLab project settings, add a webhook:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "URL: https://your-deploykit-domain/api/webhooks/gitlab",
              "Secret token: Use the same WEBHOOK_SECRET from your .env file",
              "Triggers: Select 'Push events' and optionally 'Merge request events'",
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
            Webhook Security
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            All incoming webhooks are verified before processing. GitHub webhooks
            are validated using HMAC-SHA256 signature verification, and GitLab
            webhooks are validated using secret token comparison. Invalid
            signatures are rejected with a 401 response. Webhook endpoints are
            rate-limited to 30 requests per minute per IP.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            CI/CD Integration Examples
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Since DeployKit auto-deploys on push via webhooks, you don't
            typically need CI/CD pipeline integration. However, if you want to
            trigger deployments from CI/CD (e.g., after tests pass), you can call
            the tRPC API directly:
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
          # Login to get a token
          TOKEN=$(curl -s -X POST \\
            https://panel.yourdomain.com/trpc/auth.login \\
            -H "Content-Type: application/json" \\
            -d '{"email":"$\{{ secrets.DK_EMAIL }}","password":"$\{{ secrets.DK_PASSWORD }}"}' \\
            | jq -r '.result.data.accessToken')

          # Trigger deployment
          curl -X POST \\
            https://panel.yourdomain.com/trpc/application.deploy \\
            -H "Authorization: Bearer $TOKEN" \\
            -H "Content-Type: application/json" \\
            -d '{"applicationId":"your-app-id"}'`}
          />
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Tip:</span> For most
            use cases, simply setting up the webhook in your Git provider is
            enough. DeployKit handles everything from there — no CI/CD
            configuration needed.
          </p>
        </div>
      </div>
    ),
  },
  "audit-logs": {
    title: "Audit Logs",
    description:
      "Track all user actions for security and compliance.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            What Gets Logged
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            DeployKit records comprehensive audit logs for all user actions
            across the platform:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Create, update, and delete operations on projects, applications, databases, and servers",
              "Deployment triggers and rollbacks",
              "User management actions (create, role changes, password resets)",
              "Notification channel configuration changes",
              "Backup and restore operations",
              "Login and authentication events",
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
            Log Details
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Each audit log entry includes:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "User ID — Who performed the action",
              "Action — What was done (create, update, delete, deploy, etc.)",
              "Resource Type — What type of resource was affected",
              "Resource ID & Name — Which specific resource was affected",
              "Metadata — Additional context stored as JSON (e.g., changed fields)",
              "IP Address — The IP address of the request",
              "Timestamp — When the action occurred",
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
            Viewing & Filtering
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Access the audit log from the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Audit
            </code>{" "}
            page in the dashboard. Filter logs by action type, resource type,
            user, and date range to find specific events. You can also export
            audit logs in CSV or JSON format for external analysis.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Retention & Cleanup
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Audit logs are automatically cleaned up based on the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              AUDIT_RETENTION_DAYS
            </code>{" "}
            environment variable (default: 90 days). A background scheduler
            periodically removes logs older than the retention period.
          </p>
        </div>
      </div>
    ),
  },
};
