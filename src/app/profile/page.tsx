import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { NavBar } from "@/components/layout/nav-bar";
import { SoulCard } from "@/components/gallery/soul-card";
import { TerminalCard } from "@/components/ui/terminal-card";
import { TerminalBadge } from "@/components/ui/terminal-badge";
import { TerminalButton } from "@/components/ui/terminal-button";
import { getLocale } from "@/lib/i18n/get-locale";
import { messages } from "@/lib/i18n/messages";

// ============================================================
// My Profile / Dashboard Page — Server Component
// ============================================================

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = messages[locale];
  return {
    title: m.meta.myProfileTitle,
    description: m.meta.myProfileDescription,
  };
}

export default async function MyProfilePage() {
  const locale = await getLocale();
  const m = messages[locale];

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, created_at")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/");
  }

  const { data: souls } = await supabase
    .from("souls")
    .select(
      "slug, title, tagline, tags, likes_count, forks_count, avatar_url, personality_data, created_at, is_public"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const allSouls = souls ?? [];

  const totalLikes = allSouls
    .filter((s) => s.is_public)
    .reduce((sum, s) => sum + (s.likes_count ?? 0), 0);

  const displayName = profile.display_name ?? profile.username;

  const date = new Date(profile.created_at);
  const joinDateStr = m.profile.formatJoinDate(date.getFullYear(), date.getMonth() + 1);

  return (
    <div className="min-h-screen">
      <NavBar showBack backHref="/" backLabel={m.common.home} />

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8 animate-fade-in-up">
        <section className="flex flex-col items-center text-center space-y-4">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={displayName}
              className="w-20 h-20 terminal-border rounded-md"
              style={{ imageRendering: "pixelated" }}
            />
          ) : (
            <div className="w-20 h-20 bg-accent-primary terminal-border rounded-md flex items-center justify-center text-2xl text-white font-pixel">
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
            <TerminalBadge variant="purple">
              {m.common.souls} {allSouls.length}{m.common.count}
            </TerminalBadge>
            <TerminalBadge variant="pink">
              {m.common.likes} {totalLikes}
            </TerminalBadge>
          </div>

          <div className="flex gap-3 pt-2">
            <Link href={`/profile/${profile.username}`}>
              <TerminalButton variant="ghost" size="sm">
                {m.profile.viewPublicProfile}
              </TerminalButton>
            </Link>
          </div>
        </section>

        <div className="border-t-2 border-card-border" />

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-pixel text-xs text-text-primary">
              {m.profile.mySouls}
            </h2>
            <Link href="/create">
              <TerminalButton variant="primary" size="sm">
                {m.profile.createNew}
              </TerminalButton>
            </Link>
          </div>

          {allSouls.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allSouls.map((soul) => (
                <div key={soul.slug} className="relative">
                  {!soul.is_public && (
                    <div className="absolute top-2 right-2 z-[1]">
                      <TerminalBadge variant="default">{m.common.private}</TerminalBadge>
                    </div>
                  )}
                  <SoulCard soul={soul} locale={locale} />
                </div>
              ))}
            </div>
          ) : (
            <TerminalCard className="text-center py-12 space-y-4">
              <p className="font-pixel text-sm text-text-secondary">
                {m.profile.noSoulsYet}
              </p>
              <Link href="/create">
                <TerminalButton variant="primary" size="md">
                  {m.profile.createSoul} &rarr;
                </TerminalButton>
              </Link>
            </TerminalCard>
          )}
        </section>
      </main>
    </div>
  );
}
