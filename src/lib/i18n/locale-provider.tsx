"use client";

// ============================================================
// Client-side locale context provider + hooks
// Provides locale and messages to all client components
// ============================================================

import { createContext, useContext, useMemo } from "react";
import type { Locale } from "./types";
import { messages, type Messages } from "./messages";

interface LocaleContextValue {
  locale: Locale;
  messages: Messages;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  messages: messages.en,
});

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo(
    () => ({ locale, messages: messages[locale] }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext).locale;
}

export function useMessages(): Messages {
  return useContext(LocaleContext).messages;
}
