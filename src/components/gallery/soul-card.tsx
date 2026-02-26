import Link from "next/link";
import { Heart, GitFork } from "lucide-react";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { AvatarDisplay } from "@/components/avatar";
import type { Soul } from "@/lib/supabase/types";
import type { TraitVector } from "@/lib/generators/types";

// ============================================================
// SoulCard — gallery grid card for displaying a soul summary
// ============================================================

interface SoulCardProps {
  soul: Pick<
    Soul,
    | "slug"
    | "title"
    | "tagline"
    | "tags"
    | "likes_count"
    | "forks_count"
    | "avatar_url"
    | "personality_data"
    | "created_at"
  >;
}

/** Format relative time in Korean */
function relativeTimeKo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffSec = Math.floor((now - then) / 1000);

  if (diffSec < 60) return "방금 전";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}시간 전`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}일 전`;
  const diffMon = Math.floor(diffDay / 30);
  if (diffMon < 12) return `${diffMon}개월 전`;
  const diffYr = Math.floor(diffMon / 12);
  return `${diffYr}년 전`;
}

export function SoulCard({ soul }: SoulCardProps) {
  // Extract traitVector from personality_data for avatar fallback
  const rawPersonality = soul.personality_data as Record<string, unknown> | null;
  const traitVector = rawPersonality?.traitVector
    ? (rawPersonality.traitVector as TraitVector)
    : null;

  // Show first 3 tags
  const displayTags = soul.tags?.slice(0, 3) ?? [];

  return (
    <Link href={`/soul/${soul.slug}`} className="block group">
      <PixelCard
        className="h-full p-4 transition-all duration-200 group-hover:glow-purple group-hover:-translate-y-0.5"
      >
        <div className="flex flex-col items-center text-center gap-3">
          {/* Avatar */}
          <AvatarDisplay
            avatarUrl={soul.avatar_url}
            traitVector={traitVector}
            size={64}
          />

          {/* Title */}
          <h3 className="font-pixel text-xs text-text-primary leading-relaxed line-clamp-1">
            {soul.title}
          </h3>

          {/* Tagline */}
          {soul.tagline && (
            <p className="font-pixel-accent text-[10px] text-text-secondary line-clamp-2 min-h-[2.5em]">
              {soul.tagline}
            </p>
          )}

          {/* Tags */}
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-center">
              {displayTags.map((tag) => (
                <PixelBadge key={tag} variant="pink">
                  {tag}
                </PixelBadge>
              ))}
            </div>
          )}

          {/* Stats row */}
          <div className="flex items-center gap-3 text-[8px] font-pixel text-text-secondary mt-auto pt-2">
            <span className="inline-flex items-center gap-1">
              <Heart size={10} />
              {soul.likes_count}
            </span>
            <span className="inline-flex items-center gap-1">
              <GitFork size={10} />
              {soul.forks_count}
            </span>
            <span>{relativeTimeKo(soul.created_at)}</span>
          </div>
        </div>
      </PixelCard>
    </Link>
  );
}
