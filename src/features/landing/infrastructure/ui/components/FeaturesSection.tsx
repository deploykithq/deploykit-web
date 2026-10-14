import { PILLARS } from "@landing/infrastructure/ui/constants/landing.constants";
import { FeatureCard } from "./FeatureCard";
import { SectionHeader } from "./SectionHeader";

const FEATURE_COUNT = PILLARS.reduce((n, p) => n + p.features.length, 0);

export const FeaturesSection = () => {
  return (
    <section id="features" className="container mx-auto scroll-mt-14 px-4 pt-20 sm:px-6 sm:pt-32">
      <SectionHeader
        index="03"
        label="features"
        meta={`${FEATURE_COUNT} entries`}
        title="Everything a service needs, from ship to govern"
      >
        Sixteen built-in capabilities across four pillars — the whole lifecycle of a
        deployment, managed from one dashboard.
      </SectionHeader>

      <div className="border-y border-border">
        {PILLARS.map((pillar) => (
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
