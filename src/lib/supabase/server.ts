// ============================================================
// Supabase Server Client
// Use in Server Components, Server Actions, Route Handlers
// ============================================================

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseUrl, supabaseAnonKey } from "./env";
import type { Database } from "./types";

/**
 * Create a Supabase client for server-side usage.
 * Must be called within a request context (Server Component, Route Handler, Server Action).
 *
 * Server Components can only read cookies. Route Handlers and Server Actions
 * can both read and write, enabling session refresh.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll is called from a Server Component where cookies cannot be set.
          // This is expected — the middleware handles session refresh instead.
        }
      },
    },
  });
}
