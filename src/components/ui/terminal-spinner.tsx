"use client";

import { cn } from "@/lib/utils/cn";

interface TerminalSpinnerProps {
  /** Loading message (e.g., "creating soul") */
  message?: string;
  className?: string;
}

/**
 * Terminal-style loading indicator.
 * Displays: > {message}... with a blinking cursor.
 */
function TerminalSpinner({
  message = "loading",
  className,
}: TerminalSpinnerProps) {
  return (
    <div
      className={cn("inline-flex items-center font-mono text-sm", className)}
      role="status"
      aria-label="Loading"
    >
      <span className="text-accent-primary mr-2" aria-hidden="true">
        &gt;
      </span>
      <span className="text-text-secondary">{message}...</span>
      <span className="animate-blink text-accent-primary ml-0.5" aria-hidden="true">
        _
      </span>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export { TerminalSpinner };
export type { TerminalSpinnerProps };
