"use client";

import { cn } from "@/lib/utils/cn";

interface LoadingSpinnerProps {
  /** Number of bouncing dots */
  dotCount?: number;
  /** Size of each dot in px */
  dotSize?: number;
  className?: string;
}

/**
 * Kawaii loading animation: a row of bouncing pixel dots.
 */
function LoadingSpinner({
  dotCount = 3,
  dotSize = 8,
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("inline-flex items-end gap-1.5", className)}
      role="status"
      aria-label="Loading"
    >
      {Array.from({ length: dotCount }).map((_, i) => (
        <span
          key={i}
          className="animate-bounce-pixel"
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: [
              "var(--accent-primary)",
              "var(--accent-pink)",
              "var(--accent-yellow)",
              "var(--accent-secondary)",
            ][i % 4],
            animationDelay: `${i * 0.15}s`,
            imageRendering: "pixelated",
          }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export { LoadingSpinner };
export type { LoadingSpinnerProps };
