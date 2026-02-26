"use client";

import { useState, useEffect } from "react";
import { LoadingSpinner, Sparkle } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

const LOADING_MESSAGES = [
  "소울을 분석하고 있어요...",
  "MBTI를 해석하는 중...",
  "성격 특성을 조합하고 있어요...",
  "당신만의 에이전트를 만드는 중...",
  "소울에 생명을 불어넣고 있어요...",
  "거의 다 됐어요!",
];

export default function GeneratingPage() {
  const [messageIndex, setMessageIndex] = useState(0);

  // Rotate through loading messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-fade-in-up">
      {/* Animated soul icon */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <span className="text-5xl animate-float" role="img" aria-label="soul">
          {"🔮"}
        </span>
        <Sparkle count={6} color="var(--accent-primary)" />
        <Sparkle count={4} color="var(--accent-pink)" className="scale-150" />
      </div>

      {/* Loading spinner */}
      <LoadingSpinner dotCount={4} dotSize={10} />

      {/* Rotating message */}
      <div className="h-8 flex items-center justify-center">
        <p
          key={messageIndex}
          className={cn(
            "font-pixel text-[10px] sm:text-xs text-text-primary text-center",
            "animate-fade-in-up",
          )}
        >
          {LOADING_MESSAGES[messageIndex]}
        </p>
      </div>

      {/* Subtle note */}
      <p className="font-pixel text-[7px] text-text-secondary text-center mt-4">
        {"잠시만 기다려주세요..."}
      </p>
    </div>
  );
}
