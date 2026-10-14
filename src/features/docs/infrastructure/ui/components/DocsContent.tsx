import { memo, useMemo } from "react";
import { DOCS_CONTENT } from "@docs/infrastructure/ui/constants/docs.content";
import { DocsNavigation } from "./DocsNavigation";
import type { SidebarItemI } from "@docs/infrastructure/ui/types/docs.module.types";

interface DocsContentPropsI {
  activeSection: string;
  prevItem: SidebarItemI | null;
  nextItem: SidebarItemI | null;
  onNavigate: (id: string) => void;
}

export const DocsContent = memo(({ activeSection, prevItem, nextItem, onNavigate }: DocsContentPropsI) => {
  const current = useMemo(() => DOCS_CONTENT[activeSection], [activeSection]);

  return (
    <main className="flex-1 min-w-0">
      <div
        key={activeSection}
        className="mx-auto max-w-3xl px-4 sm:px-8 py-10 sm:py-16 animate-fade-in"
      >
        <div className="mb-10 border-b border-border pb-8">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-dim">
            docs <span aria-hidden>/</span>{" "}
            <span className="text-muted-foreground">{current.title}</span>
          </p>
          <h1 className="font-mono text-2xl font-bold leading-tight tracking-tight text-bright sm:text-4xl">
            {current.title}
          </h1>
          <p className="mt-3 text-muted-foreground">{current.description}</p>
        </div>

        <div className="prose-custom">{current.content}</div>

        <DocsNavigation prevItem={prevItem} nextItem={nextItem} onNavigate={onNavigate} />
      </div>
    </main>
  );
});

DocsContent.displayName = "DocsContent";
