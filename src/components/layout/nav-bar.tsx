import Link from "next/link";
import { PixelButton } from "@/components/ui/pixel-button";
import { AuthButton } from "./auth-button";
import { LocaleToggle } from "./locale-toggle";
import { getLocale } from "@/lib/i18n/get-locale";
import { messages } from "@/lib/i18n/messages";

// ============================================================
// NavBar — Shared navigation bar for all pages
// ============================================================

interface NavBarProps {
  showBack?: boolean;
  backHref?: string;
  backLabel?: string;
}

export async function NavBar({
  showBack = false,
  backHref = "/",
  backLabel,
}: NavBarProps) {
  const locale = await getLocale();
  const m = messages[locale];
  const resolvedBackLabel = backLabel ?? m.common.back;

  return (
    <nav className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b-2 border-card-border">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side: back button or spacer */}
        <div className="flex items-center gap-3">
          {showBack && (
            <Link
              href={backHref}
              className="font-pixel text-[10px] text-text-secondary hover:text-accent-primary transition-colors"
            >
              &larr; {resolvedBackLabel}
            </Link>
          )}
        </div>

        {/* Center: Logo */}
        <Link
          href="/"
          className="font-pixel text-sm text-accent-primary hover:brightness-110 transition-all absolute left-1/2 -translate-x-1/2"
        >
          ABTI
        </Link>

        {/* Right side: locale toggle + gallery link + auth */}
        <div className="flex items-center gap-3">
          <LocaleToggle />
          <Link href="/gallery" className="hidden sm:inline-flex">
            <PixelButton variant="ghost" size="sm">
              {m.common.gallery}
            </PixelButton>
          </Link>
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
