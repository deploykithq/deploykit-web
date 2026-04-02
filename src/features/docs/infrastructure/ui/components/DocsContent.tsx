import { memo, useMemo } from "react";
import { BookOpen, ChevronRight } from "lucide-react";
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
        className="mx-auto max-w-3xl px-4 sm:px-8 py-10 sm:py-16 animate-fade-up"
      >
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-dim mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Documentation</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-muted-foreground">{current.title}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-bright leading-tight">
            {current.title}
          </h1>
          <p className="mt-2 text-muted-foreground">{current.description}</p>
        </div>

        <div className="prose-custom">{current.content}</div>

        <DocsNavigation prevItem={prevItem} nextItem={nextItem} onNavigate={onNavigate} />
      </div>
    </main>
  );
});

DocsContent.displayName = "DocsContent";
