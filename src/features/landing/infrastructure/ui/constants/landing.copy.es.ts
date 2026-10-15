import type { LandingCopyI } from "@landing/infrastructure/ui/interfaces/LandingI";

export const LANDING_COPY_ES: LandingCopyI = {
  meta: {
    title: "DeployKit — Despliega tus apps en tu propio servidor",
    description:
      "Plataforma PaaS open source y autoalojada para desplegar aplicaciones, bases de datos y servicios en tu infraestructura. Sin dependencia de proveedores.",
  },
  hero: {
    tags: ["paas open source", "autoalojado", "mit"],
    titleLine1: "tu propia nube,",
    titleHighlight: "a un git push",
    titleEnd: "de distancia",
    lead:
      "DeployKit ejecuta apps, bases de datos y servicios en tus propios servidores, con builds automáticos, SSL, logs en tiempo real y backups. La alternativa abierta a Vercel y Heroku, sin ataduras con ningún proveedor.",
    readDocs: "leer la documentación →",
    star: "★ dale una estrella en github",
    pipelineLabel: "Ejemplo de sesión de despliegue",
    deploying: "↻ desplegando",
    healthy: "● saludable",
  },
  install: {
    label: "instalar",
    copy: "[ copiar ]",
    copied: "✓ copiado",
    ariaLabel: (cmd) => `Copiar comando de instalación: ${cmd}`,
  },
  tech: {
    label: "construye todo lo que nixpacks detecta",
    meta: (n) => `${n} runtimes`,
  },
  stats: {
    label: "ficha técnica",
    meta: "verificable en el repo",
    items: [
      { label: "funciones", value: "16", note: "integradas, cuatro pilares" },
      { label: "bases de datos", value: "5", note: "postgres · mysql · mongo · redis · mariadb" },
      { label: "cifrado", value: "AES-256-GCM", note: "variables de entorno cifradas en reposo" },
      { label: "licencia", value: "MIT", note: "open source, autoalojado" },
    ],
  },
  features: {
    label: "funciones",
    meta: (n) => `${n} entradas`,
    title: "Todo lo que necesita un servicio, de desplegar a gobernar",
    intro:
      "Dieciséis funciones integradas en cuatro pilares: todo el ciclo de vida de un despliegue, gestionado desde un único panel.",
    pillars: [
      {
        id: "ship",
        index: "01",
        label: "Desplegar",
        tagline: "Del git push a un contenedor en marcha, de forma automática.",
        features: [
          {
            title: "Despliegue de apps",
            description: "Despliega desde GitHub, GitLab, cualquier repo Git o una imagen de Docker.",
          },
          {
            title: "Build automático",
            description: "Detección automática con Nixpacks, Dockerfile o Cloud Native Buildpacks.",
            tag: "Nixpacks",
          },
          {
            title: "Auto-deploy",
            description: "Los webhooks de GitHub y GitLab lanzan un despliegue en cada push.",
          },
          {
            title: "Despliegues de preview",
            description: "Cada PR tiene un entorno aislado en su propio subdominio.",
          },
          { title: "Rollbacks", description: "Vuelve a cualquier despliegue anterior con un clic." },
        ],
      },
      {
        id: "data",
        index: "02",
        label: "Datos",
        tagline: "Servicios con estado, aprovisionados y protegidos.",
        features: [
          {
            title: "Bases de datos",
            description: "Instancias de PostgreSQL, MySQL, MongoDB, Redis y MariaDB con un clic.",
            tag: "5 motores",
          },
          {
            title: "Backups automáticos",
            description: "Copias programadas con políticas de retención y restauración con un clic.",
          },
          {
            title: "Variables de entorno",
            description: "Gestionadas desde la interfaz y cifradas en reposo.",
            tag: "AES-256-GCM",
          },
        ],
      },
      {
        id: "operate",
        index: "03",
        label: "Operar",
        tagline: "Velo todo y ejecútalo en cualquier parte.",
        features: [
          {
            title: "Logs en tiempo real",
            description: "Logs de build, despliegue y contenedor transmitidos en directo por Socket.IO.",
            tag: "Socket.IO",
          },
          { title: "Monitorización", description: "Uso de CPU, memoria y red por contenedor." },
          { title: "Dominios y SSL", description: "Certificados automáticos de Let's Encrypt mediante Traefik." },
          {
            title: "Servidores remotos",
            description: "Despliega en servidores adicionales por SSH desde un único panel.",
          },
        ],
      },
      {
        id: "govern",
        index: "04",
        label: "Gobernar",
        tagline: "Controla quién hace qué y guarda el registro.",
        features: [
          {
            title: "Control de acceso por roles",
            description: "Roles de Admin, Operator y Viewer con permisos específicos por proyecto.",
          },
          {
            title: "Registros de auditoría",
            description: "Historial completo de acciones con limpieza automática por retención.",
          },
          { title: "Multiproyecto", description: "Organiza tus servicios en proyectos lógicos." },
          {
            title: "Notificaciones",
            description: "Canales de Discord, Slack, Telegram, email y webhook.",
            tag: "5 canales",
          },
        ],
      },
    ],
  },
  howItWorks: {
    label: "flujo",
    meta: (n) => `${n} pasos`,
    title: "Cuatro pasos hasta producción",
    steps: [
      {
        step: "01",
        title: "Instálalo en tu servidor",
        description: "Un solo comando instala DeployKit en cualquier VPS, detrás de Traefik con SSL automático.",
        command: "npm i -g @deploykit/cli && deploykit install",
      },
      {
        step: "02",
        title: "Conecta tu repo",
        description: "Vincula un repositorio de GitHub o GitLab y DeployKit configura el webhook.",
        command: "deploykit link github.com/you/app",
      },
      {
        step: "03",
        title: "Haz push para desplegar",
        description: "DeployKit detecta tu stack, construye la imagen y la despliega.",
        command: "git push origin main",
      },
      {
        step: "04",
        title: "Ya está en línea",
        description: "Tu app está online con SSL, dominio propio y monitorización incluidos.",
        command: "https://app.yourdomain.com",
        kind: "output",
      },
    ],
  },
  demo: {
    label: "demo en vivo",
    title: "Del repo a producción en minutos",
    caption: "demo.mp4 — panel de deploykit",
    playing: "● reproduciendo",
    stopped: "■ detenido",
    play: "▶ ver demo",
    playLabel: "Reproducir la demo",
  },
  testimonials: {
    label: "desde el terreno",
    title: "Equipos que dejaron de pagar alquiler",
    items: [
      {
        quote:
          "Migramos 10 servicios de Heroku a nuestra propia máquina en un fin de semana. El flujo de git push funcionó a la primera.",
        author: "Carlos M.",
        role: "CTO en una startup de videojuegos",
      },
      {
        quote:
          "Haces git push y todo arranca con SSL automático. Es justo la experiencia que buscábamos para autoalojar.",
        author: "Ana R.",
        role: "Lead Developer",
      },
      {
        quote:
          "Autoalojado, open source y sin factura recurrente de plataforma. Para un equipo pequeño no hay nada mejor.",
        author: "Diego L.",
        role: "Indie Hacker",
      },
    ],
  },
  cta: {
    label: "[07] empezar",
    title: "Toma el control de tus despliegues hoy",
    lead: "Open source, autoalojado y sin límites. Un comando en cualquier VPS y ya estás en marcha.",
    github: "ver en github →",
    docs: "leer la documentación",
  },
};
