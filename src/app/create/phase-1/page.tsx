"use client";

import { useRouter } from "next/navigation";
import { useQuizState } from "@/hooks/use-quiz-state";
import { MBTISelector } from "@/components/quiz/mbti-selector";
import { TraitSlider } from "@/components/quiz/trait-slider";
import { PixelButton, PixelCard } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

const TRAIT_SLIDERS = [
  { key: "introversion" as const, left: "내향적", right: "외향적" },
  { key: "playfulness" as const, left: "차분한", right: "장난기" },
  { key: "logic" as const, left: "감성적", right: "논리적" },
  { key: "empathy" as const, left: "개인주의", right: "공감적" },
  { key: "chaos" as const, left: "질서정연", right: "자유분방" },
  { key: "formality" as const, left: "캐주얼", right: "포멀" },
];

export default function Phase1Page() {
  const router = useRouter();
  const { state, setPhase1, setCurrentPhase } = useQuizState();
  const { phase1 } = state;

  const handleMBTISelect = (code: string) => {
    setPhase1({ mbti: code });
  };

  const handleADHDToggle = () => {
    setPhase1({ adhd: !phase1.adhd });
  };

  const handleTraitChange = (key: keyof typeof phase1.traits, value: number) => {
    setPhase1({ traits: { ...phase1.traits, [key]: value } });
  };

  const handleNext = () => {
    setCurrentPhase(2);
    router.push("/create/phase-2");
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      {/* Section: MBTI */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-pixel text-xs sm:text-sm text-text-primary">
            {"MBTI 유형 선택"}
          </h2>
          <p className="font-pixel text-[8px] text-text-secondary">
            {"당신의 MBTI를 선택하세요. 모르면 건너뛸 수 있어요!"}
          </p>
        </div>
        <MBTISelector selected={phase1.mbti} onSelect={handleMBTISelect} />
      </section>

      {/* Section: ADHD */}
      <section className="flex flex-col gap-3">
        <h2 className="font-pixel text-xs sm:text-sm text-text-primary">
          {"ADHD 성향"}
        </h2>
        <PixelCard
          className={cn(
            "flex items-center justify-between p-4 cursor-pointer transition-all duration-200",
            phase1.adhd && "bg-accent-pink/10 pixel-border-pink",
          )}
          onClick={handleADHDToggle}
        >
          <div className="flex flex-col gap-1">
            <span className="font-pixel text-[10px] text-text-primary">
              {"ADHD 성향이 있나요?"}
            </span>
            <span className="font-pixel text-[8px] text-text-secondary">
              {"에이전트가 더 활발하고 자유로운 성격이 됩니다"}
            </span>
          </div>
          {/* Toggle */}
          <div
            className={cn(
              "relative w-12 h-6 pixel-border-sm transition-colors duration-200",
              phase1.adhd ? "bg-accent-pink" : "bg-card-bg",
            )}
          >
            <div
              className={cn(
                "absolute top-0.5 w-5 h-5 bg-white pixel-border-sm",
                "transition-all duration-200",
                phase1.adhd ? "left-[calc(100%-22px)]" : "left-0.5",
              )}
            />
          </div>
        </PixelCard>
      </section>

      {/* Section: Trait Sliders */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-pixel text-xs sm:text-sm text-text-primary">
            {"성격 슬라이더"}
          </h2>
          <p className="font-pixel text-[8px] text-text-secondary">
            {"슬라이더를 움직여서 성격을 세밀하게 조정하세요"}
          </p>
        </div>

        <PixelCard className="flex flex-col gap-5 p-5">
          {TRAIT_SLIDERS.map(({ key, left, right }) => (
            <TraitSlider
              key={key}
              leftLabel={left}
              rightLabel={right}
              value={phase1.traits[key]}
              onChange={(v) => handleTraitChange(key, v)}
            />
          ))}
        </PixelCard>
      </section>

      {/* Next button */}
      <div className="flex justify-end pt-2">
        <PixelButton
          size="lg"
          variant="primary"
          onClick={handleNext}
          className="w-full sm:w-auto"
        >
          {"다음 \u2192"}
        </PixelButton>
      </div>
    </div>
  );
}
