import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type TerminalBadgeVariant =
  | "purple"
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "default";

interface TerminalBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TerminalBadgeVariant;
}

const variantStyles: Record<TerminalBadgeVariant, string> = {
  purple: "text-accent-primary border-accent-primary/40",
  pink: "text-accent-pink border-accent-pink/40",
  green: "text-accent-green border-accent-green/40",
  yellow: "text-accent-yellow border-accent-yellow/40",
  red: "text-accent-red border-accent-red/40",
  default: "text-text-secondary border-card-border",
};

const TerminalBadge = forwardRef<HTMLSpanElement, TerminalBadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2 py-0.5 text-xs tracking-wider",
          "border rounded font-mono",
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

TerminalBadge.displayName = "TerminalBadge";

export { TerminalBadge };
export type { TerminalBadgeProps, TerminalBadgeVariant };
