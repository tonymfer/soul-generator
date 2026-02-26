"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Download, ChevronDown, FileText, Code, Package, User } from "lucide-react";

// ============================================================
// ExportMenu — pixel-styled dropdown for soul file exports
// ============================================================

interface ExportMenuProps {
  soulId: string;
  title: string;
}

const EXPORT_OPTIONS = [
  {
    format: "soul-md",
    label: "SOUL.md 다운로드",
    icon: FileText,
    description: "마크다운 소울 파일",
  },
  {
    format: "claude-skill",
    label: "Claude Skill 다운로드",
    icon: Code,
    description: "Claude Code 스킬",
  },
  {
    format: "openclaw",
    label: "OpenClaw 패키지 다운로드",
    icon: Package,
    description: "OpenClaw 형식",
  },
  {
    format: "character-card",
    label: "Character Card 다운로드",
    icon: User,
    description: "SillyTavern 호환",
  },
] as const;

export function ExportMenu({ soulId, title }: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleDownload = useCallback(
    async (format: string) => {
      setDownloading(format);

      try {
        const url = `/api/soul/${soulId}/export?format=${format}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Export failed");
        }

        // Extract filename from Content-Disposition or generate one
        const disposition = res.headers.get("Content-Disposition");
        let filename = `${title}-${format}`;
        if (disposition) {
          const match = disposition.match(/filename="?(.+?)"?$/);
          if (match) filename = match[1];
        }

        // Create blob and trigger download
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = blobUrl;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();

        // Cleanup
        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
          document.body.removeChild(anchor);
        }, 100);
      } catch {
        // Silently fail — could add toast later
      } finally {
        setDownloading(null);
        setOpen(false);
      }
    },
    [soulId, title],
  );

  return (
    <div ref={menuRef} className="relative inline-flex">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={[
          "inline-flex items-center justify-center gap-1.5 font-pixel",
          "px-3 py-1.5 text-[10px]",
          "bg-accent-secondary text-white pixel-border",
          "hover:brightness-110 active:pixel-border-pressed",
          "transition-all duration-150 ease-out cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2",
        ].join(" ")}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Download size={12} />
        <span>내보내기</span>
        <ChevronDown
          size={10}
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className={[
            "absolute top-full right-0 mt-2 z-50",
            "min-w-[220px]",
            "bg-card-bg border-2 border-text-primary",
            "pixel-border-sm",
            "py-1",
            "animate-fade-in-up",
          ].join(" ")}
          role="menu"
        >
          {/* Header */}
          <div className="px-3 py-2 border-b border-card-border">
            <span className="font-pixel text-[8px] text-text-secondary">
              내보내기 형식 선택
            </span>
          </div>

          {/* Options */}
          {EXPORT_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isDownloading = downloading === option.format;

            return (
              <button
                key={option.format}
                type="button"
                role="menuitem"
                disabled={isDownloading}
                onClick={() => handleDownload(option.format)}
                className={[
                  "w-full flex items-start gap-2.5 px-3 py-2.5",
                  "text-left cursor-pointer",
                  "hover:bg-accent-primary/10 transition-colors duration-100",
                  "disabled:opacity-50 disabled:cursor-wait",
                ].join(" ")}
              >
                <Icon
                  size={14}
                  className={`mt-0.5 text-accent-primary shrink-0 ${
                    isDownloading ? "animate-bounce-pixel" : ""
                  }`}
                />
                <div className="flex flex-col gap-0.5">
                  <span className="font-pixel text-[9px] text-text-primary leading-tight">
                    {isDownloading ? "다운로드 중..." : option.label}
                  </span>
                  <span className="font-pixel-accent text-[8px] text-text-secondary leading-tight">
                    {option.description}
                  </span>
                </div>
              </button>
            );
          })}

          {/* Footer */}
          <div className="px-3 py-1.5 border-t border-card-border">
            <span className="font-pixel text-[7px] text-text-secondary">
              UTF-8 텍스트 파일
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
