import { STATS } from "@landing/infrastructure/ui/constants/landing.constants";
import { SectionHeader } from "./SectionHeader";
import { StatCard } from "./StatCard";

export const StatsSection = () => {
  return (
    <section className="container mx-auto px-4 pt-16 sm:px-6 sm:pt-24">
      <SectionHeader index="02" label="spec sheet" meta="verifiable in the repo" />

      <dl className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </dl>
    </section>
  );
};
