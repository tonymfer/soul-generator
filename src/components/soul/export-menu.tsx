"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Download, ChevronDown, FileText, Code, Package, User } from "lucide-react";
import { useMessages } from "@/lib/i18n";

// ============================================================
// ExportMenu — pixel-styled dropdown for soul file exports
// ============================================================

interface ExportMenuProps {
  soulId: string;
  title: string;
}

export function ExportMenu({ soulId, title }: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const m = useMessages();

  const EXPORT_OPTIONS = [
    {
      format: "soul-md",
      label: m.exportMenu.soulMdDownload,
      icon: FileText,
      description: m.exportMenu.soulMdDesc,
    },
    {
      format: "claude-skill",
      label: m.exportMenu.claudeSkillDownload,
      icon: Code,
      description: m.exportMenu.claudeSkillDesc,
    },
    {
      format: "openclaw",
      label: m.exportMenu.openclawDownload,
      icon: Package,
      description: m.exportMenu.openclawDesc,
    },
    {
      format: "character-card",
      label: m.exportMenu.characterCardDownload,
      icon: User,
      description: m.exportMenu.characterCardDesc,
    },
  ];

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
        if (!res.ok) throw new Error("Export failed");

        const disposition = res.headers.get("Content-Disposition");
        let filename = `${title}-${format}`;
        if (disposition) {
          const match = disposition.match(/filename="?(.+?)"?$/);
          if (match) filename = match[1];
        }

        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = blobUrl;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();

        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
          document.body.removeChild(anchor);
        }, 100);
      } catch {
        // Silently fail
      } finally {
        setDownloading(null);
        setOpen(false);
      }
    },
    [soulId, title],
  );

  return (
    <div ref={menuRef} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={[
          "inline-flex items-center justify-center gap-1.5 font-mono",
          "px-3 py-1.5 text-[10px]",
          "bg-accent-secondary text-white terminal-border rounded-md",
          "hover:brightness-110 active:translate-y-0.5",
          "transition-all duration-150 ease-out cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2",
        ].join(" ")}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Download size={12} />
        <span>{m.exportMenu.exportButton}</span>
        <ChevronDown
          size={10}
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={[
            "absolute top-full right-0 mt-2 z-50",
            "min-w-[220px]",
            "bg-card-bg border-2 border-text-primary",
            "terminal-border-sm",
            "py-1",
            "animate-fade-in-up",
          ].join(" ")}
          role="menu"
        >
          <div className="px-3 py-2 border-b border-card-border">
            <span className="font-pixel text-[8px] text-text-secondary">
              {m.exportMenu.selectFormat}
            </span>
          </div>

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
                    isDownloading ? "" : ""
                  }`}
                />
                <div className="flex flex-col gap-0.5">
                  <span className="font-pixel text-[9px] text-text-primary leading-tight">
                    {isDownloading ? m.exportMenu.downloading : option.label}
                  </span>
                  <span className="font-pixel-accent text-[8px] text-text-secondary leading-tight">
                    {option.description}
                  </span>
                </div>
              </button>
            );
          })}

          <div className="px-3 py-1.5 border-t border-card-border">
            <span className="font-pixel text-[7px] text-text-secondary">
              {m.exportMenu.footer}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
