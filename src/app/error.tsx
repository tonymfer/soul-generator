"use client";

import Link from "next/link";
import { TerminalCard } from "@/components/ui/terminal-card";
import { TerminalButton } from "@/components/ui/terminal-button";
import { useMessages } from "@/lib/i18n";

// ============================================================
// Custom Error Boundary — Pixel themed error page
// Must be a client component (Next.js requirement).
// ============================================================

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  const m = useMessages();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <TerminalCard className="max-w-md w-full text-center py-12 space-y-6">
        <p className="text-4xl" role="img" aria-label="error">
          &#x26A0;&#xFE0F;
        </p>

        <p className="font-pixel text-xs sm:text-sm text-text-primary">
          {m.error.title}
        </p>

        <p className="font-pixel-accent text-[10px] text-text-secondary">
          {m.error.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <TerminalButton variant="primary" size="md" onClick={reset}>
            {m.error.retryButton}
          </TerminalButton>
          <Link href="/">
            <TerminalButton variant="ghost" size="md">
              {m.error.homeButton}
            </TerminalButton>
          </Link>
        </div>
      </TerminalCard>
    </div>
  );
}
