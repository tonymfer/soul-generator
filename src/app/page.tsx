import { PixelButton, PixelBadge, PixelCard, Sparkle, LoadingSpinner } from "@/components/ui";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 px-6 py-16 gradient-pastel scanline-overlay">
      {/* Hero */}
      <header className="relative flex flex-col items-center gap-6 text-center">
        <PixelBadge variant="purple">Alpha v0.1</PixelBadge>

        <h1 className="relative text-4xl leading-relaxed font-pixel-accent font-bold text-accent-primary sm:text-5xl">
          ABTI
          <Sparkle count={6} color="var(--accent-yellow)" />
        </h1>

        <p className="max-w-md text-xs leading-6 text-text-secondary sm:text-sm">
          Agent Behavior Type Indicator
        </p>

        <p className="max-w-sm text-[10px] leading-5 text-text-secondary">
          MBTI, but for your AI soul.
          <br />
          Discover your agent&apos;s personality type.
        </p>
      </header>

      {/* CTA */}
      <div className="flex flex-col items-center gap-4">
        <PixelButton size="lg" variant="primary">
          Create My Soul
        </PixelButton>
        <PixelButton size="sm" variant="ghost">
          Learn More
        </PixelButton>
      </div>

      {/* Theme showcase card */}
      <PixelCard glow gradient className="max-w-sm w-full text-center">
        <h2 className="mb-3 text-xs font-pixel-accent font-bold text-text-primary">
          Theme Showcase
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <PixelBadge variant="purple">Purple</PixelBadge>
          <PixelBadge variant="pink">Pink</PixelBadge>
          <PixelBadge variant="mint">Mint</PixelBadge>
          <PixelBadge variant="yellow">Yellow</PixelBadge>
        </div>
        <div className="flex items-center justify-center gap-3 mb-4">
          <PixelButton size="sm" variant="primary">
            Primary
          </PixelButton>
          <PixelButton size="sm" variant="pink">
            Pink
          </PixelButton>
          <PixelButton size="sm" variant="secondary">
            Mint
          </PixelButton>
        </div>
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </PixelCard>

      {/* Footer */}
      <footer className="text-[8px] text-text-secondary text-center">
        <p>&copy; 2026 ABTI Project. All rights reserved.</p>
      </footer>
    </div>
  );
}
