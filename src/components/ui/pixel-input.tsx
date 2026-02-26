"use client";

import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface PixelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const PixelInput = forwardRef<HTMLInputElement, PixelInputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={id}
            className="text-[10px] font-pixel text-text-secondary uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-2.5 font-pixel text-xs",
            "bg-card-bg text-text-primary placeholder:text-text-secondary/50",
            "pixel-border-sm",
            "outline-none transition-shadow duration-200",
            "focus:pixel-border-accent focus:glow-purple",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

PixelInput.displayName = "PixelInput";

export { PixelInput };
export type { PixelInputProps };
