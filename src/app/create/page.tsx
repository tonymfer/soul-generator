"use client";

import { useRouter } from "next/navigation";
import { TerminalButton, TerminalCard } from "@/components/ui";
import { useMessages } from "@/lib/i18n";

export default function CreateEntryPage() {
  const router = useRouter();
  const m = useMessages();

  const steps = [
    { step: "I", label: m.create.step1Label, desc: m.create.step1Desc },
    { step: "II", label: m.create.step2Label, desc: m.create.step2Desc },
    { step: "III", label: m.create.step3Label, desc: m.create.step3Desc },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-fade-in-up">
      <TerminalCard title="new-soul" glow className="max-w-md w-full text-center">
        <div className="flex flex-col items-center gap-6">
          <pre className="text-accent-primary text-sm">
            {`> soul creation protocol\n> 3 phases required`}
          </pre>

          <h2 className="font-brand text-xs sm:text-sm text-text-primary leading-relaxed">
            {m.create.title1}
            <br />
            {m.create.title2}
          </h2>

          <p className="text-xs text-text-secondary leading-5 max-w-xs">
            {m.create.subtitle1}
            <br />
            {m.create.subtitle2}
          </p>

          <div className="flex flex-col gap-2 w-full text-left">
            {steps.map(({ step, label, desc }) => (
              <div
                key={step}
                className="flex items-center gap-3 p-2 bg-bg-primary rounded border border-card-border"
              >
                <span className="inline-flex items-center justify-center w-8 h-6 text-xs text-accent-primary border border-accent-primary/40 rounded">
                  {step}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs text-text-primary">{label}</span>
                  <span className="text-xs text-text-secondary">{desc}</span>
                </div>
              </div>
            ))}
          </div>

          <TerminalButton
            size="lg"
            variant="primary"
            onClick={() => router.push("/create/phase-1")}
            className="w-full mt-2"
          >
            {m.create.startButton}
          </TerminalButton>
        </div>
      </TerminalCard>

      <p className="text-xs text-text-secondary">{m.create.timeEstimate}</p>
    </div>
  );
}
