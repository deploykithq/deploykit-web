import { memo } from "react";

import { INSTALL_CMD } from "@landing/infrastructure/ui/constants/landing.constants";
import { useCopyToClipboard } from "@landing/infrastructure/ui/hooks/useCopyToClipboard";

interface InstallCommandPropsI {
  /** "dark" sits on the page background, "ink" sits inside the amber CTA block. */
  variant?: "dark" | "ink";
}

/** The install one-liner as the primary call to action: click anywhere to copy. */
export const InstallCommand = memo(({ variant = "dark" }: InstallCommandPropsI) => {
  const { copied, copy } = useCopyToClipboard(INSTALL_CMD);
  const ink = variant === "ink";

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy install command: ${INSTALL_CMD}`}
      className={[
        "group block w-full border text-left font-mono transition-colors",
        ink
          ? "border-background bg-background text-foreground"
          : "border-border bg-surface-1 hover:border-primary",
      ].join(" ")}
    >
      <span className="flex items-center justify-between border-b border-border px-4 py-2 text-[11px] uppercase tracking-widest text-dim">
        <span>install</span>
        <span
          aria-live="polite"
          className={copied ? "text-success" : "text-muted-foreground group-hover:text-primary"}
        >
          {copied ? "✓ copied" : "[ copy ]"}
        </span>
      </span>
      <span className="flex items-start gap-3 px-4 py-4 text-sm sm:text-base">
        <span aria-hidden className="text-primary">
          $
        </span>
        <code className="min-w-0 flex-1 break-words text-bright">
          {INSTALL_CMD}
          <span
            aria-hidden
            className="ml-1 inline-block h-[1.1em] w-[0.6em] translate-y-[0.2em] bg-primary animate-caret-blink"
          />
        </code>
      </span>
    </button>
  );
});

InstallCommand.displayName = "InstallCommand";
