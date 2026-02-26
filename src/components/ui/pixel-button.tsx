"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type PixelButtonVariant = "primary" | "secondary" | "ghost" | "pink" | "mint";
type PixelButtonSize = "sm" | "md" | "lg";

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PixelButtonVariant;
  size?: PixelButtonSize;
}

const variantStyles: Record<PixelButtonVariant, string> = {
  primary:
    "bg-accent-primary text-white pixel-border hover:brightness-110 active:pixel-border-pressed",
  secondary:
    "bg-accent-secondary text-white pixel-border hover:brightness-110 active:pixel-border-pressed",
  ghost:
    "bg-transparent text-text-primary border-2 border-text-primary hover:bg-accent-primary/10 active:translate-y-0.5",
  pink: "bg-accent-pink text-white pixel-border-pink hover:brightness-110 active:pixel-border-pressed",
  mint: "bg-accent-secondary text-white pixel-border hover:brightness-110 active:pixel-border-pressed",
};

const sizeStyles: Record<PixelButtonSize, string> = {
  sm: "px-3 py-1.5 text-[10px]",
  md: "px-5 py-2.5 text-xs",
  lg: "px-8 py-3.5 text-sm",
};

const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-pixel",
          "transition-all duration-150 ease-out cursor-pointer select-none",
          "hover:animate-bounce-pixel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

PixelButton.displayName = "PixelButton";

export { PixelButton };
export type { PixelButtonProps, PixelButtonVariant, PixelButtonSize };
