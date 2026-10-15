import React from "react";

import { SectionHeader } from "./SectionHeader";

import { useLandingCopy } from "@landing/infrastructure/ui/hooks/useLandingCopy";

import { TECHNOLOGIES } from "@landing/infrastructure/ui/constants/landing.constants";

export const TechSection: React.FC = () => {
  const { tech } = useLandingCopy();

  return (
    <section className="container mx-auto px-4 pt-16 sm:px-6 sm:pt-24">
      <SectionHeader index="01" label={tech.label} meta={tech.meta(TECHNOLOGIES.length)} />

      <ul className="grid grid-cols-2 border-l border-t border-border sm:grid-cols-5">
        {TECHNOLOGIES.map((tech) => (
          <li
            key={tech.name}
            className="group flex items-center gap-3 border-b border-r border-border px-4 py-3"
          >
            <img
              src={tech.icon}
              alt=""
              className="h-5 w-5 opacity-60 brightness-0 invert transition duration-200 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0"
              loading="lazy"
              width={20}
              height={20}
            />
            <span className="font-mono text-sm lowercase text-muted-foreground transition-colors group-hover:text-foreground">
              {tech.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
