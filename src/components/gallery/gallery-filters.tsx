"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { PixelInput } from "@/components/ui/pixel-input";
import { cn } from "@/lib/utils/cn";

// ============================================================
// GalleryFilters — client component for search, sort, MBTI filter
// Updates URL search params (source of truth for filtering)
// ============================================================

const MBTI_CODES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
] as const;

const SORT_OPTIONS = [
  { value: "popular", label: "인기순" },
  { value: "recent", label: "최신순" },
] as const;

export function GalleryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentSort = searchParams.get("sort") ?? "popular";
  const currentMbti = searchParams.get("mbti") ?? "";
  const currentSearch = searchParams.get("search") ?? "";

  /** Build new URL with updated params */
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }

      // Reset to page 1 on filter change
      params.delete("page");

      router.push(`/gallery?${params.toString()}`);
    },
    [router, searchParams]
  );

  /** Keep a ref to the latest updateParams to avoid stale closures in the debounce timer */
  const updateParamsRef = useRef(updateParams);
  useEffect(() => {
    updateParamsRef.current = updateParams;
  }, [updateParams]);

  /** Debounced search update */
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        updateParamsRef.current({ search: value || null });
      }, 300);
    },
    []
  );

  /** Sort change */
  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      updateParams({ sort: e.target.value });
    },
    [updateParams]
  );

  /** MBTI chip toggle */
  const handleMbtiToggle = useCallback(
    (code: string) => {
      if (currentMbti === code) {
        // Deselect
        updateParams({ mbti: null });
      } else {
        updateParams({ mbti: code });
      }
    },
    [currentMbti, updateParams]
  );

  return (
    <div className="space-y-4">
      {/* Search + Sort row */}
      <div className="flex gap-3 items-end">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
            <Search size={14} />
          </div>
          <PixelInput
            placeholder="소울 검색..."
            defaultValue={currentSearch}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>

        <select
          value={currentSort}
          onChange={handleSortChange}
          className={cn(
            "px-3 py-2.5 font-pixel text-xs",
            "bg-card-bg text-text-primary",
            "pixel-border-sm cursor-pointer",
            "outline-none transition-shadow duration-200",
            "focus:pixel-border-accent focus:glow-purple"
          )}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* MBTI filter chips — horizontally scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {MBTI_CODES.map((code) => {
          const isActive = currentMbti === code;
          return (
            <button
              key={code}
              onClick={() => handleMbtiToggle(code)}
              className={cn(
                "flex-shrink-0 px-2.5 py-1 font-pixel text-[8px] uppercase tracking-wider",
                "border-2 transition-all duration-150 cursor-pointer select-none",
                isActive
                  ? "bg-accent-primary text-white border-accent-primary"
                  : "bg-card-bg text-text-secondary border-card-border hover:border-accent-primary/50 hover:text-text-primary"
              )}
            >
              {code}
            </button>
          );
        })}
      </div>
    </div>
  );
}
