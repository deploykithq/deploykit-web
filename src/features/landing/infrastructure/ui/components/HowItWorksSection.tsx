import { m } from "framer-motion";
import { STEPS } from "@landing/infrastructure/ui/constants/landing.constants";

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <m.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary"
          >
            Workflow
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-3 font-display text-3xl font-bold text-bright sm:text-4xl md:text-5xl"
          >
            Four steps to <span className="text-gradient">production</span>
          </m.h2>
        </div>

        <div className="relative mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* animated connector line (desktop) */}
          <div className="pointer-events-none absolute top-7 left-[12%] right-[12%] hidden h-px lg:block">
            <div className="h-full w-full bg-[linear-gradient(90deg,transparent,hsl(var(--primary)/0.5),transparent)] bg-[length:200%_100%] animate-pipeline-flow" />
          </div>

          {STEPS.map((step, index) => (
            <m.div
              key={step.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group surface-card relative rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl surface-raised text-primary transition-colors group-hover:border-glow">
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="font-mono text-3xl font-bold text-foreground/10">
                  {step.step}
                </span>
              </div>

              <h3 className="mt-4 font-display text-base font-semibold text-bright">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};
