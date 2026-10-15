import React, { memo } from "react";
import { Link } from "react-router-dom";

import { useT } from "@lib/i18n/useLocale";

import type { SidebarItemI } from "@docs/infrastructure/ui/interfaces/DocsI";

interface DocsNavigationPropsI {
  prevItem: SidebarItemI | null;
  nextItem: SidebarItemI | null;
  hrefFor: (id: string) => string;
}

export const DocsNavigation: React.FC<DocsNavigationPropsI> = memo(({ prevItem, nextItem, hrefFor }: DocsNavigationPropsI) => {
  const t = useT();

  return (
    <nav className="mt-16 grid grid-cols-2 border border-border font-mono text-sm" aria-label={t.docs.pagination}>
      {prevItem ? (
        <Link
          to={hrefFor(prevItem.id)}
          rel="prev"
          className="flex flex-col items-start gap-1 border-r border-border p-4 text-left text-muted-foreground transition-colors hover:bg-surface-1 hover:text-primary"
        >
          <span className="text-xs uppercase tracking-widest text-dim">{t.docs.prev}</span>
          <span className="lowercase">{prevItem.label}</span>
        </Link>
      ) : (
        <div className="border-r border-border" />
      )}
      {nextItem ? (
        <Link
          to={hrefFor(nextItem.id)}
          rel="next"
          className="flex flex-col items-end gap-1 p-4 text-right text-muted-foreground transition-colors hover:bg-surface-1 hover:text-primary"
        >
          <span className="text-xs uppercase tracking-widest text-dim">{t.docs.next}</span>
          <span className="lowercase">{nextItem.label}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
});

DocsNavigation.displayName = "DocsNavigation";
