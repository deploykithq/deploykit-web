import { memo, useRef } from "react";
import { m, useInView } from "framer-motion";
import { useAnimatedCounter } from "@landing/infrastructure/ui/hooks/useAnimatedCounter";
import type { StatI } from "@landing/infrastructure/ui/types/landing.module.types";

interface StatCardPropsI {
  stat: StatI;
  index: number;
}

export const StatCard = memo(({ stat, index }: StatCardPropsI) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const animated = useAnimatedCounter(stat.value, isInView, 1800, stat.decimals);

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group surface-card relative overflow-hidden rounded-2xl p-5 text-center sm:p-6"
    >
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary transition-colors group-hover:border-primary/40">
        <stat.icon className="h-5 w-5" />
      </div>
      <div className="font-display text-3xl font-bold tabular-nums text-bright sm:text-4xl">
        {stat.prefix}
        {animated}
        <span className="text-gradient">{stat.suffix}</span>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
    </m.div>
  );
});

StatCard.displayName = "StatCard";
