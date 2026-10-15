import React from "react";

import { FeatureCard } from "./FeatureCard";
import { SectionHeader } from "./SectionHeader";

import { useLandingCopy } from "@landing/infrastructure/ui/hooks/useLandingCopy";

export const FeaturesSection: React.FC = () => {
  const { features } = useLandingCopy();
  const featureCount = features.pillars.reduce((n, p) => n + p.features.length, 0);

  return (
    <section id="features" className="container mx-auto scroll-mt-14 px-4 pt-20 sm:px-6 sm:pt-32">
      <SectionHeader
        index="03"
        label={features.label}
        meta={features.meta(featureCount)}
        title={features.title}
      >
        {features.intro}
      </SectionHeader>

      <div className="border-y border-border">
        {features.pillars.map((pillar) => (
          <div
            key={pillar.id}
            className="grid gap-4 border-t border-border py-6 first:border-t-0 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10 lg:py-8"
          >
            <div>
              <h3 className="font-mono text-lg font-bold uppercase tracking-wider text-bright">
                <span className="mr-3 text-primary">{pillar.index}</span>
                {pillar.label}
              </h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">{pillar.tagline}</p>
            </div>

            <ul>
              {pillar.features.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
