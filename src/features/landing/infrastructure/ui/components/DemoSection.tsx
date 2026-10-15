import React, { useState, useRef, useCallback } from "react";

import { SectionHeader } from "./SectionHeader";

import { useLandingCopy } from "@landing/infrastructure/ui/hooks/useLandingCopy";

export const DemoSection: React.FC = () => {
  const { demo } = useLandingCopy();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  return (
    <section id="demo" className="container mx-auto scroll-mt-14 px-4 pt-20 sm:px-6 sm:pt-32">
      <SectionHeader index="05" label={demo.label} title={demo.title} />

      <div className="border border-border bg-surface-1">
        <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[11px] uppercase tracking-widest">
          <span className="text-muted-foreground">{demo.caption}</span>
          <span className={isPlaying ? "text-success" : "text-dim"}>
            {isPlaying ? demo.playing : demo.stopped}
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
              type="button"
              onClick={handlePlay}
              className="group absolute inset-0 flex items-center justify-center bg-background/70"
              aria-label={demo.playLabel}
            >
              <span className="border border-primary bg-primary px-5 py-3 font-mono text-sm font-semibold text-primary-foreground transition-colors group-hover:bg-background group-hover:text-primary">
                {demo.play}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
