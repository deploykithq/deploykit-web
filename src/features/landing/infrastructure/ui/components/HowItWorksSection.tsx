import { m } from "framer-motion";
import { STEPS } from "@landing/infrastructure/ui/constants/landing.constants";

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-10 sm:mb-16 text-center">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-bright sm:text-3xl md:text-4xl"
          >
            It's that <span className="text-gradient">simple</span>
          </m.h2>
        </div>

        <div className="relative mx-auto grid max-w-4xl gap-6 sm:gap-8 grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-12 left-[10%] right-[10%] hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />

          {STEPS.map((step, index) => (
            <m.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              <div className="relative mx-auto mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl glass border-glow">
                <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <span className="mb-2 block font-mono text-xs text-primary">
                {step.step}
              </span>
              <h3 className="mb-2 text-sm font-semibold text-bright">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};
