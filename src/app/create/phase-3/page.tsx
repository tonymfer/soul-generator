"use client";

import { useRouter } from "next/navigation";
import { useQuizState } from "@/hooks/use-quiz-state";
import { PixelButton, PixelCard, PixelInput } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { useMessages } from "@/lib/i18n";

const MAX_FREETEXT_LENGTH = 500;

export default function Phase3Page() {
  const router = useRouter();
  const { state, setPhase3 } = useQuizState();
  const { phase3 } = state;
  const m = useMessages();

  const handleFreeTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, MAX_FREETEXT_LENGTH);
    setPhase3({ freeText: value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhase3({ soulName: e.target.value });
  };

  const handleGenerate = () => {
    if (!phase3.soulName.trim()) return;
    router.push("/create/generating");
  };

  const isValid = phase3.soulName.trim().length > 0;

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      {/* Title section */}
      <div className="flex flex-col gap-2 text-center">
        <h2 className="font-pixel text-xs sm:text-sm text-text-primary leading-relaxed">
          {m.phase3.title1}
          <br />
          {m.phase3.title2}
        </h2>
        <p className="font-pixel text-[8px] sm:text-[9px] text-text-secondary">
          {m.phase3.subtitle}
        </p>
      </div>

      {/* Free text area */}
      <PixelCard className="flex flex-col gap-3 p-5">
        <label
          htmlFor="free-text"
          className="font-pixel text-[9px] text-text-secondary uppercase tracking-wider"
        >
          {m.phase3.freeTextLabel}
        </label>
        <textarea
          id="free-text"
          value={phase3.freeText}
          onChange={handleFreeTextChange}
          maxLength={MAX_FREETEXT_LENGTH}
          rows={5}
          placeholder={m.phase3.freeTextPlaceholder}
          className={cn(
            "w-full px-4 py-3 font-pixel text-[10px] leading-5",
            "bg-bg-primary text-text-primary",
            "placeholder:text-text-secondary/40",
            "pixel-border-sm resize-none",
            "outline-none transition-shadow duration-200",
            "focus:pixel-border-accent focus:glow-purple",
          )}
        />
        <div className="flex justify-end">
          <span
            className={cn(
              "font-pixel text-[8px]",
              phase3.freeText.length >= MAX_FREETEXT_LENGTH
                ? "text-accent-pink"
                : "text-text-secondary",
            )}
          >
            {phase3.freeText.length} / {MAX_FREETEXT_LENGTH}
          </span>
        </div>
      </PixelCard>

      {/* Soul name input */}
      <PixelCard className="flex flex-col gap-3 p-5">
        <div className="flex flex-col gap-1">
          <span className="font-pixel text-[9px] text-text-secondary uppercase tracking-wider">
            {m.phase3.nameLabel}
          </span>
          <span className="font-pixel text-[7px] text-text-secondary">
            {m.phase3.nameRequired}
          </span>
        </div>
        <PixelInput
          id="soul-name"
          value={phase3.soulName}
          onChange={handleNameChange}
          placeholder={m.phase3.namePlaceholder}
          maxLength={30}
        />
      </PixelCard>

      {/* Generate button */}
      <div className="flex justify-end pt-2">
        <PixelButton
          size="lg"
          variant="pink"
          onClick={handleGenerate}
          disabled={!isValid}
          className="w-full sm:w-auto"
        >
          {m.phase3.generateButton}
        </PixelButton>
      </div>

      {/* Validation hint */}
      {!isValid && (
        <p className="font-pixel text-[8px] text-accent-pink text-center">
          {m.phase3.nameValidation}
        </p>
      )}
    </div>
  );
}
