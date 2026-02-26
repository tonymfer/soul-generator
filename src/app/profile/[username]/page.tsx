import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NavBar } from "@/components/layout/nav-bar";
import { SoulCard } from "@/components/gallery/soul-card";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { PixelButton } from "@/components/ui/pixel-button";

// ============================================================
// Public User Profile Page — Server Component
// Shows a user's public profile and their published souls.
// ============================================================

type PageProps = {
  params: Promise<{ username: string }>;
};

/** Cached profile fetcher — shared between generateMetadata & page */
const getProfileByUsername = cache(async (username: string) => {
  const supabase = await createClient();
  return supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, created_at")
    .eq("username", username)
    .single();
});

/** Fetch public souls for a user */
async function getUserSouls(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("souls")
    .select(
      "slug, title, tagline, tags, likes_count, forks_count, avatar_url, personality_data, created_at"
    )
    .eq("user_id", userId)
    .eq("is_public", true)
    .order("created_at", { ascending: false });
  return data ?? [];
}

/** Count total likes received on all of a user's public souls */
async function getUserTotalLikes(userId: string): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("souls")
    .select("likes_count")
    .eq("user_id", userId)
    .eq("is_public", true);
  if (!data) return 0;
  return data.reduce((sum, s) => sum + (s.likes_count ?? 0), 0);
}

// ============================================================
// SEO Metadata
// ============================================================

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = await params;
  const { data: profile } = await getProfileByUsername(username);

  if (!profile) {
    return { title: "프로필을 찾을 수 없어요 | ABTI" };
  }

  const displayName = profile.display_name ?? profile.username;

  return {
    title: `${displayName}의 프로필 | ABTI`,
    description: `${displayName}님의 AI 소울 컬렉션을 확인해보세요.`,
    openGraph: {
      title: `${displayName}의 프로필 | ABTI`,
      description: `${displayName}님의 AI 소울 컬렉션을 확인해보세요.`,
    },
  };
}

// ============================================================
// Page Component
// ============================================================

/** Format join date in Korean */
function formatJoinDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}년 ${month}월`;
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;
  const { data: profile, error } = await getProfileByUsername(username);

  if (error || !profile) {
    notFound();
  }

  const [souls, totalLikes] = await Promise.all([
    getUserSouls(profile.id),
    getUserTotalLikes(profile.id),
  ]);

  const displayName = profile.display_name ?? profile.username;

  return (
    <div className="min-h-screen gradient-pastel">
      <NavBar showBack backHref="/gallery" backLabel="돌아가기" />

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
              소울 {souls.length}개
            </PixelBadge>
            <PixelBadge variant="pink">
              좋아요 {totalLikes}
            </PixelBadge>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t-2 border-card-border" />

        {/* Soul Grid */}
        <section className="space-y-4">
          <h2 className="font-pixel text-xs text-text-primary">
            나의 소울들
          </h2>

          {souls.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {souls.map((soul) => (
                <SoulCard key={soul.slug} soul={soul} />
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
