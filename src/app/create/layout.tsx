"use client";

import { usePathname, useRouter } from "next/navigation";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { cn } from "@/lib/utils/cn";
import { Sparkle } from "@/components/ui";

function getPhaseFromPath(pathname: string): 1 | 2 | 3 {
  if (pathname.includes("phase-3")) return 3;
  if (pathname.includes("phase-2")) return 2;
  return 1;
}

function isGeneratingPage(pathname: string): boolean {
  return pathname.includes("generating");
}

function isEntryPage(pathname: string): boolean {
  return pathname === "/create";
}

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const currentPhase = getPhaseFromPath(pathname);
  const showProgress = !isGeneratingPage(pathname) && !isEntryPage(pathname);
  const showBack = !isEntryPage(pathname) && !isGeneratingPage(pathname);

  const handleBack = () => {
    if (currentPhase === 1) {
      router.push("/create");
    } else if (currentPhase === 2) {
      router.push("/create/phase-1");
    } else {
      router.push("/create/phase-2");
    }
  };

  return (
    <div className="min-h-screen flex flex-col gradient-pastel">
      {/* Header */}
      <header className="relative flex items-center justify-center px-4 py-4 sm:py-5">
        {/* Back button */}
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2",
              "font-pixel text-[10px] text-text-secondary",
              "hover:text-accent-primary transition-colors duration-200",
              "cursor-pointer",
            )}
            aria-label="이전 단계로"
          >
            {"< 뒤로"}
          </button>
        )}

        {/* Branding */}
        <div className="relative">
          <h1 className="font-pixel-accent font-bold text-lg sm:text-xl text-accent-primary">
            ABTI
          </h1>
          <Sparkle count={3} color="var(--accent-yellow)" />
        </div>
      </header>

      {/* Progress bar */}
      {showProgress && (
        <div className="px-4 sm:px-8 pb-4 max-w-2xl mx-auto w-full">
          <QuizProgress currentPhase={currentPhase} />
        </div>
      )}

      {/* Content */}
      <main className="flex-1 flex flex-col px-4 sm:px-8 pb-8 max-w-2xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
