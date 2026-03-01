"use client";

import { cn } from "@/lib/utils/cn";
import { useMessages } from "@/lib/i18n";

interface QuizProgressProps {
  currentPhase: 1 | 2 | 3;
  className?: string;
}

/**
 * Progress bar across all 3 quiz phases.
 * Shows labels with current phase highlighted, completed phases with checkmark.
 */
function QuizProgress({ currentPhase, className }: QuizProgressProps) {
  const m = useMessages();

  const phases = [
    { phase: 1 as const, label: m.quizProgress.phase1 },
    { phase: 2 as const, label: m.quizProgress.phase2 },
    { phase: 3 as const, label: m.quizProgress.phase3 },
  ];

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Progress bar track */}
      <div className="relative w-full h-3 bg-card-bg pixel-border-sm overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-accent-primary transition-all duration-500 ease-out"
          style={{
            width: `${((currentPhase - 1) / 2) * 100}%`,
          }}
        />
        {/* Pixel grid overlay for retro feel */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.1) 50%)",
            backgroundSize: "4px 4px",
          }}
        />
      </div>

      {/* Phase labels */}
      <div className="flex items-center justify-between">
        {phases.map(({ phase, label }) => {
          const isCompleted = phase < currentPhase;
          const isCurrent = phase === currentPhase;

          return (
            <div
              key={phase}
              className={cn(
                "flex items-center gap-1.5",
                "transition-colors duration-200",
              )}
            >
              {/* Phase indicator dot */}
              <span
                className={cn(
                  "inline-flex items-center justify-center w-5 h-5",
                  "font-pixel text-[8px]",
                  "transition-all duration-200",
                  isCompleted && "bg-accent-primary text-white pixel-border-sm",
                  isCurrent &&
                    "bg-accent-pink text-white pixel-border-sm animate-pulse-glow",
                  !isCompleted && !isCurrent && "bg-card-bg text-text-secondary pixel-border-sm",
                )}
              >
                {isCompleted ? "\u2713" : phase}
              </span>

              {/* Label */}
              <span
                className={cn(
                  "hidden sm:inline font-pixel text-[8px]",
                  isCurrent && "text-accent-primary font-bold",
                  isCompleted && "text-accent-primary",
                  !isCompleted && !isCurrent && "text-text-secondary",
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { QuizProgress };
export type { QuizProgressProps };
