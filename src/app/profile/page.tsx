import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NavBar } from "@/components/layout/nav-bar";
import { SoulCard } from "@/components/gallery/soul-card";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { PixelButton } from "@/components/ui/pixel-button";

// ============================================================
// My Profile / Dashboard Page — Server Component
// Shows the current user's own profile including private souls.
// Redirects to home if not logged in.
// ============================================================

export const metadata: Metadata = {
  title: "내 프로필 | ABTI",
  description: "내 프로필과 소울을 관리하세요.",
};

/** Format join date in Korean */
function formatJoinDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}년 ${month}월`;
}

export default async function MyProfilePage() {
  const supabase = await createClient();

  // Check auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, created_at")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/");
  }

  // Fetch ALL souls (including private)
  const { data: souls } = await supabase
    .from("souls")
    .select(
      "slug, title, tagline, tags, likes_count, forks_count, avatar_url, personality_data, created_at, is_public"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const allSouls = souls ?? [];

  // Count total likes across all public souls
  const totalLikes = allSouls
    .filter((s) => s.is_public)
    .reduce((sum, s) => sum + (s.likes_count ?? 0), 0);

  const displayName = profile.display_name ?? profile.username;

  return (
    <div className="min-h-screen gradient-pastel">
      <NavBar showBack backHref="/" backLabel="홈으로" />

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8 animate-fade-in-up">
        {/* Profile Header */}
        <section className="flex flex-col items-center text-center space-y-4">
          {/* Avatar */}
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={displayName}
              className="w-20 h-20 pixel-border"
              style={{ imageRendering: "pixelated" }}
            />
          ) : (
            <div className="w-20 h-20 bg-accent-primary pixel-border flex items-center justify-center text-2xl text-white font-pixel">
              {displayName[0]?.toUpperCase() ?? "?"}
            </div>
          )}

          {/* Name */}
          <h1 className="font-pixel text-base sm:text-lg text-text-primary">
            {displayName}
          </h1>

          {/* Username */}
          <p className="font-pixel-accent text-xs text-text-secondary">
            @{profile.username}
          </p>

          {/* Join date */}
          <p className="font-pixel text-[9px] text-text-secondary">
            가입일: {formatJoinDate(profile.created_at)}
          </p>

          {/* Stats badges */}
          <div className="flex gap-3">
            <PixelBadge variant="purple">
              소울 {allSouls.length}개
            </PixelBadge>
            <PixelBadge variant="pink">
              좋아요 {totalLikes}
            </PixelBadge>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Link href={`/profile/${profile.username}`}>
              <PixelButton variant="ghost" size="sm">
                공개 프로필 보기
              </PixelButton>
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t-2 border-card-border" />

        {/* Soul Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-pixel text-xs text-text-primary">
              나의 소울들
            </h2>
            <Link href="/create">
              <PixelButton variant="primary" size="sm">
                새 소울 만들기
              </PixelButton>
            </Link>
          </div>

          {allSouls.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allSouls.map((soul) => (
                <div key={soul.slug} className="relative">
                  {!soul.is_public && (
                    <div className="absolute top-2 right-2 z-[1]">
                      <PixelBadge variant="default">비공개</PixelBadge>
                    </div>
                  )}
                  <SoulCard soul={soul} />
                </div>
              ))}
            </div>
          ) : (
            <PixelCard className="text-center py-12 space-y-4">
              <p className="font-pixel text-sm text-text-secondary">
                아직 소울이 없어요!
              </p>
              <Link href="/create">
                <PixelButton variant="primary" size="md">
                  소울 만들기 &rarr;
                </PixelButton>
              </Link>
            </PixelCard>
          )}
        </section>
      </main>
    </div>
  );
}
