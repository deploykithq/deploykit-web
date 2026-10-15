export interface FeatureI {
  title: string;
  description: string;
  /** Tag opcional mostrado como etiqueta monoespaciada entre corchetes (p. ej. "[aes-256-gcm]"). */
  tag?: string;
}

export interface PillarI {
  id: string;
  /** Índice de dos dígitos, p. ej. "01". */
  index: string;
  label: string;
  tagline: string;
  features: FeatureI[];
}

export interface StatI {
  /** Clave de la fila, mostrada como cabecera de columna de htop. */
  label: string;
  value: string;
  note: string;
}

export interface StepI {
  step: string;
  title: string;
  description: string;
  command: string;
  /** "output" muestra el comando como salida de programa en vez de un prompt `$`. */
  kind?: "command" | "output";
}

export interface TechnologyI {
  name: string;
  icon: string;
}

export interface TestimonialI {
  quote: string;
  author: string;
  role: string;
}

export interface DeployLogLineI {
  text: string;
  tone: "dim" | "info" | "ok";
}

/** Todos los textos visibles de la landing, un objeto por locale. */
export interface LandingCopyI {
  meta: { title: string; description: string };
  hero: {
    tags: string[];
    titleLine1: string;
    titleHighlight: string;
    titleEnd: string;
    lead: string;
    readDocs: string;
    star: string;
    pipelineLabel: string;
    deploying: string;
    healthy: string;
  };
  install: { label: string; copy: string; copied: string; ariaLabel: (cmd: string) => string };
  tech: { label: string; meta: (n: number) => string };
  stats: { label: string; meta: string; items: StatI[] };
  features: {
    label: string;
    meta: (n: number) => string;
    title: string;
    intro: string;
    pillars: PillarI[];
  };
  howItWorks: { label: string; meta: (n: number) => string; title: string; steps: StepI[] };
  demo: {
    label: string;
    title: string;
    caption: string;
    playing: string;
    stopped: string;
    play: string;
    playLabel: string;
  };
  testimonials: { label: string; title: string; items: TestimonialI[] };
  cta: { label: string; title: string; lead: string; github: string; docs: string };
}
