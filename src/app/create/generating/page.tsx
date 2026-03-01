"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuizState } from "@/hooks/use-quiz-state";
import { TerminalSpinner, TerminalButton, TerminalCard } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { useMessages } from "@/lib/i18n";

export default function GeneratingPage() {
  const router = useRouter();
  const { getFullInput, reset } = useQuizState();
  const [messageIndex, setMessageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const hasStarted = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const m = useMessages();

  const loadingMessages = m.generating.messages;

  useEffect(() => {
    if (error) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [error, loadingMessages.length]);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    const input = getFullInput();
    if (!input.soulName || !input.soulName.trim()) {
      router.replace("/create");
      return;
    }
    generateSoul(input);
    return () => { abortControllerRef.current?.abort(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function generateSoul(input: ReturnType<typeof getFullInput>) {
    setError(null);
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
        if (response.status === 401) { router.replace("/"); return; }
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? `${m.generating.serverError} (${response.status})`);
      }

      const { slug } = await response.json();
      reset();
      router.push(`/soul/${slug}`);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : m.generating.defaultError);
    }
  }

  function handleRetry() {
    hasStarted.current = false;
    setError(null);
    setMessageIndex(0);
    const input = getFullInput();
    if (!input.soulName?.trim()) { router.replace("/create"); return; }
    hasStarted.current = true;
    generateSoul(input);
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 animate-fade-in-up">
        <TerminalCard title="error" className="max-w-sm w-full text-center">
          <pre className="text-accent-red text-xs mb-4 whitespace-pre-wrap">{error}</pre>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TerminalButton size="md" variant="primary" onClick={handleRetry}>
              {m.generating.retry}
            </TerminalButton>
            <TerminalButton size="md" variant="ghost" onClick={() => router.push("/create/phase-3")}>
              {m.generating.goBack}
            </TerminalButton>
          </div>
        </TerminalCard>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-fade-in-up">
      <TerminalCard title="generating" className="max-w-sm w-full">
        <div className="flex flex-col items-center gap-6">
          <TerminalSpinner message={loadingMessages[messageIndex]} />
          <div className="w-full space-y-1 text-xs text-text-secondary">
            <p className="text-accent-green">&gt; phase I: foundation... done</p>
            <p className="text-accent-green">&gt; phase II: refinement... done</p>
            <p className={cn("transition-colors", messageIndex > 2 ? "text-accent-green" : "text-text-secondary")}>
              &gt; phase III: enhancement...
            </p>
          </div>
          <p className="text-xs text-text-secondary text-center">{m.generating.pleaseWait}</p>
        </div>
      </TerminalCard>
    </div>
  );
}
