"use client";

import { useRouter } from "next/navigation";
import { PixelButton, PixelCard, Sparkle } from "@/components/ui";
import { useMessages } from "@/lib/i18n";

export default function CreateEntryPage() {
  const router = useRouter();
  const m = useMessages();

  const steps = [
    { step: "1", label: m.create.step1Label, desc: m.create.step1Desc },
    { step: "2", label: m.create.step2Label, desc: m.create.step2Desc },
    { step: "3", label: m.create.step3Label, desc: m.create.step3Desc },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-fade-in-up">
      <PixelCard glow gradient className="max-w-md w-full text-center">
        <div className="relative flex flex-col items-center gap-6 p-4">
          <div className="relative text-5xl">
            <span role="img" aria-label="sparkles">
              {"✨"}
            </span>
            <Sparkle count={4} color="var(--accent-pink)" />
          </div>

          <h2 className="font-pixel text-sm sm:text-base text-text-primary leading-relaxed">
            {m.create.title1}
            <br />
            {m.create.title2}
          </h2>

          <p className="font-pixel text-[8px] sm:text-[9px] text-text-secondary leading-5 max-w-xs">
            {m.create.subtitle1}
            <br />
            {m.create.subtitle2}
          </p>

          <div className="flex flex-col gap-2 w-full text-left">
            {steps.map(({ step, label, desc }) => (
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

          <PixelButton
            size="lg"
            variant="primary"
            onClick={() => router.push("/create/phase-1")}
            className="w-full mt-2"
          >
            {m.create.startButton}
          </PixelButton>
        </div>
      </PixelCard>

      <p className="font-pixel text-[8px] text-text-secondary">
        {m.create.timeEstimate}
      </p>
    </div>
  );
}
