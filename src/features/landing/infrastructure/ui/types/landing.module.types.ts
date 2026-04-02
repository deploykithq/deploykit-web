import type { LucideIcon } from "lucide-react";

export interface FeatureI {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StatI {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

export interface StepI {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
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
