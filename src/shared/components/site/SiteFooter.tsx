import React, { useMemo } from "react";

import { LanguageSwitcher } from "./LanguageSwitcher";

import { useLocale, useT } from "@lib/i18n/useLocale";

import { DEPLOYKIT_VERSION } from "@lib/project";
import { getFooterColumns } from "./site.constants";

import type { AlternatesT } from "./SiteI";

export interface SiteFooterPropsI {
  /** Ventana de tmux que se muestra en la línea de estado, p. ej. "0:landing*". */
  screen: string;
  alternates?: AlternatesT;
}

export const SiteFooter: React.FC<SiteFooterPropsI> = ({ screen, alternates }) => {
  const locale = useLocale();
  const t = useT();
  const columns = useMemo(() => getFooterColumns(locale, t), [locale, t]);

  return (
    <footer className="font-mono">
      <div className="container mx-auto grid gap-8 px-4 py-12 sm:grid-cols-[1.4fr_1fr_1fr_1fr] sm:px-6">
        <div>
          <p className="text-base font-bold text-bright">
            deploykit<span className="text-primary">_</span>
          </p>
          <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">
            {t.footer.tagline}
          </p>
          <LanguageSwitcher alternates={alternates} className="mt-5" />
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h4 className="text-xs uppercase tracking-widest text-dim">{col.title}/</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="lowercase text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Línea de estado al estilo tmux */}
      <div className="border-t border-border bg-surface-1 text-xs">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 sm:px-6">
          <p className="flex items-center gap-3">
            <span className="bg-primary px-2 py-0.5 font-semibold text-primary-foreground">deploykit</span>
            <span className="text-muted-foreground">{screen}</span>
          </p>
          <p className="flex flex-wrap items-center gap-x-3 text-dim">
            <span className="text-success">{t.footer.operational}</span>
            {[DEPLOYKIT_VERSION, "MIT", `© ${new Date().getFullYear()}`].filter(Boolean).map((item) => (
              <span key={item}>
                <span aria-hidden className="mr-3">│</span>
                {item}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
};
