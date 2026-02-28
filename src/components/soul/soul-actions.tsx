"use client";

import { useState, useCallback } from "react";
import { PixelButton } from "@/components/ui/pixel-button";
import { Copy, Check, Share2 } from "lucide-react";
import { LikeButton } from "./like-button";
import { ForkButton } from "./fork-button";
import { ExportMenu } from "./export-menu";
import { useMessages } from "@/lib/i18n";

// ============================================================
// SoulActions — bottom action bar with copy, like, fork, share
// ============================================================

interface SoulActionsProps {
  systemPrompt: string;
  soulMd: string;
  likesCount: number;
  slug: string;
  liked: boolean;
  soulId: string;
  title: string;
  forksCount: number;
}

export function SoulActions({
  systemPrompt,
  soulMd,
  likesCount,
  slug,
  liked,
  soulId,
  title,
  forksCount,
}: SoulActionsProps) {
  const [promptCopied, setPromptCopied] = useState(false);
  const [soulMdCopied, setSoulMdCopied] = useState(false);
  const m = useMessages();

  const copyToClipboard = useCallback(
    async (text: string, setter: (v: boolean) => void) => {
      try {
        await navigator.clipboard.writeText(text);
        setter(true);
        setTimeout(() => setter(false), 2000);
      } catch {
        // Fallback: ignore
      }
    },
    []
  );

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/soul/${slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "ABTI Soul",
          url,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // Ignore
      }
    }
  }, [slug]);

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <PixelButton
        variant="primary"
        size="sm"
        onClick={() => copyToClipboard(systemPrompt, setPromptCopied)}
        className="gap-1.5"
      >
        {promptCopied ? <Check size={12} /> : <Copy size={12} />}
        <span>{promptCopied ? m.soulActions.copied : m.soulActions.copySystemPrompt}</span>
      </PixelButton>

      <PixelButton
        variant="secondary"
        size="sm"
        onClick={() => copyToClipboard(soulMd, setSoulMdCopied)}
        className="gap-1.5"
      >
        {soulMdCopied ? <Check size={12} /> : <Copy size={12} />}
        <span>{soulMdCopied ? m.soulActions.copied : m.soulActions.copySoulMd}</span>
      </PixelButton>

      <ExportMenu soulId={soulId} title={title} />

      <LikeButton
        soulId={soulId}
        initialLiked={liked}
        initialCount={likesCount}
      />

      <ForkButton
        soulSlug={slug}
        forkCount={forksCount}
      />

      <PixelButton
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="gap-1.5"
      >
        <Share2 size={12} />
        <span>{m.soulActions.share}</span>
      </PixelButton>
    </div>
  );
}
