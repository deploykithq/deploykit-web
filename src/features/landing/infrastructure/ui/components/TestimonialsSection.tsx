import { m } from "framer-motion";
import { TESTIMONIALS } from "@landing/infrastructure/ui/constants/landing.constants";

export const TestimonialsSection = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6">
      <m.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 sm:mb-14 text-center text-2xl font-bold text-bright sm:text-3xl md:text-4xl"
      >
        What <span className="text-gradient">developers</span> say
      </m.h2>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="glass rounded-2xl p-6 flex flex-col justify-between"
          >
            <p className="text-sm leading-relaxed text-foreground/80 mb-6">
              "{t.quote}"
            </p>
            <div>
              <p className="text-sm font-semibold text-bright">{t.author}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </m.div>
        ))}
      </div>
    </div>
  );
};
