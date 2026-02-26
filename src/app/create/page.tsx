"use client";

import { useRouter } from "next/navigation";
import { PixelButton, PixelCard, Sparkle } from "@/components/ui";

export default function CreateEntryPage() {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-fade-in-up">
      <PixelCard glow gradient className="max-w-md w-full text-center">
        <div className="relative flex flex-col items-center gap-6 p-4">
          {/* Icon */}
          <div className="relative text-5xl">
            <span role="img" aria-label="sparkles">
              {"✨"}
            </span>
            <Sparkle count={4} color="var(--accent-pink)" />
          </div>

          {/* Title */}
          <h2 className="font-pixel text-sm sm:text-base text-text-primary leading-relaxed">
            {"나만의 AI 소울을"}
            <br />
            {"만들어보세요!"}
          </h2>

          {/* Description */}
          <p className="font-pixel text-[8px] sm:text-[9px] text-text-secondary leading-5 max-w-xs">
            {"MBTI와 성격 퀴즈를 기반으로"}
            <br />
            {"당신에게 딱 맞는 AI 에이전트를 생성합니다."}
          </p>

          {/* Steps preview */}
          <div className="flex flex-col gap-2 w-full text-left">
            {[
              { step: "1", label: "기본 성격 설정", desc: "MBTI + 성격 슬라이더" },
              { step: "2", label: "상황 퀴즈", desc: "5가지 재미있는 질문" },
              { step: "3", label: "마지막 터치", desc: "자유 텍스트 + 이름 짓기" },
            ].map(({ step, label, desc }) => (
              <div
                key={step}
                className="flex items-center gap-3 p-2 bg-bg-primary/50 rounded"
              >
                <span className="inline-flex items-center justify-center w-6 h-6 font-pixel text-[9px] bg-accent-primary text-white pixel-border-sm">
                  {step}
                </span>
                <div className="flex flex-col">
                  <span className="font-pixel text-[9px] text-text-primary">
                    {label}
                  </span>
                  <span className="font-pixel text-[7px] text-text-secondary">
                    {desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <PixelButton
            size="lg"
            variant="primary"
            onClick={() => router.push("/create/phase-1")}
            className="w-full mt-2"
          >
            {"시작하기"}
          </PixelButton>
        </div>
      </PixelCard>

      {/* Time estimate */}
      <p className="font-pixel text-[8px] text-text-secondary">
        {"약 3~5분 소요"}
      </p>
    </div>
  );
}
