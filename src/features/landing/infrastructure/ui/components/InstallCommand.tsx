import React, { memo } from "react";

import { useCopyToClipboard } from "@landing/infrastructure/ui/hooks/useCopyToClipboard";
import { useLandingCopy } from "@landing/infrastructure/ui/hooks/useLandingCopy";

import { INSTALL_CMD } from "@landing/infrastructure/ui/constants/landing.constants";

interface InstallCommandPropsI {
  /** "dark" va sobre el fondo de la página, "ink" dentro del bloque CTA ámbar. */
  variant?: "dark" | "ink";
}

/** El one-liner de instalación como llamada a la acción principal: clic en cualquier parte para copiar. */
export const InstallCommand: React.FC<InstallCommandPropsI> = memo(({ variant = "dark" }: InstallCommandPropsI) => {
  const { install } = useLandingCopy();
  const { copied, copy } = useCopyToClipboard(INSTALL_CMD);
  const ink = variant === "ink";

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={install.ariaLabel(INSTALL_CMD)}
      className={[
        "group block w-full border text-left font-mono transition-colors",
        ink
          ? "border-background bg-background text-foreground"
          : "border-border bg-surface-1 hover:border-primary",
      ].join(" ")}
    >
      <span className="flex items-center justify-between border-b border-border px-4 py-2 text-[11px] uppercase tracking-widest text-dim">
        <span>{install.label}</span>
        <span
          aria-live="polite"
          className={copied ? "text-success" : "text-muted-foreground group-hover:text-primary"}
        >
          {copied ? install.copied : install.copy}
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
