import { memo, useRef } from "react";
import { m, useInView } from "framer-motion";
import type { FeatureI } from "@landing/infrastructure/ui/types/landing.module.types";

interface FeatureCardPropsI {
  feature: FeatureI;
  index: number;
}

export const FeatureCard = memo(({ feature, index }: FeatureCardPropsI) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Pointer-following highlight gives the flat card a sense of being lit.
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`group surface-card relative overflow-hidden rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1 ${
        feature.wide ? "sm:col-span-2" : ""
      }`}
    >
      {/* cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 0%), hsl(var(--primary) / 0.14), transparent 70%)",
        }}
      />

      <div className="relative flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary transition-colors duration-300 group-hover:border-primary/40 group-hover:glow-sm">
          <feature.icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-semibold text-bright">
              {feature.title}
            </h3>
            {feature.tag && (
              <span className="rounded-md border border-primary/25 bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-primary">
                {feature.tag}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {feature.description}
          </p>
        </div>
      </div>
    </m.div>
  );
});

FeatureCard.displayName = "FeatureCard";
