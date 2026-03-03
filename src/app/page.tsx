import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { TerminalButton, TerminalBadge, TerminalCard, PixelIcon } from "@/components/ui";
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

async function getTrendingSouls() {
  try {
    const supabase = await createClient();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data } = await supabase
      .from("souls")
      .select(
        "slug, title, tagline, tags, likes_count, forks_count, avatar_url, personality_data, created_at"
      )
      .eq("is_public", true)
      .gte("created_at", sevenDaysAgo.toISOString())
      .order("likes_count", { ascending: false })
      .limit(5);
    return data ?? [];
  } catch {
    return [];
  }
}

async function getPublicSoulCount() {
  try {
    const supabase = await createClient();
    const { count } = await supabase
      .from("souls")
      .select("id", { count: "exact", head: true })
      .eq("is_public", true);
    return count ?? 0;
  } catch {
    return 0;
  }
}

export default async function Home() {
  const [latestSouls, trendingSouls, soulCount] = await Promise.all([
    getLatestSouls(),
    getTrendingSouls(),
    getPublicSoulCount(),
  ]);
  const locale = await getLocale();
  const m = messages[locale];

  return (
    <div className="min-h-screen grain-overlay">
      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-20 bg-bg-primary/80 backdrop-blur-md border-b border-card-border/50">
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
      <main id="main-content">
      <section className="relative px-4 pt-20 pb-24 sm:pt-32 sm:pb-36 text-center overflow-hidden grid-bg">
        {/* Ambient glow orbs */}
        <div
          className="hero-glow-orb w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] top-[-10%] left-[-10%]"
          style={{ background: "radial-gradient(circle, rgba(124, 110, 246, 0.15), transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="hero-glow-orb w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] top-[20%] right-[-5%]"
          style={{
            background: "radial-gradient(circle, rgba(244, 114, 182, 0.1), transparent 70%)",
            animationDelay: "-3s",
            animationDuration: "10s",
          }}
          aria-hidden="true"
        />
        <div
          className="hero-glow-orb w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bottom-[5%] left-[30%]"
          style={{
            background: "radial-gradient(circle, rgba(74, 222, 128, 0.08), transparent 70%)",
            animationDelay: "-5s",
            animationDuration: "12s",
          }}
          aria-hidden="true"
        />

        {/* Floating pixel particles */}
        {[
          { top: "15%", left: "10%", color: "#7c6ef6", delay: "0s", duration: "5s" },
          { top: "25%", right: "15%", color: "#f472b6", delay: "-1.5s", duration: "4s" },
          { top: "60%", left: "20%", color: "#fbbf24", delay: "-3s", duration: "6s" },
          { top: "40%", right: "25%", color: "#4ade80", delay: "-2s", duration: "4.5s" },
          { top: "70%", left: "60%", color: "#7c6ef6", delay: "-4s", duration: "5.5s" },
          { top: "10%", right: "30%", color: "#f472b6", delay: "-1s", duration: "3.5s" },
        ].map((p, i) => (
          <div
            key={i}
            className="pixel-particle"
            style={{
              top: p.top,
              left: p.left,
              right: p.right,
              backgroundColor: p.color,
              "--particle-delay": p.delay,
              "--particle-duration": p.duration,
              "--particle-opacity": "0.5",
            } as React.CSSProperties}
            aria-hidden="true"
          />
        ))}

        <div className="relative max-w-2xl mx-auto flex flex-col items-center gap-8">
          <div className="animate-reveal-up" style={{ animationDelay: "0.1s" }}>
            <TerminalCard title="soul-generator" className="inline-block" glow>
              <pre className="text-accent-primary text-xs sm:text-sm leading-relaxed typing-cursor">
                {`> initializing soul protocol...\n> ABTI v1.0 ready`}
              </pre>
            </TerminalCard>
          </div>

          <h1
            className="font-brand text-lg sm:text-xl md:text-2xl text-text-primary leading-relaxed text-balance animate-reveal-up"
            style={{ animationDelay: "0.25s" }}
          >
            {m.landing.heroTitle1}
            <br />
            <span className="text-shimmer">{m.landing.heroTitle2}</span>
          </h1>

          <p
            className="text-sm text-text-secondary max-w-md leading-relaxed animate-reveal-up"
            style={{ animationDelay: "0.4s" }}
          >
            {m.landing.heroSubtitle1}
            <br className="sm:hidden" />
            {m.landing.heroSubtitle2}
          </p>

          <div className="animate-reveal-up" style={{ animationDelay: "0.55s" }}>
            <Link href="/create">
              <TerminalButton size="lg" variant="primary" className="mt-2">
                {m.landing.cta}
              </TerminalButton>
            </Link>
          </div>

          {soulCount > 0 && (
            <p
              className="text-xs text-text-secondary animate-reveal-up"
              style={{ animationDelay: "0.7s" }}
            >
              {m.landing.socialProof(soulCount)}
            </p>
          )}
        </div>
      </section>

      {/* ── Glow divider ── */}
      <div className="section-glow-divider" aria-hidden="true" />

      {/* ── How It Works ── */}
      <section className="px-4 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2
            className="font-brand text-xs sm:text-sm text-text-primary text-center animate-reveal-up"
            style={{ animationDelay: "0.1s" }}
          >
            {m.landing.howItWorks}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {[
              { n: "01", icon: "step-1", label: m.landing.step1Title, desc: m.landing.step1Desc, variant: "purple" as const, delay: "0.2s" },
              { n: "02", icon: "step-2", label: m.landing.step2Title, desc: m.landing.step2Desc, variant: "pink" as const, delay: "0.35s" },
              { n: "03", icon: "step-3", label: m.landing.step3Title, desc: `${m.landing.step3Desc1} ${m.landing.step3Desc2}`, variant: "green" as const, delay: "0.5s" },
            ].map(({ n, icon, label, desc, variant, delay }) => (
              <div
                key={n}
                className="step-connector flex flex-col items-center text-center gap-3 animate-reveal-up"
                style={{ animationDelay: delay }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <PixelIcon name={icon} size={32} />
                  <TerminalBadge variant={variant}>{n}</TerminalBadge>
                </div>
                <h3 className="text-xs text-text-primary leading-relaxed font-semibold">{label}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Glow divider ── */}
      <div className="section-glow-divider" aria-hidden="true" />

      {/* ── Social Proof ── */}
      <section className="relative px-4 py-20 sm:py-28 text-center overflow-hidden">
        {/* Subtle ambient glow behind quote */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, var(--accent-primary), transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-xl mx-auto space-y-6">
          <h2 className="text-base sm:text-lg text-accent-primary font-brand animate-reveal-up" style={{ animationDelay: "0.1s" }}>
            {m.landing.socialTagline}
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed animate-reveal-up" style={{ animationDelay: "0.2s" }}>
            &ldquo;{m.landing.socialSubtitle1}
            <br />
            {m.landing.socialSubtitle2}&rdquo;
          </p>
          <div className="animate-reveal-up" style={{ animationDelay: "0.3s" }}>
            <Link href="/create">
              <TerminalButton size="lg" variant="primary" className="mt-4">
                {m.landing.cta}
              </TerminalButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trending Souls ── */}
      {trendingSouls.length >= 3 && (
        <>
          <div className="section-glow-divider" aria-hidden="true" />
          <section className="px-4 py-20 sm:py-28">
            <div className="max-w-3xl mx-auto space-y-10">
              <h2
                className="font-brand text-xs sm:text-sm text-text-primary text-center animate-reveal-up"
                style={{ animationDelay: "0.1s" }}
              >
                {m.landing.trendingTitle}
              </h2>
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="flex flex-nowrap gap-5 pb-4">
                  {trendingSouls.map((soul, i) => (
                    <div
                      key={soul.slug}
                      className="min-w-[260px] max-w-[300px] flex-shrink-0 animate-reveal-up"
                      style={{ animationDelay: `${0.15 + i * 0.1}s` }}
                    >
                      <SoulCard soul={soul} locale={locale} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── Glow divider ── */}
      <div className="section-glow-divider" aria-hidden="true" />

      {/* ── Features ── */}
      <section className="px-4 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2
            className="font-brand text-xs sm:text-sm text-text-primary text-center animate-reveal-up"
            style={{ animationDelay: "0.1s" }}
          >
            {m.landing.featuresTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: "theater-masks", title: m.landing.feature1Title, desc: m.landing.feature1Desc, delay: "0.15s" },
              { icon: "package", title: m.landing.feature2Title, desc: m.landing.feature2Desc, delay: "0.25s" },
              { icon: "globe", title: m.landing.feature3Title, desc: m.landing.feature3Desc, delay: "0.35s" },
              { icon: "palette", title: m.landing.feature4Title, desc: m.landing.feature4Desc, delay: "0.45s" },
            ].map(({ icon, title, desc, delay }) => (
              <div key={title} className="animate-reveal-up" style={{ animationDelay: delay }}>
                <TerminalCard glow className="text-center feature-card-enhanced h-full">
                  <div className="flex justify-center mb-4"><PixelIcon name={icon} size={36} /></div>
                  <h3 className="text-xs text-text-primary mb-2 font-semibold">{title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
                </TerminalCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ── */}
      {latestSouls.length > 0 && (
        <>
          <div className="section-glow-divider" aria-hidden="true" />
          <section className="px-4 py-20 sm:py-28">
            <div className="max-w-3xl mx-auto space-y-10">
              <h2
                className="font-brand text-xs sm:text-sm text-text-primary text-center animate-reveal-up"
                style={{ animationDelay: "0.1s" }}
              >
                {m.landing.galleryPreview}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {latestSouls.map((soul, i) => (
                  <div
                    key={soul.slug}
                    className="animate-reveal-up"
                    style={{ animationDelay: `${0.15 + i * 0.1}s` }}
                  >
                    <SoulCard soul={soul} locale={locale} />
                  </div>
                ))}
              </div>
              <div className="text-center animate-reveal-up" style={{ animationDelay: "0.5s" }}>
                <Link href="/gallery">
                  <TerminalButton variant="secondary" size="md">
                    {m.landing.galleryMore}
                  </TerminalButton>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      </main>

      {/* ── Footer ── */}
      <div className="section-glow-divider" aria-hidden="true" />
      <footer className="px-4 py-10 sm:py-12">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <p className="text-xs text-text-secondary">
            <span className="text-accent-primary font-brand">ABTI</span> <span className="text-text-secondary/40">&middot;</span> Made with &hearts;
          </p>
          <p className="text-[10px] text-text-secondary/40 tracking-wider">
            Compatible with Claude, GPT, OpenClaw
          </p>
        </div>
      </footer>
    </div>
  );
}
