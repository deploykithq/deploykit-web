import { GITHUB_URL } from "@landing/infrastructure/ui/constants/landing.constants";
import { InstallCommand } from "./InstallCommand";

export const CTASection = () => {
  return (
    <section id="cta" className="on-accent mt-20 scroll-mt-14 bg-primary text-primary-foreground sm:mt-32">
      <div className="container mx-auto grid gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-end lg:gap-16">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest">[07] get started</p>
          <h2 className="mt-6 font-mono text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
            Own your deploys today
          </h2>
          <p className="mt-4 max-w-md text-base font-medium sm:text-lg">
            Open source, self-hosted, no limits. One command on any VPS and you're running.
          </p>
        </div>

        <div>
          <InstallCommand variant="ink" />
          <div className="mt-4 grid gap-3 font-mono text-sm font-semibold sm:grid-cols-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary-foreground bg-primary-foreground px-5 py-3 text-center text-primary transition-colors hover:bg-transparent hover:text-primary-foreground"
            >
              view on github →
            </a>
            <a
              href="/docs"
              className="border-2 border-primary-foreground px-5 py-3 text-center transition-colors hover:bg-primary-foreground hover:text-primary"
            >
              read the docs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
