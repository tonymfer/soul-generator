import Link from "next/link";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";
import { getLocale } from "@/lib/i18n/get-locale";
import { messages } from "@/lib/i18n/messages";

// ============================================================
// Custom 404 Page — Pixel themed "Not Found"
// ============================================================

export default async function NotFound() {
  const locale = await getLocale();
  const m = messages[locale];

  return (
    <div className="min-h-screen gradient-pastel flex items-center justify-center px-4">
      <PixelCard className="max-w-md w-full text-center py-12 space-y-6">
        <p className="font-pixel text-4xl sm:text-5xl text-accent-primary">
          404
        </p>

        <p className="text-4xl" role="img" aria-label="sad face">
          (&#xB4;;&#x3C9;;&#x60;)
        </p>

        <p className="font-pixel text-xs sm:text-sm text-text-primary">
          {m.notFound.title}
        </p>

        <p className="font-pixel-accent text-[10px] text-text-secondary">
          {m.notFound.subtitle}
        </p>

        <Link href="/">
          <PixelButton variant="primary" size="md">
            {m.notFound.homeButton}
          </PixelButton>
        </Link>
      </PixelCard>
    </div>
  );
}
