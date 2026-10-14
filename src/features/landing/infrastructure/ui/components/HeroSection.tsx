import { GITHUB_URL } from "@landing/infrastructure/ui/constants/landing.constants";
import { DeployPipeline } from "./DeployPipeline";
import { InstallCommand } from "./InstallCommand";

export const HeroSection = () => {
  return (
    <section className="border-b border-border pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="container mx-auto px-4 sm:px-6">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-primary">[00]</span>
          <span>open-source paas</span>
          <span aria-hidden className="text-dim">·</span>
          <span>self-hosted</span>
          <span aria-hidden className="text-dim">·</span>
          <span>mit</span>
        </p>

        <h1 className="mt-6 font-mono text-[2rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-bright sm:text-6xl lg:text-7xl xl:text-8xl">
          your own cloud,
          <br />
          <span className="underline decoration-primary decoration-[0.08em] underline-offset-[0.14em]">
            one git push
          </span>{" "}
          <span className="whitespace-nowrap">
            away
            <span
              aria-hidden
              className="ml-[0.08em] inline-block h-[0.85em] w-[0.5em] translate-y-[0.1em] bg-primary animate-caret-blink"
            />
          </span>
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              DeployKit runs apps, databases and services on your own servers — with
              auto-builds, SSL, real-time logs and backups. The open alternative to
              Vercel and Heroku, with zero vendor lock-in.
            </p>

            <div className="mt-8 max-w-xl">
              <InstallCommand />
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm">
              <a href="/docs" className="text-foreground underline-offset-4 hover:text-primary hover:underline">
                read the docs →
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                ★ star on github
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <DeployPipeline />
          </div>
        </div>
      </div>
    </section>
  );
};
