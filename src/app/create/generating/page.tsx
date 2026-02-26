"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuizState } from "@/hooks/use-quiz-state";
import { LoadingSpinner, Sparkle, PixelButton } from "@/components/ui";
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
  const router = useRouter();
  const { getFullInput, reset } = useQuizState();
  const [messageIndex, setMessageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const hasStarted = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Rotate through loading messages
  useEffect(() => {
    if (error) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [error]);

  // Trigger generation on mount
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const input = getFullInput();

    // Guard: if no quiz data, redirect back
    if (!input.soulName || !input.soulName.trim()) {
      router.replace("/create");
      return;
    }

    generateSoul(input);

    return () => {
      // Abort in-flight request on unmount
      abortControllerRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function generateSoul(input: ReturnType<typeof getFullInput>) {
    setError(null);

    // Abort any in-flight request before starting a new one
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch("/api/soul/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phase1Input: input.phase1Input,
          quizAnswers: input.quizAnswers,
          freeText: input.freeText,
          soulName: input.soulName,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        // On 401 (not authenticated), redirect to home where login is available
        if (response.status === 401) {
          router.replace("/");
          return;
        }

        const data = await response.json().catch(() => null);
        const message =
          data?.error ?? `서버 오류가 발생했습니다. (${response.status})`;

        throw new Error(message);
      }

      const { slug } = await response.json();

      // Clear quiz state after successful generation
      reset();

      // Navigate to the soul page
      router.push(`/soul/${slug}`);
    } catch (err) {
      // Ignore abort errors — they're expected on retry/unmount
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }

      const message =
        err instanceof Error
          ? err.message
          : "소울 생성에 실패했습니다. 다시 시도해주세요.";
      setError(message);
    }
  }

  function handleRetry() {
    hasStarted.current = false;
    setError(null);
    setMessageIndex(0);

    const input = getFullInput();
    if (!input.soulName || !input.soulName.trim()) {
      router.replace("/create");
      return;
    }

    hasStarted.current = true;
    generateSoul(input);
  }

  function handleGoBack() {
    router.push("/create/phase-3");
  }

  // Error state
  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 animate-fade-in-up">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <span className="text-4xl" role="img" aria-label="error">
            {"😢"}
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 max-w-xs text-center">
          <p className="font-pixel text-[10px] sm:text-xs text-accent-pink leading-relaxed">
            {error}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <PixelButton
            size="md"
            variant="primary"
            onClick={handleRetry}
          >
            {"다시 시도하기"}
          </PixelButton>
          <PixelButton
            size="md"
            variant="ghost"
            onClick={handleGoBack}
          >
            {"돌아가기"}
          </PixelButton>
        </div>
      </div>
    );
  }

  // Loading state
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
