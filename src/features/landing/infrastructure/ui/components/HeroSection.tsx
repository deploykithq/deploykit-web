import { m, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { useRef } from "react";

export const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const terminalY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <m.div style={{ y: bgY }} className="absolute inset-0 dot-grid opacity-40 will-change-transform" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-primary opacity-[0.07] blur-[120px]" />

      <div className="absolute top-[15%] left-[10%] h-2 w-2 rounded-full bg-primary/40 animate-float" />
      <div className="absolute top-[25%] right-[15%] h-3 w-3 rounded-full bg-primary/20 animate-float" />
      <div className="absolute bottom-[30%] left-[20%] h-1.5 w-1.5 rounded-full bg-primary/30 animate-float" />

      <m.div style={{ y: textY }} className="container relative mx-auto px-4 sm:px-6 text-center will-change-transform">
        {/* Above-fold content uses CSS animations for instant visibility (no JS delay = better LCP) */}
        <div className="mb-6 animate-hero-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-glow bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary animate-pulse-glow" />
            Open Source PaaS · Self-hosted
          </span>
        </div>

        <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-bright sm:text-5xl md:text-6xl lg:text-7xl animate-hero-fade-in" style={{ animationDelay: "0.15s" }}>
          Deploy your apps{" "}
          <span className="text-gradient">on your own server</span>
        </h1>

        <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed animate-hero-fade-in" style={{ animationDelay: "0.25s" }}>
          The platform that simplifies deploying applications, databases
          and services on your infrastructure. No vendor lock-in, full control.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-hero-fade-in" style={{ animationDelay: "0.35s" }}>
          <a
            href="#cta"
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#demo"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Terminal className="h-4 w-4" />
            Watch Demo
          </a>
        </div>

        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ y: terminalY }}
          className="mx-auto mt-10 sm:mt-16 max-w-lg will-change-transform"
        >
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-3 w-3 rounded-full bg-destructive/60" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <span className="h-3 w-3 rounded-full bg-green-500/60" />
            </div>
            <code className="block text-left font-mono text-xs sm:text-sm text-muted-foreground overflow-x-auto">
              <span className="text-dim">$</span>{" "}
              <span className="text-foreground whitespace-nowrap">curl -fsSL https://get.deploykit.es | sh</span>
              <span className="block text-dim my-1"># or via npm</span>
              <span className="text-dim">$</span>{" "}
              <span className="text-foreground whitespace-nowrap">npm i -g @deploykit/cli && deploykit install</span>
            </code>
          </div>
        </m.div>
      </m.div>
    </section>
  );
};
