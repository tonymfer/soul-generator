"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type TerminalButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type TerminalButtonSize = "sm" | "md" | "lg";

interface TerminalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TerminalButtonVariant;
  size?: TerminalButtonSize;
}

const variantStyles: Record<TerminalButtonVariant, string> = {
  primary:
    "border-accent-primary text-accent-primary hover:bg-accent-primary/10 hover:glow-purple",
  secondary:
    "border-card-border text-text-secondary hover:border-text-secondary hover:text-text-primary",
  ghost:
    "border-transparent text-text-secondary hover:text-text-primary hover:bg-card-bg",
  danger:
    "border-accent-red text-accent-red hover:bg-accent-red/10",
};

const sizeStyles: Record<TerminalButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const TerminalButton = forwardRef<HTMLButtonElement, TerminalButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-mono",
          "border rounded-md",
          "transition-all duration-200 ease-out cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
          "disabled:opacity-40 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {variant === "primary" && (
          <span className="text-text-secondary mr-1.5" aria-hidden="true">
            &gt;
          </span>
        )}
        {children}
      </button>
    );
  },
);

TerminalButton.displayName = "TerminalButton";

export { TerminalButton };
export type { TerminalButtonProps, TerminalButtonVariant, TerminalButtonSize };
