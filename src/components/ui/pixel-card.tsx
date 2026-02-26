import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface PixelCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  gradient?: boolean;
}

const PixelCard = forwardRef<HTMLDivElement, PixelCardProps>(
  ({ className, glow = false, gradient = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative p-6 bg-card-bg pixel-border",
          "transition-shadow duration-300",
          gradient && "gradient-candy",
          glow && "hover:glow-purple",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

PixelCard.displayName = "PixelCard";

export { PixelCard };
export type { PixelCardProps };
