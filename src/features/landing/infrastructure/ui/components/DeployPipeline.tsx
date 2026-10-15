import React, { memo, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { useLandingCopy } from "@landing/infrastructure/ui/hooks/useLandingCopy";

import { DEPLOY_LOG, PIPELINE_STAGES } from "@landing/infrastructure/ui/constants/landing.constants";

/** A qué etapa del pipeline pertenece cada línea de log emitida. */
const STAGE_FOR_LINE = [1, 1, 2, 2, 3, 3];

const TONE_CLASS: Record<string, string> = {
  dim: "text-dim",
  info: "text-foreground",
  ok: "text-success",
};

/**
 * Elemento distintivo: una tty en bruto que emite un deploy git push → build → deploy → live.
 * La sesión se repite en bucle; con reduced-motion muestra el estado final.
 */
export const DeployPipeline: React.FC = memo(() => {
  const { hero } = useLandingCopy();
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(reduce ? DEPLOY_LOG.length : 0);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (reduce) return;

    const schedule = (next: number) => {
      const full = next > DEPLOY_LOG.length;
      timer.current = setTimeout(
        () => {
          setRevealed(full ? 0 : next);
          schedule(full ? 1 : next + 1);
        },
        next === 0 ? 600 : full ? 2800 : 850,
      );
    };
    schedule(1);

    return () => clearTimeout(timer.current);
  }, [reduce]);

  const activeStage = revealed === 0 ? 0 : STAGE_FOR_LINE[revealed - 1];
  const allDone = revealed === DEPLOY_LOG.length;

  return (
    <div className="border border-border bg-surface-1 font-mono" aria-label={hero.pipelineLabel}>
      {/* barra de título */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2 text-[11px] uppercase tracking-widest">
        <span className="text-muted-foreground">tty1 — deploy</span>
        {allDone ? (
          <span className="text-success">{hero.healthy}</span>
        ) : (
          <span className="text-primary">{hero.deploying}</span>
        )}
      </div>

      {/* línea de estado de la etapa */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-border px-4 py-2.5 text-xs">
        {PIPELINE_STAGES.map((stage, i) => {
          const done = i < activeStage || (allDone && i === activeStage);
          const active = i === activeStage && !done;
          return (
            <span key={stage} className="flex items-center gap-2">
              <span
                className={done ? "text-success" : active ? "text-primary" : "text-dim"}
              >
                {done ? "✓" : active ? "▸" : "·"} {stage}
              </span>
              {i < PIPELINE_STAGES.length - 1 && (
                <span aria-hidden className="text-dim">
                  →
                </span>
              )}
            </span>
          );
        })}
      </div>

      {/* log en streaming */}
      <div className="bg-background px-4 py-4 text-xs leading-6 sm:text-[13px]">
        <p className="text-bright">
          <span className="text-primary">$</span> git push origin main
        </p>
        <div className="min-h-[9rem]">
          {DEPLOY_LOG.map((line, i) => {
            const shown = i < revealed;
            const isLast = i === revealed - 1;
            return (
              <p
                key={line.text}
                className={`overflow-hidden text-ellipsis whitespace-nowrap ${TONE_CLASS[line.tone]} ${
                  shown ? "" : "invisible"
                }`}
              >
                {line.text}
                {isLast && !reduce && (
                  <span
                    aria-hidden
                    className="ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-primary animate-caret-blink"
                  />
                )}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
});

DeployPipeline.displayName = "DeployPipeline";
