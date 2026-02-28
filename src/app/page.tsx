import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PixelButton, PixelBadge, PixelCard, Sparkle } from "@/components/ui";
import { SoulCard } from "@/components/gallery/soul-card";
import { AuthButton } from "@/components/layout/auth-button";
import { LocaleToggle } from "@/components/layout/locale-toggle";
import { getLocale } from "@/lib/i18n/get-locale";
import { messages } from "@/lib/i18n/messages";

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
  const locale = await getLocale();
  const m = messages[locale];

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
            <LocaleToggle />
            <Link href="/gallery">
              <PixelButton variant="ghost" size="sm">
                {m.common.gallery}
              </PixelButton>
            </Link>
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center overflow-hidden">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <div className="relative text-5xl sm:text-6xl animate-float">
            <span role="img" aria-label="crystal ball">
              &#x1F52E;
            </span>
            <Sparkle count={6} color="var(--accent-yellow)" />
          </div>

          <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl text-text-primary leading-relaxed text-balance">
            {m.landing.heroTitle1}
            <br />
            {m.landing.heroTitle2}
          </h1>

          <p className="font-pixel-accent text-xs sm:text-sm text-text-secondary max-w-md leading-relaxed">
            {m.landing.heroSubtitle1}
            <br className="sm:hidden" />
            {m.landing.heroSubtitle2}
          </p>

          <Link href="/create">
            <PixelButton size="lg" variant="primary" className="mt-2 gap-2">
              {m.landing.cta} <span aria-hidden="true">&rarr;</span>
            </PixelButton>
          </Link>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="px-4 py-16 sm:py-20 bg-bg-primary/50">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="font-pixel text-sm sm:text-base text-text-primary text-center">
            {m.landing.howItWorks}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center gap-3">
              <PixelBadge variant="purple" className="text-sm px-3 py-1.5">
                &#9312;
              </PixelBadge>
              <h3 className="font-pixel text-[10px] sm:text-xs text-text-primary leading-relaxed">
                {m.landing.step1Title}
              </h3>
              <p className="font-pixel-accent text-[10px] text-text-secondary leading-relaxed">
                {m.landing.step1Desc}
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <PixelBadge variant="pink" className="text-sm px-3 py-1.5">
                &#9313;
              </PixelBadge>
              <h3 className="font-pixel text-[10px] sm:text-xs text-text-primary leading-relaxed">
                {m.landing.step2Title}
              </h3>
              <p className="font-pixel-accent text-[10px] text-text-secondary leading-relaxed">
                {m.landing.step2Desc}
              </p>
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <PixelBadge variant="mint" className="text-sm px-3 py-1.5">
                &#9314;
              </PixelBadge>
              <h3 className="font-pixel text-[10px] sm:text-xs text-text-primary leading-relaxed">
                {m.landing.step3Title}
              </h3>
              <p className="font-pixel-accent text-[10px] text-text-secondary leading-relaxed">
                {m.landing.step3Desc1}
                <br />
                {m.landing.step3Desc2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof / Tagline ── */}
      <section className="px-4 py-16 sm:py-20 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="font-pixel-accent text-base sm:text-lg text-accent-primary">
            {m.landing.socialTagline}
          </h2>
          <p className="font-pixel text-[10px] sm:text-xs text-text-secondary leading-relaxed">
            &ldquo;{m.landing.socialSubtitle1}
            <br />
            {m.landing.socialSubtitle2}&rdquo;
          </p>
          <Link href="/create">
            <PixelButton size="lg" variant="pink" className="mt-4 gap-2">
              {m.landing.cta} <span aria-hidden="true">&rarr;</span>
            </PixelButton>
          </Link>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="px-4 py-16 sm:py-20 bg-bg-primary/50">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="font-pixel text-sm sm:text-base text-text-primary text-center">
            {m.landing.featuresTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PixelCard gradient className="text-center">
              <div className="text-2xl mb-3">&#x1F3AD;</div>
              <h3 className="font-pixel text-[10px] text-text-primary mb-2">
                {m.landing.feature1Title}
              </h3>
              <p className="font-pixel-accent text-[9px] text-text-secondary leading-relaxed">
                {m.landing.feature1Desc}
              </p>
            </PixelCard>

            <PixelCard gradient className="text-center">
              <div className="text-2xl mb-3">&#x1F4E6;</div>
              <h3 className="font-pixel text-[10px] text-text-primary mb-2">
                {m.landing.feature2Title}
              </h3>
              <p className="font-pixel-accent text-[9px] text-text-secondary leading-relaxed">
                {m.landing.feature2Desc}
              </p>
            </PixelCard>

            <PixelCard gradient className="text-center">
              <div className="text-2xl mb-3">&#x1F310;</div>
              <h3 className="font-pixel text-[10px] text-text-primary mb-2">
                {m.landing.feature3Title}
              </h3>
              <p className="font-pixel-accent text-[9px] text-text-secondary leading-relaxed">
                {m.landing.feature3Desc}
              </p>
            </PixelCard>

            <PixelCard gradient className="text-center">
              <div className="text-2xl mb-3">&#x1F3A8;</div>
              <h3 className="font-pixel text-[10px] text-text-primary mb-2">
                {m.landing.feature4Title}
              </h3>
              <p className="font-pixel-accent text-[9px] text-text-secondary leading-relaxed">
                {m.landing.feature4Desc}
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
              {m.landing.galleryPreview}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestSouls.map((soul) => (
                <SoulCard key={soul.slug} soul={soul} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/gallery">
                <PixelButton variant="ghost" size="md" className="gap-2">
                  {m.landing.galleryMore} <span aria-hidden="true">&rarr;</span>
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
