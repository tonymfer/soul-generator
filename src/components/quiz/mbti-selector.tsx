"use client";

import { cn } from "@/lib/utils/cn";
import { MBTI_TYPES } from "@/lib/constants/mbti";
import { useLocale, useMessages } from "@/lib/i18n";

interface MBTISelectorProps {
  selected: string;
  onSelect: (code: string) => void;
  className?: string;
}

/**
 * 4x4 responsive grid of all 16 MBTI types.
 * Each type is a pixel card with emoji + localized name.
 * Includes a "skip" option for users who don't know their type.
 */
function MBTISelector({ selected, onSelect, className }: MBTISelectorProps) {
  const locale = useLocale();
  const m = useMessages();

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
                "bg-card-bg terminal-border-sm cursor-pointer",
                "transition-all duration-200 ease-out",
                "hover:scale-[1.03] hover:brightness-105",
                "active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary",
                isSelected && [
                  "terminal-border-accent",
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
                {locale === "ko" ? type.nameKo : type.nameEn}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onSelect("")}
        className={cn(
          "w-full p-3 font-pixel text-[10px]",
          "bg-card-bg terminal-border-sm cursor-pointer",
          "text-text-secondary hover:text-text-primary",
          "transition-all duration-200",
          "hover:bg-accent-primary/5",
          selected === "" && [
            "terminal-border-accent",
            "text-accent-primary",
            "bg-accent-primary/10",
          ],
        )}
      >
        {m.mbtiSelector.skip}
      </button>
    </div>
  );
}

export { MBTISelector };
export type { MBTISelectorProps };
