import { m } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";

export const CTASection = () => {
  return (
    <section id="cta" className="relative py-20 sm:py-32">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-primary opacity-[0.06] blur-[120px]" />

      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container relative mx-auto px-4 sm:px-6 text-center"
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary glow-primary animate-float">
              <Rocket className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-bright sm:text-3xl md:text-4xl">
            Start deploying <span className="text-gradient">today</span>
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-lg text-sm sm:text-base text-muted-foreground">
            Open source, self-hosted, no limits. Your infrastructure, your rules.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary"
            >
              View on GitHub
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/docs"
              className="w-full sm:w-auto rounded-xl border border-border bg-secondary px-8 py-4 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Documentation
            </a>
          </div>
        </div>
      </m.div>
    </section>
  );
};
