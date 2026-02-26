import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SoulCard } from "@/components/gallery/soul-card";
import { GalleryFilters } from "@/components/gallery/gallery-filters";
import { PixelButton } from "@/components/ui/pixel-button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Sparkle } from "@/components/ui/sparkle";

// ============================================================
// Gallery Page — SSR with search params for filtering/sorting
// ============================================================

const PAGE_SIZE = 12;

export const metadata: Metadata = {
  title: "소울 갤러리 | ABTI",
  description: "다양한 AI 소울을 탐색하고, 좋아요를 누르고, 리믹스해보세요!",
  openGraph: {
    title: "소울 갤러리 | ABTI",
    description: "다양한 AI 소울을 탐색하고, 좋아요를 누르고, 리믹스해보세요!",
  },
};

type PageProps = {
  searchParams: Promise<{
    sort?: string;
    mbti?: string;
    search?: string;
    page?: string;
  }>;
};

export default async function GalleryPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const sort = params.sort === "recent" ? "recent" : "popular";
  const mbti = params.mbti ?? "";
  const search = params.search ?? "";
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  const offset = (page - 1) * PAGE_SIZE;

  // Build Supabase query
  const supabase = await createClient();

  let query = supabase
    .from("souls")
    .select(
      "slug, title, tagline, tags, likes_count, forks_count, avatar_url, personality_data, created_at",
      { count: "exact" }
    )
    .eq("is_public", true);

  // Text search — try ILIKE on title/tagline
  // Sanitize search to prevent PostgREST filter injection via metacharacters
  const safeSearch = search.replace(/[,.()"'\\%]/g, "").trim();
  if (safeSearch) {
    query = query.or(
      `title.ilike.%${safeSearch}%,tagline.ilike.%${safeSearch}%`
    );
  }

  // MBTI filter — match tag
  if (mbti) {
    query = query.contains("tags", [mbti]);
  }

  // Sorting
  if (sort === "recent") {
    query = query.order("created_at", { ascending: false });
  } else {
    query = query.order("likes_count", { ascending: false });
  }

  // Pagination
  query = query.range(offset, offset + PAGE_SIZE - 1);

  const { data: souls, count } = await query;

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;

  return (
    <div className="min-h-screen gradient-pastel">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b-2 border-card-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="font-pixel text-[10px] text-text-secondary hover:text-accent-primary transition-colors"
          >
            &larr; 홈으로
          </Link>
          <span className="font-pixel text-xs text-accent-primary">ABTI</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in-up">
        {/* Title */}
        <section className="text-center space-y-2">
          <div className="relative inline-block">
            <h1 className="font-pixel text-lg sm:text-xl text-text-primary">
              소울 갤러리
            </h1>
            <Sparkle count={3} color="var(--accent-yellow)" />
          </div>
          <p className="font-pixel-accent text-xs text-text-secondary">
            다양한 AI 소울을 탐색해보세요
          </p>
        </section>

        {/* Filters — wrapped in Suspense for useSearchParams */}
        <section>
          <Suspense fallback={<div className="h-20" />}>
            <GalleryFilters />
          </Suspense>
        </section>

        {/* Grid */}
        <section>
          {souls && souls.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {souls.map((soul) => (
                <SoulCard key={soul.slug} soul={soul} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <p className="font-pixel text-sm text-text-secondary">
                소울을 찾을 수 없어요
              </p>
              <p className="font-pixel-accent text-xs text-text-secondary">
                다른 검색어나 필터를 시도해보세요
              </p>
            </div>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="flex items-center justify-center gap-4">
            {page > 1 ? (
              <Link
                href={buildPaginationUrl(params, page - 1)}
              >
                <PixelButton variant="ghost" size="sm">
                  &larr; 이전
                </PixelButton>
              </Link>
            ) : (
              <PixelButton variant="ghost" size="sm" disabled>
                &larr; 이전
              </PixelButton>
            )}

            <span className="font-pixel text-[10px] text-text-secondary">
              {page} / {totalPages}
            </span>

            {page < totalPages ? (
              <Link
                href={buildPaginationUrl(params, page + 1)}
              >
                <PixelButton variant="ghost" size="sm">
                  다음 &rarr;
                </PixelButton>
              </Link>
            ) : (
              <PixelButton variant="ghost" size="sm" disabled>
                다음 &rarr;
              </PixelButton>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

/** Build pagination URL preserving existing search params */
function buildPaginationUrl(
  params: { sort?: string; mbti?: string; search?: string },
  page: number
): string {
  const sp = new URLSearchParams();

  if (params.sort && params.sort !== "popular") sp.set("sort", params.sort);
  if (params.mbti) sp.set("mbti", params.mbti);
  if (params.search) sp.set("search", params.search);
  if (page > 1) sp.set("page", String(page));

  const qs = sp.toString();
  return `/gallery${qs ? `?${qs}` : ""}`;
}
