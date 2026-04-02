import { m } from "framer-motion";
import { TECHNOLOGIES } from "@landing/infrastructure/ui/constants/landing.constants";

export const TechSection = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 mb-16 sm:mb-28">
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8 sm:mb-10 text-center text-xs sm:text-sm font-medium uppercase tracking-widest text-muted-foreground"
      >
        Compatible with your favorite stack
      </m.p>

      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-12"
      >
        {TECHNOLOGIES.map((tech, i) => (
          <m.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="group flex flex-col items-center gap-2"
          >
            <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl glass p-2 sm:p-2.5 transition-all group-hover:border-glow group-hover:glow-sm">
              <img
                src={tech.icon}
                alt={tech.name}
                className="h-6 w-6 sm:h-8 sm:w-8 opacity-60 transition-opacity group-hover:opacity-100"
                loading="lazy"
                width={32}
                height={32}
              />
            </div>
            <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {tech.name}
            </span>
          </m.div>
        ))}
      </m.div>
    </div>
  );
};
