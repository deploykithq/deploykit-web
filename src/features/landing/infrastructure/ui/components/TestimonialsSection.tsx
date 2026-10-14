import { TESTIMONIALS } from "@landing/infrastructure/ui/constants/landing.constants";
import { SectionHeader } from "./SectionHeader";

export const TestimonialsSection = () => {
  return (
    <section className="container mx-auto px-4 pt-20 sm:px-6 sm:pt-32">
      <SectionHeader index="06" label="field reports" title="Teams that left the rent behind" />

      <div className="grid border-l border-t border-border md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.author} className="flex flex-col justify-between border-b border-r border-border p-5 sm:p-6">
            <blockquote className="flex gap-3 text-base leading-relaxed text-foreground">
              <span aria-hidden className="font-mono text-primary">
                &gt;
              </span>
              <p>{t.quote}</p>
            </blockquote>
            <figcaption className="mt-6 font-mono text-xs">
              <span className="text-bright">— {t.author}</span>
              <span className="text-dim"> · {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
