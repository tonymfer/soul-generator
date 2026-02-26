"use client";

import Link from "next/link";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";

// ============================================================
// Custom Error Boundary — Pixel themed error page
// Must be a client component (Next.js requirement).
// ============================================================

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen gradient-pastel flex items-center justify-center px-4">
      <PixelCard className="max-w-md w-full text-center py-12 space-y-6">
        {/* Error icon */}
        <p className="text-4xl" role="img" aria-label="error">
          &#x26A0;&#xFE0F;
        </p>

        {/* Message */}
        <p className="font-pixel text-xs sm:text-sm text-text-primary">
          문제가 발생했어요
        </p>

        <p className="font-pixel-accent text-[10px] text-text-secondary">
          잠시 후 다시 시도해주세요
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <PixelButton variant="primary" size="md" onClick={reset}>
            다시 시도
          </PixelButton>
          <Link href="/">
            <PixelButton variant="ghost" size="md">
              홈으로 돌아가기
            </PixelButton>
          </Link>
        </div>
      </PixelCard>
    </div>
  );
}
