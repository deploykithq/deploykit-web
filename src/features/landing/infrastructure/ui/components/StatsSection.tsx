import { STATS } from "@landing/infrastructure/ui/constants/landing.constants";
import { StatCard } from "./StatCard";

export const StatsSection = () => {
  return (
    <section className="relative py-8 sm:py-12">
      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
