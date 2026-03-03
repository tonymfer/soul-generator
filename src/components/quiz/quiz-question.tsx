"use client";

import { cn } from "@/lib/utils/cn";
import type { QuizQuestion as QuizQuestionType } from "@/lib/generators/types";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  selectedOptionId: string | undefined;
  onSelect: (optionId: string) => void;
  className?: string;
}

/**
 * Displays a single situational quiz question with 4 option cards.
 * Selected option is highlighted with glow animation.
 */
function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedOptionId,
  onSelect,
  className,
}: QuizQuestionProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Question counter */}
      <div className="flex items-center gap-2">
        <span className="font-pixel text-[10px] text-accent-primary">
          Q{questionNumber}
        </span>
        <span className="font-pixel text-[8px] text-text-secondary">
          / {totalQuestions}
        </span>
      </div>

      {/* Scenario text */}
      <p className="font-pixel text-[10px] sm:text-xs leading-6 text-text-primary">
        {question.scenario}
      </p>

      {/* Options grid */}
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={cn(
                "w-full p-4 text-left min-h-[44px]",
                "bg-card-bg terminal-border-sm cursor-pointer",
                "transition-all duration-200 ease-out",
                "hover:scale-[1.01] hover:brightness-105",
                "active:scale-[0.99]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary",
                isSelected && [
                  "terminal-border-accent",
                  "bg-accent-primary/10",
                  "scale-[1.02]",
                  "ring-2 ring-accent-primary/50",
                  "glow-purple",
                ],
              )}
            >
              <span className="font-pixel text-[9px] sm:text-[10px] leading-5 text-text-primary">
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { QuizQuestion };
export type { QuizQuestionProps };
