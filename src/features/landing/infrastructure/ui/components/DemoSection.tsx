import { m } from "framer-motion";
import { Play } from "lucide-react";
import { useState, useRef, useCallback } from "react";

export const DemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  return (
    <section id="demo" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-primary opacity-[0.05] blur-[150px]" />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <m.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary"
          >
            Live demo
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-3 font-display text-3xl font-bold text-bright sm:text-4xl md:text-5xl"
          >
            From repo to running — <span className="text-gradient">in minutes</span>
          </m.h2>
        </div>

        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="ring-gradient surface-raised mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl"
        >
          <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-destructive/60" />
            <span className="h-3 w-3 rounded-full bg-warning/60" />
            <span className="h-3 w-3 rounded-full bg-success/60" />
            <span className="ml-3 hidden font-mono text-xs text-muted-foreground sm:inline">
              deploykit · dashboard
            </span>
          </div>

          <div className="relative aspect-video bg-background">
            <video
              ref={videoRef}
              src="/demo.mp4"
              className="h-full w-full object-cover"
              onEnded={() => setIsPlaying(false)}
              controls={isPlaying}
              playsInline
              preload="none"
            />
            {!isPlaying && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm transition-colors hover:bg-background/30"
                aria-label="Play demo"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary glow-primary transition-transform hover:scale-110 sm:h-16 sm:w-16">
                  <Play className="ml-1 h-6 w-6 text-primary-foreground" />
                </span>
              </button>
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
};
