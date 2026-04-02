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
  const animated = useAnimatedCounter(stat.value, isInView, 2200, stat.decimals);

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="glass rounded-2xl p-4 sm:p-6 text-center group hover:border-glow hover:glow-sm transition-all"
    >
      <div className="mx-auto mb-3 sm:mb-4 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-primary opacity-80 group-hover:opacity-100 transition-opacity">
        <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-bright font-mono tabular-nums">
        {animated}
        <span className="text-primary">{stat.suffix}</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
    </m.div>
  );
});

StatCard.displayName = "StatCard";
