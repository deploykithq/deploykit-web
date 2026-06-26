import type { LucideIcon } from "lucide-react";

export interface FeatureI {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional tag rendered as a small chip (e.g. "AES-256-GCM"). */
  tag?: string;
  /** When true the card spans two columns in the bento grid. */
  wide?: boolean;
}

export interface PillarI {
  id: string;
  /** Short kicker, e.g. "01 · Ship". */
  index: string;
  label: string;
  tagline: string;
  icon: LucideIcon;
  features: FeatureI[];
}

export interface StatI {
  icon: LucideIcon;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export interface StepI {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
  command: string;
}

export interface TechnologyI {
  name: string;
  icon: string;
}

export interface TestimonialI {
  quote: string;
  author: string;
  role: string;
  initials: string;
}

export interface NavLinkI {
  href: string;
  label: string;
}
