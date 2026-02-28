"use client";

import { useLocale } from "@/lib/i18n";

// ============================================================
// LocaleToggle — EN/KO switch button
// Sets the locale cookie and reloads the page
// ============================================================

export function LocaleToggle() {
  const locale = useLocale();

  const handleToggle = () => {
    const next = locale === "en" ? "ko" : "en";
    document.cookie = `locale=${next};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="font-pixel text-[9px] px-2 py-1 bg-card-bg pixel-border-sm text-text-secondary hover:text-text-primary hover:bg-accent-primary/10 transition-all duration-150 cursor-pointer select-none"
      aria-label={locale === "en" ? "Switch to Korean" : "Switch to English"}
    >
      {locale === "en" ? "KO" : "EN"}
    </button>
  );
}
