import { ChevronRight } from "lucide-react";
import { CodeBlock } from "@docs/infrastructure/ui/components/CodeBlock";
import type { DocsSectionContentI } from "@docs/infrastructure/ui/types/docs.module.types";

export const DOCS_CONTENT: Record<string, DocsSectionContentI> = {
  "getting-started": {
    title: "Introduction",
    description: "Everything you need to get started with DeployKit on your infrastructure.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">What is DeployKit?</h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit is an open source PaaS (Platform as a Service) that allows you to deploy
            applications, databases and services on your own infrastructure. No vendor lock-in, with full
            control over your data and configuration.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">System Requirements</h3>
          <ul className="space-y-2 text-muted-foreground">
            {["Ubuntu 20.04+ / Debian 11+ / CentOS 8+", "2 GB RAM minimum (4 GB recommended)", "20 GB disk space", "Docker 20.10+ installed", "Root or sudo access"].map((req) => (
              <li key={req} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Architecture</h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit uses Docker containers to isolate each application, a Traefik reverse proxy to handle
            HTTP/HTTPS traffic, and a PostgreSQL database to store system configuration.
          </p>
        </div>
      </div>
    ),
  },
  installation: {
    title: "Installation",
    description: "Install DeployKit on your server in less than 2 minutes.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Quick Install</h3>
          <p className="text-muted-foreground mb-4">
            Run the following command on your server to install DeployKit:
          </p>
          <CodeBlock code="curl -fsSL https://get.deploykit.es | sh" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Manual Installation</h3>
          <p className="text-muted-foreground mb-4">
            If you prefer a step-by-step installation:
          </p>
          <CodeBlock
            code={`# Clone the repository
git clone https://github.com/deploykit/deploykit.git
cd deploykit

# Configure environment variables
cp .env.example .env
nano .env

# Start services
docker compose up -d

# Verify installation
deploykit status`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Verify Installation</h3>
          <p className="text-muted-foreground mb-4">
            Once installation is complete, access the control panel:
          </p>
          <CodeBlock code={`# Open the panel in your browser
deploykit open

# Or access directly
https://your-server:3000`} />
        </div>
      </div>
    ),
  },
  quickstart: {
    title: "Quickstart",
    description: "Deploy your first application in 30 seconds.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">1. Connect your server</h3>
          <CodeBlock code={`deploykit server:add --name my-server \\
  --host 192.168.1.100 \\
  --user root`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">2. Create an application</h3>
          <CodeBlock code={`deploykit app:create my-app \\
  --type nodejs \\
  --port 3000`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">3. Deploy</h3>
          <CodeBlock code={`# From your local repository
deploykit deploy --app my-app

# Or from a Git repository
deploykit deploy --app my-app \\
  --git https://github.com/user/repo.git`} />
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Tip:</span> Use{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit logs my-app --follow
            </code>{" "}
            to watch logs in real time during deployment.
          </p>
        </div>
      </div>
    ),
  },
  "deploy-app": {
    title: "Deploy an App",
    description: "Complete guide to deploying any type of application.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Supported Application Types</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: "Node.js", desc: "Express, Fastify, NestJS, Next.js" },
              { name: "Python", desc: "Django, Flask, FastAPI" },
              { name: "Go", desc: "Gin, Echo, Fiber" },
              { name: "Docker", desc: "Any Docker container" },
            ].map((app) => (
              <div key={app.name} className="rounded-lg border border-border bg-card p-4">
                <p className="font-medium text-bright">{app.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Dockerfile Configuration</h3>
          <CodeBlock
            language="dockerfile"
            code={`FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Environment Variables</h3>
          <CodeBlock
            code={`# Add environment variables
deploykit env:set my-app DATABASE_URL="postgres://..."
deploykit env:set my-app NODE_ENV=production

# List configured variables
deploykit env:list my-app`}
          />
        </div>
      </div>
    ),
  },
  databases: {
    title: "Databases",
    description: "Create and manage databases with automatic backups.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Create a Database</h3>
          <CodeBlock
            code={`# PostgreSQL
deploykit db:create --type postgres --name my-db

# MySQL
deploykit db:create --type mysql --name my-db

# Redis
deploykit db:create --type redis --name my-cache`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Automatic Backups</h3>
          <CodeBlock
            code={`# Configure daily backup
deploykit db:backup --name my-db --schedule "0 2 * * *"

# Manual backup
deploykit db:backup --name my-db --now

# Restore backup
deploykit db:restore --name my-db --file backup-2026-03-20.sql.gz`}
          />
        </div>
      </div>
    ),
  },
  domains: {
    title: "Domains & SSL",
    description: "Set up custom domains with automatic SSL certificates.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Add a Domain</h3>
          <CodeBlock
            code={`# Add domain
deploykit domain:add my-app mydomain.com

# Add subdomain
deploykit domain:add my-app api.mydomain.com`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">SSL Certificates</h3>
          <p className="text-muted-foreground mb-4">
            DeployKit automatically generates and renews SSL certificates with Let's Encrypt. No additional
            configuration required.
          </p>
          <CodeBlock
            code={`# Check certificate status
deploykit ssl:status my-app

# Force renewal
deploykit ssl:renew my-app`}
          />
        </div>
      </div>
    ),
  },
  scaling: {
    title: "Scaling",
    description: "Scale your applications horizontally and vertically.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Horizontal Scaling</h3>
          <CodeBlock
            code={`# Scale to 3 instances
deploykit scale my-app --replicas 3

# CPU-based auto-scaling
deploykit autoscale my-app \\
  --min 2 --max 10 \\
  --cpu-threshold 70`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Resource Limits</h3>
          <CodeBlock
            code={`# Configure limits
deploykit resources my-app \\
  --memory 512m \\
  --cpu 0.5`}
          />
        </div>
      </div>
    ),
  },
  cli: {
    title: "CLI Reference",
    description: "Complete reference for all CLI commands.",
    content: (
      <div className="space-y-6">
        {[
          { cmd: "deploykit server:add", desc: "Add a new server", args: "--name, --host, --user, --port" },
          { cmd: "deploykit app:create", desc: "Create a new application", args: "--type, --port, --env" },
          { cmd: "deploykit deploy", desc: "Deploy an application", args: "--app, --git, --branch, --force" },
          { cmd: "deploykit logs", desc: "View application logs", args: "--app, --follow, --lines, --since" },
          { cmd: "deploykit db:create", desc: "Create a database", args: "--type, --name, --version" },
          { cmd: "deploykit domain:add", desc: "Add custom domain", args: "app, domain" },
          { cmd: "deploykit scale", desc: "Scale the application", args: "--replicas, --memory, --cpu" },
          { cmd: "deploykit status", desc: "Overall system status", args: "--json, --verbose" },
        ].map((item) => (
          <div key={item.cmd} className="rounded-lg border border-border bg-card p-4">
            <code className="text-sm font-mono font-semibold text-primary">{item.cmd}</code>
            <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            <p className="text-xs text-dim mt-2 font-mono">Args: {item.args}</p>
          </div>
        ))}
      </div>
    ),
  },
  api: {
    title: "API Reference",
    description: "REST API to integrate DeployKit with your tools.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Authentication</h3>
          <CodeBlock
            language="bash"
            code={`# Generate API token
deploykit token:create --name "CI/CD"

# Use in requests
curl -H "Authorization: Bearer dk_xxxxx" \\
  https://deploykit.myserver.com/api/v1/apps`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Main Endpoints</h3>
          <div className="space-y-3">
            {[
              { method: "GET", path: "/api/v1/apps", desc: "List applications" },
              { method: "POST", path: "/api/v1/apps", desc: "Create application" },
              { method: "POST", path: "/api/v1/apps/:id/deploy", desc: "Deploy application" },
              { method: "GET", path: "/api/v1/apps/:id/logs", desc: "Get logs" },
              { method: "GET", path: "/api/v1/servers", desc: "List servers" },
              { method: "GET", path: "/api/v1/databases", desc: "List databases" },
            ].map((ep) => (
              <div key={ep.path + ep.method} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                <span
                  className={`rounded px-2 py-0.5 font-mono text-xs font-bold ${
                    ep.method === "GET" ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {ep.method}
                </span>
                <code className="text-sm font-mono text-foreground">{ep.path}</code>
                <span className="ml-auto text-xs text-muted-foreground hidden sm:inline">{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  config: {
    title: "Configuration",
    description: "Customize DeployKit to fit your needs.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Configuration File</h3>
          <CodeBlock
            language="yaml"
            code={`# deploykit.yml
server:
  port: 3000
  host: 0.0.0.0

proxy:
  ssl: true
  auto_renew: true

storage:
  driver: local
  path: /var/lib/deploykit

database:
  host: localhost
  port: 5432
  name: deploykit

logs:
  level: info
  retention: 30d`}
          />
        </div>
      </div>
    ),
  },
  "ci-cd": {
    title: "CI/CD",
    description: "Integrate DeployKit with your CI/CD pipeline.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">GitHub Actions</h3>
          <CodeBlock
            language="yaml"
            code={`# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to DeployKit
        env:
          DEPLOYKIT_TOKEN: \${{ secrets.DEPLOYKIT_TOKEN }}
          DEPLOYKIT_HOST: \${{ secrets.DEPLOYKIT_HOST }}
        run: |
          curl -fsSL https://get.deploykit.es/cli | sh
          deploykit deploy --app my-app`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">GitLab CI</h3>
          <CodeBlock
            language="yaml"
            code={`# .gitlab-ci.yml
deploy:
  stage: deploy
  script:
    - curl -fsSL https://get.deploykit.es/cli | sh
    - deploykit deploy --app my-app
  only:
    - main`}
          />
        </div>
      </div>
    ),
  },
};
