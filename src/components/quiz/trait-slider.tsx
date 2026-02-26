"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils/cn";

interface TraitSliderProps {
  /** Left side label */
  leftLabel: string;
  /** Right side label */
  rightLabel: string;
  /** Current value 0-1 */
  value: number;
  /** Change handler */
  onChange: (value: number) => void;
  className?: string;
}

/**
 * Custom pixel-styled range slider for trait selection.
 * Shows left/right labels and a pixel-art styled thumb/track.
 * Touch-friendly with a large enough hit area.
 */
function TraitSlider({
  leftLabel,
  rightLabel,
  value,
  onChange,
  className,
}: TraitSliderProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange],
  );

  // Calculate percentage for the gradient fill
  const percentage = value * 100;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Labels */}
      <div className="flex items-center justify-between">
        <span className="font-pixel text-[8px] sm:text-[9px] text-text-secondary">
          {leftLabel}
        </span>
        <span className="font-pixel text-[8px] sm:text-[9px] text-text-secondary">
          {rightLabel}
        </span>
      </div>

      {/* Slider */}
      <div className="relative w-full h-8 flex items-center">
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={value}
          onChange={handleChange}
          className="trait-slider w-full"
          style={
            {
              "--slider-fill": `${percentage}%`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}

export { TraitSlider };
export type { TraitSliderProps };
