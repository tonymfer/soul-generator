"use client";

import { useRef, useState, useCallback } from "react";
import { Download, Check } from "lucide-react";
import { TerminalButton } from "@/components/ui";
import { useMessages } from "@/lib/i18n";

// ============================================================
// ShareCard — Screenshot-ready share card for ABTI souls
// Renders a terminal-styled card and allows saving as image
// ============================================================

interface ShareCardProps {
  title: string;
  tagline?: string | null;
  mbtiCode?: string | null;
  mbtiEmoji?: string | null;
  tags?: string[];
  avatarUrl?: string | null;
}

const TAG_COLORS = [
  { text: "text-accent-primary", border: "border-accent-primary/40", bg: "bg-accent-primary/10" },
  { text: "text-accent-pink", border: "border-accent-pink/40", bg: "bg-accent-pink/10" },
  { text: "text-accent-yellow", border: "border-accent-yellow/40", bg: "bg-accent-yellow/10" },
  { text: "text-accent-green", border: "border-accent-green/40", bg: "bg-accent-green/10" },
] as const;

export function ShareCard({
  title,
  tagline,
  mbtiCode,
  mbtiEmoji,
  tags = [],
  avatarUrl,
}: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const m = useMessages();

  const displayTags = tags.slice(0, 3);

  const handleSaveImage = useCallback(async () => {
    if (!cardRef.current || saving) return;

    setSaving(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const html2canvas = (await import(/* webpackIgnore: true */ "html2canvas" as string)).default as (
        element: HTMLElement,
        options?: Record<string, unknown>,
      ) => Promise<HTMLCanvasElement>;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#0a0a0f",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );

      if (!blob) throw new Error("Failed to create image blob");

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `abti-${title.toLowerCase().replace(/\s+/g, "-")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // html2canvas not installed or failed — silent fallback
    } finally {
      setSaving(false);
    }
  }, [saving, title]);

  return (
    <div className="space-y-4">
      {/* Section heading */}
      <h3 className="font-brand text-xs text-text-secondary tracking-wider uppercase">
        {m.shareCard.title}
      </h3>

      {/* Capturable card */}
      <div
        ref={cardRef}
        className="relative w-full overflow-hidden rounded-md"
        style={{ aspectRatio: "1200 / 630" }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a0a0f]" />

        {/* Pixel border frame */}
        <div
          className="absolute inset-0 rounded-md"
          style={{
            border: "3px solid #1a1a2e",
            boxShadow:
              "inset 0 0 0 1px #1a1a2e, inset 0 0 40px rgba(124, 110, 246, 0.05)",
          }}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent-primary/60 rounded-tl-md" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent-primary/60 rounded-tr-md" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent-primary/60 rounded-bl-md" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent-primary/60 rounded-br-md" />

        {/* Content container */}
        <div className="relative flex flex-col justify-between h-full p-5 sm:p-6">
          {/* Top: Terminal header bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Window dots */}
              <div className="flex gap-1.5">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent-red/80" />
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent-yellow/80" />
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent-green/80" />
              </div>
              {/* ABTI branding */}
              <span className="font-brand text-[8px] sm:text-[10px] text-accent-primary tracking-[0.2em] uppercase">
                ABTI
              </span>
            </div>
            <span className="font-mono text-[8px] sm:text-[10px] text-text-secondary/60 tracking-wider">
              agent behavior type indicator
            </span>
          </div>

          {/* Center: Soul identity */}
          <div className="flex items-center gap-4 sm:gap-6 flex-1 min-h-0">
            {/* Avatar */}
            {avatarUrl && (
              <div className="shrink-0 w-16 h-16 sm:w-24 sm:h-24 rounded-md overflow-hidden border border-card-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
            )}

            {/* Text content */}
            <div className="flex flex-col gap-2 min-w-0">
              {/* Terminal prompt + Soul name */}
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-mono text-accent-green text-xs sm:text-sm shrink-0">
                  {"> "}
                </span>
                <h2 className="font-brand text-sm sm:text-lg md:text-xl text-text-primary truncate">
                  {title}
                </h2>
              </div>

              {/* MBTI badge */}
              {mbtiCode && (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-text-secondary/40 text-xs">
                    {"$ "}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border font-mono text-xs sm:text-sm tracking-wider"
                    style={{
                      borderColor: "rgba(124, 110, 246, 0.4)",
                      background: "rgba(124, 110, 246, 0.08)",
                      color: "#7c6ef6",
                    }}
                  >
                    {mbtiEmoji && <span>{mbtiEmoji}</span>}
                    <span className="font-bold">{mbtiCode}</span>
                  </span>
                </div>
              )}

              {/* Tagline */}
              {tagline && (
                <p className="font-mono text-[10px] sm:text-xs text-text-secondary leading-relaxed line-clamp-2">
                  <span className="text-accent-pink/60">// </span>
                  {tagline}
                </p>
              )}
            </div>
          </div>

          {/* Bottom: Tags + URL */}
          <div className="flex items-end justify-between gap-4">
            {/* Tag badges */}
            <div className="flex flex-wrap gap-1.5 min-w-0">
              {displayTags.map((tag, i) => {
                const color = TAG_COLORS[i % TAG_COLORS.length];
                return (
                  <span
                    key={tag}
                    className={`inline-flex items-center px-2 py-0.5 text-[9px] sm:text-[10px] font-mono tracking-wider rounded border ${color.text} ${color.border} ${color.bg}`}
                  >
                    #{tag}
                  </span>
                );
              })}
            </div>

            {/* URL watermark */}
            <span className="font-brand text-[7px] sm:text-[8px] text-text-secondary/40 tracking-wider shrink-0">
              abti.app
            </span>
          </div>
        </div>

        {/* Subtle scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
          }}
        />
      </div>

      {/* Save button */}
      <div className="flex justify-center">
        <TerminalButton
          size="sm"
          variant={saved ? "secondary" : "primary"}
          onClick={handleSaveImage}
          disabled={saving}
          className="gap-2"
        >
          {saved ? (
            <>
              <Check size={14} />
              <span>{m.shareCard.saveImage}</span>
            </>
          ) : (
            <>
              <Download size={14} />
              <span>{m.shareCard.saveImage}</span>
            </>
          )}
        </TerminalButton>
      </div>
    </div>
  );
}
