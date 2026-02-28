// ============================================================
// i18n barrel export
// NOTE: getLocale is server-only — import directly from
// "@/lib/i18n/get-locale" in server components/route handlers.
// ============================================================

export type { Locale } from "./types";
export { LocaleProvider, useLocale, useMessages } from "./locale-provider";
export { messages, type Messages } from "./messages";
