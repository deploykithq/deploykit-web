import { m } from "framer-motion";
import { PILLARS } from "@landing/infrastructure/ui/constants/landing.constants";
import { FeatureCard } from "./FeatureCard";

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        {/* heading */}
        <div className="mx-auto max-w-2xl text-center">
          <m.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary"
          >
            Capabilities
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-3 font-display text-3xl font-bold text-bright sm:text-4xl md:text-5xl"
          >
            Everything a service needs,{" "}
            <span className="text-gradient">from ship to govern</span>
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base"
          >
            Sixteen built-in capabilities across four pillars — the whole lifecycle of a
            deployment, managed from one dashboard.
          </m.p>
        </div>

        {/* pillars */}
        <div className="mt-14 space-y-12 sm:space-y-16">
          {PILLARS.map((pillar) => (
            <div key={pillar.id}>
              {/* pillar header */}
              <m.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="mb-5 flex items-center gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl surface-raised text-primary">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-xs text-dim">{pillar.index}</span>
                    <h3 className="font-display text-xl font-semibold text-bright sm:text-2xl">
                      {pillar.label}
                    </h3>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{pillar.tagline}</p>
                </div>
                <div className="ml-auto hidden h-px max-w-[40%] flex-1 bg-gradient-to-r from-border to-transparent sm:block" />
              </m.div>

              {/* bento grid for this pillar */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {pillar.features.map((feature, i) => (
                  <FeatureCard key={feature.title} feature={feature} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
