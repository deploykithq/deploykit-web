import { m, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Terminal } from "lucide-react";
import { useRef } from "react";
import { GITHUB_URL } from "@landing/infrastructure/ui/constants/landing.constants";
import { DeployPipeline } from "./DeployPipeline";

export const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      {/* ambient layers */}
      <m.div
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 line-grid opacity-[0.5] mask-fade-b will-change-transform"
      />
      <m.div
        style={{ y: orbY }}
        className="pointer-events-none absolute -top-20 right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-primary opacity-[0.12] blur-[130px] will-change-transform"
      />
      <div className="pointer-events-none absolute bottom-0 left-[-5%] h-[380px] w-[380px] rounded-full bg-success opacity-[0.06] blur-[120px]" />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          {/* ---- copy ---- */}
          <div className="min-w-0 text-center lg:text-left">
            <div className="animate-hero-fade-in" style={{ animationDelay: "0.05s" }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
                Open-source PaaS · Self-hosted · MIT
              </span>
            </div>

            <h1
              className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-bright sm:text-5xl lg:text-6xl xl:text-7xl animate-hero-fade-in"
              style={{ animationDelay: "0.12s" }}
            >
              Your own cloud,
              <br className="hidden sm:block" />{" "}
              <span className="text-gradient">one git push</span> away
            </h1>

            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0 animate-hero-fade-in"
              style={{ animationDelay: "0.22s" }}
            >
              DeployKit runs apps, databases and services on your own servers — with
              auto-builds, SSL, real-time logs and backups. The open alternative to
              Vercel and Heroku, with zero vendor lock-in.
            </p>

            <div
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start animate-hero-fade-in"
              style={{ animationDelay: "0.32s" }}
            >
              <a
                href="#cta"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-95 glow-primary sm:w-auto"
              >
                Get started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-xl surface-card px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-glow sm:w-auto"
              >
                <Star className="h-4 w-4 text-warning transition-transform group-hover:scale-110" />
                Star on GitHub
              </a>
            </div>

            {/* install one-liner */}
            <div
              className="mx-auto mt-6 flex max-w-md items-center gap-3 rounded-xl surface-card px-4 py-3 lg:mx-0 animate-hero-fade-in"
              style={{ animationDelay: "0.42s" }}
            >
              <Terminal className="h-4 w-4 shrink-0 text-primary" />
              <code className="flex-1 overflow-x-auto whitespace-nowrap text-left font-mono text-xs text-foreground/90">
                <span className="text-dim">$ </span>npm i -g @deploykit/cli && deploykit install
              </code>
            </div>
          </div>

          {/* ---- signature visual ---- */}
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: visualY }}
            className="min-w-0 will-change-transform"
          >
            <DeployPipeline />
          </m.div>
        </div>
      </div>
    </section>
  );
};
