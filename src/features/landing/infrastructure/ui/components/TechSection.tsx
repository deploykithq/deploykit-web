import { m } from "framer-motion";
import { TECHNOLOGIES } from "@landing/infrastructure/ui/constants/landing.constants";

export const TechSection = () => {
  // Duplicate the list so the marquee can loop seamlessly.
  const row = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <div className="container mx-auto mb-16 px-4 sm:mb-24 sm:px-6">
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8 text-center font-mono text-xs uppercase tracking-[0.25em] text-dim sm:mb-10"
      >
        Builds anything Nixpacks detects
      </m.p>

      <div className="group relative overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee items-center gap-10 group-hover:[animation-play-state:paused] sm:gap-16">
          {row.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex shrink-0 items-center gap-2.5"
              aria-hidden={i >= TECHNOLOGIES.length}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="h-7 w-7 opacity-55 transition-opacity hover:opacity-100 sm:h-8 sm:w-8"
                loading="lazy"
                width={32}
                height={32}
              />
              <span className="text-sm font-medium text-muted-foreground">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
