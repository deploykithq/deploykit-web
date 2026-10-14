import { memo, useCallback } from "react";
import type { SidebarItemI } from "@docs/infrastructure/ui/types/docs.module.types";

interface DocsNavigationPropsI {
  prevItem: SidebarItemI | null;
  nextItem: SidebarItemI | null;
  onNavigate: (id: string) => void;
}

export const DocsNavigation = memo(({ prevItem, nextItem, onNavigate }: DocsNavigationPropsI) => {
  const handlePrev = useCallback(() => {
    if (prevItem) onNavigate(prevItem.id);
  }, [prevItem, onNavigate]);

  const handleNext = useCallback(() => {
    if (nextItem) onNavigate(nextItem.id);
  }, [nextItem, onNavigate]);

  return (
    <nav className="mt-16 grid grid-cols-2 border border-border font-mono text-sm" aria-label="Docs pagination">
      {prevItem ? (
        <button
          type="button"
          onClick={handlePrev}
          className="flex flex-col items-start gap-1 border-r border-border p-4 text-left text-muted-foreground transition-colors hover:bg-surface-1 hover:text-primary"
        >
          <span className="text-xs uppercase tracking-widest text-dim">← prev</span>
          <span className="lowercase">{prevItem.label}</span>
        </button>
      ) : (
        <div className="border-r border-border" />
      )}
      {nextItem ? (
        <button
          type="button"
          onClick={handleNext}
          className="flex flex-col items-end gap-1 p-4 text-right text-muted-foreground transition-colors hover:bg-surface-1 hover:text-primary"
        >
          <span className="text-xs uppercase tracking-widest text-dim">next →</span>
          <span className="lowercase">{nextItem.label}</span>
        </button>
      ) : (
        <div />
      )}
    </nav>
  );
});

DocsNavigation.displayName = "DocsNavigation";
