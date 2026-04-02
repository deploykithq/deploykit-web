import { memo } from "react";
import { Rocket, ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface DocsHeaderPropsI {
  onToggleSidebar: () => void;
}

export const DocsHeader = memo(({ onToggleSidebar }: DocsHeaderPropsI) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm hidden sm:inline">Back</span>
          </Link>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-primary">
              <Rocket className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-bright text-sm">Docs</span>
          </div>
        </div>

        <button
          onClick={onToggleSidebar}
          className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground"
        >
          <BookOpen className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
});

DocsHeader.displayName = "DocsHeader";
