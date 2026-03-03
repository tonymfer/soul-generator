"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuizState } from "@/hooks/use-quiz-state";
import { QuizQuestion } from "@/components/quiz/quiz-question";
import { QUIZ_QUESTIONS } from "@/lib/generators/quiz-scorer";
import { cn } from "@/lib/utils/cn";
import { useLocale, useMessages } from "@/lib/i18n";
import { messages as allMessages } from "@/lib/i18n/messages";

export default function Phase2Page() {
  const router = useRouter();
  const { state, setPhase2Answer, setCurrentPhase } = useQuizState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const m = useMessages();
  const locale = useLocale();

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  // Build localized question for display
  const quizMessages = allMessages[locale].quiz;
  const localizedQuestion = {
    ...currentQuestion,
    scenario: quizMessages[currentQuestion.id as keyof typeof quizMessages]?.scenario ?? currentQuestion.scenario,
    options: currentQuestion.options.map((opt, i) => ({
      ...opt,
      text: quizMessages[currentQuestion.id as keyof typeof quizMessages]?.options[i] ?? opt.text,
    })),
  };

  // Restore position based on already-answered questions
  useEffect(() => {
    const answeredCount = Object.keys(state.phase2).length;
    if (answeredCount > 0 && answeredCount < totalQuestions) {
      const firstUnanswered = QUIZ_QUESTIONS.findIndex(
        (q) => !state.phase2[q.id],
      );
      if (firstUnanswered >= 0) {
        setCurrentIndex(firstUnanswered);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelect = useCallback(
    (optionId: string) => {
      if (isTransitioning) return;

      setPhase2Answer(currentQuestion.id, optionId);
      setIsTransitioning(true);

      setTimeout(() => {
        if (currentIndex < totalQuestions - 1) {
          setCurrentIndex((prev) => prev + 1);
          setIsTransitioning(false);
        } else {
          setCurrentPhase(3);
          router.push("/create/phase-3");
        }
      }, 500);
    },
    [
      currentIndex,
      currentQuestion.id,
      isTransitioning,
      router,
      setCurrentPhase,
      setPhase2Answer,
      totalQuestions,
    ],
  );

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      {/* Overall progress dots */}
      <div className="flex items-center justify-center gap-2">
        {QUIZ_QUESTIONS.map((q, i) => (
          <div
            key={q.id}
            className={cn(
              "w-3 h-3 transition-all duration-300 terminal-border-sm",
              i < currentIndex && "bg-accent-primary",
              i === currentIndex && "bg-accent-pink scale-125",
              i > currentIndex && "bg-card-bg",
            )}
          />
        ))}
      </div>

      {/* Question card */}
      <div
        key={currentQuestion.id}
        aria-live="polite"
        className={cn(
          "animate-fade-in-up",
          isTransitioning && "opacity-50 pointer-events-none",
        )}
      >
        <QuizQuestion
          question={localizedQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          selectedOptionId={state.phase2[currentQuestion.id]}
          onSelect={handleSelect}
        />
      </div>

      {/* Hint */}
      <p className="font-pixel text-[8px] text-text-secondary text-center">
        {m.phase2.autoAdvanceHint}
      </p>
    </div>
  );
}
