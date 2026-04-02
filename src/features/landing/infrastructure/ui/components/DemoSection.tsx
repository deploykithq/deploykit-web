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
    <section id="demo" className="relative py-20 sm:py-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-gradient-primary opacity-[0.04] blur-[150px]" />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="mb-10 sm:mb-16 text-center">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-bright sm:text-3xl md:text-4xl"
          >
            See DeployKit <span className="text-gradient">in action</span>
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-muted-foreground"
          >
            From creating a project to having your app running — in minutes.
          </m.p>
        </div>

        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-xl sm:rounded-2xl border border-border glow-primary"
        >
          <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-destructive/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <span className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs font-mono text-muted-foreground hidden sm:inline">
              deploykit.d1esports.pro
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
              >
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-primary glow-primary transition-transform hover:scale-110">
                  <Play className="h-6 w-6 text-primary-foreground ml-1" />
                </div>
              </button>
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
};
