import { m } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@landing/infrastructure/ui/constants/landing.constants";

export const TestimonialsSection = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6">
      <m.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center font-display text-3xl font-bold text-bright sm:mb-14 sm:text-4xl"
      >
        Teams that left the <span className="text-gradient">rent behind</span>
      </m.h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <m.figure
            key={t.author}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="surface-card flex flex-col justify-between rounded-2xl p-6"
          >
            <Quote className="h-6 w-6 text-primary/40" />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary font-display text-xs font-bold text-primary-foreground">
                {t.initials}
              </span>
              <span>
                <span className="block text-sm font-semibold text-bright">{t.author}</span>
                <span className="block text-xs text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
          </m.figure>
        ))}
      </div>
    </div>
  );
};
