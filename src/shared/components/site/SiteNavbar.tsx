import React, { useMemo, useState } from "react";

import { LanguageSwitcher } from "./LanguageSwitcher";

import { useLocale, useT } from "@lib/i18n/useLocale";

import { localePath } from "@lib/i18n/locales";
import { GITHUB_URL } from "@lib/project";
import { getNavLinks } from "./site.constants";

import type { AlternatesT } from "./SiteI";

export interface SiteNavbarPropsI {
  /** Se pasa al selector de idioma en las páginas con rutas distintas por idioma. */
  alternates?: AlternatesT;
}

export const SiteNavbar: React.FC<SiteNavbarPropsI> = ({ alternates }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const locale = useLocale();
  const t = useT();
  const links = useMemo(() => getNavLinks(locale, t), [locale, t]);
  const home = localePath(locale, "/");

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
        <a href={home} className="font-mono text-base font-bold tracking-tight text-bright" aria-label={t.nav.home}>
          deploykit
          <span aria-hidden className="text-primary animate-caret-blink">
            _
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-sm lowercase text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher alternates={alternates} className="hidden sm:flex" />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-mono text-sm text-muted-foreground transition-colors hover:text-primary lg:inline"
          >
            {t.nav.star}
          </a>
          <a
            href={`${home}#cta`}
            className="bg-primary px-3 py-1.5 font-mono text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground"
          >
            {t.nav.getStarted}
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="font-mono text-sm text-muted-foreground hover:text-foreground md:hidden"
            aria-label={t.nav.toggleMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? "[x]" : "[≡]"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-border bg-background md:hidden">
          <ul className="container mx-auto px-4 py-2 font-mono text-sm sm:px-6">
            {links.map((link, i) => (
              <li key={link.href} className="border-b border-border/60 last:border-0">
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex gap-3 py-3 lowercase text-muted-foreground hover:text-primary"
                >
                  <span className="text-dim">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="border-b border-border/60">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 py-3 text-muted-foreground hover:text-primary"
              >
                <span className="text-dim">{String(links.length + 1).padStart(2, "0")}</span>
                {t.nav.starOnGithub}
              </a>
            </li>
            <li className="flex gap-3 py-3">
              <span className="text-dim">{String(links.length + 2).padStart(2, "0")}</span>
              <LanguageSwitcher alternates={alternates} />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
