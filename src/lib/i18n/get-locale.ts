// ============================================================
// Server-side locale reader
// Reads the "locale" cookie, defaults to "en"
// ============================================================

import { cookies } from "next/headers";
import type { Locale } from "./types";

export type { Locale };

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("locale")?.value;
  if (raw === "ko") return "ko";
  return "en";
}
