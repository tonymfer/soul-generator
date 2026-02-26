"use client";

import { cn } from "@/lib/utils/cn";
import { MBTI_TYPES } from "@/lib/constants/mbti";

interface MBTISelectorProps {
  selected: string;
  onSelect: (code: string) => void;
  className?: string;
}

/**
 * 4x4 responsive grid of all 16 MBTI types.
 * Each type is a pixel card with emoji + Korean name.
 * Includes a "skip" option for users who don't know their type.
 */
function MBTISelector({ selected, onSelect, className }: MBTISelectorProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {MBTI_TYPES.map((type) => {
          const isSelected = selected === type.code;
          return (
            <button
              key={type.code}
              type="button"
              onClick={() => onSelect(type.code)}
              className={cn(
                "relative flex flex-col items-center gap-1 p-3 sm:p-4",
                "bg-card-bg pixel-border-sm cursor-pointer",
                "transition-all duration-200 ease-out",
                "hover:scale-[1.03] hover:brightness-105",
                "active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary",
                isSelected && [
                  "pixel-border-accent",
                  "scale-[1.03]",
                  "animate-pulse-glow",
                  "bg-accent-primary/10",
                ],
              )}
            >
              <span className="text-xl sm:text-2xl" role="img" aria-label={type.nameEn}>
                {type.emoji}
              </span>
              <span className="font-pixel text-[9px] sm:text-[10px] font-bold text-text-primary">
                {type.code}
              </span>
              <span className="font-pixel text-[7px] sm:text-[8px] text-text-secondary text-center leading-tight">
                {type.nameKo}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skip option */}
      <button
        type="button"
        onClick={() => onSelect("")}
        className={cn(
          "w-full p-3 font-pixel text-[10px]",
          "bg-card-bg pixel-border-sm cursor-pointer",
          "text-text-secondary hover:text-text-primary",
          "transition-all duration-200",
          "hover:bg-accent-primary/5",
          selected === "" && [
            "pixel-border-accent",
            "text-accent-primary",
            "bg-accent-primary/10",
          ],
        )}
      >
        {"모르겠어요 (기본 설정으로 시작)"}
      </button>
    </div>
  );
}

export { MBTISelector };
export type { MBTISelectorProps };
