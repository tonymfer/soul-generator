"use client";

import { useRouter } from "next/navigation";
import { GitFork } from "lucide-react";
import { PixelButton } from "@/components/ui/pixel-button";
import { useMessages } from "@/lib/i18n";

// ============================================================
// ForkButton — navigates to create page with fork param
// ============================================================

interface ForkButtonProps {
  soulSlug: string;
  forkCount: number;
}

export function ForkButton({ soulSlug, forkCount }: ForkButtonProps) {
  const router = useRouter();
  const m = useMessages();

  const handleFork = () => {
    router.push(`/create?fork=${soulSlug}`);
  };

  return (
    <PixelButton
      variant="ghost"
      size="sm"
      onClick={handleFork}
      className="gap-1.5"
    >
      <GitFork size={12} />
      <span>{m.fork.remix} {forkCount}</span>
    </PixelButton>
  );
}
