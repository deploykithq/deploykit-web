import { memo } from "react";
import type { ReactNode } from "react";

interface SectionHeaderPropsI {
  index: string;
  label: string;
  /** Omit for a bare rule (compact strips like the runtimes list). */
  title?: ReactNode;
  /** Right-aligned metadata on the rule, e.g. "16 entries". */
  meta?: string;
  children?: ReactNode;
}

/** `[02] features ────────── meta` rule followed by a mono heading. */
export const SectionHeader = memo(({ index, label, title, meta, children }: SectionHeaderPropsI) => {
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
