import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type PixelBadgeVariant =
  | "purple"
  | "pink"
  | "mint"
  | "yellow"
  | "default";

interface PixelBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: PixelBadgeVariant;
}

const variantStyles: Record<PixelBadgeVariant, string> = {
  purple: "bg-accent-primary/20 text-accent-primary border-accent-primary",
  pink: "bg-accent-pink/20 text-accent-pink border-accent-pink",
  mint: "bg-accent-secondary/20 text-accent-secondary border-accent-secondary",
  yellow: "bg-accent-yellow/20 text-amber-700 border-accent-yellow",
  default: "bg-text-primary/10 text-text-primary border-text-primary",
};

const PixelBadge = forwardRef<HTMLSpanElement, PixelBadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-1 font-pixel text-[8px] uppercase tracking-wider",
          "border-2",
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

PixelBadge.displayName = "PixelBadge";

export { PixelBadge };
export type { PixelBadgeProps, PixelBadgeVariant };
