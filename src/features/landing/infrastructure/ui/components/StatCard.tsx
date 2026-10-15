import React, { memo } from "react";

import type { StatI } from "@landing/infrastructure/ui/interfaces/LandingI";

interface StatCardPropsI {
  stat: StatI;
}

/** Una celda estilo htop: clave, valor alineado y nota. En móvil se apila como fila de tabla. */
export const StatCard: React.FC<StatCardPropsI> = memo(({ stat }: StatCardPropsI) => {
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
