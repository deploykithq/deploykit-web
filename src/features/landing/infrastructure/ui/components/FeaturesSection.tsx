import { m } from "framer-motion";
import { FEATURES } from "@landing/infrastructure/ui/constants/landing.constants";
import { FeatureCard } from "./FeatureCard";

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-10 sm:mb-16 text-center">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-bright sm:text-3xl md:text-4xl"
          >
            Everything you need to{" "}
            <span className="text-gradient">deploy</span>
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-muted-foreground"
          >
            Manage projects, applications and databases from a centralized dashboard.
          </m.p>
        </div>

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
