"use client";

import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface TerminalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Prompt prefix character (default: ">") */
  prompt?: string;
}

const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(
  ({ className, label, prompt = ">", id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={id}
            className="text-xs text-text-secondary tracking-wider"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <span className="absolute left-3 text-accent-primary text-sm pointer-events-none select-none">
            {prompt}
          </span>
          <input
            ref={ref}
            id={id}
            className={cn(
              "w-full pl-8 pr-4 py-2.5 font-mono text-sm",
              "bg-bg-primary text-text-primary placeholder:text-text-secondary/40",
              "border border-card-border rounded-md",
              "outline-none transition-all duration-200",
              "focus:border-accent-primary focus:glow-purple",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              className,
            )}
            {...props}
          />
        </div>
      </div>
    );
  },
);

TerminalInput.displayName = "TerminalInput";

export { TerminalInput };
export type { TerminalInputProps };
