import { memo, useRef } from "react";
import { m, useInView } from "framer-motion";
import type { FeatureI } from "@landing/infrastructure/ui/types/landing.module.types";

interface FeatureCardPropsI {
  feature: FeatureI;
  index: number;
}

export const FeatureCard = memo(({ feature, index }: FeatureCardPropsI) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass rounded-2xl p-6 transition-all hover:border-glow hover:glow-sm"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary opacity-80 group-hover:opacity-100 transition-opacity">
        <feature.icon className="h-5 w-5 text-primary-foreground" />
      </div>
      <h3 className="mb-2 text-base font-semibold text-bright">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {feature.description}
      </p>
    </m.div>
  );
});

FeatureCard.displayName = "FeatureCard";
