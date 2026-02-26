"use client";

import { useState, useCallback } from "react";
import { PixelButton } from "@/components/ui/pixel-button";
import { Copy, Check, MessageCircle } from "lucide-react";

// ============================================================
// ShareButtons — SNS sharing buttons (X, KakaoTalk, Copy URL)
// Uses share intent URLs — no external SDK packages needed.
// ============================================================

interface ShareButtonsProps {
  /** Soul display title for share text */
  title: string;
  /** Soul URL slug */
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = useCallback(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/soul/${slug}`;
  }, [slug]);

  // ── X (Twitter) Share ──
  const handleShareX = useCallback(() => {
    const url = getShareUrl();
    const text = `${title} - 나의 ABTI 소울을 확인해보세요!`;
    const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(xShareUrl, "_blank", "noopener,noreferrer,width=550,height=420");
  }, [title, getShareUrl]);

  // ── KakaoTalk Share ──
  const handleShareKakao = useCallback(() => {
    const url = getShareUrl();
    // Use Kakao's share URL scheme (no SDK needed)
    const kakaoShareUrl = `https://story.kakao.com/share?url=${encodeURIComponent(url)}`;
    window.open(kakaoShareUrl, "_blank", "noopener,noreferrer,width=550,height=420");
  }, [getShareUrl]);

  // ── Copy URL ──
  const handleCopyUrl = useCallback(async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: ignore
    }
  }, [getShareUrl]);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {/* X (Twitter) */}
      <PixelButton
        variant="ghost"
        size="sm"
        onClick={handleShareX}
        className="gap-1.5"
        aria-label="X(Twitter)에 공유"
      >
        <XIcon />
        <span>X</span>
      </PixelButton>

      {/* KakaoTalk */}
      <PixelButton
        variant="ghost"
        size="sm"
        onClick={handleShareKakao}
        className="gap-1.5"
        aria-label="카카오톡에 공유"
      >
        <MessageCircle size={12} />
        <span>카카오</span>
      </PixelButton>

      {/* Copy URL */}
      <PixelButton
        variant="ghost"
        size="sm"
        onClick={handleCopyUrl}
        className="gap-1.5"
        aria-label="URL 복사"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        <span>{copied ? "복사됨!" : "URL 복사"}</span>
      </PixelButton>
    </div>
  );
}

/** Simple X (formerly Twitter) icon — inline SVG to avoid extra dependencies */
function XIcon() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
