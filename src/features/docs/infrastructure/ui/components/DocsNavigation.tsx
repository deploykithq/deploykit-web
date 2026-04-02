import { memo, useCallback } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
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
    <div className="mt-16 flex items-center justify-between border-t border-border pt-6">
      {prevItem ? (
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {prevItem.label}
        </button>
      ) : (
        <div />
      )}
      {nextItem ? (
        <button
          onClick={handleNext}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {nextItem.label}
          <ChevronRight className="h-4 w-4" />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
});

DocsNavigation.displayName = "DocsNavigation";
