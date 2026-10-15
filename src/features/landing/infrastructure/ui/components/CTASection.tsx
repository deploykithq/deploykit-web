import React from "react";

import { InstallCommand } from "./InstallCommand";

import { useLandingCopy } from "@landing/infrastructure/ui/hooks/useLandingCopy";
import { useLocale } from "@lib/i18n/useLocale";

import { localePath } from "@lib/i18n/locales";
import { GITHUB_URL } from "@lib/project";

export const CTASection: React.FC = () => {
  const { cta } = useLandingCopy();
  const locale = useLocale();

  return (
    <section id="cta" className="on-accent mt-20 scroll-mt-14 bg-primary text-primary-foreground sm:mt-32">
      <div className="container mx-auto grid gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-end lg:gap-16">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest">{cta.label}</p>
          <h2 className="mt-6 font-mono text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
            {cta.title}
          </h2>
          <p className="mt-4 max-w-md text-base font-medium sm:text-lg">{cta.lead}</p>
        </div>

        <div>
          <InstallCommand variant="ink" />
          <div className="mt-4 grid gap-3 font-mono text-sm font-semibold sm:grid-cols-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary-foreground bg-primary-foreground px-5 py-3 text-center text-primary transition-colors hover:bg-transparent hover:text-primary-foreground"
            >
              {cta.github}
            </a>
            <a
              href={localePath(locale, "/docs")}
              className="border-2 border-primary-foreground px-5 py-3 text-center transition-colors hover:bg-primary-foreground hover:text-primary"
            >
              {cta.docs}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
