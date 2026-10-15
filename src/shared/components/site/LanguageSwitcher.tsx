import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";

import { useLocale, useT } from "@lib/i18n/useLocale";

import { LOCALES, switchLocale } from "@lib/i18n/locales";

import type { AlternatesT } from "./SiteI";

export interface LanguageSwitcherPropsI {
  /** Sustituye la ruta calculada en páginas cuyo path cambia por idioma (slugs traducidos del blog). */
  alternates?: AlternatesT;
  className?: string;
}

/** Selector `en / es` que enlaza a esta misma página en el otro idioma. */
export const LanguageSwitcher: React.FC<LanguageSwitcherPropsI> = memo(({ alternates, className = "" }) => {
  const locale = useLocale();
  const t = useT();
  const { pathname } = useLocation();

  return (
    <nav aria-label={t.nav.language} className={`flex items-center gap-1.5 font-mono text-sm ${className}`}>
      {LOCALES.map((target, i) => (
        <span key={target} className="flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden className="text-dim">
              /
            </span>
          )}
          {target === locale ? (
            <span aria-current="true" className="text-primary">
              {target}
            </span>
          ) : (
            <Link
              to={alternates?.[target] ?? switchLocale(pathname, target)}
              hrefLang={target}
              lang={target}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {target}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
});

LanguageSwitcher.displayName = "LanguageSwitcher";
