import { m } from "framer-motion";
import { ArrowRight, Check, Copy, Rocket } from "lucide-react";
import { useCallback, useState } from "react";
import { GITHUB_URL } from "@landing/infrastructure/ui/constants/landing.constants";

const INSTALL_CMD = "npm i -g @deploykit/cli && deploykit install";

export const CTASection = () => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard?.writeText(INSTALL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, []);

  return (
    <section id="cta" className="relative py-20 sm:py-28">
      <div className="container relative mx-auto px-4 sm:px-6">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="ring-gradient surface-raised grain relative mx-auto max-w-4xl overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-20"
        >
          {/* internal glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-primary opacity-20 blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 line-grid opacity-[0.4] mask-fade-b" />

          <div className="relative">
            <div className="mb-6 flex justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary glow-primary animate-float">
                <Rocket className="h-6 w-6 text-primary-foreground" />
              </span>
            </div>

            <h2 className="font-display text-3xl font-bold text-bright sm:text-4xl md:text-5xl">
              Own your <span className="text-gradient">deploys</span> today
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
              Open source, self-hosted, no limits. One command on any VPS and you're running.
            </p>

            {/* copyable install command */}
            <button
              onClick={copy}
              className="group mx-auto mt-8 flex w-full max-w-xl items-center gap-3 rounded-xl border border-border bg-[hsl(246_30%_4%)] px-4 py-3.5 text-left transition-colors hover:border-glow"
              aria-label="Copy install command"
            >
              <span className="font-mono text-sm text-success/70">$</span>
              <code className="min-w-0 flex-1 break-words font-mono text-xs text-foreground/90 sm:text-sm">
                {INSTALL_CMD}
              </code>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface-2 text-muted-foreground transition-colors group-hover:text-foreground">
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-success" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </span>
            </button>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:opacity-95 glow-primary sm:w-auto"
              >
                View on GitHub
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/docs"
                className="w-full rounded-xl surface-card px-8 py-4 text-center text-sm font-medium text-foreground transition-colors hover:border-glow sm:w-auto"
              >
                Read the docs
              </a>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
};
