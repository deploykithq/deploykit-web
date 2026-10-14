import { STEPS } from "@landing/infrastructure/ui/constants/landing.constants";
import { SectionHeader } from "./SectionHeader";

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="container mx-auto scroll-mt-14 px-4 pt-20 sm:px-6 sm:pt-32">
      <SectionHeader index="04" label="workflow" meta={`${STEPS.length} steps`} title="Four steps to production" />

      <div className="border border-border bg-surface-1 font-mono">
        <div className="flex items-center justify-between border-b border-border px-4 py-2 text-[11px] uppercase tracking-widest text-muted-foreground">
          <span>tty2 — ssh you@your-server</span>
          <span className="hidden text-dim sm:inline">bash</span>
        </div>

        <ol className="overflow-x-auto bg-background px-4 py-5 text-[13px] leading-6 sm:px-6 sm:text-sm">
          {STEPS.map((step, i) => (
            <li key={step.step} className={i > 0 ? "mt-6" : undefined}>
              <p className="text-dim">
                # <span className="text-muted-foreground">{step.step}</span> · {step.title}
              </p>
              <p className="text-dim"># {step.description}</p>
              {step.kind === "output" ? (
                <p className="whitespace-pre text-success">● live  {step.command}</p>
              ) : (
                <p className="whitespace-pre text-bright">
                  <span className="text-primary">$</span> {step.command}
                </p>
              )}
            </li>
          ))}
          <li className="mt-6" aria-hidden>
            <span className="text-primary">$</span>{" "}
            <span className="inline-block h-4 w-2 translate-y-0.5 bg-primary animate-caret-blink" />
          </li>
        </ol>
      </div>
    </section>
  );
};
