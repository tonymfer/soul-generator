// ============================================================
// Supabase Browser Client
// Use in Client Components ("use client")
// ============================================================

import { createBrowserClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "./env";
import type { Database } from "./types";

/**
 * Create a Supabase client for browser (Client Component) usage.
 * Cookies are managed automatically via document.cookie.
 * Uses singleton pattern — safe to call multiple times.
 */
export function createClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
