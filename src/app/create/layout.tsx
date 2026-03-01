"use client";

import { usePathname, useRouter } from "next/navigation";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { cn } from "@/lib/utils/cn";
import { useMessages } from "@/lib/i18n";

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
  const m = useMessages();
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative flex items-center justify-center px-4 py-4 sm:py-5 border-b border-card-border">
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2",
              "text-xs text-text-secondary",
              "hover:text-accent-primary transition-colors duration-200",
              "cursor-pointer",
            )}
            aria-label={m.create.backAria}
          >
            {m.create.backButton}
          </button>
        )}

        <h1 className="font-brand text-lg sm:text-xl text-accent-primary">
          ABTI
        </h1>
      </header>

      {/* Progress bar */}
      {showProgress && (
        <div className="px-4 sm:px-8 pb-4 pt-4 max-w-2xl mx-auto w-full">
          <QuizProgress currentPhase={currentPhase} />
        </div>
      )}

      {/* Content */}
      <main id="main-content" className="flex-1 flex flex-col px-4 sm:px-8 pb-8 max-w-2xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
