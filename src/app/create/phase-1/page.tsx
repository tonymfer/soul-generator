"use client";

import { useRouter } from "next/navigation";
import { useQuizState, type Phase1Data } from "@/hooks/use-quiz-state";
import { MBTISelector } from "@/components/quiz/mbti-selector";
import { TraitSlider } from "@/components/quiz/trait-slider";
import { TerminalButton, TerminalCard } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { useMessages } from "@/lib/i18n";

export default function Phase1Page() {
  const router = useRouter();
  const { state, setPhase1, setCurrentPhase } = useQuizState();
  const { phase1 } = state;
  const m = useMessages();

  const TRAIT_SLIDERS = [
    { key: "introversion" as const, left: m.phase1.traitIntroversion, right: m.phase1.traitExtroversion },
    { key: "playfulness" as const, left: m.phase1.traitCalm, right: m.phase1.traitPlayful },
    { key: "logic" as const, left: m.phase1.traitEmotional, right: m.phase1.traitLogical },
    { key: "empathy" as const, left: m.phase1.traitIndividualistic, right: m.phase1.traitEmpathetic },
    { key: "chaos" as const, left: m.phase1.traitOrderly, right: m.phase1.traitCarefree },
    { key: "formality" as const, left: m.phase1.traitCasual, right: m.phase1.traitFormal },
  ];

  const handleMBTISelect = (code: string) => setPhase1({ mbti: code });
  const handleADHDChange = (subtype: Phase1Data["adhd"]) => setPhase1({ adhd: subtype });
  const handleTraitChange = (key: keyof typeof phase1.traits, value: number) => {
    setPhase1({ traits: { ...phase1.traits, [key]: value } });
  };

  const handleNext = () => {
    setCurrentPhase(2);
    router.push("/create/phase-2");
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      {/* MBTI */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm text-text-primary">{m.phase1.mbtiTitle}</h2>
          <p className="text-xs text-text-secondary">{m.phase1.mbtiSubtitle}</p>
        </div>
        <MBTISelector selected={phase1.mbti} onSelect={handleMBTISelect} />
      </section>

      {/* ADHD */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm text-text-primary">{m.phase1.adhdTitle}</h2>
          <p className="text-xs text-text-secondary">{m.phase1.adhdSubtitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {([
            { value: "none", label: m.phase1.adhdNone, desc: m.phase1.adhdNoneDesc },
            { value: "inattentive", label: m.phase1.adhdInattentive, desc: m.phase1.adhdInattentiveDesc },
            { value: "hyperactive", label: m.phase1.adhdHyperactive, desc: m.phase1.adhdHyperactiveDesc },
            { value: "combined", label: m.phase1.adhdCombined, desc: m.phase1.adhdCombinedDesc },
          ] as const).map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleADHDChange(opt.value)}
              className={cn(
                "flex flex-col gap-1 p-3 cursor-pointer rounded-md transition-all duration-200",
                "bg-card-bg border",
                phase1.adhd === opt.value
                  ? "border-accent-pink text-accent-pink glow-pink"
                  : "border-card-border hover:border-text-secondary",
              )}
            >
              <span className="text-xs text-text-primary">{opt.label}</span>
              <span className="text-xs text-text-secondary">{opt.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trait Sliders */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm text-text-primary">{m.phase1.sliderTitle}</h2>
          <p className="text-xs text-text-secondary">{m.phase1.sliderSubtitle}</p>
        </div>
        <TerminalCard className="!p-5">
          <div className="flex flex-col gap-5">
            {TRAIT_SLIDERS.map(({ key, left, right }) => (
              <TraitSlider
                key={key}
                leftLabel={left}
                rightLabel={right}
                value={phase1.traits[key]}
                onChange={(v) => handleTraitChange(key, v)}
              />
            ))}
          </div>
        </TerminalCard>
      </section>

      <div className="flex justify-end pt-2">
        <TerminalButton size="lg" variant="primary" onClick={handleNext} className="w-full sm:w-auto">
          {m.phase1.nextButton}
        </TerminalButton>
      </div>
    </div>
  );
}
