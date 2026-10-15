import React from "react";

import { SectionHeader } from "./SectionHeader";
import { StatCard } from "./StatCard";

import { useLandingCopy } from "@landing/infrastructure/ui/hooks/useLandingCopy";

export const StatsSection: React.FC = () => {
  const { stats } = useLandingCopy();

  return (
    <section className="container mx-auto px-4 pt-16 sm:px-6 sm:pt-24">
      <SectionHeader index="02" label={stats.label} meta={stats.meta} />

      <dl className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {stats.items.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </dl>
    </section>
  );
};
