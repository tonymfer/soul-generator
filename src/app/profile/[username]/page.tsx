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
import { getLocale } from "@/lib/i18n/get-locale";
import { messages } from "@/lib/i18n/messages";

// ============================================================
// Public User Profile Page — Server Component
// ============================================================

type PageProps = {
  params: Promise<{ username: string }>;
};

const getProfileByUsername = cache(async (username: string) => {
  const supabase = await createClient();
  return supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, created_at")
    .eq("username", username)
    .single();
});

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = await params;
  const locale = await getLocale();
  const m = messages[locale];
  const { data: profile } = await getProfileByUsername(username);

  if (!profile) {
    return { title: m.meta.profileNotFound };
  }

  const displayName = profile.display_name ?? profile.username;

  return {
    title: `${displayName}${m.meta.profileOf}`,
    description: m.meta.profileDescriptionOf.replace("{name}", displayName),
    openGraph: {
      title: `${displayName}${m.meta.profileOf}`,
      description: m.meta.profileDescriptionOf.replace("{name}", displayName),
    },
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;
  const locale = await getLocale();
  const m = messages[locale];
  const { data: profile, error } = await getProfileByUsername(username);

  if (error || !profile) {
    notFound();
  }

  const [souls, totalLikes] = await Promise.all([
    getUserSouls(profile.id),
    getUserTotalLikes(profile.id),
  ]);

  const displayName = profile.display_name ?? profile.username;

  const date = new Date(profile.created_at);
  const joinDateStr = m.profile.formatJoinDate(date.getFullYear(), date.getMonth() + 1);

  return (
    <div className="min-h-screen gradient-pastel">
      <NavBar showBack backHref="/gallery" backLabel={m.common.back} />

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8 animate-fade-in-up">
        <section className="flex flex-col items-center text-center space-y-4">
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

          <h1 className="font-pixel text-base sm:text-lg text-text-primary">
            {displayName}
          </h1>

          <p className="font-pixel-accent text-xs text-text-secondary">
            @{profile.username}
          </p>

          <p className="font-pixel text-[9px] text-text-secondary">
            {m.common.joinDate} {joinDateStr}
          </p>

          <div className="flex gap-3">
            <PixelBadge variant="purple">
              {m.common.souls} {souls.length}{m.common.count}
            </PixelBadge>
            <PixelBadge variant="pink">
              {m.common.likes} {totalLikes}
            </PixelBadge>
          </div>
        </section>

        <div className="border-t-2 border-card-border" />

        <section className="space-y-4">
          <h2 className="font-pixel text-xs text-text-primary">
            {m.profile.mySouls}
          </h2>

          {souls.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {souls.map((soul) => (
                <SoulCard key={soul.slug} soul={soul} locale={locale} />
              ))}
            </div>
          ) : (
            <PixelCard className="text-center py-12 space-y-4">
              <p className="font-pixel text-sm text-text-secondary">
                {m.profile.noSoulsYet}
              </p>
              <Link href="/create">
                <PixelButton variant="primary" size="md">
                  {m.profile.createSoul} &rarr;
                </PixelButton>
              </Link>
            </PixelCard>
          )}
        </section>
      </main>
    </div>
  );
}
