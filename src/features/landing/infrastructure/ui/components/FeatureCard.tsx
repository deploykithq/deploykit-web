import { memo } from "react";

import type { FeatureI } from "@landing/infrastructure/ui/types/landing.module.types";

interface FeatureCardPropsI {
  feature: FeatureI;
}

/** A single man-page style row: name, description, optional [tag]. */
export const FeatureCard = memo(({ feature }: FeatureCardPropsI) => {
  return (
    <li className="group grid gap-x-6 gap-y-1 border-t border-border py-4 first:border-t-0 md:grid-cols-[13rem_minmax(0,1fr)_auto] md:items-baseline">
      <h4 className="font-mono text-sm font-semibold text-bright">
        <span aria-hidden className="mr-2 text-dim transition-colors group-hover:text-primary">
          ▸
        </span>
        {feature.title}
      </h4>
      <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
      {feature.tag ? (
        <span className="font-mono text-xs lowercase text-primary">[{feature.tag}]</span>
      ) : (
        <span aria-hidden className="hidden md:block" />
      )}
    </li>
  );
});

FeatureCard.displayName = "FeatureCard";
