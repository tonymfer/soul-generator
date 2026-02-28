"use client";

import { useState, useCallback } from "react";
import { PixelButton } from "@/components/ui/pixel-button";
import { Copy, Check, MessageCircle } from "lucide-react";
import { useMessages } from "@/lib/i18n";

// ============================================================
// ShareButtons — SNS sharing buttons (X, KakaoTalk, Copy URL)
// ============================================================

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const m = useMessages();

  const getShareUrl = useCallback(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/soul/${slug}`;
  }, [slug]);

  const handleShareX = useCallback(() => {
    const url = getShareUrl();
    const text = `${title} ${m.shareButtons.shareText}`;
    const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(xShareUrl, "_blank", "noopener,noreferrer,width=550,height=420");
  }, [title, getShareUrl, m.shareButtons.shareText]);

  const handleShareKakao = useCallback(() => {
    const url = getShareUrl();
    const kakaoShareUrl = `https://story.kakao.com/share?url=${encodeURIComponent(url)}`;
    window.open(kakaoShareUrl, "_blank", "noopener,noreferrer,width=550,height=420");
  }, [getShareUrl]);

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
      <PixelButton
        variant="ghost"
        size="sm"
        onClick={handleShareX}
        className="gap-1.5"
        aria-label={m.shareButtons.shareOnX}
      >
        <XIcon />
        <span>X</span>
      </PixelButton>

      <PixelButton
        variant="ghost"
        size="sm"
        onClick={handleShareKakao}
        className="gap-1.5"
        aria-label={m.shareButtons.shareOnKakao}
      >
        <MessageCircle size={12} />
        <span>{m.shareButtons.kakao}</span>
      </PixelButton>

      <PixelButton
        variant="ghost"
        size="sm"
        onClick={handleCopyUrl}
        className="gap-1.5"
        aria-label={m.shareButtons.copyUrl}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        <span>{copied ? m.shareButtons.copied : m.shareButtons.copyUrl}</span>
      </PixelButton>
    </div>
  );
}

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
