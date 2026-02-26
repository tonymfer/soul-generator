import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { checkUserLike } from "@/actions/like";
import { getMBTIType } from "@/lib/constants/mbti";
import { PixelBadge } from "@/components/ui/pixel-badge";
import { Sparkle } from "@/components/ui/sparkle";
import {
  TraitDisplay,
  SoulMdViewer,
  SystemPromptViewer,
  SampleConversations,
  SoulActions,
  ShareButtons,
} from "@/components/soul";
import { AvatarDisplay } from "@/components/avatar";
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
            &larr; 갤러리로
          </Link>
          <span className="font-pixel text-xs text-accent-primary">ABTI</span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6 animate-fade-in-up">
        {/* Avatar + Title Section */}
        <section className="flex flex-col items-center text-center space-y-4">
          {/* Pixel art avatar */}
          <div className="relative">
            <AvatarDisplay
              avatarUrl={soul.avatar_url}
              traitVector={traitVector}
              size={96}
            />
            <Sparkle count={4} color="var(--accent-yellow)" />
          </div>

          {/* Soul title */}
          <h1 className="font-pixel text-lg sm:text-xl text-text-primary leading-relaxed text-balance">
            {soul.title}
          </h1>

          {/* Tagline */}
          {soul.tagline && (
            <p className="font-pixel-accent text-sm text-text-secondary max-w-md">
              {soul.tagline}
            </p>
          )}

          {/* Tags */}
          {soul.tags && soul.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {mbtiInfo && (
                <PixelBadge variant="purple">
                  {mbtiInfo.emoji} {mbtiInfo.code}
                </PixelBadge>
              )}
              {soul.tags.map((tag) => (
                <PixelBadge key={tag} variant="pink">
                  {tag}
                </PixelBadge>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="flex gap-4 text-[9px] font-pixel text-text-secondary">
            <span>조회 {soul.views_count}</span>
            <span>좋아요 {soul.likes_count}</span>
            <span>포크 {soul.forks_count}</span>
          </div>
        </section>

        {/* Personality Traits */}
        {traitVector && (
          <section>
            <TraitDisplay
              traitVector={traitVector}
              aiEnhancement={aiEnhancement}
            />
          </section>
        )}

        {/* SOUL.md */}
        {soul.soul_md && (
          <section>
            <SoulMdViewer soulMd={soul.soul_md} />
          </section>
        )}

        {/* System Prompt */}
        {soul.system_prompt && (
          <section>
            <SystemPromptViewer systemPrompt={soul.system_prompt} />
          </section>
        )}

        {/* Sample Conversations */}
        {sampleConversations.length > 0 && (
          <section>
            <SampleConversations conversations={sampleConversations} />
          </section>
        )}

        {/* Action Buttons */}
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

          {/* SNS Share Buttons */}
          <ShareButtons title={soul.title} slug={soul.slug} />
        </section>
      </main>
    </div>
  );
}

// ============================================================
// Fire-and-forget view count increment
// Best-effort: uses RPC if available, silently fails otherwise.
// A proper increment_views RPC with SECURITY DEFINER is
// recommended for production.
// ============================================================

async function incrementViews(soulId: string) {
  try {
    const supabase = await createClient();
    // Best-effort: call RPC via untyped rpc to avoid TS errors
    // when the function isn't declared in the Database types.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).rpc("increment_views", { soul_id: soulId });
  } catch {
    // Ignore all errors for view tracking
  }
}
