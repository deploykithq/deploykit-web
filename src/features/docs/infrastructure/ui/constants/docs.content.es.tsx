import { ChevronRight } from "lucide-react";
import { CodeBlock } from "@docs/infrastructure/ui/components/CodeBlock";
import type { DocsContentT } from "@docs/infrastructure/ui/interfaces/DocsI";

export const DOCS_CONTENT_ES: DocsContentT = {
  "getting-started": {
    title: "Introducción",
    description:
      "Todo lo que necesitas saber sobre DeployKit y cómo funciona.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            ¿Qué es DeployKit?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit es una PaaS (Platform as a Service) autoalojada y de
            código abierto que despliega aplicaciones, bases de datos, stacks de
            Compose y servidores de juegos en tu propia infraestructura.
            Piensa en ella como tu propio Vercel o Heroku, con control total
            sobre tus datos, sin dependencia de un proveedor y sin límites de
            uso. Por debajo es simplemente Docker, Compose y Traefik: si
            desinstalas DeployKit, tus contenedores siguen funcionando.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Esta documentación cubre DeployKit{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              v0.6.0
            </code>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Características principales
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "Aplicaciones",
                desc: "Despliega desde GitHub, GitLab, cualquier repositorio Git o una imagen de Docker, con rollbacks, réplicas, autoescalado y modo mantenimiento",
                href: "/es/docs/applications",
              },
              {
                name: "Builds con autodetección",
                desc: "Nixpacks, Dockerfile o Cloud Native Buildpacks, con escaneo opcional de vulnerabilidades con Trivy",
                href: "/es/docs/applications",
              },
              {
                name: "Bases de datos",
                desc: "PostgreSQL, MySQL, MariaDB, MongoDB y Redis con un clic, con backups programados y restauración",
                href: "/es/docs/databases",
              },
              {
                name: "Stacks de Compose y plantillas",
                desc: "Ejecuta un docker-compose.yml completo como una unidad, o instala uno desde el catálogo de plantillas de un clic",
                href: "/es/docs/templates",
              },
              {
                name: "Servidores de juegos",
                desc: "Minecraft, Valheim, CS2 y Terraria desde un catálogo, con consola en vivo, gestor de archivos, backups de mundos y mods",
                href: "/es/docs/game-servers",
              },
              {
                name: "GitHub App",
                desc: "Repositorios privados sin tokens personales, estados de commit en cada despliegue y previews de PR",
                href: "/es/docs/github-app",
              },
              {
                name: "Webhooks y previews",
                desc: "Despliegue automático al hacer push desde GitHub, GitLab o cualquier CI, además de entornos efímeros para pull requests",
                href: "/es/docs/webhooks",
              },
              {
                name: "SSL automático",
                desc: "Certificados HTTPS gratuitos con Let's Encrypt + Traefik para cada dominio",
                href: "/es/docs/domains",
              },
              {
                name: "Tareas programadas",
                desc: "Tareas cron y comandos puntuales (migraciones, scripts) en contenedores aislados",
                href: "/es/docs/scheduled-tasks",
              },
              {
                name: "Monitorización y alertas",
                desc: "Métricas de CPU, memoria y red en vivo e históricas, reglas de alerta y logs persistentes con búsqueda",
                href: "/es/docs/monitoring",
              },
              {
                name: "Páginas de estado",
                desc: "Una página pública, sin inicio de sesión, que muestra el estado en vivo y la disponibilidad de los servicios que elijas",
                href: "/es/docs/status-pages",
              },
              {
                name: "Exportar e importar",
                desc: "Toda tu instancia en un archivo YAML: revísalo en git o reconstruye todo en un servidor nuevo",
                href: "/es/docs/export-import",
              },
              {
                name: "Servidores remotos",
                desc: "Despliega en otras máquinas por SSH, con un catálogo gestionado de claves SSH",
                href: "/es/docs/servers",
              },
              {
                name: "Acceso basado en roles",
                desc: "Roles de Admin, Operator y Viewer con permisos por proyecto y un registro de auditoría completo",
                href: "/es/docs/users-rbac",
              },
              {
                name: "Notificaciones",
                desc: "Alertas por Discord, Slack, Telegram, Email y Webhook",
                href: "/es/docs/notifications",
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
            Arquitectura
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            DeployKit es un plano de control: un panel y una API que manejan el
            daemon de Docker de una o más máquinas. No ejecuta tus aplicaciones
            dentro de sí mismo — le dice a Docker que las ejecute. Una
            instalación de producción ejecuta estos contenedores:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "API — Fastify 5 + tRPC 11, Drizzle ORM, workers de BullMQ y Socket.IO. Monta el socket de Docker del host para construir imágenes y crear contenedores, y es el único componente que habla con la base de datos y con Docker",
              "Web — SPA en React 19 (TanStack Router, TanStack Query, Tailwind CSS) servida en el mismo dominio que la API",
              "Traefik v3.6 — Reverse proxy en los puertos 80/443. Descubre los contenedores por sus labels y emite los certificados de Let's Encrypt. Lee Docker a través de un socket proxy de solo lectura, nunca el socket directamente",
              "PostgreSQL 16 — Almacena toda la configuración, usuarios, proyectos, historial de despliegues, métricas y datos de auditoría",
              "Redis 7 — Protegido con contraseña. Contiene las colas de BullMQ (despliegues, backups, tareas programadas), los refresh tokens y los contadores de rate limit",
              "Docker socket proxy — API de Docker de solo lectura para Traefik, en una red interna a la que solo Traefik puede acceder",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Tus aplicaciones, bases de datos y stacks se unen a la red de Docker{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit-network
            </code>{" "}
            , donde Traefik enruta hacia ellos. Los servidores de juegos se
            ejecutan en una red aparte,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit-games
            </code>
            , y los jugadores se conectan directamente a sus puertos. Los
            despliegues y los backups se encolan y los procesan los workers; el
            panel sigue el progreso en tiempo real mediante Socket.IO.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Requisitos del sistema
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Servidor Linux (Ubuntu, Debian, familia RHEL o Alpine)",
              "1 vCPU como mínimo (se recomiendan 2 o más — la construcción de imágenes consume mucha CPU)",
              "1 GB de RAM como mínimo (se recomiendan 2 GB o más; un servidor de Minecraft con mods necesita por sí solo de 4 a 8 GB)",
              "10 GB de disco como mínimo (se recomiendan 50 GB o más según las imágenes, datos, backups y mundos de juegos)",
              "Puertos 80 y 443 abiertos — el puerto 80 es obligatorio aunque todo acabe en HTTPS, porque Let's Encrypt valida a través de él",
              "Acceso root o sudo",
              "Node.js 20+ en el servidor, solo para ejecutar el CLI del instalador",
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
    title: "Instalación",
    description: "Instala DeployKit en tu servidor en cuestión de minutos.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Instalar con el CLI (recomendado)
          </h3>
          <p className="text-muted-foreground mb-4">
            DeployKit se instala y se gestiona con el CLI oficial{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              @deploykit/cli
            </code>
            . Conéctate por SSH a tu VPS (requiere Node.js 20+), instálalo de
            forma global y ejecuta el instalador:
          </p>
          <CodeBlock
            language="bash"
            code={`npm install -g @deploykit/cli
sudo deploykit install --domain deploy.example.com --email you@example.com

# Or one-shot, without a global install
sudo npx @deploykit/cli install --domain deploy.example.com --email you@example.com`}
          />
          <p className="text-sm text-muted-foreground mt-3">
            Ejecuta{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              sudo deploykit install
            </code>{" "}
            sin{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              --domain
            </code>{" "}
            /{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              --email
            </code>{" "}
            en una terminal para que te pida el dominio del panel, el email de
            Let&apos;s Encrypt, y opcionalmente un email y una contraseña de
            administrador. Por defecto se instala la última versión publicada;
            consulta la{" "}
            <a href="/es/docs/cli" className="text-primary hover:underline">
              Referencia del CLI
            </a>{" "}
            para{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              --tag
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              --branch
            </code>{" "}
            y el resto de flags.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Qué hace el instalador
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Comprueba que se ejecuta en Linux como root e informa de las especificaciones del sistema",
              "Instala Git, Docker y el plugin Docker Compose si faltan",
              "Clona DeployKit en /opt/deploykit en la versión seleccionada",
              "Genera todos los secretos (contraseña de la base de datos, secretos JWT, clave de cifrado, secreto de webhook) en /opt/deploykit/.env con permisos 600. Si ya existe un .env, se conservan sus secretos y solo se actualizan el dominio y el email",
              "Crea la red de Docker deploykit-network y /var/backups/deploykit, construye las imágenes e inicia el stack",
              "Espera a la API y, si indicaste un email y una contraseña de administrador, intenta crear la cuenta de administrador",
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
              Contraseña de Redis (v0.6.0+):
            </span>{" "}
            desde v0.6.0 el archivo Compose de producción se niega a arrancar
            sin{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              REDIS_PASSWORD
            </code>{" "}
            en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>
            , y el instalador aún no la genera. Si la instalación se detiene
            con{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Set REDIS_PASSWORD in .env
            </code>
            , añade una (solo hexadecimal — va dentro de una URL{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              redis://
            </code>
            ) y vuelve a ejecutar el mismo comando de instalación; tus
            secretos generados se conservan:
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
            Instalación manual
          </h3>
          <p className="text-muted-foreground mb-4">
            Si prefieres ejecutar tú mismo el archivo Compose de producción:
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
            No definas{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEB_URL
            </code>{" "}
            en producción — el archivo Compose la deriva como{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              https://$&#123;DOMAIN&#125;
            </code>
            . Consulta{" "}
            <a href="/es/docs/config" className="text-primary hover:underline">
              Configuración
            </a>{" "}
            para ver todas las variables.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Qué se instala
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Traefik v3.6 — Reverse proxy en los puertos 80/443 con SSL automático de Let's Encrypt (redirección HTTP → HTTPS)",
              "Docker socket proxy — API de Docker de solo lectura para Traefik",
              "PostgreSQL 16 — Base de datos principal (volumen pgdata)",
              "Redis 7 — Cola de trabajos y caché protegidas con contraseña (volumen redis-data)",
              "DeployKit API — Contenedor Node 20 Alpine con acceso al socket de Docker; sirve /api, /trpc y /ws en tu dominio",
              "DeployKit Web — El panel, servido en el mismo dominio",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Rutas del host utilizadas:{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /opt/deploykit
            </code>{" "}
            (instalación),{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /var/backups/deploykit
            </code>{" "}
            (backups de bases de datos y servidores de juegos) y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /var/lib/deploykit/compose
            </code>{" "}
            (archivos de los stacks de Compose).
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Después de la instalación
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Apunta un registro{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              A
            </code>{" "}
            de tu dominio a la IP pública del servidor — Traefik solicita el
            certificado en la primera petición. Después abre{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              https://deploy.example.com
            </code>
            . Si no se creó ninguna cuenta de administrador durante la
            instalación, verás un formulario de registro: el primer usuario que
            se registre se convierte en administrador, y el registro se cierra
            después. Continúa con el{" "}
            <a href="/es/docs/quickstart" className="text-primary hover:underline">
              Quickstart
            </a>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Actualizar DeployKit
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
            Las migraciones de la base de datos se ejecutan automáticamente
            cuando arranca el contenedor de la API, que se niega a iniciar si
            fallan. Actualizar a v0.6.0 desde una versión anterior requiere
            añadir primero{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              REDIS_PASSWORD
            </code>{" "}
            a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            (ver más arriba).
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Consejo:</span> si el
            contenedor de la API no arranca y sus logs muestran{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              relation &quot;users&quot; already exists
            </code>
            , la base de datos fue creada por un fallback antiguo que no dejó
            registro de las migraciones. Repárala una sola vez con{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              sudo scripts/repair-migration-state.sh
            </code>{" "}
            desde{" "}
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
    description: "Despliega tu primera aplicación en unos pocos pasos.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            1. Crea tu cuenta de administrador
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Cuando abras el panel por primera vez y todavía no exista ninguna
            cuenta, verás un formulario de registro. Introduce tu email y una
            contraseña (8+ caracteres) para crear la cuenta de administrador,
            que tiene control total sobre la plataforma. El registro se cierra
            tras el primer usuario: al resto los invita un administrador desde{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Users
            </code>
            . Si pasaste{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              --admin-email
            </code>{" "}
            al instalador y funcionó, simplemente inicia sesión.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            2. Sigue la checklist de bienvenida
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            El panel muestra una tarjeta{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Welcome to DeployKit
            </code>{" "}
            hasta que despliegas tu primera aplicación o base de datos. Te guía
            a través de tres pasos:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Conecta un servidor — haz clic en “Use local server” para registrar la máquina en la que se ejecuta DeployKit (solo administradores), o añade un servidor remoto por SSH desde Servers",
              "Crea un proyecto — los proyectos agrupan aplicaciones, bases de datos, stacks y servidores de juegos relacionados, y tienen sus propios roles de miembros",
              "Despliega desde una plantilla — “Browse templates” abre el catálogo de un clic de bases de datos, aplicaciones autoalojadas y stacks completos",
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
            3. Añade una aplicación
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Para desplegar tu propio código en lugar de una plantilla, abre el
            proyecto y haz clic en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Add Application
            </code>
            . Elige el origen (GitHub, GitLab, cualquier URL de Git o una
            imagen de Docker), la rama, el tipo de build (Nixpacks para
            autodetección, Dockerfile o Buildpacks), el servidor de destino y el
            puerto en el que escucha tu app. Si hay una GitHub App conectada,
            puedes elegir el repositorio de una lista — repositorios privados
            incluidos, sin necesidad de token de acceso. La misma página del
            proyecto también tiene{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Add Database
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Add Stack
            </code>{" "}
            y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              New game server
            </code>
            .
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Enlace de puerto:</span>{" "}
            tu app debe escuchar en el puerto que configures y enlazarse a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              0.0.0.0
            </code>
            , no a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              localhost
            </code>
            . Una app que solo escucha en localhost dentro de su contenedor es
            inalcanzable a través de Traefik — el motivo más común por el que un
            despliegue termina bien pero el sitio no carga.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">4. Despliega</h3>
          <p className="text-muted-foreground leading-relaxed">
            Haz clic en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Deploy
            </code>{" "}
            en la página de la aplicación. DeployKit clona el repositorio,
            construye una imagen de Docker, inicia el contenedor con labels de
            Traefik para el enrutado y ejecuta el health check. Sigue los logs
            del build en tiempo real desde la pestaña Deployments. Después añade
            un dominio a la aplicación y apunta su DNS al servidor — el
            certificado se emite automáticamente.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Consejo:</span> para
            repositorios de github.com, registra una{" "}
            <a href="/es/docs/github-app" className="text-primary hover:underline">
              GitHub App
            </a>{" "}
            en Settings para que cada push se despliegue automáticamente, los
            despliegues informen de un estado de commit y los pull requests
            obtengan entornos de preview. Para GitLab o cualquier otro CI, usa{" "}
            <a href="/es/docs/webhooks" className="text-primary hover:underline">
              webhooks
            </a>
            .
          </p>
        </div>
      </div>
    ),
  },
  applications: {
    title: "Aplicaciones",
    description:
      "Crea, configura, despliega, escala y opera aplicaciones construidas desde Git o descargadas de un registry.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Tipos de origen
          </h3>
          <p className="text-muted-foreground mb-4">
            Crea una aplicación desde la página de tu proyecto con{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              New Application
            </code>
            . El campo{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Source
            </code>{" "}
            acepta:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "GitHub",
                desc: "Elige un repositorio a través de la GitHub App (cuando hay una configurada), o usa la URL de un repositorio con un token de acceso opcional para repos privados.",
              },
              {
                name: "GitLab",
                desc: "URL del repositorio con un token de acceso de GitLab opcional para repos privados.",
              },
              {
                name: "Git (any)",
                desc: "Cualquier repositorio Git accesible por HTTPS, con autenticación opcional mediante token.",
              },
              {
                name: "Docker Image",
                desc: "Despliega una imagen existente desde un registry. No se construye nada: la imagen se descarga en cada despliegue.",
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
            Cuando una aplicación está conectada a través de la GitHub App, se
            clona con una credencial de instalación de corta duración (no se
            almacena ningún token para la aplicación), los pushes y pull
            requests llegan sin un webhook por repositorio, y DeployKit puede
            reportar el estado de los commits a GitHub. Puedes cambiar una
            aplicación existente entre la GitHub App y una URL + token desde la
            pestaña{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              General
            </code>{" "}
            (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Change repository
            </code>{" "}
            /{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Connect through the GitHub App instead
            </code>
            ). Sin la App, copia la URL del webhook que aparece en la pestaña
            General en la configuración de webhooks de tu repositorio para
            desplegar automáticamente en cada push.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Para un origen Docker Image, la referencia de la imagen (por ejemplo{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ghcr.io/acme/api:1.4.0
            </code>
            ) se guarda en el campo{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Repository URL
            </code>{" "}
            de la pestaña General.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Puerto y red
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Establece{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Port
            </code>{" "}
            con el puerto en el que escucha tu proceso dentro del contenedor (por
            defecto{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              3000
            </code>
            ). Con al menos un dominio, Traefik enruta el tráfico a ese puerto y
            no se publica nada en el host. Sin dominio, el mismo puerto se
            publica en el host (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              host:port → container:port
            </code>
            ), por lo que dos aplicaciones sin dominio no pueden compartir
            puerto. Los dominios se gestionan desde la pestaña{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Domains
            </code>{" "}
            — una aplicación puede tener varios; consulta{" "}
            <span className="text-bright">Dominios y SSL</span>.
          </p>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mt-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-bright font-medium">Consejo:</span> tu
              aplicación debe escuchar en el puerto configurado y enlazarse a{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                0.0.0.0
              </code>
              , no a{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                localhost
              </code>
              . Un proceso enlazado a localhost arranca sin problemas, pero
              Traefik no puede alcanzarlo.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Estrategias de build
          </h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-bright">
                Nixpacks (detección automática, por defecto)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Detecta tu lenguaje y framework y construye una imagen sin
                configuración. Sobrescribe el comando de inicio detectado con{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  Start Command
                </code>{" "}
                (solo Nixpacks). Si Nixpacks falla o no está instalado, el build
                recurre automáticamente a la estrategia Dockerfile. Un build con
                Nixpacks caduca a los 10 minutos.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-bright">Dockerfile</p>
              <p className="text-sm text-muted-foreground mt-1">
                Usa tu propio Dockerfile. Establece{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  Dockerfile Path
                </code>{" "}
                relativo a la raíz del repo (o al Root Directory), sin el prefijo{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  ./
                </code>{" "}
                ; la ruta debe permanecer dentro del contexto de build. Si no
                existe ningún Dockerfile, DeployKit genera uno para los stacks
                más comunes: Go, Python, Next.js, SPAs estáticas (Vite, CRA, Vue,
                Angular, Svelte) y servidores Node. Para servidores Node ejecuta
                tu script{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  start
                </code>{" "}
                , de modo que comandos de varios pasos como{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  prisma migrate deploy &amp;&amp; node dist/index.js
                </code>{" "}
                se ejecutan completos.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-bright">Buildpacks</p>
              <p className="text-sm text-muted-foreground mt-1">
                Cloud Native Buildpacks mediante{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  pack build
                </code>
                . Ideal para proyectos que siguen convenciones estándar.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mt-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-bright font-medium">Servidores remotos:</span>{" "}
              las aplicaciones desplegadas en un servidor remoto se clonan y se
              construyen en ese servidor con{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                docker build
              </code>{" "}
              usando el Dockerfile del repositorio. Nixpacks, Buildpacks y la
              generación automática de Dockerfile solo funcionan para
              aplicaciones en el servidor local, así que asegúrate de que el repo
              incluya un Dockerfile cuando el destino sea un servidor remoto.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Soporte para monorepos
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Despliega aplicaciones desde subdirectorios estableciendo el{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Root Directory
            </code>{" "}
            (por ejemplo{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              apps/web
            </code>
            ). DeployKit usa ese directorio como contexto de build. Cuando genera
            un Dockerfile para un miembro del workspace, detecta el gestor de
            paquetes (archivos lock, después{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              pnpm-workspace.yaml
            </code>{" "}
            o el campo{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              packageManager
            </code>{" "}
            ) y construye el paquete junto con sus dependencias del workspace.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Variables de entorno
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Gestiona las variables de entorno desde la pestaña{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Environment
            </code>{" "}
            de tu aplicación, en formato{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              KEY=VALUE
            </code>{" "}
            , una por línea. Los valores están ocultos hasta que haces clic en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Reveal
            </code>
            . Todas las variables se cifran en reposo con AES-256-GCM y se
            inyectan en el contenedor en tiempo de ejecución. Los cambios surten
            efecto en el siguiente despliegue.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Por seguridad, las variables de entorno{" "}
            <span className="text-bright">
              no se pasan como build args de Docker
            </span>{" "}
            — los build args se filtran en las capas de la imagen y pueden
            leerse con{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker inspect
            </code>
            . En su lugar, antes de cada build DeployKit escribe las variables de
            tu aplicación en un archivo{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            en la raíz del contexto de build, para que los frameworks que
            incrustan variables en tiempo de build (Vite, Create React App,
            Next.js) puedan leerlas.
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            {[
              "Nixpacks / Buildpacks — el .env generado se encuentra en la raíz del contexto de build, donde la mayoría de los frameworks lo leen automáticamente. No requiere configuración adicional.",
              "Dockerfile propio — tu Dockerfile debe hacer COPY del .env generado a la etapa de build antes de que se ejecute el paso de build; de lo contrario, las variables de build faltan sin avisar.",
              "Monorepos — el .env se escribe en la raíz del contexto (la raíz del repo cuando Root Directory está vacío). Cópialo al subdirectorio de la aplicación: frameworks como Vite leen los archivos env desde el directorio de la aplicación, no desde la raíz del monorepo.",
              "Revisa tu .dockerignore — si excluye .env, el daemon de Docker descarta el archivo generado del contexto de build y las variables de build nunca llegan.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mb-3">
            Ejemplo para una aplicación Vite en un monorepo con pnpm (contexto de
            build = raíz del repo):
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
            Volúmenes persistentes
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Añade montajes en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Persistent Volumes
            </code>{" "}
            dentro de la pestaña General (hasta 20). El origen puede ser una ruta
            absoluta del host o un volumen con nombre de Docker, y la ruta del
            contenedor debe ser absoluta. Un sufijo opcional{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              :ro
            </code>{" "}
            lo monta en modo solo lectura. Los volúmenes persisten entre
            despliegues, rollbacks y réplicas.
          </p>
          <CodeBlock
            language="bash"
            code={`/srv/myapp/uploads:/app/uploads      # bind mount from the host
myapp-data:/var/lib/data             # Docker named volume
/srv/myapp/config:/app/config:ro     # read-only`}
          />
          <ul className="space-y-2 text-muted-foreground mt-4">
            {[
              "Los bind mounts de directorios sensibles del host (como /etc, /proc, /sys, /dev, /boot, /root) y las rutas que contienen '..' se rechazan.",
              "Las rutas que la imagen declara con una directiva VOLUME y que no montaste quedan cubiertas automáticamente por un volumen con nombre estable (dk-<app>-<path>), de modo que sus datos sobreviven a los redespliegues en lugar de acabar en un volumen anónimo nuevo cada vez.",
              "Tras arrancar el contenedor, DeployKit inspecciona sus montajes reales. Si falta un volumen configurado, el despliegue falla de forma explícita en lugar de dejar que las escrituras vayan al sistema de archivos del contenedor, donde el siguiente redespliegue las borraría.",
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
            Health checks
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Después de arrancar el contenedor, DeployKit puede comprobar que tu
            aplicación realmente está sirviendo. Elige el tipo en la pestaña
            General:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "HTTP — envía un GET a la ruta configurada (por defecto /) en el primer dominio de la aplicación, o en localhost:<port> cuando no tiene dominio. Las respuestas 2xx y 3xx cuentan como saludables; las redirecciones no se siguen.",
              "TCP — comprueba que el puerto acepta conexiones. Útil para servicios que no son HTTP.",
              "None — omite la comprobación; la aplicación se marca como en ejecución en cuanto arranca el contenedor.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Configura el timeout (por defecto 5 s), el intervalo (por defecto
            10 s) y los reintentos (por defecto 6). Con{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Fail deploy if health check does not pass
            </code>{" "}
            activado, un health check fallido marca el despliegue como fallido;
            en caso contrario solo registra una advertencia y el contenedor sigue
            en ejecución.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Límites de recursos
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            En{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Resources
            </code>
            , establece un límite de{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              CPU (cores)
            </code>{" "}
            (de 0.1 a 8) y un límite de{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Memory (MB)
            </code>{" "}
            (de 64 a 32768) por contenedor. Déjalos vacíos para no aplicar
            límite. Los límites se aplican a cada réplica y surten efecto en el
            siguiente despliegue.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Réplicas y autoescalado
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Establece{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Replicas
            </code>{" "}
            (de 1 a 10) para ejecutar varios contenedores idénticos; Traefik
            reparte la carga entre ellos. La pestaña General muestra el estado en
            vivo de cada instancia.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Activa{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Autoscaling
            </code>{" "}
            para ajustar el número de réplicas según la carga media de las
            réplicas en ejecución, dentro de{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Min replicas
            </code>{" "}
            y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Max replicas
            </code>
            . Establece un{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              CPU target %
            </code>{" "}
            (relativo al límite de CPU, o a un núcleo si no hay límite) y/o un{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Memory target %
            </code>
            ; deja un objetivo vacío para ignorar esa métrica. El escalado se
            realiza en vivo, sin reconstruir.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "La carga se evalúa cada 30 segundos.",
              "Escalar hacia arriba: se añade una réplica cuando la carga se mantiene por encima del objetivo durante 1 minuto.",
              "Escalar hacia abajo: se elimina una réplica solo cuando la carga se mantiene por debajo de la mitad del objetivo durante 5 minutos.",
              "Tras cualquier acción de escalado hay un periodo de espera (cooldown) de 180 segundos.",
              "Actualmente el autoescalado solo funciona para aplicaciones en el servidor local.",
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
                Las réplicas necesitan un dominio.
              </span>{" "}
              Sin dominio, la aplicación publica un puerto fijo del host, que un
              segundo contenedor no puede enlazar, así que DeployKit despliega
              una única instancia (el log del despliegue dice{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                Replicas require a domain
              </code>
              ). Los campos Replicas y Autoscaling permanecen deshabilitados
              hasta que la aplicación tenga un dominio. Si el autoescalado «no
              hace nada», revisa esto primero.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Modo mantenimiento
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Haz clic en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Maintenance
            </code>{" "}
            en la cabecera de la aplicación para mostrar una página de
            mantenimiento en todos los dominios de la aplicación, con un mensaje
            opcional (hasta 500 caracteres). Tu aplicación no se detiene ni se
            redespliega: un pequeño contenedor de mantenimiento toma el control
            de los dominios de la aplicación en Traefik, y al desactivarlo el
            tráfico se restablece de inmediato.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Todas las URL devuelven HTTP 503 con Retry-After, de modo que las cachés y los monitores de uptime nunca consideran la página como disponible.",
              "La página muestra desde cuándo la aplicación está en mantenimiento, se adapta al modo claro/oscuro y a inglés/español, y se recarga sola cuando la aplicación vuelve.",
              "El mantenimiento sobrevive a los despliegues. Puedes desplegar, detener o escalar la aplicación que hay detrás y comprobarla antes de reabrirla; solo termina cuando haces clic en Turn off.",
              "Usa Edit message para cambiar el texto mientras está activo. Los dominios añadidos durante el mantenimiento también quedan cubiertos.",
              "La aplicación necesita al menos un dominio, y necesitas el rol de operador en el proyecto. También funciona en servidores remotos.",
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
            Los logs de los contenedores se recopilan de forma continua para cada
            contenedor en ejecución, haya o no alguien con el dashboard abierto.
            La pestaña{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Logs
            </code>{" "}
            tiene dos modos:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Live — transmite la salida del contenedor en tiempo real.",
              "History — busca por texto en los logs persistidos y filtra por nivel (error, warn, info, debug, fatal). Los niveles se infieren del texto del log con el mejor esfuerzo posible.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Los logs persistidos se conservan 7 días por defecto (establece{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              LOG_RETENTION_DAYS
            </code>{" "}
            en la API para cambiarlo). Los secretos habituales — tokens como{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ghp_
            </code>{" "}
            o{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              sk_live_
            </code>
            , cabeceras Bearer/Basic, tokens en URLs de Git, pares{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              password=
            </code>{" "}
            y claves de AWS — se ocultan antes de almacenar o transmitir los
            logs. La salida del build de cada despliegue está en la pestaña{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Deployments
            </code>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Terminal web
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            La pestaña{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Terminal
            </code>{" "}
            abre una shell interactiva dentro del contenedor en ejecución desde
            tu navegador (haz clic en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Connect
            </code>
            ; hay disponible pantalla completa).
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "La aplicación debe estar desplegada y en ejecución.",
              "Requiere el rol global de operador o admin y el rol de operador en el proyecto de la aplicación.",
              "La imagen debe contener /bin/sh, /bin/bash o /bin/ash; las imágenes sin shell (p. ej. distroless) no pueden abrir una terminal.",
              "Las sesiones se cierran tras 15 minutos de inactividad.",
              "Los comandos no se registran. Para un comando puntual con código de salida y salida almacenados, usa la pestaña Tasks.",
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
            Cada despliegue registra su commit, los logs del build y la imagen
            que produjo. Desde la pestaña{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Deployments
            </code>{" "}
            puedes hacer rollback a un despliegue anterior. No se reconstruye
            nada: DeployKit reinicia la aplicación desde la imagen almacenada,
            por lo que un rollback tarda segundos. Aparece como un nuevo
            despliegue llamado{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Rollback to &lt;commit&gt;
            </code>
            . Solo cambia la imagen: se usan las variables de entorno, dominios,
            volúmenes, límites y número de réplicas actuales de la aplicación.
            Hacer rollback requiere el rol de operador en el proyecto.
          </p>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-bright font-medium">
                La profundidad de rollback es 3.
              </span>{" "}
              Una limpieza diaria (hacia las 03:00) conserva solo las imágenes de
              los 3 despliegues exitosos más recientes de cada aplicación, además
              de cualquier imagen en uso. Las entradas más antiguas siguen
              apareciendo en la lista, pero no se puede hacer rollback a ellas (
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                No image stored — cannot roll back
              </code>
              ).
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Despliegue y controles del día a día
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Deploy — construye y despliega la rama por defecto de la aplicación.",
              "Deploy from branch (el botón de rama junto a Deploy) — despliega cualquier rama una sola vez, sin cambiar la rama por defecto de la aplicación.",
              "Stop / Start — detiene todos los contenedores de la aplicación o los vuelve a iniciar sin reconstruir.",
              "Auto-deploy — un push a la rama por defecto dispara un despliegue a través de la GitHub App o del webhook del repositorio (consulta Webhooks).",
              "Otras pestañas: Monitoring (métricas de CPU/memoria), Security (resultados del escaneo de vulnerabilidades de la imagen), Tasks (comandos programados y puntuales) y Previews (entornos de pull requests).",
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
            Pipeline de despliegue
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Cuando lanzas un despliegue, ocurre lo siguiente:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Se crea un registro del despliegue con estado 'queued' y la petición devuelve la respuesta de inmediato.",
              "Los despliegues de una misma aplicación se ejecutan de uno en uno; un nuevo despliegue espera hasta que termine el anterior.",
              "El repositorio se clona (shallow, rama elegida) usando la credencial de la GitHub App o el token almacenado — o, en los orígenes Docker Image, se descarga la imagen.",
              "Las variables de entorno se descifran y se escriben en un archivo .env en la raíz del contexto de build, de modo que las variables de build llegan al build.",
              "La imagen se construye con la estrategia seleccionada y se etiqueta como deploykit/<app>:<commit>. En servidores remotos, el clonado y el build ocurren en ese servidor.",
              "Opcionalmente, se escanea la imagen en busca de vulnerabilidades (solo informativo: un escaneo nunca bloquea un despliegue).",
              "DeployKit vuelve a leer la configuración de la aplicación, de modo que los cambios guardados durante el build (env, dominios, volúmenes, límites) se aplican.",
              "Todos los contenedores antiguos de la aplicación se detienen y se eliminan, y después arrancan los nuevos contenedores con las etiquetas de enrutado de Traefik, los volúmenes configurados y los límites de recursos.",
              "Se verifican los montajes reales y se ejecuta el health check (si está configurado).",
              "Se actualiza el estado del despliegue, se envían las notificaciones y, con la GitHub App, se reporta el estado del commit.",
              "Los logs de build y de despliegue se transmiten al dashboard en tiempo real.",
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
    title: "Bases de datos",
    description:
      "Bases de datos gestionadas con un clic, con credenciales cifradas, backups programados y restauración con un clic.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Motores compatibles
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            DeployKit ejecuta la imagen oficial de cada motor. La versión es fija
            para cada motor:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "PostgreSQL 16",
                desc: "postgres:16-alpine, puerto 5432",
              },
              {
                name: "MySQL 8",
                desc: "mysql:8, puerto 3306",
              },
              {
                name: "MariaDB 11",
                desc: "mariadb:11, puerto 3306",
              },
              {
                name: "MongoDB 7",
                desc: "mongo:7, puerto 27017, replica set opcional (rs0)",
              },
              {
                name: "Redis 7",
                desc: "redis:7-alpine, puerto 6379",
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
            Crear una base de datos
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Desde la página de tu proyecto, abre{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              New Database
            </code>
            , elige un nombre, un tipo y el servidor de destino. Para MongoDB
            puedes marcar{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Enable Replica Set
            </code>
            . Crear una base de datos requiere el rol de Operator o Admin en el
            proyecto.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "El contenedor se llama dk-<name> y sus datos viven en el volumen de Docker dk-<name>-data",
              "El usuario es admin con una contraseña generada, almacenada cifrada (AES-256-GCM); la base de datos inicial recibe el nombre de la base de datos",
              "Redis se crea sin contraseña — solo es accesible desde dentro de la red de Docker",
              "Los replica sets de MongoDB reciben un keyfile y rs.initiate() automáticamente, por lo que las transacciones y los change streams funcionan",
              "Cada base de datos tiene pestañas Connection, Backups, Monitoring, Logs y Tasks — las métricas, los logs persistentes y las reglas de alerta funcionan exactamente igual que en las aplicaciones",
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
            Conectar desde tus aplicaciones
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Las bases de datos <strong>no se exponen a internet</strong>: no
            tienen dominio, ni ruta de Traefik, ni puerto publicado en el host.
            Viven en la red de Docker{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit-network
            </code>{" "}
            y se acceden mediante el hostname interno{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              dk-&lt;name&gt;
            </code>{" "}
            desde aplicaciones que se ejecutan en el mismo servidor. Copia la
            cadena de conexión de la pestaña{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Connection
            </code>{" "}
            en una variable de entorno de tu aplicación:
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
            Solo los Operators y Admins del proyecto pueden ver la cadena de
            conexión y la contraseña; los Viewers ven en su lugar un aviso de
            acceso restringido. No hay ninguna opción para publicar el puerto de
            una base de datos. Para trabajo puntual (un{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              VACUUM
            </code>
            , una consulta puntual) usa la pestaña Tasks de la base de datos: los
            comandos se ejecutan en la imagen cliente del motor con{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DK_DB_HOST
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DK_DB_USER
            </code>{" "}
            y la contraseña ya inyectados.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Backups programados
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            En la pestaña{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Backups
            </code>{" "}
            , activa los backups automáticos, elige una programación (diaria a
            las 2:00 AM, cada 6 o 12 horas, semanal o mensual) y un periodo de
            retención, y después haz clic en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Save Config
            </code>
            . La programación surte efecto de inmediato, sin necesidad de
            reiniciar.{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Backup Now
            </code>{" "}
            encola un backup manual en cualquier momento.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Motor</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Método
                  </th>
                  <th className="px-4 py-2 font-medium text-bright">Archivo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  ["PostgreSQL", "pg_dump, comprimido con gzip", ".sql.gz"],
                  ["MySQL / MariaDB", "mysqldump, comprimido con gzip", ".sql.gz"],
                  ["MongoDB", "mongodump --archive --gzip", ".archive.gz"],
                  ["Redis", "BGSAVE, luego copia de dump.rdb", ".rdb"],
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
              "Los archivos se escriben en /var/backups/deploykit/<database-name>/ en el host (montado como bind mount en el contenedor de la API)",
              "La retención se indica en días (1–365, por defecto 7): tras cada backup exitoso, se eliminan los archivos más antiguos que el periodo de retención",
              "Las programaciones se ejecutan con el reloj del contenedor de la API, que por defecto es UTC",
              "Cada backup dispara una notificación backup.completed o backup.failed, y los backups manuales y los cambios de configuración se registran en el log de auditoría",
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
            Restaurar un backup
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            La pestaña Backups lista cada archivo con su tamaño y antigüedad.
            Usa el botón de restaurar junto a un backup y confirma; eliminar
            borra el archivo de forma permanente. Restaurar y eliminar backups
            requiere el rol de Operator o Admin en el proyecto.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "PostgreSQL y MySQL/MariaDB reproducen el volcado SQL sobre la base de datos existente — los objetos que ya existen pueden entrar en conflicto, así que ante la duda restaura sobre una base de datos vacía",
              "MongoDB restaura con --drop, reemplazando las colecciones contenidas en el archivo",
              "Los backups de Redis se listan y se conservan en disco, pero el dashboard no ofrece un botón de restauración para ellos",
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
            Detener y eliminar
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Los Operators pueden detener e iniciar una base de datos. Eliminarla
            requiere el rol de Admin en el proyecto y borra el contenedor y su
            programación de backups; el volumen de datos{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              dk-&lt;name&gt;-data
            </code>{" "}
            y los archivos de backup en disco se conservan. Una base de datos
            importada desde un manifiesto de configuración todavía no tiene
            contenedor: el primer{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Start
            </code>{" "}
            lo aprovisiona con la contraseña almacenada, por lo que las cadenas
            de conexión existentes siguen funcionando.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Nota:</span> Los
            backups y las restauraciones se ejecutan a través del daemon de
            Docker del host de DeployKit, por lo que solo funcionan para bases de
            datos en el servidor local. Además, la contraseña queda integrada en
            el volumen en el primer arranque: si eliminas una base de datos y
            creas una nueva con el mismo nombre, se reutiliza el volumen antiguo
            con la contraseña antigua. Elimina el volumen con{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker volume rm dk-&lt;name&gt;-data
            </code>{" "}
            primero si quieres empezar desde cero.
          </p>
        </div>
      </div>
    ),
  },
  domains: {
    title: "Dominios y SSL",
    description:
      "Enruta dominios personalizados a tus aplicaciones a través de Traefik, con certificados automáticos de Let's Encrypt.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Añadir dominios a una aplicación
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En la pestaña{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Domains
            </code>{" "}
            de una aplicación, haz clic en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Add Domain
            </code>{" "}
            e introduce el hostname y el{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Container Port
            </code>{" "}
            en el que escucha tu aplicación. Añadir o eliminar dominios requiere
            el rol de Operator o Admin en el proyecto.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Una aplicación puede tener tantos dominios como quieras — dominios raíz, subdominios o ambos (example.com y www.example.com)",
              "Cada dominio tiene su propio puerto de contenedor, por lo que un mismo contenedor puede servir distintos puertos en distintos hostnames",
              "Los hostnames deben ser FQDN válidos; se convierten a minúsculas automáticamente",
              "Los dominios añadidos desde el dashboard usan siempre HTTPS",
              "Los cambios surten efecto en el siguiente despliegue — las etiquetas de enrutado se establecen al crear el contenedor, así que redespliega tras añadir o eliminar un dominio",
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
            Configuración de DNS
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Apunta cada dominio a la IP pública del servidor en el que se ejecuta
            la aplicación y después añádelo en DeployKit:
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
            SSL automático con Let&apos;s Encrypt
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Traefik v3 obtiene y renueva un certificado para cada dominio HTTPS
            usando el desafío HTTP de Let&apos;s Encrypt. Las peticiones HTTP
            simples al puerto 80 se redirigen a HTTPS. Para que se emita un
            certificado:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "El DNS del dominio ya debe resolver al servidor",
              "Los puertos 80 y 443 deben estar abiertos — el puerto 80 es necesario para el desafío aunque después el tráfico se redirija",
              "Los certificados wildcard (*.example.com) no se pueden obtener con el desafío HTTP; cada hostname obtiene su propio certificado",
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
            Cómo funciona el enrutado
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Cuando se despliega un contenedor, DeployKit le adjunta etiquetas de
            Traefik: un router y un servicio por dominio, con cada router
            enlazado explícitamente a su propio servicio. Traefik recoge las
            etiquetas y enruta el hostname al contenedor y puerto correctos. No
            se expone nada que no tenga un dominio.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Con dominio: no se publica ningún puerto del host, y Traefik reparte la carga entre las réplicas",
              "Sin dominio: el puerto de la aplicación se publica en el host y solo se ejecuta una instancia — las réplicas requieren un dominio",
              "El modo mantenimiento responde en los dominios de la aplicación, por lo que necesita al menos uno",
              "Los stacks de Compose tienen sus propios dominios: cada dominio apunta a un servicio del stack (y puede añadir un prefijo de ruta)",
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
              ¿Varios dominios devuelven 404?
            </span>{" "}
            Antes de la v0.5.0, una aplicación o un servicio de un stack con dos
            o más dominios producía routers de Traefik que no estaban enlazados a
            un servicio, por lo que Traefik los descartaba todos (su log muestra{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              cannot be linked automatically with multiple Services
            </code>
            ) mientras el dashboard seguía mostrando la aplicación como en
            ejecución. Esto está corregido, pero las etiquetas quedan fijadas al
            crear el contenedor: <strong>redespliega</strong> cualquier
            aplicación o stack que ya tuviera varios dominios después de
            actualizar.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            El dominio propio del dashboard
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            El panel se enruta de la misma forma. En producción, establece{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DOMAIN
            </code>{" "}
            y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ACME_EMAIL
            </code>{" "}
            en tu{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>
            . La API responde en{" "}
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
            y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /ws
            </code>{" "}
            de ese host; todo lo demás va al dashboard.
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
            — la URL pública de la instancia, usada para CORS, WebSockets y las
            URL de webhook y callback de la GitHub App — la establece{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker-compose.prod.yml
            </code>{" "}
            como{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              https://DOMAIN
            </code>
            ; no tienes que establecerla tú. Si más adelante cambias{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DOMAIN
            </code>
            , una GitHub App registrada con anterioridad sigue apuntando a la
            URL antigua y debe actualizarse o registrarse de nuevo.
          </p>
        </div>
      </div>
    ),
  },
  servers: {
    title: "Servidores",
    description:
      "Conecta hosts Docker locales y remotos, gestiona las claves SSH que DeployKit usa para acceder a ellos y mantén sus discos limpios.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Tipos de servidor
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-bright">Servidor local</p>
              <p className="text-sm text-muted-foreground mt-1">
                La máquina donde se ejecuta el propio DeployKit, controlada a
                través del socket local de Docker. Regístrala con{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                  Add Local Server
                </code>{" "}
                en la página Servers. Solo puede existir un servidor local.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-bright">Servidor remoto</p>
              <p className="text-sm text-muted-foreground mt-1">
                Cualquier host Linux al que DeployKit pueda llegar por SSH. Se
                pueden desplegar en él aplicaciones, bases de datos y stacks;
                DeployKit ejecuta allí los comandos de Docker mediante una clave
                SSH del catálogo de SSH Keys.
              </p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Los servidores son infraestructura global de la instancia: añadir,
            editar y eliminar servidores e instalar Docker requieren el rol
            global Admin. Los Operator pueden ejecutar health checks.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Claves SSH</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Desde la v0.3.0, las claves SSH viven en su propio catálogo en lugar
            de pegarse en cada servidor. Abre{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              SSH Keys
            </code>{" "}
            en la barra lateral (solo Admin) y haz clic en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Add SSH Key
            </code>
            . Puedes:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            {[
              "Generar un nuevo par de claves — RSA 4096 o ED25519 — directamente en el diálogo",
              "Importar una clave propia pegando su clave privada (OpenSSH o PEM); la clave pública y la huella SHA256 se derivan automáticamente",
              "Ponerle un nombre y una descripción opcional a la clave para distinguir unas de otras",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Copia la clave <strong>pública</strong> en el{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ~/.ssh/authorized_keys
            </code>{" "}
            del usuario remoto y luego elige la clave al añadir el servidor. Una
            misma clave puede compartirse entre varios servidores.
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
              "La clave privada se muestra una sola vez, al crearla. Se cifra en reposo con AES-256-GCM y la API nunca la vuelve a devolver — descárgala desde el diálogo si quieres conservar una copia",
              "Solo se admiten claves RSA y ED25519. Las claves protegidas con passphrase se rechazan, porque DeployKit no puede desbloquearlas",
              "Una clave que sigue asociada a un servidor no se puede eliminar; el error indica los servidores de los que hay que desvincularla primero",
              "La creación, el renombrado y la eliminación de claves quedan registrados en el registro de auditoría",
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
              Actualización desde la v0.2 o anterior:
            </span>{" "}
            la v0.3.0 cambió la forma de conectar los servidores remotos. En el
            primer arranque tras actualizar, la migración de la base de datos
            mueve la clave privada almacenada de cada servidor al catálogo de SSH
            Keys con el nombre{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Migrated — &lt;server name&gt;
            </code>{" "}
            y la asocia a ese servidor. Un servidor cuya clave no pudo migrarse
            muestra{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              No SSH key
            </code>{" "}
            y no será accesible hasta que tenga una: crea una clave, elimina el
            servidor y vuelve a añadirlo con ella (consulta Eliminar un servidor
            más abajo para saber qué pasa con sus servicios).
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Añadir un servidor remoto
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            En la página Servers haz clic en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Add Server
            </code>{" "}
            y rellena:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Server Name — un identificador descriptivo, p. ej. production-1",
              "Host / IP — dirección IP o nombre de host del servidor",
              "SSH Port — por defecto 22",
              "Username — por defecto root",
              "SSH Key — obligatoria; se elige del catálogo de SSH Keys (crea una primero si la lista está vacía)",
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
            Qué necesita el servidor remoto
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Acceso SSH desde el host de DeployKit, con la mitad pública de la clave en authorized_keys",
              "git — los repositorios se clonan en el propio servidor remoto",
              "Docker — o deja que DeployKit lo instale por ti (ver más abajo)",
              "O bien el usuario root, o un usuario que pueda ejecutar sudo sin pedir contraseña: para cualquier usuario distinto de root, DeployKit antepone sudo a sus comandos de Docker",
              "Disco suficiente para imágenes y contextos de build; los builds se ejecutan en /tmp/deploykit-builds y se limpian después",
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
            Health checks e información del servidor
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Haz clic en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Check health
            </code>{" "}
            en la tarjeta de un servidor para probar la conexión SSH y Docker. El
            servidor se marca como{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              connected
            </code>{" "}
            (SSH y Docker funcionan),{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              disconnected
            </code>{" "}
            (SSH funciona, falta Docker) o{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              error
            </code>{" "}
            (SSH falló). Después, la tarjeta muestra el sistema operativo, los
            núcleos de CPU, la RAM y el disco totales, el número de contenedores,
            la versión de Docker y cuándo se comprobó el servidor por última vez,
            además de las aplicaciones y bases de datos desplegadas en él. Los
            health checks se ejecutan cuando tú los lanzas; no hay sondeo de
            servidores en segundo plano.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Instalación automática de Docker
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Si el health check detecta que SSH funciona pero falta Docker, la
            tarjeta ofrece{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Install Docker
            </code>
            . DeployKit ejecuta el script de instalación oficial de{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              get.docker.com
            </code>
            , habilita e inicia el servicio de Docker y añade a un usuario que no
            sea root al grupo{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker
            </code>
            . Necesita acceso root o sudo y puede tardar unos minutos. Ejecuta un
            health check después para verificarlo.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Despliegues remotos
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Cuando una aplicación apunta a un servidor remoto, el worker de
            despliegue clona el repositorio en esa máquina por SSH, construye la
            imagen allí con{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker build
            </code>
            , inicia el contenedor y elimina el directorio de build. Los logs se
            envían al panel en tiempo real. Diferencias con los despliegues
            locales:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Los builds remotos usan siempre el Dockerfile de la aplicación (ajuste Dockerfile path); los builds con Nixpacks y Buildpacks solo se ejecutan en el servidor local",
              "El análisis de vulnerabilidades de Trivy se omite, porque la imagen vive en el daemon remoto",
              "DeployKit no instala un reverse proxy en los servidores remotos — los contenedores reciben las mismas etiquetas de Traefik, pero enrutar dominios hacia ellos requiere una instancia de Traefik en ese host",
              "Los servidores de juegos solo se ejecutan en el servidor local",
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
            Limpieza de imágenes
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Cada despliegue deja atrás una imagen{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit/*
            </code>
            . Cada noche a las 03:00, DeployKit las elimina en todos los
            servidores, conservando las imágenes de los últimos 3 despliegues
            exitosos por aplicación para que los rollbacks sigan funcionando.
            Los Admin también pueden ejecutarlo bajo demanda con{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Clean images
            </code>{" "}
            en la página Servers, eligiendo cuántas imágenes conservar por
            aplicación (1–20) y, opcionalmente, haciendo antes una simulación
            (dry run) para previsualizar qué se eliminaría.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Eliminar un servidor
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Eliminar un servidor de DeployKit no detiene ni borra lo que se
            ejecuta en él. Las aplicaciones, bases de datos, stacks y servidores
            de juegos que apuntaban a él se conservan, pero pierden su
            asignación de servidor. La clave SSH permanece en el catálogo y puede
            eliminarse por separado cuando ningún servidor la use.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              Aviso sobre el firewall:
            </span>{" "}
            Docker se salta{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ufw
            </code>
            . Cualquier puerto que DeployKit publique en un host — una base de
            datos con puerto externo, un puerto de host de una aplicación, el
            puerto de un servidor de juegos — es accesible desde internet aunque{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ufw status
            </code>{" "}
            indique que está bloqueado, porque Docker inserta sus propias reglas
            de iptables antes que las de ufw. DeployKit no gestiona ufw ni
            iptables. Filtra el tráfico en el firewall de tu proveedor cloud
            (Hetzner Cloud Firewall, AWS Security Groups…) o añade reglas a la
            cadena{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DOCKER-USER
            </code>{" "}
            (por ejemplo con ufw-docker). No desactives la integración de Docker
            con iptables: rompe la red de los contenedores.
          </p>
        </div>
      </div>
    ),
  },
  templates: {
    title: "Plantillas y stacks de Compose",
    description:
      "Despliega stacks completos de docker-compose.yml o plantillas con un clic desde el catálogo público.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Stacks de Compose
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Un stack es un{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker-compose.yml
            </code>{" "}
            completo desplegado como una unidad, junto a tus aplicaciones y bases
            de datos. No hay paso de build: desplegar un stack es un{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker compose up
            </code>{" "}
            en el servidor de destino. Cada stack tiene su propia página de
            detalle con las pestañas{" "}
            <span className="text-bright">
              General, Compose, Environment, Domains, Deployments, Logs,
              Terminal, Monitoring
            </span>{" "}
            y <span className="text-bright">Tasks</span>, de modo que los logs,
            las métricas y el terminal funcionan por servicio dentro del stack.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Para crear uno, abre un proyecto, ve a la sección{" "}
            <span className="text-bright">Stacks</span> y haz clic en{" "}
            <span className="text-bright">Add Stack</span>. Ponle un nombre
            (letras minúsculas, números y guiones) y pega tu archivo Compose. El
            nombre pasa a ser el nombre del proyecto Compose{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              dk-&lt;name&gt;
            </code>
            , que actúa como prefijo de todos los contenedores, redes y volúmenes
            del stack. Un stack pegado no se inicia automáticamente: añade tus
            dominios y luego haz clic en{" "}
            <span className="text-bright">Redeploy</span>.
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
            Qué cambia DeployKit en tu archivo Compose
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Tu YAML se guarda exactamente como lo escribiste. En el momento del
            despliegue, DeployKit aplica algunos cambios solo en memoria:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Se añaden etiquetas de propiedad a cada servicio — así es como los logs, las métricas y el terminal encuentran los contenedores del stack.",
              "Se elimina container_name, de modo que el mismo stack o plantilla pueda desplegarse dos veces sin colisiones de nombres.",
              "Los servicios con dominio reciben etiquetas de enrutamiento de Traefik y se unen a la red compartida deploykit-network. Sus puertos publicados se convierten a expose, ya que Traefik llega a ellos a través de esa red.",
              "Los servicios sin dominio se dejan tal cual y solo son accesibles desde dentro del stack (por nombre de servicio).",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Prefiere{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              expose
            </code>{" "}
            a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ports
            </code>{" "}
            y evita{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              container_name
            </code>
            . No escribas nunca etiquetas de Traefik tú mismo — DeployKit las
            inyecta.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Dominios, variables de entorno y volúmenes
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Domains — en la pestaña Domains elige el Service, el Container port y el Domain (opcionalmente una ruta). Un servicio puede tener varios dominios. Marca “Request an HTTPS certificate” solo cuando el dominio ya resuelva a este servidor.",
              "Environment — las variables se cifran en reposo y se escriben en un archivo .env junto al archivo Compose, de modo que las referencias ${VAR} de tu YAML las rellena el propio Compose.",
              "Volumes — los volúmenes con nombre y los bind mounts relativos funcionan igual que en Compose estándar. Los archivos del stack viven en /var/lib/deploykit/compose, un directorio por stack.",
              "Redeploy — editar el archivo Compose, el entorno o los dominios se guarda al instante, pero solo se aplica en el siguiente Redeploy, que vuelve a descargar las imágenes y recrea los contenedores.",
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
            <span className="font-semibold text-primary">Aviso:</span>{" "}
            Eliminar un stack (solo los administradores del proyecto) ejecuta{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker compose down --volumes
            </code>{" "}
            y borra su directorio — los volúmenes con nombre del stack y sus
            datos se eliminan con él. Haz copia de seguridad de lo que necesites
            antes.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Plantillas con un clic
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            La página <span className="text-bright">Templates</span> de la barra
            lateral lista stacks ya preparados del catálogo público{" "}
            <a
              href="https://github.com/deploykithq/deploykit-templates"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              deploykit-templates
            </a>{" "}
            — bases de datos, aplicaciones autoalojadas y stacks completos.
            Busca por nombre o filtra por etiqueta y haz clic en una tarjeta para
            desplegarla. Desplegar una plantilla crea un stack de Compose normal
            que gestionas como cualquier otro.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            El diálogo de despliegue pide:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Name — da nombre al stack y a todos los contenedores que contiene.",
              "Domain (opcional) — el nombre de host con el que se sirve la plantilla. Déjalo vacío y DeployKit genera uno (ver más abajo).",
              "Project — cuando abres el diálogo desde la página Templates en lugar de desde un proyecto.",
              "Server — dónde se ejecuta el stack.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Las plantillas nunca incluyen credenciales. Las contraseñas, claves y
            tokens se generan desde cero en tu servidor en cada despliegue y se
            guardan cifrados en el entorno del stack. El despliegue comienza de
            inmediato y el diálogo de resultado muestra las URL del stack y las
            credenciales generadas.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Consejo:</span> Copia
            las <span className="text-bright">Generated credentials</span> de
            inmediato — ese diálogo es la única vez que se muestran completas.
            Después solo son visibles en la pestaña Environment del stack para
            los usuarios con permiso para ver secretos.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Nombres de host generados
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Para que una plantilla funcione sin ninguna configuración de DNS, un
            dominio vacío se genera en este orden:
          </p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Origen</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Nombre de host
                  </th>
                  <th className="px-4 py-2 font-medium text-bright">HTTPS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  [
                    "TEMPLATES_BASE_DOMAIN",
                    "<name>-<random>.<base domain> — un dominio wildcard que apuntas a este servidor",
                    "Sí (Let's Encrypt)",
                  ],
                  [
                    "Server IP (remote servers) or PUBLIC_IP (local server)",
                    "<name>-<random>.<ip>.sslip.io",
                    "No, HTTP sin cifrar",
                  ],
                  [
                    "Ninguno disponible",
                    "El despliegue falla y te pide que introduzcas un dominio",
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
            Define estas variables en el{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            de DeployKit y reinicia. Los nombres de host sslip.io no pueden
            obtener certificados, así que en producción introduce tu propio
            dominio o configura{" "}
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
            El catálogo de plantillas
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ninguna plantilla viene incluida dentro de DeployKit: el catálogo se
            obtiene en tiempo de ejecución desde{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              TEMPLATES_REGISTRY_URL
            </code>{" "}
            (por defecto, la URL raw de GitHub de deploykit-templates). Las
            plantillas nuevas publicadas allí aparecen en todas las instancias en
            aproximadamente una hora, sin actualizar DeployKit. Puedes apuntar
            esta variable a tu propio fork; debe ser una dirección http(s)
            pública — las direcciones privadas y de loopback se rechazan.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "El catálogo se vuelve a leer como máximo una vez por hora, y la última copia válida se guarda en caché durante 30 días.",
              "Si el registro no está accesible, la página Templates sigue funcionando con esa copia en caché y muestra un aviso con la hora en que se obtuvo.",
              "Solo una instancia que nunca ha llegado a alcanzar el registro muestra una página vacía, explicando que no se puede acceder al registro — revisa el acceso saliente a internet del servidor o TEMPLATES_REGISTRY_URL.",
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
            Escribir tu propia plantilla
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Una plantilla es un directorio del catálogo con un{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker-compose.yml
            </code>
            , un{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              template.json
            </code>{" "}
            (metadatos, variables, dominios, env y montajes de archivos de
            configuración) y un logo opcional. Las variables usan helpers
            generadores como{" "}
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
            o{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"${jwt:<secretVar>:<role>}"}
            </code>
            ; los dominios, el env y los montajes hacen después referencia a esas
            variables por su nombre.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Aviso:</span> Existen
            dos sintaxis{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"${...}"}
            </code>{" "}
            distintas. Los helpers generadores como{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"${password:32}"}
            </code>{" "}
            solo funcionan dentro de{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              template.json
            </code>
            . Dentro de{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker-compose.yml
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"${VAR}"}
            </code>{" "}
            es la interpolación normal de Compose a partir del .env del stack —
            un helper escrito ahí se convierte silenciosamente en una cadena
            vacía. Usa{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"$${"}
            </code>{" "}
            en template.json cuando un{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              {"${"}
            </code>{" "}
            literal deba conservarse.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Onboarding
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            En una instancia recién instalada, el panel muestra una lista de
            comprobación <span className="text-bright">Welcome to DeployKit</span>
            : <span className="text-bright">Connect a server</span> (los Admin
            pueden hacer clic en{" "}
            <span className="text-bright">Use local server</span>),{" "}
            <span className="text-bright">Create a project</span> y{" "}
            <span className="text-bright">Deploy from a template</span>, que abre
            la página Templates. Desaparece cuando la instancia tiene su primera
            aplicación o base de datos.
          </p>
        </div>
      </div>
    ),
  },
  "scheduled-tasks": {
    title: "Tareas programadas",
    description:
      "Ejecuta trabajos cron y comandos puntuales (migraciones, scripts, consultas) sobre tus aplicaciones, stacks y bases de datos.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Resumen</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Una tarea es un comando con nombre y repetible sobre un servicio, con
            una programación cron <span className="text-bright">opcional</span>.
            Úsala para cosas como{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              php artisan schedule:run
            </code>{" "}
            cada minuto, una limpieza nocturna o un{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              php artisan migrate --force
            </code>{" "}
            guardado que ejecutas a mano después de los despliegues. A diferencia
            del terminal web, cada ejecución queda registrada con su salida,
            código de salida, duración y quién la inició.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Las tareas viven en la pestaña <span className="text-bright">Tasks</span>{" "}
            de cada aplicación, stack de Compose y base de datos. La pestaña tiene
            tres partes: la lista de tareas, un cuadro{" "}
            <span className="text-bright">Run a command</span> para comandos
            puntuales y el <span className="text-bright">Run history</span>.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Crear una tarea
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Haz clic en <span className="text-bright">New task</span> y rellena:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "Name",
                desc: "Una etiqueta para la lista y el historial, p. ej. “Run migrations”.",
              },
              {
                name: "Service",
                desc: "Solo en stacks — en qué servicio de Compose se ejecuta el comando.",
              },
              {
                name: "Command",
                desc: "Hasta 4.000 caracteres. Se ejecuta mediante /bin/sh -lc, así que &&, pipes y globs funcionan.",
              },
              {
                name: "Schedule",
                desc: "Un preset (cada minuto, cada 5 minutos, cada hora, a diario a las 2:00, semanal), Custom… o “No schedule (run manually)”.",
              },
              {
                name: "Time zone",
                desc: "Cualquier zona IANA (p. ej. Europe/Madrid). Por defecto, UTC.",
              },
              {
                name: "Timeout (seconds)",
                desc: "De 1 a 86.400; por defecto 300. El contenedor se mata cuando expira.",
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
            Mientras escribes una programación, el formulario previsualiza las
            próximas horas de ejecución, para que puedas comprobar la zona
            horaria antes de guardar. Cada tarea de la lista tiene las acciones{" "}
            <span className="text-bright">Run now</span>,{" "}
            <span className="text-bright">Edit</span>,{" "}
            <span className="text-bright">Enable/Disable</span> y{" "}
            <span className="text-bright">Delete</span>. Deshabilitar detiene la
            programación sin eliminar la tarea; aún puedes ejecutarla
            manualmente. Los cambios de programación surten efecto de inmediato,
            sin necesidad de reiniciar.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Sintaxis cron
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Las programaciones usan cron estándar de 5 campos:{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              minute hour day-of-month month day-of-week
            </code>
            . Los campos de segundos y atajos como{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              @daily
            </code>{" "}
            se rechazan, y el intervalo mínimo es de un minuto.
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
            Dónde se ejecutan los comandos
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Cada ejecución inicia un{" "}
            <span className="text-bright">contenedor nuevo y temporal</span> a
            partir de la imagen del servicio y lo elimina cuando el comando
            termina. Nunca se ejecuta dentro del contenedor en marcha, de modo
            que una migración funciona incluso con la aplicación detenida, un
            trabajo largo no le roba recursos al contenedor que sirve el tráfico
            y las réplicas nunca son un problema.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Destino</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Cómo se ejecuta
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  [
                    "Aplicación",
                    "La imagen actual de la aplicación con sus variables de entorno, volúmenes, límites de CPU/memoria y la deploykit-network. La aplicación debe haberse desplegado al menos una vez.",
                  ],
                  [
                    "Servicio de stack",
                    "docker compose run --rm --no-deps para el servicio elegido: el entorno, los volúmenes y las redes provienen del stack, y los demás servicios no se inician.",
                  ],
                  [
                    "Base de datos",
                    "La imagen cliente de la base de datos (psql, mysql, redis-cli, mongosh…) en la red compartida. El volumen de datos no se monta.",
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
            Las tareas de base de datos reciben{" "}
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
            y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DK_DB_PASSWORD
            </code>
            . Para PostgreSQL, MySQL/MariaDB y Redis, la contraseña también se
            define en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              PGPASSWORD
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              MYSQL_PWD
            </code>{" "}
            o{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              REDISCLI_AUTH
            </code>
            , por lo que el cliente nunca la necesita en la línea de comandos.
            MongoDB no tiene una variable así — pasa tú mismo{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              $DK_DB_PASSWORD
            </code>{" "}
            a mongosh.
          </p>
          <CodeBlock
            language="bash"
            code={`# PostgreSQL database task
psql -h "$DK_DB_HOST" -U "$DK_DB_USER" -d "$DK_DB_NAME" -c "VACUUM ANALYZE;"`}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Comandos puntuales
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Escribe un comando en <span className="text-bright">Run a command</span>
            , cambia opcionalmente su timeout y haz clic en{" "}
            <span className="text-bright">Run</span>. Se ejecuta exactamente como
            una tarea (contenedor nuevo, mismo entorno) pero sin guardarse, y
            aparece en el Run history. La salida se muestra en directo en un
            diálogo <span className="text-bright">Command output</span> que
            puedes reabrir más tarde desde el historial.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Historial de ejecuciones y comportamiento
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Cada ejecución termina como success (código de salida 0), failed, timed_out o skipped, con su código de salida, duración y origen (programación o manual).",
              "Sin solapamiento: si la ejecución anterior de la misma tarea sigue en curso, la nueva se registra como skipped en lugar de ejecutarse. Un trabajo cada minuto nunca puede acumularse.",
              "Los timeouts matan el contenedor y añaden “[deploykit] Command timed out and was killed.” a la salida.",
              "Solo se guardan los últimos 64 KB de salida — el final, donde suelen estar los errores. La salida más larga se marca como truncada.",
              "Se conservan las 50 ejecuciones más recientes por tarea (y por servicio en los comandos puntuales). El historial sobrevive a la eliminación de la tarea.",
              "Una ejecución captura el comando y el timeout al empezar, así que editar una tarea nunca cambia una ejecución ya en curso. Las ejecuciones no se pueden cancelar.",
              "Se ejecutan hasta 3 ejecuciones a la vez en toda la instancia; las demás esperan en la cola.",
              "Las ejecuciones fallidas y las que agotan el timeout disparan el evento de notificación Task Failed — actívalo en los canales de notificación de tu proyecto.",
              "En los servidores remotos, la salida llega cuando el comando termina, en lugar de línea a línea.",
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
            Permisos
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Ejecutar un comando es tan potente como el terminal, por lo que crear,
            editar, eliminar y ejecutar tareas requiere el rol{" "}
            <span className="text-bright">global</span> de{" "}
            <span className="text-bright">Operator</span> (o Admin){" "}
            <span className="text-bright">y</span> acceso de Operator al
            proyecto. Cualquier miembro del proyecto puede ver la lista de tareas
            y el historial de ejecuciones, pero la{" "}
            <span className="text-bright">salida</span> del comando solo es
            visible para los Operator y Admin del proyecto, ya que puede contener
            secretos como cadenas de conexión. Todos los cambios y ejecuciones
            de tareas se escriben en el registro de auditoría.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Problemas habituales:</span>{" "}
            La imagen necesita una shell POSIX en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /bin/sh
            </code>{" "}
            — las imágenes scratch y distroless no pueden ejecutar tareas. Los
            contenedores de tareas no publican puertos y nunca se reinician, así
            que un comando que deba seguir ejecutándose pertenece a un servicio,
            no a una tarea. En un stack, el cuadro{" "}
            <span className="text-bright">Run a command</span> usa siempre el
            primer servicio del archivo Compose; crea una tarea para elegir otro
            servicio.
          </p>
        </div>
      </div>
    ),
  },
  "preview-deployments": {
    title: "Despliegues de preview",
    description:
      "Entornos efímeros automáticos para pull requests y merge requests.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Cómo funcionan los despliegues de preview
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Los despliegues de preview crean una copia aislada de tu aplicación
            para cada pull request (GitHub) o merge request (GitLab). Cuando se
            abre un PR, DeployKit construye y despliega su rama head como una
            aplicación independiente con su propio contenedor y URL, la vuelve a
            desplegar con cada nuevo push al PR y la elimina cuando el PR se
            cierra.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Activar los previews
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "En la pestaña General de la aplicación, marca 'Auto-deploy pull requests as preview environments' y guarda",
              "Opcionalmente define un Base domain como example.com — cada PR recibirá entonces pr-<number>.example.com (p. ej. pr-42.example.com)",
              "Crea un registro DNS wildcard (*.example.com) que apunte al servidor que ejecuta la aplicación",
              "Asegúrate de que los eventos de PR lleguen a DeployKit: es automático con la GitHub App; en caso contrario, habilita 'Pull requests' (GitHub) o 'Merge request events' (GitLab) en el webhook del repositorio",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            La configuración de webhooks se explica en{" "}
            <a href="/es/docs/webhooks" className="text-primary hover:underline">
              Webhooks &amp; CI/CD
            </a>
            . Las aplicaciones conectadas mediante la{" "}
            <a href="/es/docs/github-app" className="text-primary hover:underline">
              GitHub App
            </a>{" "}
            reciben los eventos de PR únicamente a través de la App.
          </p>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Ojo:</span>{" "}
            los dominios de preview se sirven por HTTP sin cifrar — los
            certificados wildcard requerirían un desafío DNS. Además, los
            previews copian las variables de entorno del padre tal cual, así que
            el preview de una aplicación de producción se ejecuta con los
            secretos de producción y se conecta a las mismas bases de datos. Usa
            una aplicación de staging como padre si eso no es aceptable.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Ciclo de vida
          </h3>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Evento</th>
                  <th className="px-4 py-2 font-medium text-bright">Resultado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  [
                    "PR abierto / reabierto, MR abierto / reabierto",
                    "Aplicación de preview creada y desplegada",
                  ],
                  [
                    "Nuevos commits enviados al PR / MR",
                    "El preview existente se actualiza al nuevo head y se vuelve a desplegar",
                  ],
                  [
                    "PR cerrado o fusionado, MR cerrado o fusionado",
                    "Contenedor detenido y aplicación de preview eliminada",
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
            Los previews se activan solo mediante eventos de PR / MR — los
            eventos push normales nunca despliegan una aplicación de preview.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Relación padre-hijo
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Un preview es una aplicación normal vinculada a su padre y con el
            nombre{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              &lt;app-name&gt;-pr&lt;number&gt;
            </code>
            . Cuando se crea, copia del padre:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Repositorio, tipo de build, ruta del Dockerfile y directorio raíz",
              "Variables de entorno y puerto",
              "Servidor de destino y ajustes de health check",
              "Credenciales de origen — la conexión de la GitHub App si el padre tiene una (no se guarda ningún secreto en el preview); en caso contrario, el token de acceso del padre",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Los volúmenes, límites de recursos, réplicas, autoescalado y los
            dominios del padre no se copian. Los cambios en el padre solo se
            aplican a los previews creados después. Los previews nunca se
            incluyen en una exportación de configuración.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            GitHub App: comentarios en PR y estados de commit
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Cuando el padre está conectado mediante la GitHub App, DeployKit
            mantiene un único comentario en el pull request — &quot;Deploying
            preview&quot;, luego &quot;Preview ready&quot; con la URL (o
            &quot;Preview failed&quot;) y un enlace a los logs del despliegue, y
            &quot;Preview removed&quot; cuando el PR se cierra. Los redespliegues
            editan ese comentario en lugar de publicar otros nuevos. Cada
            despliegue de preview también publica un estado de commit bajo el
            contexto del padre (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit/&lt;parent name&gt;
            </code>
            ), de modo que la protección de ramas ve una única comprobación
            estable por aplicación. Sin la App, los previews funcionan igual,
            pero no se informa de nada a GitHub.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Gestionar los previews
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            La pestaña{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Previews
            </code>{" "}
            de la aplicación padre lista los previews activos con su número de
            PR, rama, estado, URL y último commit. Los Operator pueden eliminar
            un preview desde ahí; esto detiene su contenedor de inmediato, pero
            el siguiente push a un PR abierto lo vuelve a crear.
          </p>
        </div>
      </div>
    ),
  },
  "github-app": {
    title: "GitHub App",
    description:
      "Conecta repositorios de GitHub sin tokens de acceso, con webhooks automáticos, estados de commit y comentarios en PR.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Por qué usar la GitHub App
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            DeployKit puede acceder a un repositorio privado de dos formas: un
            token de acceso pegado en la aplicación (funciona con GitHub,
            GitLab, Gitea o cualquier servidor git HTTPS), o una GitHub App
            registrada en tu instancia. Para github.com la App es el camino
            recomendado:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "No se almacena ningún token de larga duración: cada clonado usa un token de instalación que caduca tras una hora y solo ve los repositorios a los que diste acceso",
              "Eliges cuenta → repositorio → rama desde una lista en lugar de pegar una URL",
              "Los push y los pull requests llegan automáticamente: no hay que configurar ningún webhook por repositorio",
              "Los repositorios se identifican por su id numérico de GitHub, así que renombrar o transferir un repo no rompe el auto-despliegue",
              "Cada despliegue se reporta en el commit como un estado, y los despliegues de preview comentan su URL en el pull request",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Ambos caminos pueden coexistir: las aplicaciones que no están
            conectadas siguen usando su token de acceso y el webhook del
            repositorio.
          </p>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              Antes de empezar — WEB_URL debe ser pública:
            </span>{" "}
            la URL del webhook de la App (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              &lt;WEB_URL&gt;/api/webhooks/github
            </code>
            ) y la URL de redirección (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              &lt;WEB_URL&gt;/settings/github/callback
            </code>
            ) se construyen a partir de{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEB_URL
            </code>
            , nunca a partir de la cabecera Host de la petición. El registro
            falla si{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEB_URL
            </code>{" "}
            no está definida o apunta a localhost / una dirección privada. El
            compose de producción la deriva como{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              https://$&#123;DOMAIN&#125;
            </code>
            ; para desarrollo local, apúntala a un túnel (cloudflared, ngrok).
            Ambas URLs quedan fijadas en la App cuando se crea: si más tarde
            cambias{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DOMAIN
            </code>
            , desconecta y registra la App de nuevo, o edita sus URLs en
            GitHub.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Registrar la App
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Cada instancia de DeployKit tiene su propia App privada (GitHub
            debe entregar los webhooks a <em>tu</em> servidor, así que no hay
            una App central compartida). El registro usa el flujo de manifest
            de GitHub: nunca copias a mano un App ID ni una clave privada. Se
            requiere el rol Admin.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Ve a Settings → GitHub App y haz clic en Set up (o abre /settings/github)",
              "Opcionalmente indica un nombre para la App (por defecto: \"DeployKit - <your host>\"; los nombres de App son únicos en todo GitHub) y una Organization donde crearla; déjalo vacío para tu cuenta personal. Crearla en una organización requiere permisos de propietario en ella",
              "Haz clic en Register on GitHub y confirma la creación en GitHub",
              "GitHub redirige de vuelta a DeployKit, que intercambia el código de un solo uso por las credenciales de la App y las guarda cifradas",
              "Haz clic en Install the App y elige la cuenta u organización propietaria de tus repositorios",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            ¿Ya creaste una App manualmente? Despliega{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Already created an App? Connect it manually
            </code>{" "}
            y pega su App ID, la clave privada (.pem) y el secreto del webhook.
            DeployKit verifica las credenciales contra GitHub antes de
            guardarlas. La URL del webhook de la App debe apuntar a esta
            instancia y necesita los permisos que se listan más abajo.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Instalaciones y acceso a repositorios
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            La página de la GitHub App lista cada cuenta donde está instalada
            la App, indica si tiene acceso a todos los repositorios o solo a
            algunos seleccionados, y marca las instalaciones suspendidas. Desde
            ahí puedes:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Install on an account — instalar la App en otro usuario u organización",
              "Configure — abrir GitHub para cambiar qué repositorios puede ver la instalación",
              "Test connection — verificar que las credenciales guardadas siguen funcionando",
              "Refresh installations — resincronizar la lista de instalaciones desde GitHub",
              "Disconnect — quitar la App de DeployKit (la App en sí permanece en GitHub)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Instalar, desinstalar y cambiar la selección de repositorios en
            GitHub se detecta automáticamente mediante eventos de webhook.
            Es preferible conceder acceso a{" "}
            <strong>repositorios seleccionados</strong> en lugar de a todos:
            limita lo que puede alcanzar la clave privada de la App.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Conectar una aplicación
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Al crear una aplicación, o desde{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              General → Source
            </code>{" "}
            en una existente (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Connect through the GitHub App instead
            </code>
            ), elige la cuenta, el repositorio y la rama en las listas. Una
            aplicación conectada muestra una insignia{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              GitHub App
            </code>{" "}
            y ningún campo de token de acceso. Listar instalaciones y
            repositorios requiere el rol de operador en el proyecto.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Auto-despliegue
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            La App se suscribe a <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">push</code>{" "}
            y a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              pull_request
            </code>
            . Un push despliega todas las aplicaciones conectadas cuyo
            repositorio y rama coincidan; la coincidencia usa la instalación
            más el id numérico del repositorio en GitHub, nunca la URL. Si el
            repositorio aún tiene un webhook antiguo creado a mano, su entrega
            duplicada se ignora para las aplicaciones conectadas, así que un
            push nunca despliega dos veces, pero puedes borrar ese webhook sin
            problema. Consulta{" "}
            <a href="/es/docs/webhooks" className="text-primary hover:underline">
              Webhooks &amp; CI/CD
            </a>
            .
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Estados de commit
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Para las aplicaciones conectadas, DeployKit publica un estado de
            commit de GitHub en el commit desplegado, tanto para despliegues
            lanzados por webhook como manuales:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "pending — cuando el despliegue está en cola y mientras se hace el build",
              "success — cuando el nuevo contenedor está saludable",
              "failure — cuando falla cualquier paso",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            El contexto del estado es{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit/&lt;app name&gt;
            </code>{" "}
            y su enlace abre la aplicación en tu panel, así que puedes usarlo
            como check obligatorio en la protección de ramas. Los despliegues
            de preview reportan bajo el contexto de su aplicación padre, de
            modo que la protección de ramas ve un único check estable por
            aplicación. Los estados son best-effort: si GitHub no es
            accesible, el despliegue sigue completándose con éxito. Vienen
            activados por defecto; establece{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              commitStatusEnabled: false
            </code>{" "}
            mediante la API{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              application.update
            </code>{" "}
            para desactivarlos en una aplicación concreta.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Despliegues de preview y comentarios en PR
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Con los{" "}
            <a
              href="/es/docs/preview-deployments"
              className="text-primary hover:underline"
            >
              despliegues de preview
            </a>{" "}
            activados en una aplicación conectada, cada pull request obtiene
            su propio entorno y DeployKit mantiene un único comentario en el
            PR: &quot;Deploying preview&quot;, luego &quot;Preview ready&quot;
            con la URL (o &quot;Preview failed&quot;) y un enlace a los logs
            del despliegue, y por último &quot;Preview removed&quot; cuando se
            cierra el PR. Los redespliegues editan el mismo comentario en
            lugar de publicar nuevos. Las previews heredan la conexión de App
            de su aplicación padre, así que no almacenan credenciales propias.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Permisos
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            La App solo solicita lo que estas funciones necesitan:
          </p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">
                    Permiso
                  </th>
                  <th className="px-4 py-2 font-medium text-bright">Acceso</th>
                  <th className="px-4 py-2 font-medium text-bright">Se usa para</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  ["Metadata", "Lectura", "Listar repositorios y ramas"],
                  ["Contents", "Lectura", "Clonar repositorios privados"],
                  ["Commit statuses", "Escritura", "Reportar los resultados del despliegue"],
                  ["Pull requests", "Escritura", "Publicar el comentario de preview"],
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
            Nunca solicita permisos de checks, workflows, administración ni
            issues.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Desconectar y desinstalar
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Desconectar la App en DeployKit deja a las aplicaciones conectadas sin credenciales hasta que vuelvas a conectarla o les des un token de acceso; se te pide confirmación si alguna aplicación la usa",
              "Desinstalar la App de una cuenta en GitHub nunca elimina aplicaciones: pasan a estar desconectadas y recurren a su token de acceso, o fallan con un error claro",
              "La App nunca se incluye en una exportación de configuración: está ligada a la URL del webhook de esta instancia. Al importar, las aplicaciones se vuelven a vincular a la instalación local que puede ver su repositorio",
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
    title: "Notificaciones",
    description:
      "Envía eventos de despliegue, backup y tareas a Discord, Slack, Telegram, email o cualquier webhook.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Canales compatibles
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "Discord",
                desc: "URL del webhook. Los mensajes se envían como embeds de color con los detalles del evento.",
              },
              {
                name: "Slack",
                desc: "URL del incoming webhook. Los mensajes usan bloques de Slack con los detalles del evento.",
              },
              {
                name: "Telegram",
                desc: "Bot Token y Chat ID del chat o canal donde publica el bot.",
              },
              {
                name: "Email (Resend)",
                desc: "Destinatario(s) (separados por comas), tu API Key de Resend y una dirección From opcional.",
              },
              {
                name: "Webhook",
                desc: "Cualquier URL http(s) pública, con un HMAC Secret opcional para firmar el payload.",
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
            Las URLs de Webhook, Discord y Slack deben apuntar a una dirección
            pública: los destinos privados, de loopback y link-local se
            rechazan.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Añadir un canal
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Abre la sección{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Notifications
            </code>{" "}
            de un proyecto y añade un canal: ponle un nombre, elige el tipo,
            rellena sus campos y marca los eventos que debe recibir (un canal
            nuevo recibe por defecto los éxitos y fallos de despliegue). Usa{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Send Test
            </code>{" "}
            para comprobar la configuración antes de depender de ella. Los
            canales se pueden editar, desactivar y reactivar sin eliminarlos.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Eventos</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Estos eventos se entregan actualmente a los canales:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "deploy.success — Una aplicación o stack de Compose se desplegó correctamente",
              "deploy.failed — Falló el despliegue de una aplicación o stack de Compose",
              "backup.completed — Terminó un backup de una base de datos o servidor de juegos",
              "backup.failed — Falló un backup de una base de datos o servidor de juegos",
              "task.failed — Una tarea programada o comando puntual terminó con código distinto de cero o superó el tiempo límite",
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
            La lista de eventos también muestra{" "}
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
            y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              alert.fired
            </code>
            , pero por ahora nada los emite hacia los canales. Las alertas de
            métricas se entregan a través del destino configurado en cada regla
            de alerta; consulta Monitoring.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Payload del webhook
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Los canales de tipo Webhook reciben un{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              POST
            </code>{" "}
            JSON. Cuando hay un secreto configurado, el cuerpo sin procesar se
            firma con HMAC-SHA256 en la cabecera{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              X-DeployKit-Signature
            </code>
            :
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
            Los campos dentro de{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              data
            </code>{" "}
            además de title, message y projectId dependen del evento.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Canales de proyecto y de toda la instancia
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Un canal pertenece a un proyecto y solo recibe los eventos de ese
            proyecto, de modo que producción y staging pueden avisar a lugares
            distintos. Un canal creado mediante la API sin proyecto es de toda
            la instancia y recibe eventos de todos los proyectos. Gestionar
            canales de proyecto requiere el rol global Operator o Admin más el
            rol Operator o Admin en el proyecto; los canales de toda la
            instancia requieren el rol global Operator o Admin. La
            configuración de un canal puede contener tokens y API keys, por lo
            que los Viewers no pueden leerla.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Nota:</span> Una
            notificación que falla al enviarse se registra y se omite: nunca
            hace fallar el despliegue, backup o tarea que la originó. Si un
            canal deja de recibir mensajes, compruébalo con Send Test.
          </p>
        </div>
      </div>
    ),
  },
  "users-rbac": {
    title: "Usuarios y RBAC",
    description:
      "Dos capas de roles: un rol global para la instancia y un rol por proyecto.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Cómo funciona el acceso
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Cada usuario tiene un <strong>rol global</strong> (Admin, Operator
            o Viewer) y, por separado, un <strong>rol de proyecto</strong> en
            cada proyecto del que es miembro. El rol global gobierna las
            acciones de toda la instancia; el rol de proyecto gobierna todo lo
            que ocurre dentro de un proyecto. La pertenencia al proyecto es
            obligatoria: un Operator o Viewer global que no es miembro de un
            proyecto no puede verlo en absoluto, y el proyecto no aparece en su
            lista.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Roles globales
          </h3>
          <div className="space-y-3">
            {[
              {
                role: "Admin",
                desc: "Superusuario. Es Admin en todos los proyectos automáticamente (esto no se puede reducir por proyecto). Es el único rol que puede gestionar usuarios, servidores y claves SSH, eliminar proyectos, leer el registro de auditoría, registrar la GitHub App, exportar o importar toda la instancia y cambiar los ajustes de la instancia.",
              },
              {
                role: "Operator",
                desc: "Puede crear proyectos (y pasa a ser Admin de los proyectos que crea) y crear o editar reglas de alerta (eliminarlas es exclusivo de Admin). Es necesario, junto con un rol de proyecto Operator o Admin, para editar los ajustes del proyecto y la página de estado, abrir un terminal web, definir o ejecutar tareas programadas, gestionar canales de notificación y usar las consolas, archivos y mods de los servidores de juegos.",
              },
              {
                role: "Viewer",
                desc: "El rol por defecto de los usuarios nuevos. Sin permisos a nivel de instancia. Lo que pueden hacer dentro de un proyecto depende por completo de su rol de proyecto, pero las acciones que además requieren el rol global Operator (ajustes del proyecto, terminal, tareas, notificaciones, consola y archivos de servidores de juegos) siguen vetadas aunque sean Operators del proyecto.",
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
            Roles de proyecto
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Cada nivel incluye todo lo del nivel anterior de esta tabla:
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Rol</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Qué puede hacer en el proyecto
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  [
                    "Viewer",
                    "Ver el proyecto, sus aplicaciones, stacks, bases de datos y servidores de juegos, con sus despliegues, logs, métricas, listas de backups y ejecuciones de tareas. Los valores de las variables de entorno, las cadenas de conexión, la salida de las tareas y los archivos de los servidores de juegos permanecen ocultos.",
                  ],
                  [
                    "Operator",
                    "Crear, configurar, desplegar, hacer rollback, iniciar y detener aplicaciones, stacks, bases de datos y servidores de juegos; editar variables de entorno y dominios; gestionar backups (incluida la restauración); activar el modo de mantenimiento; leer secretos y la salida de tareas, y exportar la configuración del proyecto.",
                  ],
                  [
                    "Admin",
                    "Eliminar aplicaciones, stacks, bases de datos y servidores de juegos, y añadir, cambiar o quitar miembros del proyecto.",
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
            Cuando un usuario sin acceso a un proyecto solicita uno de sus
            recursos, la API responde &quot;not found&quot; en lugar de
            &quot;forbidden&quot;, de modo que los ids de otros proyectos no
            revelan nada.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Gestionar usuarios y miembros
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "La primera cuenta registrada en una instancia nueva pasa a ser el Admin global; a partir de ahí, el registro público se cierra",
              "Los Admins globales crean usuarios, cambian su rol global, restablecen sus contraseñas y los eliminan desde la página Users (no puedes cambiar tu propio rol ni eliminarte a ti mismo)",
              "Los Admins de proyecto añaden usuarios existentes a un proyecto con un rol, lo cambian o los quitan desde la sección Members de la página del proyecto",
              "Los Admins globales no pueden añadirse como miembros: ya son Admin en todos los proyectos",
              "Cada usuario puede cambiar su propia contraseña y su email desde la página Settings",
              "Los cambios de rol surten efecto en la siguiente petición; el rol se lee de la base de datos, nunca del token",
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
            <span className="font-semibold text-primary">Ejemplo:</span> para
            permitir que un colaborador externo despliegue una aplicación sin
            ver nada más, créalo como Viewer global y añádelo como Operator
            solo en ese proyecto. Podrá desplegar y configurar las aplicaciones de ese proyecto, pero no abrir un
            terminal ni ejecutar tareas: eso requiere además el rol global Operator.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Autenticación
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit usa autenticación JWT con tokens de acceso de corta
            duración (15 minutos) y refresh tokens (7 días). Los refresh tokens
            se almacenan en Redis y se rotan: cada uso emite uno nuevo y
            revoca el anterior. Las contraseñas se hashean con bcrypt y deben
            tener al menos 8 caracteres. El login y el registro están limitados
            a 10 intentos por minuto por IP.
          </p>
        </div>
      </div>
    ),
  },
  monitoring: {
    title: "Monitorización",
    description:
      "Métricas en vivo e históricas, logs persistentes y con búsqueda, alertas por umbral y escaneo de vulnerabilidades de imágenes.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Métricas de contenedores
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            La pestaña{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Monitoring
            </code>{" "}
            de cada aplicación, base de datos, stack de Compose y servidor de
            juegos muestra cuatro gráficas:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "CPU Usage — media con una envolvente de picos. Se mide como docker stats, así que un contenedor que use varios núcleos puede superar el 100%",
              "Memory Usage — bytes en uso frente al límite de memoria del contenedor",
              "Disk Usage — la capa escribible del contenedor más sus volúmenes (se muestrea cada 5 minutos, porque es costoso de calcular para Docker)",
              "Network — tráfico entrante y saliente como tasa (bytes/s)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Cada contenedor en ejecución se muestrea cada 30 segundos y los
            valores más recientes se envían a los dashboards abiertos por
            Socket.IO. En un stack de Compose, las gráficas muestran el total
            de todos sus contenedores en ejecución. Si el servicio tiene
            alertas abiertas, un banner sobre las gráficas las muestra.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Histórico de métricas
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Las muestras se agregan en PostgreSQL cada minuto, así que las
            gráficas conservan el histórico entre reinicios. Elige un rango
            sobre las gráficas:{" "}
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
            o{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              30d
            </code>
            . Los rangos de hasta 24 horas usan resolución de 1 minuto, y los
            rangos más largos usan resolución de 1 hora.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">
                    Resolución
                  </th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Se conserva durante
                  </th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Variable de entorno
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  ["1 minuto", "48 horas", "METRICS_RAW_RETENTION_HOURS"],
                  ["1 hora", "90 días", "METRICS_HISTORY_RETENTION_DAYS"],
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
            La pestaña{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Logs
            </code>{" "}
            tiene dos modos:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Live — muestra en tiempo real stdout y stderr del contenedor en ejecución",
              "History — busca en los logs almacenados por texto, nivel (error, warn, info, debug, fatal) y rango de tiempo, con 100 líneas por página",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Los logs se recopilan de todos los contenedores en ejecución de
            forma continua, tenga o no alguien la pestaña abierta. Se conservan
            durante 7 días. Establece{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              LOG_RETENTION_DAYS
            </code>{" "}
            para cambiarlo. Antes de almacenar una línea, DeployKit elimina
            secretos como tokens con un prefijo conocido (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ghp_
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              sk-
            </code>
            , …), cabeceras Bearer y Basic, pares{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              password=
            </code>{" "}
            y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              secret=
            </code>{" "}
            , claves de AWS y cadenas hexadecimales largas. Las líneas de más
            de 8 KB se truncan. El nivel del log es una estimación a partir del
            texto de la línea, así que no confíes en él para nada crítico.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Logs de build</h3>
          <p className="text-muted-foreground leading-relaxed">
            La salida del build y del despliegue se transmite al dashboard
            durante un despliegue y se almacena con cada registro de
            despliegue. Se aplica la misma redacción de secretos.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Alertas</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            La página{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Alerts
            </code>{" "}
            de la barra lateral muestra los eventos de alerta y las reglas que
            los generan. Haz clic en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              New rule
            </code>{" "}
            para crear una regla con estos ajustes:
          </p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Campo</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  ["Servicio", "Una aplicación o una base de datos"],
                  ["Métrica", "CPU %, Memory %, Net RX, Net TX"],
                  ["Condición", "Mayor que / Menor que"],
                  ["Umbral", "Un número entero de 0 a 100"],
                  [
                    "Canal de notificación",
                    "In-app, Slack (URL de incoming webhook) o Webhook (cualquier URL)",
                  ],
                  ["Cooldown", "1–1440 minutos, 15 por defecto"],
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
              "Cada regla se comprueba con cada muestra de 30 segundos. Cuando se supera el umbral, DeployKit registra un evento y envía una notificación. No vuelve a dispararse para esa regla hasta que pase el cooldown.",
              "Un evento se resuelve automáticamente con la primera muestra que vuelve a estar dentro del umbral. Usa \"Show resolved\" para ver eventos pasados.",
              "Cada alerta aparece como un toast en el dashboard, sea cual sea el canal que elijas. Slack y Webhook además envían la alerta a esa URL. El cuerpo del webhook tiene el evento \"alert.fired\".",
              "Ver las alertas no requiere ningún rol especial. Los Operators pueden crear, editar y desactivar reglas. Solo los admins pueden eliminarlas.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Cada regla de alerta tiene su propio canal. Las reglas de alerta no
            usan los canales de notificación del proyecto descritos en{" "}
            <span className="text-foreground">Notificaciones</span>, que
            gestionan los eventos de despliegue y backup.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Nota:</span> Las
            reglas de Net RX/TX comparan el contador total de bytes del
            contenedor desde que arrancó, no una tasa. Como los umbrales
            llegan solo hasta 100, una regla de red &quot;Mayor que&quot; se
            dispara casi de inmediato. Usa reglas de CPU y memoria para
            obtener alertas útiles.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Escaneo de vulnerabilidades
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            DeployKit puede escanear cada imagen construida en busca de CVEs
            conocidos con{" "}
            <span className="text-foreground">Trivy</span>. El escaneo se
            ejecuta tras el build y antes de desplegar el contenedor. El
            escaneo es informativo: un escaneo que encuentra problemas, falla o
            agota el tiempo nunca bloquea el despliegue.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Valor global por defecto: SCAN_ENABLED=true activa el escaneo para todas las apps. Si la variable no está definida, el escaneo está desactivado. El .env.example de ejemplo la establece en true.",
              "Por app: pestaña General → Security Scanning → \"Use server default\", \"Always scan\" o \"Never scan\".",
              "Resultados: una insignia de severidad en cada despliegue de la pestaña Deployments, y un informe completo en la pestaña Security. El informe muestra los recuentos de Critical, High, Medium, Low y Unknown, además de cada CVE con su paquete, versión instalada y versión corregida. Puedes filtrar por severidad y buscar por CVE, paquete o título.",
              "Trivy se ejecuta como un contenedor temporal aquasec/trivy. Su base de datos de vulnerabilidades se cachea en el volumen deploykit-trivy-cache, así que solo el primer escaneo la descarga.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Sobrescrituras opcionales:{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              TRIVY_IMAGE
            </code>{" "}
            (por defecto{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              aquasec/trivy:latest
            </code>
            ),{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              TRIVY_CACHE_VOLUME
            </code>{" "}
            (por defecto{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit-trivy-cache
            </code>
            ) y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              TRIVY_TIMEOUT_SECONDS
            </code>{" "}
            (por defecto{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              300
            </code>
            ).
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Solo servidor local:</span>{" "}
            las métricas, alertas, logs persistentes y escaneos de
            vulnerabilidades funcionan actualmente solo para servicios que se
            ejecutan en el propio daemon de Docker del host de DeployKit. En
            los despliegues a un servidor remoto, el escaneo se marca como{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              skipped
            </code>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Terminal interactivo
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            La pestaña{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Terminal
            </code>{" "}
            abre un shell interactivo en tu contenedor en ejecución desde el
            navegador. Usa xterm.js sobre Socket.IO, así que puedes depurar y
            resolver problemas sin SSH.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Estado del contenedor
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Cada aplicación muestra su estado actual:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { status: "Running", desc: "El contenedor está en marcha" },
              { status: "Building", desc: "Despliegue en curso" },
              { status: "Idle", desc: "Nunca desplegada" },
              { status: "Stopped", desc: "El contenedor fue detenido" },
              { status: "Error", desc: "Falló el último build o despliegue" },
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
    title: "Páginas de estado",
    description:
      "Publica una página pública, sin inicio de sesión, con el estado en vivo y el uptime de las aplicaciones de un proyecto.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Visión general</h3>
          <p className="text-muted-foreground leading-relaxed">
            Cada proyecto puede publicar una página de estado. Cualquiera que
            tenga el enlace puede abrirla sin iniciar sesión. Solo lista las
            aplicaciones que elijas mostrar, y únicamente su nombre, estado y
            uptime. No se publica nada por defecto.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Publicar una página de estado
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Abre el proyecto y expande la sección Status Page",
              "Marca \"Enable public status page\" e introduce un slug. El slug debe ser único en toda la instancia y solo puede usar letras minúsculas, números y guiones (hasta 80 caracteres)",
              "Opcionalmente, define un título. Si lo dejas vacío, la página usa el nombre del proyecto",
              "Haz clic en Save y, en \"Applications shown publicly\", marca cada aplicación que quieras listar",
              "Usa el enlace View para abrir la página publicada",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Tanto habilitar la página como elegir las aplicaciones requieren el
            rol Operator en el proyecto. Una aplicación aparece listada solo
            cuando la página está habilitada y la aplicación está marcada.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">URL pública</h3>
          <CodeBlock
            code={`https://<your-dashboard-domain>/status/<slug>`}
            language="text"
          />
          <p className="text-sm text-muted-foreground mt-3">
            La página se actualiza cada 30 segundos. Si la página está
            deshabilitada o el slug no existe, los visitantes ven &quot;Status
            page not found&quot;.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Qué muestra la página
          </h3>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              {
                status: "Operational",
                desc: "La aplicación está en ejecución y no tiene alertas abiertas",
              },
              {
                status: "Degraded",
                desc: "La aplicación está en ejecución pero tiene al menos una alerta abierta",
              },
              {
                status: "Down",
                desc: "La aplicación no está en estado de ejecución",
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
            Un banner en la parte superior resume la página: &quot;All systems
            operational&quot;, &quot;Some systems degraded&quot; o
            &quot;Major outage&quot; cuando alguna aplicación está caída. Cada
            aplicación muestra además su uptime de las últimas 24 horas, 7 días
            y 90 días.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Cómo se calcula el uptime
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit no envía sondas de salud externas. El uptime se obtiene de
            las métricas almacenadas: una hora con métricas registradas cuenta
            como una hora en la que la aplicación estuvo activa, porque un
            contenedor detenido no genera métricas. Las aplicaciones nuevas se
            miden solo desde su primera muestra registrada, así que un
            lanzamiento reciente no reduce la cifra de 90 días. Los valores se
            redondean a un decimal. Cuando todavía no hay datos, la página
            muestra{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              —
            </code>
            .
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Nota:</span> Las
            páginas de estado listan solo aplicaciones, no bases de datos ni
            stacks de Compose. Mientras una aplicación se vuelve a desplegar,
            aparece como Down. El uptime y el estado Degraded provienen de
            métricas y alertas, que solo se recopilan para los servicios del
            servidor local. Para una aplicación en un servidor remoto, el uptime
            muestra{" "}
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
    title: "Servidores de juegos",
    description:
      "Ejecuta servidores de juegos dedicados — Minecraft, Valheim, Counter-Strike 2, Terraria — con consola, gestor de archivos, backups del mundo y mods con un clic.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            ¿Qué es un servidor de juegos?
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Introducido en la v0.6.0, un servidor de juegos es un tercer tipo de
            servicio dentro de un proyecto, junto a las aplicaciones y los
            stacks de compose. No tiene build ni dominios: DeployKit ejecuta una
            imagen de contenedor ya preparada, descrita por una{" "}
            <strong>definición de juego</strong>, publica sus puertos
            directamente en el host, guarda el mundo en volúmenes de Docker y te
            ofrece una consola en vivo, un gestor de archivos, backups
            programados del mundo y (en los juegos compatibles) mods y modpacks.
            Cada servidor también dispone de las pestañas habituales de Logs y
            Monitoring.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Definiciones de juego
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Los juegos no vienen incluidos con DeployKit. Se obtienen en tiempo
            de ejecución del catálogo público de plantillas (el mismo registro
            que las plantillas, definido por{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              TEMPLATES_REGISTRY_URL
            </code>
            ) y se guardan en caché, por lo que la instancia necesita acceso de
            salida a él. Cada definición declara la imagen, los puertos, el
            formulario de ajustes, los volúmenes, el tipo de consola, el
            comportamiento de parada, el alcance del backup y la memoria mínima.
            Al crear un servidor, su definición se copia en él: los cambios
            posteriores en el catálogo solo afectan a los servidores nuevos.
            Actualmente el catálogo ofrece:
          </p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Juego</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Puertos por defecto
                  </th>
                  <th className="px-4 py-2 font-medium text-bright">Consola</th>
                  <th className="px-4 py-2 font-medium text-bright">Notas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  [
                    "Minecraft: Java Edition",
                    "25565/tcp",
                    "RCON",
                    "Vanilla, Paper, Fabric o Forge; Java 8–25; mods, plugins y modpacks. Mín. 1,5 GB de RAM",
                  ],
                  [
                    "Valheim",
                    "2456–2457/udp",
                    "Ninguna",
                    "Descarga ~1 GB desde Steam en el primer arranque. Mín. 2 GB de RAM",
                  ],
                  [
                    "Counter-Strike 2",
                    "27015 udp + tcp",
                    "RCON",
                    "Descarga ~60 GB en el primer arranque; para jugar por internet se necesita un Steam Game Server Login Token. Mín. 2 GB de RAM",
                  ],
                  [
                    "Terraria",
                    "7777/tcp",
                    "stdin",
                    "Servidor dedicado vanilla; el mundo se genera en el primer arranque. Mín. 1 GB de RAM",
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
            Cada juego también muestra sus propias notas en la pestaña General
            del servidor — léelas, recogen peculiaridades específicas del juego,
            como qué ajustes se reescriben en cada arranque.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Crear un servidor de juegos
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Desde la página de tu proyecto haz clic en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              New game server
            </code>
            , elige un juego del catálogo y rellena el formulario:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Server name — letras minúsculas, dígitos y guiones, hasta 41 caracteres, único en toda la instancia. Da nombre al contenedor (dk-gs-<name>) y a sus volúmenes",
              "Start from — para juegos con modpacks, el juego base o un modpack (consulta Mods y modpacks)",
              "Settings — el formulario propio del juego (p. ej. EULA, tipo de servidor, versión, MOTD, contraseñas). Campos como la semilla o el nombre del mundo quedan fijos tras la creación",
              "Ports — puertos del host para cada puerto del juego (ver más abajo)",
              "Memory — un límite estricto entre 256 MB y 64 GB; la API rechaza valores inferiores al mínimo del juego. En Minecraft el heap de la JVM se fija al 75 % de ese valor",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Los campos secretos que dejes en blanco (como la contraseña de RCON)
            se generan por ti y se muestran <strong>una sola vez</strong> tras
            la creación — cópialos en ese momento. Después se almacenan cifrados
            y solo son visibles para los miembros del proyecto que pueden ver
            secretos. A continuación el servidor se aprovisiona en segundo
            plano; su estado pasa de{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              provisioning
            </code>{" "}
            a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              running
            </code>
            . Si Docker falla, el servidor muestra{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              error
            </code>{" "}
            con el motivo, y Start lo reintenta. El primer arranque de la
            mayoría de los juegos descarga archivos del servidor y puede tardar
            varios minutos.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Crear un servidor de juegos requiere acceso Operator en el proyecto
            (iniciar desde un modpack se rechaza para los usuarios cuyo rol
            global es Viewer).
            Cambiar los ajustes en la pestaña Settings recrea el contenedor, así
            que un servidor en ejecución se reinicia y desconecta a sus
            jugadores. Eliminar un servidor de juegos requiere Admin del
            proyecto; por defecto sus volúmenes del mundo y sus backups se
            conservan en el host, salvo que marques{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Also delete world data and backups
            </code>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Puertos</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Los jugadores se conectan directamente a un puerto del host — a
            menudo UDP — no a través de Traefik. El formulario rellena cada
            puerto con el puerto de host por defecto del juego, y puedes
            cambiarlo al crear el servidor o más tarde en Settings.
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            {[
              "Si un puerto del host ya está ocupado (por otro servidor de juegos, cualquier puerto de contenedor publicado, o un puerto que usa el propio DeployKit como 22, 80, 443, 5432 o 6379), la API lo rechaza y sugiere un puerto libre",
              "Las sugerencias salen de GAME_PORT_RANGE (por defecto 20000-40000); define esta variable en la API para usar otro rango",
              "El mismo número puede usarse una vez para TCP y otra para UDP",
              "Algunos juegos de Steam (Valheim, CS2) escuchan en el mismo número de puerto dentro del contenedor que en el host, y el puerto de consulta de Valheim es siempre el puerto del juego + 1",
              "La pestaña General muestra la dirección a la que se conectan los jugadores. Define PUBLIC_IP en el servidor de DeployKit para que pueda mostrar la dirección completa, no solo el puerto",
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
                Abre los puertos en el firewall de tu proveedor:
              </span>{" "}
              Docker se salta{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                ufw
              </code>
              , por lo que un puerto de juego es accesible desde internet
              aunque ufw indique que está bloqueado — y una regla allow de ufw
              no es lo que hace que funcione. Abre (o restringe) cada puerto en
              el firewall de tu proveedor cloud con el protocolo correcto, TCP o
              UDP. El proxy de Cloudflare tampoco transporta tráfico de juegos,
              así que estos puertos quedan expuestos directamente.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Consola</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            La pestaña Console muestra la salida del servidor en vivo y, mientras
            el servidor está en ejecución, te permite escribir comandos (con
            historial con ↑/↓). La salida de tus comandos se muestra a todos los
            que estén viendo la consola. Cómo llega el comando al juego depende
            de su definición:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "RCON (Minecraft, CS2) — se envía por la red interna de juegos; el puerto RCON nunca se publica en el host y su contraseña se genera por servidor",
              "stdin (Terraria) — se escribe en la entrada estándar del proceso del servidor",
              "exec — se ejecuta mediante un inyector dentro del contenedor, nunca a través de una shell",
              "None (Valheim) — el juego no tiene consola remota, por lo que la pestaña Console se oculta",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Los comandos son una sola línea de hasta 1000 caracteres, con un
            límite de 20 comandos cada 10 segundos por usuario y servidor, y
            cada comando queda registrado en el log de auditoría. Enviar
            comandos requiere el rol global Operator <strong>y</strong> acceso
            Operator en el proyecto — un comando de consola puede cargar un
            plugin, que es código. Al detener un servidor se envía primero el
            comando de parada propio del juego (p. ej.{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              stop
            </code>{" "}
            o{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              exit
            </code>
            ) para que el mundo se guarde, y solo recurre a una señal si no
            termina a tiempo.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Archivos</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            La pestaña Files explora los volúmenes del servidor, tanto si está
            en ejecución como detenido. Puedes abrir y editar archivos de texto
            (hasta 1 MB; los archivos más grandes o binarios se descargan en su
            lugar), crear carpetas, renombrar, eliminar, subir y descargar
            archivos o carpetas completas. Los archivos de configuración
            habituales (como{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              server.properties
            </code>
            ) tienen accesos directos en la parte superior.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Las subidas están limitadas por GAME_UPLOAD_MAX_BYTES (256 MB por defecto)",
              "Leer y descargar archivos requiere permiso para ver secretos (Operator o Admin en el proyecto), porque los archivos de configuración contienen contraseñas",
              "Escribir, subir, renombrar y eliminar requiere el rol global Operator y acceso Operator en el proyecto — un .jar subido es código",
              "Las rutas están confinadas al volumen; DeployKit trabaja sobre los archivos mediante un contenedor auxiliar de corta duración, nunca directamente en el host",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mt-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Consejo:</span> Si el
              panel está detrás de Cloudflare, su plan gratuito limita las
              peticiones a 100 MB, así que las subidas más grandes fallan
              independientemente de{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                GAME_UPLOAD_MAX_BYTES
              </code>
              .
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Backups del mundo
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            La pestaña Backups crea instantáneas comprimidas del mundo (las
            rutas que la definición del juego marca para backup — p. ej. solo{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              worlds_local/
            </code>{" "}
            en Valheim, solo la carpeta cfg en CS2). Los backups pueden lanzarse
            manualmente o programarse con un preset de cron o una expresión cron
            personalizada.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "La retención es un número de backups (1–100, por defecto 7), no días — los mundos son grandes",
              "Si el juego tiene consola, el guardado se pausa y se vuelca durante el backup (p. ej. save-off / save-all flush / save-on en Minecraft) para que la instantánea sea consistente",
              "Restore detiene el servidor, reemplaza las rutas respaldadas y lo vuelve a iniciar si estaba en ejecución. Por defecto, antes hace un backup de seguridad del mundo actual",
              "Los backups pueden descargarse desde la lista; los backups completados y fallidos activan las notificaciones de backup habituales",
              "Los backups y las restauraciones se ejecutan de uno en uno por instancia, así que un backup en cola puede esperar a que termine otro",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mt-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Advertencia:</span>{" "}
              Los archivos se almacenan en el mismo disco que el servidor, en{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
                /var/backups/deploykit/@games/
              </code>
              . Si ese disco falla, los backups se pierden con él — cópialos
              fuera de la máquina.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Mods y modpacks
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Los juegos cuya definición admite mods tienen una pestaña Mods —
            hoy es el caso de Minecraft: Java Edition, con mods (Fabric, Forge)
            y plugins (Paper) de Modrinth y CurseForge. DeployKit mantiene la
            lista con cada versión fijada; la imagen del juego descarga los
            archivos cuando se reconstruye el contenedor.
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            {[
              "Añade mods buscando en un catálogo (los resultados se filtran por el loader y la versión de juego de tu servidor) o pegando un enlace o id",
              "Los cambios quedan pendientes hasta que hagas clic en Apply & restart, que hace un backup y recrea el contenedor. Eliminar o deshabilitar un mod, o cambiar el modpack, fuerza siempre ese backup — y si el backup falla, no se aplica nada",
              "Inicia un servidor nuevo desde un modpack de Modrinth o CurseForge, o define uno más tarde; el modpack decide el tipo de servidor y la versión del juego",
              "Check for updates compara tus versiones fijadas con los catálogos",
              "Los jars subidos a mano a mods/ o plugins/ desde la pestaña Files siguen funcionando y aparecen listados en On disk",
              "Añadir, actualizar o eliminar mods y aplicar cambios requiere el rol global Operator y acceso Operator en el proyecto",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Modrinth funciona sin configuración. La búsqueda e instalación en
            CurseForge necesitan una clave de API, y la búsqueda en Steam
            Workshop necesita una clave de Steam Web API: un Admin las añade en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Settings → Game mods
            </code>
            . Las claves se validan contra el proveedor antes de guardarse, se
            almacenan cifradas y solo se muestran sus últimos 4 caracteres.
          </p>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Trampas habituales:</span> Un
              modpack fija la versión de Minecraft pero no la de Java —
              elige tú mismo la etiqueta de Java correspondiente (las versiones
              actuales necesitan Java 25). Si el servidor sigue la última
              versión de Minecraft mientras sus mods están fijados, la próxima
              versión del juego los romperá; la pestaña Mods te avisa para que
              fijes una versión concreta. Los proyectos de Modrinth solo de
              cliente aparecen listados pero no se pueden instalar.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Aislamiento y refuerzo de seguridad
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Los mods y plugins son código de terceros que se ejecuta dentro del
            contenedor, por lo que los servidores de juegos están más
            restringidos que las aplicaciones:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Se ejecutan solo en su propia red de Docker, deploykit-games — no pueden alcanzar la red interna de DeployKit (Postgres, Redis, tus aplicaciones), y tus aplicaciones no pueden alcanzar sus puertos RCON. La API se une a esta red al arrancar para llegar a RCON",
              "no-new-privileges está activado, las capabilities NET_RAW, MKNOD, AUDIT_WRITE, SYS_CHROOT, SETFCAP y SETPCAP se eliminan, y cada contenedor está limitado a 2048 procesos",
              "La memoria es un límite estricto del contenedor",
              "Los servidores de juegos de la misma instancia pueden verse entre sí en deploykit-games; su RCON está protegido por una contraseña por servidor",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            La v0.6.0 también reforzó el resto del stack: Traefik ahora lee
            Docker a través de un proxy de socket de solo lectura, cada servicio
            se ejecuta con no-new-privileges y Redis requiere contraseña — las
            instalaciones de producción deben definir{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              REDIS_PASSWORD
            </code>{" "}
            en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            o el stack no arrancará.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Limitaciones
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Los servidores de juegos se ejecutan solo en el servidor local; los servidores remotos se rechazan",
              "El catálogo se obtiene del registro de plantillas; si no es accesible y no hay nada en caché, no se puede crear ningún juego",
              "Los nombres de servidor comparten el prefijo dk-gs- con otros servicios: una aplicación o base de datos llamada gs-<x> ocupa el nombre de contenedor dk-gs-<x>. DeployKit se niega a tocar un contenedor que no le pertenece y te pide renombrar el servidor de juegos",
              "Valheim no tiene consola, así que la parada y los backups dependen de una señal y del guardado propio del juego al apagarse; el crossplay no está habilitado",
              "Desde el dashboard solo se puede dimensionar la RAM; el uso de disco no está limitado, y algunos juegos descargan decenas de GB en el primer arranque",
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
    title: "Referencia de la CLI",
    description:
      "Instala, actualiza y gestiona tu instancia de DeployKit desde la línea de comandos.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Visión general</h3>
          <p className="text-muted-foreground leading-relaxed">
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              @deploykit/cli
            </code>{" "}
            es la CLI oficial de Node para instalar y operar una instancia de
            DeployKit: install, update, status, logs, restart y uninstall.
            Gestiona el propio stack de DeployKit, no tus aplicaciones — esas se
            gestionan desde el dashboard o la{" "}
            <a href="/es/docs/api" className="text-primary hover:underline">
              API
            </a>
            . Solo funciona en Linux (se niega a ejecutarse en macOS o Windows),
            así que conéctate a tu VPS por SSH y ejecútala allí.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Instalación</h3>
          <CodeBlock
            language="bash"
            code={`# Global install
npm install -g @deploykit/cli

# Or one-shot via npx
sudo npx @deploykit/cli install --domain deploy.example.com --email you@example.com`}
          />
          <p className="text-sm text-muted-foreground mt-3">
            Requisitos: VPS Linux (Ubuntu, Debian, RHEL, Alpine), Node.js
            &gt;= 20, acceso root o sudo, y puertos 80/443 accesibles desde
            internet. Todos los comandos excepto{" "}
            <code className="font-mono text-xs">status</code> y{" "}
            <code className="font-mono text-xs">logs</code> deben ejecutarse
            como root.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            deploykit install
          </h3>
          <p className="text-muted-foreground mb-4">
            Pone en marcha DeployKit en la máquina actual: instala Git, Docker y
            Docker Compose si faltan, clona la release seleccionada en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /opt/deploykit
            </code>
            , genera los secretos en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            (o conserva uno existente, actualizando solo el dominio y el
            email), construye e inicia todos los servicios y, opcionalmente,
            crea la cuenta de administrador.
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
            Si omites <code className="font-mono text-xs">--domain</code> o{" "}
            <code className="font-mono text-xs">--email</code> en una TTY, pasa
            a preguntas interactivas. Si la cuenta de administrador no puede
            crearse automáticamente, el instalador lo indica — abre el dashboard
            y regístrate; el primer usuario se convierte en admin.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Flag</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Descripción
                  </th>
                  <th className="px-4 py-2 font-medium text-bright">Por defecto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  ["--domain <domain>", "Dominio del dashboard (obligatorio)", "—"],
                  ["--email <email>", "Email de Let's Encrypt (obligatorio)", "—"],
                  ["--admin-email <email>", "Crea previamente la cuenta de administrador", "—"],
                  [
                    "--admin-password <pwd>",
                    "Contraseña del administrador, mín. 8 caracteres",
                    "—",
                  ],
                  ["--dir <path>", "Directorio de instalación", "/opt/deploykit"],
                  [
                    "--tag <tag>",
                    "Instala una release concreta, p. ej. v0.6.0 (la v es opcional)",
                    "última release",
                  ],
                  [
                    "--branch <branch>",
                    "Instala desde una rama de Git en lugar de una release",
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
            Por defecto la CLI instala el tag semver publicado más alto (las
            pre-releases se ignoran). Un{" "}
            <code className="font-mono text-xs">--tag</code> desconocido falla
            de inmediato y lista los tags que existen; si el repositorio no
            tiene ninguna release, recurre a{" "}
            <code className="font-mono text-xs">master</code>.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              REDIS_PASSWORD:
            </span>{" "}
            DeployKit v0.6.0 requiere{" "}
            <code className="font-mono text-xs">REDIS_PASSWORD</code> en{" "}
            <code className="font-mono text-xs">.env</code>, que la CLI todavía
            no genera. Si una instalación o actualización se detiene con{" "}
            <code className="font-mono text-xs">
              Set REDIS_PASSWORD in .env
            </code>
            , ejecuta{" "}
            <code className="font-mono text-xs">
              echo &quot;REDIS_PASSWORD=$(openssl rand -hex 32)&quot; | sudo
              tee -a /opt/deploykit/.env
            </code>{" "}
            y vuelve a lanzar el comando.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            deploykit update
          </h3>
          <p className="text-muted-foreground mb-4">
            Lleva la instalación a la última release, reconstruye las imágenes,
            reinicia el stack y espera a la API. Las migraciones de base de
            datos se ejecutan automáticamente al arrancar la API. Acepta los
            mismos flags{" "}
            <code className="font-mono text-xs">--tag</code> y{" "}
            <code className="font-mono text-xs">--branch</code> que{" "}
            <code className="font-mono text-xs">install</code>, así que puedes
            fijar una release o volver a una anterior (rollback).
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
            Lista los contenedores de DeployKit mediante{" "}
            <code className="font-mono text-xs">docker compose ps</code>.
          </p>
          <CodeBlock language="bash" code="deploykit status" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            deploykit logs
          </h3>
          <p className="text-muted-foreground mb-4">
            Sigue en vivo los logs de todos los servicios de DeployKit (
            <code className="font-mono text-xs">docker compose logs -f</code>).
            Útil al depurar un despliegue fallido o un worker que se comporta
            mal.
          </p>
          <CodeBlock language="bash" code="deploykit logs" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            deploykit restart
          </h3>
          <p className="text-muted-foreground mb-4">
            Reinicia todos los servicios de DeployKit en el sitio (
            <code className="font-mono text-xs">docker compose restart</code>).
            Un reinicio no recoge los cambios en{" "}
            <code className="font-mono text-xs">.env</code> — para aplicarlos,
            recrea los contenedores con{" "}
            <code className="font-mono text-xs">
              docker compose -f docker-compose.prod.yml up -d --build
            </code>{" "}
            desde <code className="font-mono text-xs">/opt/deploykit</code>{" "}
            (consulta{" "}
            <a href="/es/docs/config" className="text-primary hover:underline">
              Configuración
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
            Detiene el stack con{" "}
            <code className="font-mono text-xs">docker compose down -v</code>,
            elimina las imágenes de DeployKit y borra el directorio de
            instalación. Sin <code className="font-mono text-xs">--yes</code> te
            pide que escribas <code className="font-mono text-xs">yes</code>, y
            se niega a ejecutarse de forma no interactiva.{" "}
            <code className="font-mono text-xs">--delete-data</code> también
            borra los backups de{" "}
            <code className="font-mono text-xs">/var/backups/deploykit</code>.
            Docker, los contenedores desplegados por usuarios y{" "}
            <code className="font-mono text-xs">deploykit-network</code> nunca
            se tocan.
          </p>
          <CodeBlock
            language="bash"
            code={`sudo deploykit uninstall --yes
sudo deploykit uninstall --yes --delete-data`}
          />
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mt-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Advertencia:</span>{" "}
              <code className="font-mono text-xs">down -v</code> elimina los
              volúmenes con nombre del stack — incluidos la base de datos
              PostgreSQL y los datos de Redis — incluso sin{" "}
              <code className="font-mono text-xs">--delete-data</code>. Exporta
              tu configuración (Settings → Configuration export and import) y
              copia tus backups fuera del servidor antes de desinstalar.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Flags globales
          </h3>
          <p className="text-muted-foreground mb-4">
            Todos los subcomandos aceptan{" "}
            <code className="font-mono text-xs">--dir &lt;path&gt;</code> para
            apuntar a una ubicación de instalación distinta de la por defecto, y{" "}
            <code className="font-mono text-xs">--help</code> para mostrar el
            uso:
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
    title: "Referencia de la API",
    description:
      "La API tRPC que impulsa el dashboard, además de los endpoints REST y Socket.IO que la rodean.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Arquitectura tRPC
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            La API de DeployKit está construida con tRPC 11 sobre Fastify 5. El
            dashboard usa exactamente los mismos procedimientos que tú puedes
            llamar, con la entrada validada por esquemas Zod compartidos entre
            cliente y servidor. Todo se sirve en el dominio de tu panel:
          </p>
          <ul className="space-y-2 text-muted-foreground mt-3">
            {[
              "Los procedimientos viven bajo /trpc/<router>.<procedure>, p. ej. /trpc/application.deploy",
              "Las queries son peticiones GET con la entrada como JSON codificado en URL en ?input=",
              "Las mutations son peticiones POST con un cuerpo JSON; Content-Type: application/json es obligatorio (otros tipos reciben 415)",
              "No se usa ningún transformer de datos: las entradas y salidas son JSON plano, y las respuestas correctas se envuelven como {\"result\":{\"data\":...}}",
              "Los cuerpos de las peticiones están limitados a 1 MiB (4 MiB para config.import)",
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
            Autenticación
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Las peticiones se autentican con un token de acceso JWT en la
            cabecera{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Authorization
            </code>{" "}
            . No hay API keys separadas: los scripts inician sesión como un
            usuario y actúan con el rol de ese usuario. Los tokens de acceso
            duran 15 minutos y los de refresco 7 días; cada refresco devuelve un
            nuevo par e invalida el token de refresco anterior.
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
            y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              auth.register
            </code>{" "}
            están limitados a 10 peticiones por minuto por IP, y todas las
            rutas de la API a 200 por minuto.{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              auth.register
            </code>{" "}
            solo funciona mientras la instancia no tiene usuarios.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Niveles de acceso
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Cada procedimiento es público, autenticado, solo para operadores o
            solo para administradores según el rol global. La mayoría de los
            recursos de proyecto (aplicaciones, bases de datos, stacks,
            servidores de juegos) están abiertos a cualquier usuario autenticado
            a nivel de procedimiento y después se comprueban contra el rol del
            llamante en el proyecto propietario: los no miembros reciben{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              NOT_FOUND
            </code>
            , los miembros sin permisos suficientes reciben{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              FORBIDDEN
            </code>
            . Ejecutar código (tareas, consola de juegos, escritura de archivos,
            mods) requiere tanto un rol global de operador como permisos de
            operador en el proyecto. Consulta{" "}
            <a href="/es/docs/users-rbac" className="text-primary hover:underline">
              Usuarios y RBAC
            </a>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Routers disponibles
          </h3>
          <div className="space-y-3">
            {[
              {
                router: "auth",
                desc: "Registro, inicio de sesión, cierre de sesión, refresco de tokens, perfil",
                procedures:
                  "hasUsers, register, login, refresh (public) · me, logout, changePassword, updateProfile",
              },
              {
                router: "project",
                desc: "Proyectos que agrupan aplicaciones, bases de datos, stacks y servidores de juegos",
                procedures:
                  "list, byId · create, update, updateStatusPage (operator) · delete (admin)",
              },
              {
                router: "projectMember",
                desc: "Gestión de roles por proyecto",
                procedures:
                  "list, add, updateRole, remove, myRole, availableUsers",
              },
              {
                router: "application",
                desc: "Ciclo de vida de la aplicación: configuración, variables de entorno, dominios, despliegues, rollback, previews, mantenimiento",
                procedures:
                  "byId, create, update, delete, updateEnvVars, addDomain, removeDomain, deploy, deployBranch, rollback, start, stop, setMaintenance, logs, stats, instances, deployments, listPreviews, deletePreview",
              },
              {
                router: "database",
                desc: "Aprovisionamiento de bases de datos, backups y restauración",
                procedures:
                  "byId, create, delete, start, stop, stats, updateBackupConfig, triggerBackup, listBackups, deleteBackup, restoreBackup",
              },
              {
                router: "compose",
                desc: "Stacks de Docker Compose",
                procedures:
                  "list, byId, containers, containerLogs, deployments, create, deployFromTemplate, updateComposeFile, updateEnvVars, addDomain, removeDomain, deploy, stop, start, restart, delete",
              },
              {
                router: "template",
                desc: "Catálogo de plantillas de un clic",
                procedures:
                  "list, byId · import (operator) · registry, refreshCatalog (admin)",
              },
              {
                router: "gameServer",
                desc: "Servidores de juegos, con routers anidados de catálogo, archivos, backups y mods",
                procedures:
                  "listByProject, byId, stats, create, update, start, stop, restart, delete, consoleSend · catalog.{list, byId, refresh} · files.{list, read, write, mkdir, delete, rename} · backups.{list, create, restore, delete, updateConfig} · mods.{sources, sourcesForGame, search, searchModpacks, versions, list, checkUpdates, add, update, remove, setModpack, applyChanges}",
              },
              {
                router: "task",
                desc: "Tareas programadas y comandos puntuales",
                procedures:
                  "list, previewCron, runs, runOutput · create, update, delete, runNow, runAdHoc (operator)",
              },
              {
                router: "server",
                desc: "Servidores: conexiones SSH, instalación de Docker, limpieza de imágenes",
                procedures:
                  "list, byId · testConnection, healthCheck (operator) · create, createLocal, update, delete, installDocker, pruneImages, pruneImagesAll (admin)",
              },
              {
                router: "sshKey",
                desc: "Catálogo de claves SSH (solo administradores)",
                procedures: "list, byId, generate, create, update, delete",
              },
              {
                router: "github",
                desc: "Registro de la GitHub App, instalaciones y repositorios",
                procedures:
                  "status, listInstallations, listRepositories, listBranches · startManifest, completeManifest, connectExisting, test, syncInstallation, syncInstallations, disconnect (admin)",
              },
              {
                router: "config",
                desc: "Exportación e importación de la configuración como YAML (todas son mutations)",
                procedures:
                  "exportInstance, import (admin) · exportProject (project operator)",
              },
              {
                router: "metrics",
                desc: "Historial de métricas y reglas de alerta",
                procedures:
                  "history, timeseries, listRules, recentEvents, alertStats · createRule, updateRule (operator) · deleteRule (admin)",
              },
              {
                router: "logs",
                desc: "Búsqueda de logs persistentes",
                procedures: "search",
              },
              {
                router: "notification",
                desc: "Canales de notificación",
                procedures:
                  "list, byId, availableEvents · create, update, delete, toggle, test (operator)",
              },
              {
                router: "user",
                desc: "Gestión de usuarios y asignación de roles (solo administradores)",
                procedures: "list, create, updateRole, resetPassword, delete",
              },
              {
                router: "audit",
                desc: "Consulta del registro de auditoría (solo administradores)",
                procedures: "list, stats",
              },
              {
                router: "settings",
                desc: "Ajustes de la instancia: API keys de CurseForge / Steam (solo administradores)",
                procedures: "modKeys.status, modKeys.set",
              },
              {
                router: "dashboard",
                desc: "Estadísticas generales",
                procedures: "summary",
              },
              {
                router: "status",
                desc: "Datos de la página de estado pública (sin iniciar sesión)",
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
                  Procedimientos: {item.procedures}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Endpoints REST
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Unos pocos endpoints quedan fuera de tRPC: los webhooks de los
            proveedores Git (verificados por firma o token, consulta{" "}
            <a href="/es/docs/webhooks" className="text-primary hover:underline">
              Webhooks
            </a>
            ; limitados a 120 peticiones por minuto por IP) y las
            transferencias de archivos de servidores de juegos en streaming
            (token Bearer, con acceso al proyecto comprobado).
          </p>
          <div className="space-y-2 mt-3">
            {[
              {
                method: "POST",
                path: "/api/webhooks/github",
                desc: "Eventos push/PR de GitHub (X-Hub-Signature-256)",
              },
              {
                method: "POST",
                path: "/api/webhooks/gitlab",
                desc: "Eventos push/MR de GitLab (X-Gitlab-Token)",
              },
              {
                method: "POST",
                path: "/api/webhooks/generic",
                desc: "Cualquier CI (X-Webhook-Token)",
              },
              {
                method: "POST",
                path: "/api/game-servers/:id/files/upload",
                desc: "Subir un archivo (operator)",
              },
              {
                method: "GET",
                path: "/api/game-servers/:id/files/download",
                desc: "Descargar un archivo o carpeta",
              },
              {
                method: "GET",
                path: "/api/game-servers/:id/backups/:backupId/download",
                desc: "Descargar un backup del mundo",
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
            Eventos en tiempo real (Socket.IO)
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Socket.IO se sirve en la ruta{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /ws
            </code>{" "}
            y se autentica con el token de acceso pasado como{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              auth.token
            </code>{" "}
            en el handshake. Los clientes se unen a salas con{" "}
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
            y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              subscribe:task-run
            </code>{" "}
            (cada una comprobada contra el acceso al proyecto) y reciben eventos
            como{" "}
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
            y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              alert:fired
            </code>
            . El terminal web también funciona sobre esta conexión. Solo se
            acepta{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEB_URL
            </code>{" "}
            como origen.
          </p>
        </div>
      </div>
    ),
  },
  config: {
    title: "Configuración",
    description:
      "La configuración a nivel de instancia se hace mediante variables de entorno en .env.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Dónde vive la configuración
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Una instalación de producción lee{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /opt/deploykit/.env
            </code>
            . El instalador lo genera por ti; en una instalación manual, parte
            de{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env.production
            </code>
            .{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker-compose.prod.yml
            </code>{" "}
            construye algunas variables por sí mismo —{" "}
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
            y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              COMPOSE_ROOT
            </code>{" "}
            — y esos valores prevalecen sobre cualquier cosa que pongas en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>
            . El resto de variables se leen del archivo{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            que se copia en la imagen de la API cuando se construye.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              Aplicar los cambios:
            </span>{" "}
            tras editar{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>
            , reconstruye y recrea los contenedores —{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              cd /opt/deploykit &amp;&amp; docker compose -f
              docker-compose.prod.yml up -d --build
            </code>
            . Un simple{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              deploykit restart
            </code>{" "}
            no recoge los nuevos valores.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Variables de entorno obligatorias
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
            Con{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              NODE_ENV=production
            </code>{" "}
            la API se niega a arrancar si{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              JWT_SECRET
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              JWT_REFRESH_SECRET
            </code>{" "}
            o{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ENCRYPTION_KEY
            </code>{" "}
            falta, tiene menos de 32 caracteres o todavía contiene un
            marcador{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              CHANGE_ME
            </code>
            ; en desarrollo solo muestra un aviso.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Advertencia:</span> no
            cambies nunca{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ENCRYPTION_KEY
            </code>{" "}
            una vez que existan datos. Las variables de entorno, los tokens de
            origen, las claves SSH y otros secretos almacenados se cifran con
            ella y se vuelven ilegibles con una clave nueva. Guarda una copia de
            tu{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            en un lugar seguro.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            URL pública (WEB_URL)
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEB_URL
            </code>{" "}
            es la URL pública de tu instancia. Los orígenes de CORS y Socket.IO,
            los enlaces que DeployKit pone en los estados de commit de GitHub, y
            las URLs de webhook y de redirección registradas en una GitHub App
            se construyen a partir de ella. DeployKit nunca la deriva de la
            cabecera{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Host
            </code>{" "}
            de la petición, que controla el cliente.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            En producción no la defines: el archivo Compose la deriva como{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              https://$&#123;DOMAIN&#125;
            </code>
            , porque Traefik sirve el dashboard y la API en el mismo host. En
            desarrollo vale por defecto{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              http://localhost:5173
            </code>
            ; para registrar una GitHub App desde una máquina de desarrollo,
            apúntala a un túnel público (cloudflared, ngrok): la URL del webhook
            de la App debe ser accesible para GitHub.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Cambiar DOMAIN:</span>{" "}
            una GitHub App conserva la URL de webhook con la que se registró. Si
            cambias{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              DOMAIN
            </code>{" "}
            después de registrar una, desconecta y registra la App de nuevo (o
            edita sus URLs en GitHub), o los pushes dejarán de lanzar
            despliegues.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Variables de entorno opcionales
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
            Stacks de Compose y plantillas
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
            Servidores de juegos
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
            Las API keys de CurseForge y Steam no son variables de entorno: un
            administrador las define en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Settings → Game mods
            </code>
            , donde se almacenan cifradas. Del mismo modo, la GitHub App se
            registra desde{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Settings → GitHub App
            </code>{" "}
            — las antiguas variables{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              GITHUB_CLIENT_ID
            </code>{" "}
            /{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              GITHUB_CLIENT_SECRET
            </code>{" "}
            ya no se usan.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Análisis de vulnerabilidades (Trivy)
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
            Los análisis son informativos —los resultados se registran en el
            despliegue y nunca lo bloquean— y solo se ejecutan para aplicaciones
            del servidor local.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Configuración de seguridad
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            DeployKit incluye funciones de seguridad integradas que se
            configuran automáticamente:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Rate limiting — Global: 200 req/min por IP en /trpc y /api; login y registro: 10 req/min; webhooks: 120 req/min",
              "Tamaño de petición — 1 MiB por cuerpo de petición, excepto la importación de configuración (4 MiB)",
              "Cifrado — Variables de entorno, tokens, claves SSH y credenciales de integraciones cifrados con AES-256-GCM",
              "Cabeceras de seguridad — X-Content-Type-Options, X-Frame-Options, Referrer-Policy, una CSP estricta y HSTS en producción",
              "Ocultación de secretos — Los logs de build eliminan automáticamente tokens, contraseñas y claves",
              "CORS — Solo se permite WEB_URL, tanto para la API como para Socket.IO",
              "Aislamiento — Redis requiere contraseña, Traefik lee Docker a través de un proxy de solo lectura y cada contenedor de producción se ejecuta con no-new-privileges",
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
            Entorno de desarrollo
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
            No ejecutes{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              pnpm db:generate
            </code>{" "}
            ni{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              drizzle-kit push
            </code>
            : el generador compara contra una base desactualizada y produce una
            migración rota. Las nuevas migraciones se escriben a mano en SQL.
          </p>
        </div>
      </div>
    ),
  },
  "export-import": {
    title: "Exportar e importar",
    description:
      "Exporta la configuración de tu instancia como YAML para revisarla en git, clonarla en otro servidor o reconstruir tras perder un host.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Resumen</h3>
          <p className="text-muted-foreground leading-relaxed">
            DeployKit puede describir toda tu instancia —o un único proyecto—
            como un manifiesto YAML. Guárdalo en git para revisar los cambios de
            infraestructura, aplícalo en un host nuevo para clonar la
            configuración, o úsalo para restaurar tras perder un servidor. Las
            exportaciones son deterministas: las claves están ordenadas, así que
            volver a exportar una instancia sin cambios produce un archivo
            idéntico y los diffs de git muestran solo los cambios reales.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Esto es configuración, no datos. El contenido de las bases de datos,
            los volúmenes y los mundos de juegos no se incluyen: usa los{" "}
            <a href="/es/docs/databases" className="text-primary hover:underline">
              backups de bases de datos
            </a>{" "}
            para eso.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Dos archivos: configuración y secretos
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "Manifiesto de configuración",
                kind: "deploykit/instance-config",
                desc: "Proyectos, miembros (por email), aplicaciones, bases de datos, stacks de Compose con sus archivos Compose, dominios, variables de entorno, tareas programadas, programaciones de backups y ajustes de la página de estado. Las credenciales se omiten y solo se listan por nombre. Es seguro subirlo a un repositorio privado.",
              },
              {
                name: "Archivo de secretos",
                kind: "deploykit/instance-secrets",
                desc: "Los valores omitidos, en texto plano: variables de entorno y build args secretos, contraseñas de bases de datos, tokens de acceso a repositorios, secretos de webhook por aplicación y archivos de montaje sensibles de stacks. Solo se genera cuando lo pides. No lo subas nunca a un repositorio.",
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
            Qué se considera un secreto
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Las variables de entorno se omiten del archivo de configuración
            cuando se cumple alguna de estas condiciones:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "El nombre contiene PASS, PWD, SECRET, TOKEN, KEY, CRED, PRIVATE, SALT, SIGNING, CIPHER o DSN",
              "El valor parece una credencial: una URL con user:password@, una clave privada PEM, un JWT o un prefijo de token conocido (ghp_, sk_, xoxb-, AKIA…, glpat- y otros)",
              "El valor parece generado: 32+ caracteres, sin espacios y con al menos tres clases de caracteres",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Los nombres que terminan en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              _URL
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              _HOST
            </code>{" "}
            o{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              _ENDPOINT
            </code>{" "}
            permanecen en el manifiesto salvo que el propio valor contenga
            credenciales: son justo lo que quieres revisar. Las contraseñas de
            bases de datos, los tokens de repositorios, los secretos de webhook,
            los build args sensibles y el contenido de los montajes de stacks se
            omiten siempre.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Revisa antes de hacer push:</span>{" "}
            el archivo de configuración sigue conteniendo todos los archivos
            Compose y el nombre de cada variable de entorno. La detección es
            deliberadamente amplia, pero revisa el archivo antes de subirlo a un
            repositorio público.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Lo que nunca se exporta
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Servidores y claves SSH — los recursos hacen referencia a los servidores por nombre",
              "La GitHub App — sus credenciales pertenecen a la instancia y a su URL de webhook. Las aplicaciones llevan el id de su repositorio de GitHub, y la importación las vuelve a enlazar con una instalación coincidente en el destino",
              "Usuarios — los miembros se emparejan por email al importar; nunca se crean usuarios",
              "Servidores de juegos, canales de notificación y reglas de alerta",
              "Estado de ejecución: estado e ids de contenedores, historial de despliegues, modo de mantenimiento, entornos de preview y la última ejecución de cada tarea",
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
            Exportar desde el dashboard
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Toda la instancia (administradores): Settings → Configuration export and import → “Export configuration” descarga deploykit-config-<date>.yaml; “Export secrets” descarga deploykit-secrets-<date>.yaml",
              "Un proyecto (operadores del proyecto y administradores): el botón “Export” de la página del proyecto descarga la configuración de ese proyecto, sin secretos",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mt-3">
            Si un valor no se puede descifrar (por ejemplo, tras un cambio de{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ENCRYPTION_KEY
            </code>{" "}
            ), se omite y se lista en las advertencias de la exportación. Cada
            exportación queda registrada en el registro de auditoría como{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              config.export
            </code>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Importar</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Los administradores importan desde{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Settings → Configuration export and import → Import
            </code>
            :
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "“Choose manifest” y, opcionalmente, “Choose secrets file”",
              "Opcionalmente marca “Run on the local host when a server named in the file does not exist here”",
              "Haz clic en Preview para ver el plan: todavía no se escribe nada",
              "Haz clic en Import para aplicar exactamente ese plan",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            El plan lista cada elemento como{" "}
            <span className="text-bright">a crear</span>,{" "}
            <span className="text-bright">ya existente</span>,{" "}
            <span className="text-bright">omitido</span> (con un motivo, como un
            email de miembro desconocido) o{" "}
            <span className="text-bright">bloqueante</span>. Cualquier error
            bloqueante deshabilita Import: la importación se ejecuta como una
            única transacción, porque una restauración a medias es peor que
            ninguna. El plan también muestra advertencias, valores omitidos sin
            nada que restaurar y conflictos de nombres de contenedor.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Comportamiento ante conflictos
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Una importación crea lo que falta y nunca modifica lo que ya existe.
            Los recursos se emparejan por nombre (sin distinguir mayúsculas):
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Proyecto existente — se mantiene tal cual, pero se recorre igualmente su contenido: volver a aplicar un manifiesto tras añadir una aplicación crea solo esa aplicación",
              "Aplicación, base de datos o stack existente — se deja intacto, incluidos sus dominios, variables de entorno y tareas. Añadir un dominio o un cron job a algo que ya se está ejecutando es un cambio, no un recurso que falta",
              "Dominio ya enrutado en esta instancia — se omite",
              "Dos proyectos (o servidores) existentes con el mismo nombre — error bloqueante hasta que renombres uno",
              "Slug de página de estado ya en uso — el proyecto se importa con su página de estado deshabilitada",
              "El servidor indicado en el archivo no existe — error bloqueante por defecto, o el recurso se ejecuta en el host local si marcaste la opción",
              "Falta la contraseña de la base de datos — se genera una nueva (advertencia: hay que actualizar todo lo que tenga la cadena de conexión anterior)",
              "Aplicaciones enlazadas a una GitHub App — se vuelven a enlazar con la única instalación de aquí que puede ver el repositorio; si no, recurren a la URL de su repositorio con una advertencia",
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
              Conflictos de nombres de contenedor:
            </span>{" "}
            los contenedores se nombran{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              dk-&lt;name&gt;
            </code>{" "}
            según el recurso, y un despliegue reemplaza cualquier contenedor que
            ya tenga ese nombre. Si el plan informa de un conflicto, desplegar
            el recurso importado reemplazaría al existente: renombra uno de
            ellos primero.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Después de importar
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            No se despliega nada: la importación escribe configuración, no
            contenedores. Las aplicaciones y stacks importados esperan a un
            Deploy, y las bases de datos importadas a su primer Start. Las
            tareas programadas y las programaciones de backups de bases de datos
            se registran de inmediato. Cada importación aplicada queda
            registrada en el registro de auditoría como{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              config.import
            </code>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Usar la API
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            No hay ningún comando de CLI para exportar o importar; automatízalo
            mediante la{" "}
            <a href="/es/docs/api" className="text-primary hover:underline">
              API
            </a>{" "}
            en su lugar. Los tres procedimientos son mutations (POST), por lo
            que las respuestas que pueden contener secretos nunca se cachean.
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
            es{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              &quot;fail&quot;
            </code>{" "}
            (por defecto) o{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              &quot;local&quot;
            </code>
            . Límites: 2 MB para el manifiesto y 500 KB para el archivo de
            secretos.
          </p>
        </div>
      </div>
    ),
  },
  webhooks: {
    title: "Webhooks y CI/CD",
    description:
      "Despliegues automáticos lanzados por pushes de Git, pull requests y pipelines de CI.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Cómo funciona el despliegue automático
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Cuando DeployKit recibe un evento push, busca las aplicaciones cuyo
            repositorio y rama coinciden y encola un despliegue para cada una,
            exactamente igual que si hubieras pulsado Deploy. Los eventos de
            pull request / merge request crean, actualizan y limpian los{" "}
            <a
              href="/es/docs/preview-deployments"
              className="text-primary hover:underline"
            >
              despliegues de preview
            </a>
            . Las propias apps de preview nunca coinciden con los eventos push.
            Si no coincide ninguna, el endpoint responde con un mensaje
            explicativo en lugar de un error.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">Endpoints</h3>
          <div className="space-y-2">
            {[
              {
                method: "POST",
                path: "/api/webhooks/github",
                desc: "Firma HMAC en X-Hub-Signature-256",
              },
              {
                method: "POST",
                path: "/api/webhooks/gitlab",
                desc: "Token en X-Gitlab-Token",
              },
              {
                method: "POST",
                path: "/api/webhooks/generic",
                desc: "Token en X-Webhook-Token",
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
            Las peticiones que no superan la verificación reciben un{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              401
            </code>
            . Los tres endpoints comparten un límite de 120 peticiones por
            minuto por IP.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            GitHub: usa la GitHub App
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Para github.com, la configuración recomendada es la{" "}
            <a href="/es/docs/github-app" className="text-primary hover:underline">
              GitHub App
            </a>
            . Registra su propio webhook, así que las aplicaciones conectadas no
            necesitan ningún webhook por repositorio: la sección{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Webhook
            </code>{" "}
            de la aplicación simplemente indica que lo gestiona la App. Las
            entregas de la App se verifican con el secreto de webhook de la
            propia App, y además obtienes estados de commit y comentarios en las
            PR.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            GitHub: webhook de repositorio
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Sin la App, añade un webhook en tu repositorio en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Settings → Webhooks
            </code>
            . La URL también aparece en la pestaña General de la aplicación:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Payload URL: https://your-deploykit-domain/api/webhooks/github",
              "Content type: application/json",
              "Secret: el WEBHOOK_SECRET de tu archivo .env",
              "Events: 'Pushes', más 'Pull requests' para los despliegues de preview",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Las apps sin la conexión de la App se emparejan por URL del
            repositorio (se ignoran las mayúsculas, la barra final y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .git
            </code>{" "}
            ) y por rama. Un webhook de repositorio sigue funcionando después de
            registrar una GitHub App: se aceptan ambos secretos. Si más tarde
            conectas la app a través de la App, la entrega duplicada del webhook
            antiguo se ignora (las apps conectadas solo coinciden por
            instalación e id de repositorio), de modo que un push nunca despliega
            dos veces; puedes eliminarlo.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Webhooks de GitLab
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            En tu proyecto de GitLab, ve a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Settings → Webhooks
            </code>{" "}
            y añade:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "URL: https://your-deploykit-domain/api/webhooks/gitlab",
              "Secret token: el WEBHOOK_SECRET de tu archivo .env",
              "Triggers: 'Push events', más 'Merge request events' para los despliegues de preview",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Abrir, actualizar o reabrir una merge request despliega su preview;
            fusionarla o cerrarla elimina la preview.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Webhook genérico (CI, Bitbucket, Gitea, scripts)
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Cualquier sistema puede lanzar un despliegue enviando un payload JSON
            de tipo push a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              /api/webhooks/generic
            </code>{" "}
            con una cabecera{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              X-Webhook-Token
            </code>{" "}
            . La rama se obtiene de{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              ref
            </code>{" "}
            y el repositorio de{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              repository.clone_url
            </code>
            ,{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              repository.html_url
            </code>{" "}
            o{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              repository.links.html.href
            </code>{" "}
            (Bitbucket). Se despliega cada aplicación que coincida con esa URL y
            rama, incluidas las apps conectadas mediante la GitHub App.
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
            El token es el{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              WEBHOOK_SECRET
            </code>{" "}
            global o el secreto de webhook propio de una aplicación. El secreto
            por app (de 16 a 200 caracteres) se establece mediante la API con{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              application.update
            </code>{" "}
            (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              webhookSecret
            </code>
            ); una vez definido, esa app solo se despliega con su propio secreto,
            de modo que puedes dar a un pipeline de CI acceso a una sola app y
            rotarlo sin tocar el secreto global. Los campos opcionales{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              after
            </code>{" "}
            /{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              head_commit.id
            </code>{" "}
            y{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              head_commit.message
            </code>{" "}
            etiquetan el despliegue; el despliegue siempre compila el head de la
            rama.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Desplegar desde CI/CD
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            El despliegue automático en cada push suele hacer innecesaria la
            integración con CI. Para desplegar solo después de que pasen los
            tests, asegúrate de que la aplicación no reciba también eventos push
            (sin webhook de repositorio y sin estar conectada a través de la
            GitHub App: las apps conectadas se despliegan en cada push) y llama
            después al endpoint genérico como último paso de CI:
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
            También puedes llamar a la API tRPC con una sesión de usuario: inicia
            sesión con{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              auth.login
            </code>{" "}
            y llama a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              application.deploy
            </code>{" "}
            con el id de la app. El usuario necesita el rol de operador en el
            proyecto, los tokens de acceso caducan a los 15 minutos y un
            despliegue que ya esté en curso devuelve un conflicto.
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
            Seguridad de los webhooks
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "GitHub: HMAC-SHA256 de los bytes exactos de la petición, comprobado con el secreto de webhook de la GitHub App o con WEBHOOK_SECRET (se acepta cualquiera de los dos)",
              "GitLab: X-Gitlab-Token comparado con WEBHOOK_SECRET",
              "Generic: X-Webhook-Token comparado con el secreto propio de la app o con WEBHOOK_SECRET; sin un token válido, el endpoint nunca revela si un repositorio coincidió",
              "Todas las comparaciones son de tiempo constante; si no hay ningún secreto configurado, las entregas se rechazan (fail-closed)",
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
            pasa a ser opcional una vez registrada una GitHub App, pero
            conserva el valor para GitLab, el endpoint genérico y cualquier
            webhook de repositorio creado a mano.
          </p>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              ¿El push no despliega?
            </span>{" "}
            Revisa la entrega en tu proveedor de Git (GitHub: Settings →
            Webhooks → Recent Deliveries). Un{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              401
            </code>{" "}
            significa que el secreto no coincide; y como la firma de GitHub se
            calcula sobre el cuerpo sin procesar, cualquier elemento entre GitHub
            y DeployKit que reescriba el cuerpo de la petición también la
            romperá. Un{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              200
            </code>{" "}
            con &quot;No applications found&quot; significa que la URL del
            repositorio o la rama configuradas en DeployKit no coinciden con el
            push.
          </p>
        </div>
      </div>
    ),
  },
  "audit-logs": {
    title: "Registros de auditoría",
    description:
      "Un registro a nivel de instancia de quién hizo qué, conservado durante un número configurable de días.",
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Qué se registra
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Se registran las acciones que los usuarios realizan en el panel o a
            través de la API (los despliegues lanzados automáticamente por
            webhooks de Git no), agrupadas por área:
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium text-bright">Área</th>
                  <th className="px-4 py-2 font-medium text-bright">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  [
                    "Autenticación",
                    "inicio de sesión, cierre de sesión, registro, cambio de contraseña, actualización de perfil",
                  ],
                  [
                    "Proyectos y miembros",
                    "crear, actualizar, actualizar la página de estado, eliminar; añadir miembro, cambiar rol, eliminar miembro",
                  ],
                  [
                    "Aplicaciones",
                    "crear, actualizar, eliminar, desplegar (incluidos los rollbacks), iniciar, detener, cambios de variables de entorno, añadir/quitar dominio, mantenimiento activado/desactivado",
                  ],
                  [
                    "Bases de datos",
                    "crear, eliminar, iniciar, detener, backup, restauración, cambios en la configuración de backups",
                  ],
                  [
                    "Stacks de Compose",
                    "crear, actualizar, eliminar, desplegar, iniciar, detener, reiniciar, cambios de variables de entorno, añadir/quitar dominio",
                  ],
                  [
                    "Tareas programadas",
                    "crear, actualizar, eliminar, ejecutar ahora, comando puntual",
                  ],
                  [
                    "Servidores de juegos",
                    "crear, actualizar, iniciar, detener, reiniciar, eliminar, comandos de consola, escribir/subir/eliminar/renombrar archivos y crear carpetas, backups y restauraciones, cambios de mods",
                  ],
                  [
                    "Instancia",
                    "usuarios, servidores, claves SSH, canales de notificación, GitHub App (crear, eliminar, sincronizar), exportación/importación de configuración, ajustes de la instancia",
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
            Los valores secretos nunca se escriben en el registro: al cambiar un
            ajuste de la instancia se guarda el nombre de la clave, no su valor,
            y una exportación de configuración registra el alcance y si se
            incluyeron los secretos.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Detalles del registro
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Cada entrada incluye:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Usuario: el ID y el email del usuario en el momento de la acción",
              "Acción: p. ej. application.deploy o database.restore",
              "Recurso: tipo, ID y nombre de lo que se vio afectado",
              "Metadatos: contexto adicional en JSON (p. ej. el dominio añadido, el archivo de backup restaurado)",
              "Dirección IP de la petición",
              "Marca de tiempo",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Las entradas no están vinculadas a registros activos, por lo que
            sobreviven a la eliminación del usuario o del recurso al que se
            refieren: el email y el nombre del recurso almacenados siguen siendo
            legibles.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Consulta y filtrado
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            La página{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              Audit Log
            </code>{" "}
            solo está disponible para los Admins globales, ya que abarca todos
            los proyectos. Muestra el recuento de eventos de las últimas 24 horas
            y los últimos 7 días, y los despliegues de los últimos 7 días, y
            permite buscar por usuario, recurso o acción, filtrar por tipo de
            recurso y acción, y expandir una entrada para ver sus metadatos. Los
            resultados están paginados, con 50 por página.
          </p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">IPs de cliente:</span>{" "}
            la IP se obtiene de{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              X-Forwarded-For
            </code>{" "}
            solo cuando{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              TRUST_PROXY=true
            </code>
            ; en caso contrario se registra la dirección del peer directo, que
            detrás de Traefik es el propio proxy. Actívalo únicamente detrás de
            un proxy de confianza, o los clientes podrían escribir en el
            registro la IP que quisieran. El{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker-compose.prod.yml
            </code>{" "}
            por defecto no pasa esta variable al contenedor de la API: añádela al
            bloque{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              environment
            </code>{" "}
            del servicio{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              api
            </code>
            .
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bright mb-3">
            Retención y limpieza
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Una vez al día, alrededor de las 04:00 hora del servidor, se eliminan
            las entradas con más antigüedad que{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              AUDIT_RETENTION_DAYS
            </code>{" "}
            (por defecto: 90). El valor se lee al iniciar la API. Con el{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              docker-compose.prod.yml
            </code>
            {" "}por defecto, definirlo solo en{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              .env
            </code>{" "}
            no tiene efecto: añade{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              AUDIT_RETENTION_DAYS: $&#123;AUDIT_RETENTION_DAYS:-90&#125;
            </code>{" "}
            al entorno del servicio{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
              api
            </code>{" "}
            y recrea el contenedor.
          </p>
        </div>
      </div>
    ),
  },
};
