"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils/cn";

interface SparkleProps {
  /** Number of sparkle particles */
  count?: number;
  /** Container className */
  className?: string;
  /** Color of sparkles (CSS color) */
  color?: string;
}

/**
 * Deterministic sparkle positions so the component stays pure during render.
 * Uses a simple seed-based spread rather than Math.random().
 */
const SPARKLE_POSITIONS = [
  { top: 18, left: 12, durationOffset: 0 },
  { top: 72, left: 78, durationOffset: 0.2 },
  { top: 35, left: 55, durationOffset: 0.4 },
  { top: 60, left: 25, durationOffset: 0.1 },
  { top: 45, left: 88, durationOffset: 0.6 },
  { top: 80, left: 42, durationOffset: 0.3 },
  { top: 22, left: 68, durationOffset: 0.5 },
  { top: 55, left: 15, durationOffset: 0.7 },
] as const;

/**
 * Pure-CSS sparkle particle animation.
 * Renders N absolutely-positioned sparkle dots that fade in/out
 * at staggered intervals. Wrap around any element.
 */
function Sparkle({
  count = 5,
  className,
  color = "var(--accent-yellow)",
}: SparkleProps) {
  const particles = useMemo(
    () => SPARKLE_POSITIONS.slice(0, Math.min(count, SPARKLE_POSITIONS.length)),
    [count],
  );

  return (
    <span
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {particles.map((pos, i) => (
        <span
          key={i}
          className="absolute animate-sparkle"
          style={{
            top: `${pos.top}%`,
            left: `${pos.left}%`,
            width: "6px",
            height: "6px",
            backgroundColor: color,
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${1.2 + pos.durationOffset}s`,
          }}
        />
      ))}
    </span>
  );
}

export { Sparkle };
export type { SparkleProps };
