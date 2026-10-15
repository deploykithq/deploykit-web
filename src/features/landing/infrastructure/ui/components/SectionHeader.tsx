import React, { memo } from "react";

import type { ReactNode } from "react";

interface SectionHeaderPropsI {
  index: string;
  label: string;
  /** Omitir para una regla sin título (franjas compactas como la lista de runtimes). */
  title?: ReactNode;
  /** Metadatos alineados a la derecha en la regla, p. ej. "16 entries". */
  meta?: string;
  children?: ReactNode;
}

/** Regla `[02] features ────────── meta` seguida de un título monoespaciado. */
export const SectionHeader: React.FC<SectionHeaderPropsI> = memo(({ index, label, title, meta, children }: SectionHeaderPropsI) => {
  return (
    <header className={title ? "mb-10 sm:mb-14" : "mb-6"}>
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
        <span className="text-primary">[{index}]</span>
        <span className="text-muted-foreground">{label}</span>
        <span aria-hidden className="h-px flex-1 bg-border" />
        {meta && <span className="hidden text-dim sm:inline">{meta}</span>}
      </div>
      {title && (
        <h2 className="mt-6 max-w-4xl font-mono text-2xl font-bold leading-tight tracking-tight text-bright sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      )}
      {children && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {children}
        </p>
      )}
    </header>
  );
});

SectionHeader.displayName = "SectionHeader";
