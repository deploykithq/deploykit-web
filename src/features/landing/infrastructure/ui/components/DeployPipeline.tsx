import { memo, useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import {
  DEPLOY_LOG,
  PIPELINE_STAGES,
} from "@landing/infrastructure/ui/constants/landing.constants";

/** Which pipeline stage each streamed log line belongs to. */
const STAGE_FOR_LINE = [1, 1, 2, 2, 3, 3];

const TONE_CLASS: Record<string, string> = {
  dim: "text-dim",
  info: "text-foreground/80",
  ok: "text-success",
};

/**
 * Signature element: a live mission-control view of a deploy travelling
 * git push → build → deploy → live, with a console that streams the log.
 * The whole thing loops; with reduced-motion it renders the finished state.
 */
export const DeployPipeline = memo(() => {
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
    <div className="ring-gradient surface-raised grain rounded-2xl p-4 sm:p-5">
      {/* window chrome */}
      <div className="flex items-center gap-2 pb-4">
        <span className="h-3 w-3 rounded-full bg-destructive/70" />
        <span className="h-3 w-3 rounded-full bg-warning/70" />
        <span className="h-3 w-3 rounded-full bg-success/70" />
        <span className="ml-2 font-mono text-[11px] text-dim">deploykit · production</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
          <span className="font-mono text-[10px] font-medium text-success">healthy</span>
        </span>
      </div>

      {/* pipeline nodes */}
      <div className="flex items-center justify-between gap-1 px-1 sm:px-2">
        {PIPELINE_STAGES.map((stage, i) => {
          const done = i < activeStage || (allDone && i === activeStage);
          const active = i === activeStage && !done;
          return (
            <div key={stage.id} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={[
                    "relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border transition-colors duration-500",
                    done
                      ? "border-success/40 bg-success/15 text-success animate-pulse-ring"
                      : active
                        ? "border-primary/50 bg-primary/15 text-primary glow-sm"
                        : "border-border bg-surface-2 text-muted-foreground",
                  ].join(" ")}
                >
                  {done ? (
                    <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <stage.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </div>
                <span
                  className={[
                    "font-mono text-[9px] sm:text-[10px] transition-colors duration-500",
                    done ? "text-success" : active ? "text-foreground" : "text-dim",
                  ].join(" ")}
                >
                  {stage.label}
                </span>
              </div>

              {i < PIPELINE_STAGES.length - 1 && (
                <div className="mx-1 sm:mx-2 mb-5 h-px flex-1 overflow-hidden rounded-full bg-border">
                  <div
                    className={[
                      "h-full rounded-full transition-all duration-700",
                      i < activeStage
                        ? "w-full bg-gradient-to-r from-success/70 to-success"
                        : active
                          ? "w-full bg-[linear-gradient(90deg,transparent,hsl(var(--primary)),transparent)] bg-[length:200%_100%] animate-pipeline-flow"
                          : "w-0",
                    ].join(" ")}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* streaming console */}
      <div className="mt-4 rounded-xl border border-border/70 bg-[hsl(246_30%_4%)] p-3 sm:p-4">
        <code className="block min-h-[8.5rem] sm:min-h-[9.5rem] font-mono text-[11px] sm:text-xs leading-6">
          {DEPLOY_LOG.map((line, i) => {
            const shown = i < revealed;
            const isLast = i === revealed - 1;
            return (
              <m.span
                key={line.text}
                initial={false}
                animate={{ opacity: shown ? 1 : 0.12, x: shown ? 0 : -4 }}
                transition={{ duration: 0.25 }}
                className={`block whitespace-nowrap overflow-hidden text-ellipsis ${TONE_CLASS[line.tone]}`}
              >
                {line.text}
                {isLast && !reduce && (
                  <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-primary animate-caret-blink" />
                )}
              </m.span>
            );
          })}
        </code>
      </div>
    </div>
  );
});

DeployPipeline.displayName = "DeployPipeline";
