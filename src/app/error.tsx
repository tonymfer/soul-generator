"use client";

import Link from "next/link";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";
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
    <div className="min-h-screen gradient-pastel flex items-center justify-center px-4">
      <PixelCard className="max-w-md w-full text-center py-12 space-y-6">
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
          <PixelButton variant="primary" size="md" onClick={reset}>
            {m.error.retryButton}
          </PixelButton>
          <Link href="/">
            <PixelButton variant="ghost" size="md">
              {m.error.homeButton}
            </PixelButton>
          </Link>
        </div>
      </PixelCard>
    </div>
  );
}
