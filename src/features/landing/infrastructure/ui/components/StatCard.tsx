import { memo } from "react";
import type { StatI } from "@landing/infrastructure/ui/types/landing.module.types";

interface StatCardPropsI {
  stat: StatI;
}

/** One htop-style cell: key, aligned value, note. Stacks as a table row on mobile. */
export const StatCard = memo(({ stat }: StatCardPropsI) => {
  return (
    <div className="border-b border-r border-border px-4 py-4 font-mono sm:py-5">
      <dt className="text-xs uppercase tracking-widest text-dim">{stat.label}</dt>
      <dd className="mt-1 sm:mt-2">
        <span className="block text-2xl font-bold tabular-nums tracking-tight text-bright lg:text-3xl">
          {stat.value}
        </span>
        <span className="mt-1 block font-sans text-sm text-muted-foreground">{stat.note}</span>
      </dd>
    </div>
  );
});

StatCard.displayName = "StatCard";
