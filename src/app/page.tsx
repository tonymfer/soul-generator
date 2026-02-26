import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PixelButton, PixelBadge, PixelCard, Sparkle } from "@/components/ui";
import { SoulCard } from "@/components/gallery/soul-card";
import { AuthButton } from "@/components/layout/auth-button";

// ============================================================
// Landing Page — Server Component
// Fetches latest public souls for the gallery preview section.
// ============================================================

async function getLatestSouls() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("souls")
      .select(
        "slug, title, tagline, tags, likes_count, forks_count, avatar_url, personality_data, created_at"
      )
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(3);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const latestSouls = await getLatestSouls();

  return (
    <div className="min-h-screen gradient-pastel">
      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b-2 border-card-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="font-pixel text-sm text-accent-primary hover:brightness-110 transition-all"
          >
            ABTI
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/gallery">
              <PixelButton variant="ghost" size="sm">
                갤러리
              </PixelButton>
            </Link>
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center overflow-hidden">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          {/* Floating crystal ball emoji */}
          <div className="relative text-5xl sm:text-6xl animate-float">
            <span role="img" aria-label="crystal ball">
              &#x1F52E;
            </span>
            <Sparkle count={6} color="var(--accent-yellow)" />
          </div>

          {/* Hero title */}
          <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl text-text-primary leading-relaxed text-balance">
            나만의 AI 소울을
            <br />
            발견하세요
          </h1>

          {/* Subtitle */}
          <p className="font-pixel-accent text-xs sm:text-sm text-text-secondary max-w-md leading-relaxed">
            성격 분석으로 만드는
            <br className="sm:hidden" />
            {" "}세상에 하나뿐인 AI 에이전트
          </p>

          {/* CTA */}
          <Link href="/create">
            <PixelButton size="lg" variant="primary" className="mt-2 gap-2">
              지금 시작하기 <span aria-hidden="true">&rarr;</span>
            </PixelButton>
          </Link>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="px-4 py-16 sm:py-20 bg-bg-primary/50">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="font-pixel text-sm sm:text-base text-text-primary text-center">
            어떻게 만들어지나요?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center gap-3">
              <PixelBadge variant="purple" className="text-sm px-3 py-1.5">
                &#9312;
              </PixelBadge>
              <h3 className="font-pixel text-[10px] sm:text-xs text-text-primary leading-relaxed">
                MBTI + 성격 분석
              </h3>
              <p className="font-pixel-accent text-[10px] text-text-secondary leading-relaxed">
                퀴즈로 당신의 성격을 분석해요
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center gap-3">
              <PixelBadge variant="pink" className="text-sm px-3 py-1.5">
                &#9313;
              </PixelBadge>
              <h3 className="font-pixel text-[10px] sm:text-xs text-text-primary leading-relaxed">
                AI 소울 생성
              </h3>
              <p className="font-pixel-accent text-[10px] text-text-secondary leading-relaxed">
                분석 결과로 소울을 자동 생성!
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center gap-3">
              <PixelBadge variant="mint" className="text-sm px-3 py-1.5">
                &#9314;
              </PixelBadge>
              <h3 className="font-pixel text-[10px] sm:text-xs text-text-primary leading-relaxed">
                공유 &amp; 활용
              </h3>
              <p className="font-pixel-accent text-[10px] text-text-secondary leading-relaxed">
                갤러리에 공유하고 AI 도구에
                <br />
                바로 적용하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof / Tagline ── */}
      <section className="px-4 py-16 sm:py-20 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="font-pixel-accent text-base sm:text-lg text-accent-primary">
            What&apos;s your ABTI?
          </h2>
          <p className="font-pixel text-[10px] sm:text-xs text-text-secondary leading-relaxed">
            &ldquo;MBTI처럼 물어보세요:
            <br />
            너 ABTI 뭐야?&rdquo;
          </p>
          <Link href="/create">
            <PixelButton size="lg" variant="pink" className="mt-4 gap-2">
              지금 시작하기 <span aria-hidden="true">&rarr;</span>
            </PixelButton>
          </Link>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="px-4 py-16 sm:py-20 bg-bg-primary/50">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="font-pixel text-sm sm:text-base text-text-primary text-center">
            ABTI로 뭘 할 수 있나요?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PixelCard gradient className="text-center">
              <div className="text-2xl mb-3">&#x1F3AD;</div>
              <h3 className="font-pixel text-[10px] text-text-primary mb-2">
                나만의 AI 페르소나
              </h3>
              <p className="font-pixel-accent text-[9px] text-text-secondary leading-relaxed">
                성격 분석 기반 고유한 AI 캐릭터 생성
              </p>
            </PixelCard>

            <PixelCard gradient className="text-center">
              <div className="text-2xl mb-3">&#x1F4E6;</div>
              <h3 className="font-pixel text-[10px] text-text-primary mb-2">
                SOUL.md &amp; 시스템 프롬프트
              </h3>
              <p className="font-pixel-accent text-[9px] text-text-secondary leading-relaxed">
                바로 사용 가능한 프롬프트 자동 생성
              </p>
            </PixelCard>

            <PixelCard gradient className="text-center">
              <div className="text-2xl mb-3">&#x1F310;</div>
              <h3 className="font-pixel text-[10px] text-text-primary mb-2">
                Claude, GPT, OpenClaw 호환
              </h3>
              <p className="font-pixel-accent text-[9px] text-text-secondary leading-relaxed">
                주요 AI 플랫폼에서 바로 활용
              </p>
            </PixelCard>

            <PixelCard gradient className="text-center">
              <div className="text-2xl mb-3">&#x1F3A8;</div>
              <h3 className="font-pixel text-[10px] text-text-primary mb-2">
                픽셀 아바타 자동 생성
              </h3>
              <p className="font-pixel-accent text-[9px] text-text-secondary leading-relaxed">
                성격에 맞는 귀여운 픽셀 아바타
              </p>
            </PixelCard>
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ── */}
      {latestSouls.length > 0 && (
        <section className="px-4 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="font-pixel text-sm sm:text-base text-text-primary text-center">
              소울 갤러리 미리보기
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestSouls.map((soul) => (
                <SoulCard key={soul.slug} soul={soul} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/gallery">
                <PixelButton variant="ghost" size="md" className="gap-2">
                  갤러리 더 보기 <span aria-hidden="true">&rarr;</span>
                </PixelButton>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="px-4 py-8 border-t-2 border-card-border bg-bg-primary/50">
        <div className="max-w-3xl mx-auto text-center space-y-2">
          <p className="font-pixel text-[10px] text-text-secondary">
            ABTI &middot; Made with &hearts;
          </p>
          <p className="font-pixel-accent text-[8px] text-text-secondary">
            Compatible with Claude, GPT, OpenClaw
          </p>
        </div>
      </footer>
    </div>
  );
}
