import { memo } from "react";
import { Link } from "react-router-dom";

interface DocsHeaderPropsI {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const DocsHeader = memo(({ sidebarOpen, onToggleSidebar }: DocsHeaderPropsI) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[52px] border-b border-border bg-background">
      <div className="flex h-full items-center justify-between px-4 font-mono sm:px-6">
        <div className="flex min-w-0 items-center gap-4 text-sm">
          <Link to="/" className="font-bold tracking-tight text-bright hover:text-primary" aria-label="DeployKit home">
            deploykit<span className="text-primary">_</span>
          </Link>
          <span aria-hidden className="text-dim">/</span>
          <span className="text-muted-foreground">docs</span>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <Link to="/" className="hidden text-muted-foreground hover:text-primary sm:inline">
            ← back
          </Link>
          <button
            type="button"
            onClick={onToggleSidebar}
            className="text-muted-foreground hover:text-primary lg:hidden"
            aria-label="Toggle docs navigation"
            aria-expanded={sidebarOpen}
            aria-controls="docs-sidebar"
          >
            {sidebarOpen ? "[x]" : "[≡] index"}
          </button>
        </div>
      </div>
    </header>
  );
});

DocsHeader.displayName = "DocsHeader";
