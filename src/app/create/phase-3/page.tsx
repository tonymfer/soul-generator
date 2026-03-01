"use client";

import { useRouter } from "next/navigation";
import { useQuizState } from "@/hooks/use-quiz-state";
import { TerminalButton, TerminalCard, TerminalInput } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { useMessages } from "@/lib/i18n";

const MAX_FREETEXT_LENGTH = 500;

export default function Phase3Page() {
  const router = useRouter();
  const { state, setPhase3 } = useQuizState();
  const { phase3 } = state;
  const m = useMessages();

  const handleFreeTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPhase3({ freeText: e.target.value.slice(0, MAX_FREETEXT_LENGTH) });
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
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-sm text-text-primary leading-relaxed">
          {m.phase3.title1}<br />{m.phase3.title2}
        </h2>
        <p className="text-xs text-text-secondary">{m.phase3.subtitle}</p>
      </div>

      <TerminalCard title="enhancement" className="!p-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="free-text" className="text-xs text-text-secondary tracking-wider">
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
              "w-full px-4 py-3 text-sm leading-5",
              "bg-bg-primary text-text-primary rounded-md",
              "placeholder:text-text-secondary/40",
              "border border-card-border resize-none",
              "outline-none transition-all duration-200",
              "focus:border-accent-primary focus:glow-purple",
            )}
          />
          <div className="flex justify-end">
            <span className={cn("text-xs", phase3.freeText.length >= MAX_FREETEXT_LENGTH ? "text-accent-pink" : "text-text-secondary")}>
              {phase3.freeText.length} / {MAX_FREETEXT_LENGTH}
            </span>
          </div>
        </div>
      </TerminalCard>

      <TerminalCard title="identity" className="!p-5">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-text-secondary tracking-wider">{m.phase3.nameLabel}</span>
            <span className="text-xs text-text-secondary">{m.phase3.nameRequired}</span>
          </div>
          <TerminalInput
            id="soul-name"
            value={phase3.soulName}
            onChange={handleNameChange}
            placeholder={m.phase3.namePlaceholder}
            maxLength={30}
          />
        </div>
      </TerminalCard>

      <div className="flex justify-end pt-2">
        <TerminalButton size="lg" variant="primary" onClick={handleGenerate} disabled={!isValid} className="w-full sm:w-auto">
          {m.phase3.generateButton}
        </TerminalButton>
      </div>

      {!isValid && (
        <p className="text-xs text-accent-pink text-center">{m.phase3.nameValidation}</p>
      )}
    </div>
  );
}
