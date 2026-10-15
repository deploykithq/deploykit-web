import React, { memo } from "react";

import { DocsNavigation } from "./DocsNavigation";

import { useInternalLinks } from "@/hooks/useInternalLinks";
import { useT } from "@lib/i18n/useLocale";

import type { DocsSectionContentI, SidebarItemI } from "@docs/infrastructure/ui/interfaces/DocsI";

interface DocsContentPropsI {
  activeSection: string;
  current: DocsSectionContentI;
  prevItem: SidebarItemI | null;
  nextItem: SidebarItemI | null;
  hrefFor: (id: string) => string;
}

export const DocsContent: React.FC<DocsContentPropsI> = memo(({ activeSection, current, prevItem, nextItem, hrefFor }: DocsContentPropsI) => {
  const t = useT();
  const onContentClick = useInternalLinks();

  return (
    <main className="flex-1 min-w-0">
      <article
        key={activeSection}
        className="mx-auto max-w-3xl px-4 sm:px-8 py-10 sm:py-16 animate-fade-in"
      >
        <header className="mb-10 border-b border-border pb-8">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-dim">
            {t.docs.breadcrumb} <span aria-hidden>/</span>{" "}
            <span className="text-muted-foreground">{current.title}</span>
          </p>
          <h1 className="font-mono text-2xl font-bold leading-tight tracking-tight text-bright sm:text-4xl">
            {current.title}
          </h1>
          <p className="mt-3 text-muted-foreground">{current.description}</p>
        </header>

        {/* Los enlaces del contenido son <a href="/docs/..."> normales para que funcionen sin JS; con JS navegan en el cliente. */}
        <div className="prose-custom" onClick={onContentClick}>
          {current.content}
        </div>

        <DocsNavigation prevItem={prevItem} nextItem={nextItem} hrefFor={hrefFor} />
      </article>
    </main>
  );
});

DocsContent.displayName = "DocsContent";
