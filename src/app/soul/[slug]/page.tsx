import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { checkUserLike } from "@/actions/like";
import { getMBTIType } from "@/lib/constants/mbti";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { MBTI_ICONS } from "@/lib/constants/mbti-icons";
import { Sparkle } from "@/components/ui/sparkle";
import {
  TraitDisplay,
  SoulMdViewer,
  SystemPromptViewer,
  SampleConversations,
  SoulActions,
  ShareButtons,
  ShareCard,
} from "@/components/soul";
import { AvatarDisplay } from "@/components/avatar";
import { LocaleToggle } from "@/components/layout/locale-toggle";
import { getLocale } from "@/lib/i18n/get-locale";
import { messages } from "@/lib/i18n/messages";
import type { TraitVector, AIEnhancement } from "@/lib/generators/types";

// ============================================================
// Cached soul fetcher — shared between generateMetadata & page
// ============================================================

const getSoulBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  return supabase
    .from("souls")
    .select("id, slug, title, tagline, personality_data, soul_md, system_prompt, sample_conversations, avatar_url, og_image_url, is_public, likes_count, forks_count, views_count, tags, created_at")
    .eq("slug", slug)
    .eq("is_public", true)
    .single();
});

// ============================================================
// Dynamic metadata for SEO / link previews
// ============================================================

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data: soul } = await getSoulBySlug(slug);

  if (!soul) {
    return { title: "Soul Not Found | ABTI" };
  }

  const description = soul.tagline
    ? `${soul.title} - ${soul.tagline}`
    : `${soul.title} | ABTI Soul`;

  return {
    title: `${soul.title} | ABTI`,
    description,
    openGraph: {
      title: `${soul.title} | ABTI`,
      description,
      ...(soul.og_image_url ? { images: [{ url: soul.og_image_url }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${soul.title} | ABTI`,
      description,
    },
  };
}

// ============================================================
// Soul Detail Page — Server Component
// ============================================================

export default async function SoulDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const { data, error } = await getSoulBySlug(slug);

  if (error || !data) {
    notFound();
  }

  const soul = data;
  const locale = await getLocale();
  const m = messages[locale];

  // Check if current user has liked this soul
  const userLiked = await checkUserLike(soul.id);

  // Fire-and-forget: increment views_count
  incrementViews(soul.id).catch(() => {
    // Ignore view count errors
  });

  // Parse personality data with runtime validation
  const rawPersonality = soul.personality_data as Record<string, unknown> | null;
  const traitVector = rawPersonality?.traitVector
    ? rawPersonality.traitVector as TraitVector
    : null;
  const aiEnhancement = rawPersonality?.aiEnhancement
    ? rawPersonality.aiEnhancement as AIEnhancement
    : undefined;

  // Parse sample conversations with Array.isArray guard
  const rawConversations = soul.sample_conversations;
  const sampleConversations = Array.isArray(rawConversations)
    ? rawConversations.filter(Array.isArray) as { role: string; content: string }[][]
    : [];

  // Get MBTI info for display
  const mbtiInfo = traitVector ? getMBTIType(traitVector.mbti) : undefined;

  return (
    <div className="min-h-screen gradient-pastel">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b-2 border-card-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/gallery"
            className="font-pixel text-[10px] text-text-secondary hover:text-accent-primary transition-colors"
          >
            &larr; {m.soulDetail.toGallery}
          </Link>
          <span className="font-pixel text-xs text-accent-primary">ABTI</span>
          <LocaleToggle />
        </div>
      </header>

      {/* Content */}
      <main id="main-content" className="max-w-2xl mx-auto px-4 py-8 space-y-6 animate-fade-in-up">
        {/* Avatar + Title Section */}
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <AvatarDisplay
              avatarUrl={soul.avatar_url}
              traitVector={traitVector}
              size={96}
            />
            <Sparkle count={4} color="var(--accent-yellow)" />
          </div>

          <h1 className="font-pixel text-lg sm:text-xl text-text-primary leading-relaxed text-balance">
            {soul.title}
          </h1>

          {soul.tagline && (
            <p className="font-pixel-accent text-sm text-text-secondary max-w-md">
              {soul.tagline}
            </p>
          )}

          {soul.tags && soul.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {mbtiInfo && (
                <PixelBadge variant="purple">
                  {MBTI_ICONS[mbtiInfo.code] ? (
                    <svg viewBox="0 0 16 16" width={14} height={14} className="inline-block mr-1" aria-hidden="true">
                      {MBTI_ICONS[mbtiInfo.code]}
                    </svg>
                  ) : (
                    <span className="mr-1">{mbtiInfo.emoji}</span>
                  )}
                  {mbtiInfo.code}
                </PixelBadge>
              )}
              {soul.tags.map((tag) => (
                <PixelBadge key={tag} variant="pink">
                  {tag}
                </PixelBadge>
              ))}
            </div>
          )}

          <div className="flex gap-4 text-[9px] font-pixel text-text-secondary">
            <span>{m.common.views} {soul.views_count}</span>
            <span>{m.common.likes} {soul.likes_count}</span>
            <span>{m.common.forks} {soul.forks_count}</span>
          </div>
        </section>

        {traitVector && (
          <section>
            <TraitDisplay
              traitVector={traitVector}
              aiEnhancement={aiEnhancement}
            />
          </section>
        )}

        {soul.soul_md && (
          <section>
            <SoulMdViewer soulMd={soul.soul_md} />
          </section>
        )}

        {soul.system_prompt && (
          <section>
            <SystemPromptViewer systemPrompt={soul.system_prompt} />
          </section>
        )}

        {sampleConversations.length > 0 && (
          <section>
            <SampleConversations conversations={sampleConversations} />
          </section>
        )}

        <section className="py-4 space-y-4">
          <SoulActions
            systemPrompt={soul.system_prompt ?? ""}
            soulMd={soul.soul_md ?? ""}
            likesCount={soul.likes_count}
            slug={soul.slug}
            liked={userLiked}
            soulId={soul.id}
            title={soul.title}
            forksCount={soul.forks_count}
          />
          <ShareButtons title={soul.title} slug={soul.slug} />
        </section>

        <section>
          <ShareCard
            title={soul.title}
            tagline={soul.tagline}
            mbtiCode={mbtiInfo?.code}
            mbtiEmoji={mbtiInfo?.emoji}
            tags={soul.tags ?? []}
            avatarUrl={soul.avatar_url}
          />
        </section>
      </main>
    </div>
  );
}

// ============================================================
// Fire-and-forget view count increment
// ============================================================

async function incrementViews(soulId: string) {
  try {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).rpc("increment_views", { soul_id: soulId });
  } catch {
    // Ignore all errors for view tracking
  }
}
