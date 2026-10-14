export interface FeatureI {
  title: string;
  description: string;
  /** Optional tag rendered as a bracketed mono label (e.g. "[aes-256-gcm]"). */
  tag?: string;
}

export interface PillarI {
  id: string;
  /** Two-digit index, e.g. "01". */
  index: string;
  label: string;
  tagline: string;
  features: FeatureI[];
}

export interface StatI {
  /** Row key, rendered like a column header in htop. */
  label: string;
  value: string;
  note: string;
}

export interface StepI {
  step: string;
  title: string;
  description: string;
  command: string;
  /** "output" renders the command as program output instead of a `$` prompt. */
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

export interface NavLinkI {
  href: string;
  label: string;
}

export interface DeployLogLineI {
  text: string;
  tone: "dim" | "info" | "ok";
}
