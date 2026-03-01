import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { TerminalButton, TerminalBadge, TerminalCard } from "@/components/ui";
import { SoulCard } from "@/components/gallery/soul-card";
import { AuthButton } from "@/components/layout/auth-button";
import { LocaleToggle } from "@/components/layout/locale-toggle";
import { getLocale } from "@/lib/i18n/get-locale";
import { messages } from "@/lib/i18n/messages";

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
    <div className="min-h-screen">
      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-10 bg-bg-primary/90 backdrop-blur-sm border-b border-card-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="font-brand text-sm text-accent-primary hover:text-accent-secondary transition-colors"
          >
            ABTI
          </Link>
          <div className="flex items-center gap-3">
            <LocaleToggle />
            <Link href="/gallery">
              <TerminalButton variant="ghost" size="sm">
                {m.common.gallery}
              </TerminalButton>
            </Link>
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center overflow-hidden">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <TerminalCard title="soul-generator" className="inline-block">
            <pre className="text-accent-primary text-xs sm:text-sm leading-relaxed">
              {`> initializing soul protocol...\n> ABTI v1.0 ready`}
            </pre>
          </TerminalCard>

          <h1 className="font-brand text-lg sm:text-xl md:text-2xl text-text-primary leading-relaxed text-balance">
            {m.landing.heroTitle1}
            <br />
            <span className="text-accent-primary">{m.landing.heroTitle2}</span>
          </h1>

          <p className="text-sm text-text-secondary max-w-md leading-relaxed">
            {m.landing.heroSubtitle1}
            <br className="sm:hidden" />
            {m.landing.heroSubtitle2}
          </p>

          <Link href="/create">
            <TerminalButton size="lg" variant="primary" className="mt-2">
              {m.landing.cta}
            </TerminalButton>
          </Link>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="px-4 py-16 sm:py-20 border-t border-card-border">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="font-brand text-xs sm:text-sm text-text-primary text-center">
            {m.landing.howItWorks}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { n: "01", label: m.landing.step1Title, desc: m.landing.step1Desc, variant: "purple" as const },
              { n: "02", label: m.landing.step2Title, desc: m.landing.step2Desc, variant: "pink" as const },
              { n: "03", label: m.landing.step3Title, desc: `${m.landing.step3Desc1} ${m.landing.step3Desc2}`, variant: "green" as const },
            ].map(({ n, label, desc, variant }) => (
              <div key={n} className="flex flex-col items-center text-center gap-3">
                <TerminalBadge variant={variant}>{n}</TerminalBadge>
                <h3 className="text-xs text-text-primary leading-relaxed">{label}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="px-4 py-16 sm:py-20 text-center border-t border-card-border">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-base sm:text-lg text-accent-primary font-brand">
            {m.landing.socialTagline}
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            &ldquo;{m.landing.socialSubtitle1}
            <br />
            {m.landing.socialSubtitle2}&rdquo;
          </p>
          <Link href="/create">
            <TerminalButton size="lg" variant="primary" className="mt-4">
              {m.landing.cta}
            </TerminalButton>
          </Link>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-4 py-16 sm:py-20 border-t border-card-border">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="font-brand text-xs sm:text-sm text-text-primary text-center">
            {m.landing.featuresTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { emoji: "\u{1F3AD}", title: m.landing.feature1Title, desc: m.landing.feature1Desc },
              { emoji: "\u{1F4E6}", title: m.landing.feature2Title, desc: m.landing.feature2Desc },
              { emoji: "\u{1F310}", title: m.landing.feature3Title, desc: m.landing.feature3Desc },
              { emoji: "\u{1F3A8}", title: m.landing.feature4Title, desc: m.landing.feature4Desc },
            ].map(({ emoji, title, desc }) => (
              <TerminalCard key={title} glow className="text-center">
                <div className="text-2xl mb-3">{emoji}</div>
                <h3 className="text-xs text-text-primary mb-2">{title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
              </TerminalCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ── */}
      {latestSouls.length > 0 && (
        <section className="px-4 py-16 sm:py-20 border-t border-card-border">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="font-brand text-xs sm:text-sm text-text-primary text-center">
              {m.landing.galleryPreview}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestSouls.map((soul) => (
                <SoulCard key={soul.slug} soul={soul} />
              ))}
            </div>
            <div className="text-center">
              <Link href="/gallery">
                <TerminalButton variant="secondary" size="md">
                  {m.landing.galleryMore}
                </TerminalButton>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="px-4 py-8 border-t border-card-border">
        <div className="max-w-3xl mx-auto text-center space-y-2">
          <p className="text-xs text-text-secondary">
            <span className="text-accent-primary">ABTI</span> &middot; Made with &hearts;
          </p>
          <p className="text-xs text-text-secondary/60">
            Compatible with Claude, GPT, OpenClaw
          </p>
        </div>
      </footer>
    </div>
  );
}
