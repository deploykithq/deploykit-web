import React, { memo } from "react";
import { Link } from "react-router-dom";

import { LanguageSwitcher } from "@shared/components/site";

import { useLocale, useT } from "@lib/i18n/useLocale";

import { localePath } from "@lib/i18n/locales";

interface DocsHeaderPropsI {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const DocsHeader: React.FC<DocsHeaderPropsI> = memo(({ sidebarOpen, onToggleSidebar }: DocsHeaderPropsI) => {
  const locale = useLocale();
  const t = useT();
  const home = localePath(locale, "/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[52px] border-b border-border bg-background">
      <div className="flex h-full items-center justify-between px-4 font-mono sm:px-6">
        <div className="flex min-w-0 items-center gap-4 text-sm">
          <Link to={home} className="font-bold tracking-tight text-bright hover:text-primary" aria-label={t.nav.home}>
            deploykit<span className="text-primary">_</span>
          </Link>
          <span aria-hidden className="text-dim">/</span>
          <span className="text-muted-foreground">{t.docs.breadcrumb}</span>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <Link to={localePath(locale, "/blog")} className="hidden text-muted-foreground hover:text-primary md:inline">
            {t.nav.blog.toLowerCase()}
          </Link>
          <LanguageSwitcher />
          <Link to={home} className="hidden text-muted-foreground hover:text-primary sm:inline">
            {t.docs.back}
          </Link>
          <button
            type="button"
            onClick={onToggleSidebar}
            className="text-muted-foreground hover:text-primary lg:hidden"
            aria-label={t.docs.toggleNav}
            aria-expanded={sidebarOpen}
            aria-controls="docs-sidebar"
          >
            {sidebarOpen ? "[x]" : t.docs.index}
          </button>
        </div>
      </div>
    </header>
  );
});

DocsHeader.displayName = "DocsHeader";
